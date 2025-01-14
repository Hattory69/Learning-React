import React from "react";
import { LinkComponent } from "~components/LinkComponent";
import { PosterComponent } from "~components/PosterComponent";
import { formatReleaseYear } from "~helperFunctions/formatReleaseYear";
import { selectRatingStyle } from "~helperFunctions/selectRatingStyle";
import { IMovie } from "~types/types";
import "./searchItem.css";

interface ISearchItem {
  movie: IMovie
}

export function SearchItem({ movie }: ISearchItem) {
  const { name, alternativeName, poster, rating, type, id, releaseYears, year } = movie;
  const movieRating = rating?.kp != undefined ? Number(rating.kp.toFixed(1)) : null
  const movieRatingStyle = selectRatingStyle(movieRating);
  const movieYear = formatReleaseYear(type, releaseYears, year);

  return (
    <div className='searchItem-wrapper'>
      <PosterComponent poster={poster} imgClassName={"searchItem-img"} movieName={name || alternativeName} />
      <div className='searchItem-about'>
        <h4 className='searchItem-name'>{name || alternativeName}</h4>
        <p className='searchItem-info'>
          {movieRating !== null && Number(movieRating) > 0 && (
            <span style={movieRatingStyle} className='searchItem-rating'>
              {movieRating}
            </span>
          )}
          <span className='searchItem-details'>{movieYear ? `${type}, ${movieYear}` : type}</span>
        </p>
      </div>
      <LinkComponent url={`/about/${id}`} />
    </div>
  );
}

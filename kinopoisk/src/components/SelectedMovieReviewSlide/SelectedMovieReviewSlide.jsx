import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import React from "react";
import "./selectedMovieReviewSlide.css";

export function SelectedMovieReviewSlide({ reviewData }) {
	const { review, title, type, author, createdAt, reviewDislikes, reviewLikes } = reviewData;
	const styleOfReviewType = type === "Позитивный" ? "positive" : type === "Нейтральный" ? "neutral" : "negative";
	return (
		<>
			<p className='selectedMovie-reviewAuthor'>Автор: {author}</p>
			<span className={`selectedMovie-reviewType ${styleOfReviewType}`}>{type} отзыв.</span>
			{title && <h4 className='selectedMovie-reviewTitle'>{title}</h4>}
			<div className='selectedMovie-review'>{review}</div>
			<span className='selectedMovie-reviewDate'>Дата отзыва: {createdAt.split("T")[0]}</span>
			<div className='selectedMovie-reviewLikes'>
				<span className='selectedMovie-reviewLike'>
					<LikeOutlined /> {reviewLikes}
				</span>
				<span className='selectedMovie-reviewDisLike'>
					<DislikeOutlined /> {reviewDislikes}
				</span>
			</div>
		</>
	);
}

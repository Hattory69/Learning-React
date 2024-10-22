import { Image } from "antd";
import React from "react";
import "./selectedMovieActor.css";

export function SelectedMovieActor({ actor }) {
	const { photo, name, enName, description, profession, enProfession } = actor;
	return (
		<div className='selectedMovieActor-slideWrapper'>
			<Image
				className='selectedMovieActor-photo'
				src={photo}
			/>
			<div className='selectedMovieActor-about'>
				<p className='selectedMovieActor-name'>{name || enName}</p>
				{description && <p className='selectedMovieActor-role'>{description}</p>}
				<p className='selectedMovieActor-profession'>{profession || enProfession}</p>
			</div>
		</div>
	);
}

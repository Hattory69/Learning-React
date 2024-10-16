import { Image } from "antd";
import React from "react";
import "./selectedFilmActor.css";

export function SelectedFilmActor({ actor }) {
	const { photo, name, enName, description, profession, enProfession } = actor;
	return (
		<div className='selectedFilmActor-slideWrapper'>
			<Image
				className='selectedFilmActor-photo'
				src={photo}
			/>
			<div className='selectedFilmActor-about'>
				<p>{name || enName}</p>
				{description && <p>{description}</p>}
				<p>{profession || enProfession}</p>
			</div>
		</div>
	);
}

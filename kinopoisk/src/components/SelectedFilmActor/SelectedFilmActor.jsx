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
				<p className='selectedFilmActor-name'>{name || enName}</p>
				{description && <p className='selectedFilmActor-role'>{description}</p>}
				<p className='selectedFilmActor-profession'>{profession || enProfession}</p>
			</div>
		</div>
	);
}

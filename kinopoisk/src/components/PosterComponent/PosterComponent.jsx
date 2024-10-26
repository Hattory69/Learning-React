import { Image } from "antd";
import React, { useState } from "react";
import blancImg from "../../images/movieImgNotFound.svg";
import { IconComponent } from "../IconComponent/IconComponent";

export function PosterComponent({ poster, imgClassName, movieName }) {
	const [isImgError, setIsImgError] = useState(false);
	return (
		<>
			{isImgError ? (
				<IconComponent
					icon={blancImg}
					iconStyle={`${imgClassName}`}
				/>
			) : (
				<Image
					className={`${imgClassName}`}
					src={poster?.url || "noImg"}
					placeholder={false}
					alt={`Постер к ${movieName}`}
					onError={() => setIsImgError(true)}
				/>
			)}
		</>
	);
}

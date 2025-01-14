import { Image } from "antd";
import React, { useState } from "react";
import { IconComponent } from "~components/IconComponent";
import blancImg from "~images/movieImgNotFound.svg";

interface PosterComponentTypes {
	poster?: {
		url: string | null,
	},
	imgClassName: string,
	movieName: string | null
}

export function PosterComponent({ poster, imgClassName, movieName }: PosterComponentTypes) {
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

import { Image } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { mainPageBackground } from "../../data/mainPageBackground";
import "./mainPageTop.css";

export function MainPageTop() {
	const headerHeight = useSelector((state) => state.header.height);
	return (
		<div
			className='mainPageTop-wrapper'
			style={{ marginTop: -headerHeight + "px" }}
		>
			<h1 className='mainPageTop-title'>Фильмы и сериалы с Кинопоиском</h1>

			<div className='mainPageTop-background'>
				{mainPageBackground.map((line, index) => (
					<div
						key={`${line[0]}${index}`}
						className='mainPageTop-backgroundLine'
					>
						{line.map((item, index) => (
							<Image
								className='mainPageTop-backgroundImg'
								preview={false}
								key={`${item}${index}`}
								src={item}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

import { Button, ConfigProvider, Modal } from "antd";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { DefaultCarousel } from "~components/DefaultCarousel";
import { SelectedMovieActor } from "~components/SelectedMovieActor";
import { IMovieActor } from "~types/types";
import "./selectedMovieActors.css";

interface ISelectedMovieActors {
	persons: IMovieActor[],
	idForBtns: string,
}

export function SelectedMovieActors({ persons, idForBtns }: ISelectedMovieActors) {
	const [isActorsModalOpen, setIsActorsModalOpen] = useState(false);
	const isDesktopOrTablet = useMediaQuery({ query: "(min-width: 769px)" });
	const sortedActors = [...persons]?.sort((a, b) => (a.profession ?? "")?.localeCompare(b.profession ?? ""));

	const actorsCarousel = (
		<div className='selectedMovieDetails-actors'>
			<DefaultCarousel
				renderSlide={(actor) => <SelectedMovieActor actor={actor || []} />}
				idForBtns={idForBtns + "Actors"}
				dataToShow={sortedActors || []}
				slideKey={"id"}
			/>
		</div>
	);

	return (
		<>
			{!isDesktopOrTablet ? (
				<>
					<ConfigProvider
						theme={{
							token: {
								colorText: "white",
								colorBgBase: "#131317",
								colorBgContainer: "#0b090a",
								colorIcon: "gray",
							},
						}}
					>
						<Modal
							className='selectedMovie-actorsModal'
							title={"Список актёров"}
							open={isActorsModalOpen}
							onCancel={() => setIsActorsModalOpen(false)}
							footer={null}
							getContainer={() => document.body}
						>
							{actorsCarousel}
						</Modal>
					</ConfigProvider>
					<Button onClick={() => setIsActorsModalOpen(true)}>Список актёров</Button>
				</>
			) : (
				actorsCarousel
			)}
		</>
	);
}

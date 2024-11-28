import { Button, ConfigProvider, Modal } from "antd";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SelectedMovieReviewSlide } from "../SelectedMovieReviewSlide";
import "./selectedMovieReviews.css";

export function SelectedMovieReviews({ reviewsData }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
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
				<Modal className='selectedMovie-reviewsModal' title={"Отзывы"} open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
					<Swiper modules={[Pagination]} spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }}>
						{reviewsData.map((reviewData, index) => (
							<SwiperSlide className='selectedMovie-reviewSlideWrapper' key={`${reviewData.id}${index}`}>
								<SelectedMovieReviewSlide reviewData={reviewData} />
							</SwiperSlide>
						))}
					</Swiper>
				</Modal>
			</ConfigProvider>
			{reviewsData.length > 0 && <Button onClick={() => setIsModalOpen(true)}>Отзывы</Button>}
		</>
	);
}

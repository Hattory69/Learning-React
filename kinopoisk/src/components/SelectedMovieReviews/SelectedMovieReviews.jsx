import { ConfigProvider, Modal } from "antd";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SelectedMovieReviewSlide } from "../SelectedMovieReviewSlide/SelectedMovieReviewSlide";
import "./selectedMovieReviews.css";

export function SelectedMovieReviews({ setIsModalOpen, isModalOpen, reviewsData }) {
	function handleCancel() {
		setIsModalOpen(false);
	}

	return (
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
				className='selectedMovie-reviewsModal'
				title={"Отзывы"}
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
			>
				<Swiper
					modules={[Pagination]}
					spaceBetween={10}
					slidesPerView={1}
					pagination={{ clickable: true }}
				>
					{reviewsData.map((reviewData, index) => (
						<SwiperSlide
						className="selectedMovie-reviewSlideWrapper"
							key={`${reviewData.id}${index}`}
						>
							<SelectedMovieReviewSlide reviewData={reviewData} />
						</SwiperSlide>
					))}
				</Swiper>
			</Modal>
		</ConfigProvider>
	);
}

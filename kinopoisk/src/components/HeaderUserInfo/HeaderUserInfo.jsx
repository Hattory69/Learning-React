import { Button, ConfigProvider, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";
import "./headerUserInfo.css";

export function HeaderUserInfo({ setIsModalOpen, isModalOpen }) {
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const [modalMode, setModalMode] = useState("login");

	useEffect(() => {
		if (user?.loggedIn) {
			setModalMode("userInfo");
		}
	}, [user]);

	function handleCancel() {
		setIsModalOpen(false);
	}

	function handleLogout() {
		const updatedData = {
			...user,
			loggedIn: false,
		};
		localStorage.setItem("registrationData", JSON.stringify(updatedData));
		dispatch(setUser(null));
		setModalMode("login");
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
				className='header-userInfoWrapper'
				title={modalMode === "userInfo" ? "Информация о пользователе" : "Авторизация"}
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
			>
				{modalMode === "userInfo" ? (
					<>
						<p>Имя пользователя: {user?.username}</p>
						<p>Почта: {user?.email}</p>
						<p>Фамилия: {user?.lastName}</p>
						<p>Имя: {user?.firstName}</p>
						<p>Год рождения: {user?.yearOfBirth}</p>
						<p>Дата регистрации: {new Date(user?.registrationDate).toLocaleDateString()}</p>
						<Button
							type='primary'
							onClick={handleLogout}
						>
							Выйти
						</Button>
					</>
				) : (
					<>
						{modalMode === "login" ? (
							<>
								<LoginForm setIsModalOpen={setIsModalOpen} />
								<p>
									Нет аккаунта?{" "}
									<Button
										type='link'
										onClick={() => setModalMode("register")}
									>
										Зарегистрироваться
									</Button>
								</p>
							</>
						) : (
							<>
								<RegistrationForm setIsModalOpen={setIsModalOpen} />
								<p>
									Уже есть аккаунт?{" "}
									<Button
										type='link'
										onClick={() => setModalMode("login")}
									>
										Войти
									</Button>
								</p>
							</>
						)}
					</>
				)}
			</Modal>
		</ConfigProvider>
	);
}

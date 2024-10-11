import { Button, Form, Input } from "antd";
import React, { useContext, useState } from "react";
import { userContext } from "../AppContextWrapper/AppContextWrapper";

export function LoginForm({ setIsModalOpen }) {
	const [formSubmitted, setFormSubmitted] = useState(false);
	const { setUser } = useContext(userContext);

	function onFinish(values) {
		const savedData = JSON.parse(localStorage.getItem("registrationData"));

		if (savedData && values.username === savedData.username && values.password === savedData.password) {
			const updatedData = {
				...savedData,
				loggedIn: true,
			};

			localStorage.setItem("registrationData", JSON.stringify(updatedData));
			setUser(updatedData);
			setIsModalOpen(false);
		} else {
			alert("Некорректное имя пользователя или пароль.");
		}
	}

	return (
		<Form
			validateTrigger={formSubmitted ? "onSubmit" : "onChange"}
			name='login'
			labelCol={{
				span: 8,
			}}
			wrapperCol={{
				span: 16,
			}}
			style={{
				maxWidth: 600,
			}}
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
			autoComplete='off'
		>
			<Form.Item
				label='Имя пользователя'
				name='username'
				rules={[
					{
						required: true,
						message: "Пожалуйста, введите имя пользователя!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label='Пароль'
				name='password'
				rules={[
					{
						required: true,
						message: "Пожалуйста, введите пароль",
					},
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Button
					type='primary'
					htmlType='submit'
					onClick={() => setFormSubmitted(true)}
				>
					Log In
				</Button>
			</Form.Item>
		</Form>
	);
}

import { Button, Form, Input } from "antd";
import React, { useContext, useState } from "react";
import { userContext } from "../AppContextWrapper/AppContextWrapper";

export function RegistrationForm({ setIsModalOpen }) {
	const [formSubmitted, setFormSubmitted] = useState(false);
	const { setUser } = useContext(userContext);

	function onFinish(values) {
		const registrationData = {
			...values,
			loggedIn: true,
			registrationDate: new Date(),
		};
		localStorage.setItem("registrationData", JSON.stringify(registrationData));
		setUser(registrationData);
		setIsModalOpen(false);
	}

	return (
		<Form
			validateTrigger={formSubmitted ? "onSubmit" : "onChange"}
			name='basic'
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
				label='Фамилия'
				name='lastName'
				validateDebounce={1000}
				rules={[
					{
						required: true,
						message: "Пожалуйста введите фамилию!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label='Имя'
				name='firstName'
				validateDebounce={1000}
				rules={[
					{
						required: true,
						message: "Пожалуйста введите имя!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label='Год рождения'
				name='yearOfBirth'
				validateDebounce={1000}
				rules={[
					{
						required: true,
						message: "Пожалуйста введите год рождения!",
					},
					{
						pattern: new RegExp("^(19|20)\\d{2}$"),
						message: "Пожалуйста введите настоящий год рождения!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label='Email'
				name='email'
				validateDebounce={1000}
				rules={[
					{
						required: true,
						message: "Пожалуйста введите email!",
					},
					{
						type: "email",
						message: "Пожалуйста введите настоящий email!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label='Username'
				name='username'
				validateDebounce={1000}
				rules={[
					{
						required: true,
						message: "Пожалуйста введите настоящий username!",
					},
					{
						min: 8,
						message: "Username должен состоять минимум из 8 символов!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label='Пароль'
				name='password'
				validateDebounce={1000}
				rules={[
					{
						required: true,
						message: "Пожалуйста введите пароль!",
					},
					{
						min: 8,
						message: "Пароль должен состоять минимум из 8 символов",
					},
					{
						pattern: new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])"),
						message: "Пароль должен включать заглавные и строчный буквы, цифры, и специальные символы!",
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
					Зарегистрироваться
				</Button>
			</Form.Item>
		</Form>
	);
}

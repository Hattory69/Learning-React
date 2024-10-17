import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import kinopoiskLogo from "../../images/Kinopoisk-Logo.svg";
import { HeaderSearch } from "../HeaderSearch/HeaderSearch";
import { HeaderUserInfo } from "../HeaderUserInfo/HeaderUserInfo";
import { IconComponent } from "../IconComponent/IconComponent";
import { LinkComponent } from "../LinkComponent/LinkComponent";
import "./HeaderWrapper.css";
import { useSelector } from "react-redux";

export function HeaderWrapper() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [showSearchInput, setShowSearchInput] = useState(false);
	const [showHeader, setShowHeader] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [isAtTop, setIsAtTop] = useState(true);
	const location = useLocation();
	const user = useSelector((state) => state.user.user);

	const handleScroll = () => {
		const currentScrollY = window.scrollY;
		setIsAtTop(currentScrollY === 0);

		if (currentScrollY < lastScrollY) {
			setShowHeader(true);
			setLastScrollY(currentScrollY);
		} else if (currentScrollY - lastScrollY >= 200) {
			setShowHeader(false);
			setIsSearchOpen(false);
			setShowSearchInput(false);
			setLastScrollY(currentScrollY);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [lastScrollY]);

	return (
		<header className={`header-wrapper ${showHeader ? "visible" : "hidden"} ${isAtTop ? "atTopPosition" : "notAtTopPosition"}`}>
			<IconComponent
				icon={kinopoiskLogo}
				iconStyle={"header-KinopoiskIcon"}
				viewBox={"0 0 200 30"}
			/>
			<ul className={`header-navLinksList ${!showSearchInput ? "fade-in" : "fade-out"}`}>
				<li className={`header-navLink ${location.pathname === "/" ? "active" : ""}`}>
					<LinkComponent url={"/"} />
					<p>Главное</p>
				</li>
				{user?.loggedIn && (
					<li className={`header-navLink ${location.pathname === "/random/" ? "active" : ""}`}>
						<LinkComponent url={"/random/"} />
						<p>Рандомный фильм</p>
					</li>
				)}
				<li className='header-navLink'></li>
				<button onClick={() => setShowSearchInput(true)}>
					<SearchOutlined className='header-icons' />
				</button>
			</ul>
			<div className={`header-search ${showSearchInput ? "fade-in" : "fade-out"}`}>
				<HeaderSearch
					setIsSearchOpen={setIsSearchOpen}
					isSearchOpen={isSearchOpen}
					setShowSearchInput={setShowSearchInput}
				/>
			</div>
			<button
				className='header-user'
				onClick={() => setIsModalOpen(true)}
			>
				{user?.loggedIn ? user?.username : "Войти"}
			</button>

			<HeaderUserInfo
				setIsModalOpen={setIsModalOpen}
				isModalOpen={isModalOpen}
			/>
		</header>
	);
}

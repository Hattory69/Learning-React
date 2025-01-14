import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { HeaderSearch } from "~components/HeaderSearch";
import { HeaderUserInfo } from "~components/HeaderUserInfo";
import { IconComponent } from "~components/IconComponent";
import { LinkComponent } from "~components/LinkComponent";
import kinopoiskLogo from "~images/KinopoiskLogo.svg";
import { RootState } from "~redux/store";
import "./HeaderWrapper.css";

export function HeaderWrapper() {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [showSearchInput, setShowSearchInput] = useState(false);
	const [showHeader, setShowHeader] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [isAtTop, setIsAtTop] = useState(true);
	const location = useLocation();
	const user = useSelector((state: RootState) => state.user.user);

	function debounce<F extends (...args: any[]) => void>(func: F, delay: number): (...args: Parameters<F>) => void {
		let timeout: ReturnType<typeof setTimeout>;
		return (...args) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => func(...args), delay);
		};
	}

	function handleScroll() {
		const currentScrollY = window.scrollY;
		setIsAtTop(currentScrollY === 0);

		if (currentScrollY < lastScrollY) {
			setShowHeader(true);
		} else if (currentScrollY - lastScrollY >= 200) {
			setShowHeader(false);
			setIsSearchOpen(false);
			setShowSearchInput(false);
		}
		setLastScrollY(currentScrollY);
	}

	const debouncedHandleScroll = debounce(handleScroll, 100);

	useEffect(() => {
		window.addEventListener("scroll", debouncedHandleScroll);

		return () => {
			window.removeEventListener("scroll", debouncedHandleScroll);
		};
	}, [debouncedHandleScroll]);

	return (
		<header className={`header-wrapper ${showHeader ? "visible" : "hidden"} ${isAtTop ? "atTopPosition" : "notAtTopPosition"}`}>
			<IconComponent icon={kinopoiskLogo} iconStyle={"header-KinopoiskIcon"} viewBox={"0 0 200 30"} />

			{!showSearchInput ? (
				<ul className={`header-navLinksList ${!showSearchInput ? "fade-block" : ""}`}>
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
					<button onClick={() => setShowSearchInput(true)}>
						<SearchOutlined className='header-icons' />
					</button>
				</ul>
			) : (
				<div className={`header-search ${showSearchInput ? "fade-block" : ""}`}>
					<HeaderSearch setIsSearchOpen={setIsSearchOpen} isSearchOpen={isSearchOpen} setShowSearchInput={setShowSearchInput} />
				</div>
			)}
			<HeaderUserInfo />
		</header>
	);
}

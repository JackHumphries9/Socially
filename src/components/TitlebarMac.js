import React, { useState, useEffect } from "react";
import "./styles/TitlebarMac.css";

/* eslint-disable */

export default function Titlebar() {
	const [isMaximized, setMaximized] = useState(false);
	const [isFocused, setFocused] = useState(true);

	useEffect(() => {
		function handleResize() {
			if (socially.winControls.isMaximized()) {
				setMaximized(true);
			} else {
				setMaximized(false);
			}
		}
		window.addEventListener("resize", handleResize);

		return (_) => {
			window.removeEventListener("resize", handleResize);
		};
	});

	return (
		<header id="titlebarMac" className={isMaximized ? `maximizedMac` : ``}>
			<div id="drag-region"></div>
		</header>
	);
}

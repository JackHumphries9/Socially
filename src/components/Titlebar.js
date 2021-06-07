import React, { useState, useEffect } from "react";
import "./styles/Titlebar.css";
import min_icon from "../assets/icons/min-w-10.png";
import max_icon from "../assets/icons/max-w-10.png";
import restore_icon from "../assets/icons/restore-w-10.png";
import close_icon from "../assets/icons/close-w-10.png";

/* eslint-disable */

export default function Titlebar() {
	const [isMaximized, setMaximized] = useState(false);

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
		<header id="titlebar" className={isMaximized ? `maximized` : ``}>
			<div id="drag-region">
				<div id="window-title" style={{ userSelect: "none" }}>
					<span>{document.title}</span>
				</div>

				<div id="window-controls">
					<div
						className="button"
						onClick={() => {
							socially.winControls.minimize();
						}}
					>
						<img className="icon" src={min_icon} draggable="false" />
					</div>
					<div
						className="button"
						id="max-button"
						onClick={() => {
							setMaximized(true);
							socially.winControls.maximize();
						}}
					>
						<img className="icon" src={max_icon} draggable="false" />
					</div>
					<div
						className="button"
						id="restore-button"
						onClick={() => {
							setMaximized(false);
							socially.winControls.restore();
						}}
					>
						<img className="icon" src={restore_icon} draggable="false" />
					</div>
					<div
						className="button"
						id="close-button"
						onClick={() => {
							socially.winControls.close();
						}}
					>
						<img className="icon" src={close_icon} draggable="false" />
					</div>
				</div>
			</div>
		</header>
	);
}

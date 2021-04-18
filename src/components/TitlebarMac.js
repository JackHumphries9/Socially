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

	useEffect(() => {
		function focus() {
			setFocused(true);
		}

		window.addEventListener("focus", focus);

		return (_) => {
			window.removeEventListener("focus", focus);
		};
	});

	useEffect(() => {
		function blur() {
			setFocused(false);
		}

		window.addEventListener("blur", blur);

		return (_) => {
			window.removeEventListener("blur", blur);
		};
	});

	return (
		<header id="titlebarMac" className={isMaximized ? `maximizedMac` : ``}>
			<div id="drag-region">
				<div id="window-controlsMac">
					<div
						className="buttonMac"
						id="close-buttonMac"
						onClick={() => {
							socially.winControls.close();
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="32"
							viewBox="0 0 20 32"
							fill="none"
						>
							<circle
								cx="11"
								cy="11"
								r="6"
								fill={isFocused ? "#FF6058" : "#454545"}
							/>
							<line
								className="control-iconsMac"
								x1="8.35355"
								y1="8"
								x2="14"
								y2="13.6464"
								stroke="#595959"
								strokeWidth="0.8"
								strokeLinecap="round"
							/>
							<line
								className="control-iconsMac"
								x1="8"
								y1="13.6464"
								x2="13.6464"
								y2="8"
								stroke="#595959"
								strokeWidth="0.8"
								strokeLinecap="round"
							/>
						</svg>
					</div>
					<div
						className="buttonMac"
						onClick={() => {
							socially.winControls.minimize();
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="32"
							viewBox="0 0 20 32"
							fill="none"
						>
							<circle
								cx="11"
								cy="11"
								r="6"
								fill={isFocused ? "#FFBD2E" : "#454545"}
							/>
							<line
								className="control-iconsMac"
								x1="8"
								y1="10.75"
								x2="14"
								y2="10.75"
								stroke="#595959"
								strokeWidth="1"
								strokeLinecap="round"
							/>
						</svg>
					</div>
					<div
						className="buttonMac"
						id="max-buttonMac"
						onClick={() => {
							setMaximized(true);
							socially.winControls.maximize();
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="32"
							viewBox="0 0 20 32"
							fill="none"
						>
							<circle
								cx="11"
								cy="11"
								r="6"
								fill={isFocused ? "#29CA41" : "#454545"}
							/>
							<line
								className="control-iconsMac"
								x1="8.25"
								y1="10.75"
								x2="13.75"
								y2="10.75"
								stroke="#333333"
								strokeWidth="0.5"
								strokeLinecap="round"
							/>
							<line
								className="control-iconsMac"
								x1="10.75"
								y1="13.75"
								x2="10.75"
								y2="8.25"
								stroke="#333333"
								strokeWidth="0.5"
								strokeLinecap="round"
							/>
						</svg>
					</div>
					<div
						className="buttonMac"
						id="restore-buttonMac"
						onClick={() => {
							setMaximized(false);
							socially.winControls.restore();
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="32"
							viewBox="0 0 20 32"
							fill="none"
						>
							<circle cx="11" cy="11" r="6" fill="#29CA41" />
							<line
								className="control-iconsMac"
								x1="8.25"
								y1="10.75"
								x2="13.75"
								y2="10.75"
								stroke="#333333"
								strokeWidth="0.5"
								strokeLinecap="round"
							/>
							<line
								className="control-iconsMac"
								x1="10.75"
								y1="13.75"
								x2="10.75"
								y2="8.25"
								stroke="#333333"
								strokeWidth="0.5"
								strokeLinecap="round"
							/>
						</svg>
					</div>
				</div>
			</div>
		</header>
	);
}

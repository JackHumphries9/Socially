import React from "react";
import "./styles/InitialPage.css";

export default function InitialPage(props) {
	return (
		<div className={props.isActive ? "fade-in" : "fade-in hidden"}>
			<h1 className="settings fade-in-setup">Welcome to Socially!</h1>
			<h4 className="first-time-text fade-in-setup">
				<span style={{ fontSize: "2rem" }}>←</span>Check out your selected
				socials here!
			</h4>
			<h4
				className="first-time-text fade-in-setup"
				style={{ position: "fixed", bottom: "10px" }}
			>
				<span style={{ fontSize: "2rem" }}>←</span>Settings down here!
			</h4>
		</div>
	);
}

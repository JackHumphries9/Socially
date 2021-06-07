import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "./styles/InitialPage.css";

export default function InitialPage(props) {
	useEffect(() => {
		if (props.isActive) {
			toast.dark("Socially is now setup!", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	}, []);

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

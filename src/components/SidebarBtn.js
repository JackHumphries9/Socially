import React from "react";
import "./styles/SidebarBtn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* eslint-disable */

export default function SidebarBtn(props) {
	return (
		<a
			className={`sidebar-btn ${
				props.activeSocial === props.name ? "social-active" : "sidebar-btn"
			} ${props.isEnabled ? "sidebar-icon-zoomin" : "sidebar-icon-zoomout"}`}
			style={
				props.name === "settings" ? { position: "fixed", bottom: "10px" } : null
			}
			onClick={() => {
				socially.appdata.setLastApp(props.name);
				props.setActiveSocial(props.name);
			}}
		>
			<FontAwesomeIcon icon={props.icon} />
		</a>
	);
}

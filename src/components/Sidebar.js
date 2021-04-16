import React from "react";
import "./styles/Sidebar.css";

export default function Sidebar(props) {
	return (
		<div
			className={`sidebar ${
				props.isNativeTitlebar ? "sidebarNative" : "sidebarNoNative"
			}`}
			id="sidebar"
		>
			{props.children}
		</div>
	);
}

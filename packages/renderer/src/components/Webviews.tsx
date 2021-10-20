import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./styles/webviews.css";

interface WebviewsProps {
	socials: Social[];
	activeSocial: number;
}

const Webviews: React.FC<WebviewsProps> = (props: WebviewsProps) => {
	return (
		<div className="webviews">
			{props.socials.map((social: Social, id: number) => {
				return (
					<webview
						key={id}
						src={social.url}
						useragent={social.useragent}
						className={`webview ${
							props.activeSocial == id ? "fadein" : "hidden"
						}`}
					></webview>
				);
			})}
		</div>
	);
};

export default Webviews;

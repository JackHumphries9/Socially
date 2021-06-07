import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/WelcomePage.css";

/* eslint-disable */

export default function WelcomePage(props) {
	var socialsT = [];
	props.sidebarEnumerate().map((obj, i) => {
		socialsT.push({ name: obj.name, enabled: false });
	});

	const [socials, setSocials] = useState(socialsT);

	return (
		<div className="setup">
			<h1>Welcome to Socially!</h1>
			<p>
				Thank you for downloading Socially. To get started, please select the
				socials you use.
			</p>

			<br />
			<div className="setup-row">
				{props.sidebarEnumerate().map((obj, i) => {
					return (
						<div
							className="col-4 setup-fade"
							key={obj.name}
							style={{ "--order": i + 1 }}
						>
							<FontAwesomeIcon icon={obj.icon} className="setup-icon" />{" "}
							<div className="switch-social">
								<label className="switch">
									<input
										type="checkbox"
										checked={socials[i].en}
										onChange={(e) => {
											console.log(socials[i]);

											console.log(socials);
											var t = socials;
											t[i].enabled = !t[i].enabled;
											setSocials(t);
										}}
									/>
									<span className="slider round"></span>
								</label>
							</div>
						</div>
					);
				})}
			</div>

			<div className="social-confirm-btn">
				<button
					className="btn fade-in"
					id="setup-confirm"
					onClick={() => {
						console.log(socials);
						socially.appdata.welcome(socials);
						props.setSetup(true);
					}}
				>
					Confirm
				</button>
			</div>
		</div>
	);
}

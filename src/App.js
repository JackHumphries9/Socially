import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import SidebarBtn from "./components/SidebarBtn";
import Titlebar from "./components/Titlebar";
import TitlebarMac from "./components/TitlebarMac";
import {
	faWhatsapp,
	faFacebookMessenger,
	faInstagram,
	faSlack,
	faLinkedin,
	faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import Settings from "./components/Settings";
import InitialPage from "./components/InitialPage";
import WelcomePage from "./components/WelcomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Detector } from "react-detect-offline";

/* eslint-disable */

function App() {
	const [whatsappSocial, setWhatsappSocial] = useState({
		name: "whatsapp",
		url: "https://web.whatsapp.com",
		icon: faWhatsapp,
		isEnabled: socially.appdata.isEnabled("whatsapp") ?? false,
		useragent:
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36",
	});
	const [messengerSocial, setMessengerSocial] = useState({
		name: "messenger",
		url: "https://www.messenger.com/login",
		icon: faFacebookMessenger,
		isEnabled: socially.appdata.isEnabled("messenger") ?? false,
	});
	const [instagramSocial, setInstagramSocial] = useState({
		name: "instagram",
		url: "https://www.instagram.com/direct/inbox/",
		icon: faInstagram,
		isEnabled: socially.appdata.isEnabled("instagram") ?? false,
	});
	const [telegramSocial, setTelegramSocial] = useState({
		name: "telegram",
		url: "https://web.telegram.org/#/login",
		icon: faTelegram,
		isEnabled: socially.appdata.isEnabled("telegram") ?? false,
	});
	const [slackSocial, setSlackSocial] = useState({
		name: "slack",
		url: "https://slack.com/signin",
		icon: faSlack,
		isEnabled: socially.appdata.isEnabled("slack") ?? false,
	});
	const [linkedinSocial, setLinkedinSocial] = useState({
		name: "linkedin",
		url: "https://www.linkedin.com/messaging/",
		icon: faLinkedin,
		isEnabled: socially.appdata.isEnabled("linkedin") ?? false,
	});

	const setEnabledSocials = {
		whatsapp: (d) =>
			setWhatsappSocial({
				...socials.whatsapp,
				isEnabled: d,
			}),
		messenger: (d) =>
			setMessengerSocial({
				...socials.messenger,
				isEnabled: d,
			}),
		instagram: (d) =>
			setInstagramSocial({
				...socials.instagram,
				isEnabled: d,
			}),
		telegram: (d) =>
			setTelegramSocial({
				...socials.telegram,
				isEnabled: d,
			}),
		slack: (d) =>
			setSlackSocial({
				...socials.slack,
				isEnabled: d,
			}),
		linkedin: (d) => {
			setLinkedinSocial({
				...socials.linkedin,
				isEnabled: d,
			});
		},
	};

	const socials = {
		whatsapp: whatsappSocial,
		messenger: messengerSocial,
		instagram: instagramSocial,
		telegram: telegramSocial,
		slack: slackSocial,
		linkedin: linkedinSocial,
	};

	const [activeSocial, setActiveSocial] = useState(
		socially.appdata.getLastApp() || "first-time"
	);

	const [isSetup, setSetup] = useState(socially.appdata.hasSetup());

	const sidebarEnumerate = () => {
		var arr = [];
		for (const p in socials) {
			arr.push(socials[p]);
		}

		return arr;
	};

	var titlebar;
	var nativeTitlebar = false;
	if (socially.appdata.getTitlebar() === "mac") {
		titlebar = <TitlebarMac />;
	} else if (socially.appdata.getTitlebar() === "native") {
		titlebar = <span />;
		nativeTitlebar = true;
	} else {
		titlebar = <Titlebar />;
	}

	if (!isSetup) {
		return (
			<div className="App">
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				{titlebar}

				<>
					<WelcomePage
						sidebarEnumerate={sidebarEnumerate}
						isSetup={isSetup}
						setSetup={setSetup}
					/>
				</>
			</div>
		);
	} else {
		return (
			<div className="App">
				<ToastContainer
					position="bottom-left"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				{titlebar}

				<Sidebar isNativeTitlebar={nativeTitlebar}>
					{sidebarEnumerate().map((obj, i) => {
						return (
							<SidebarBtn
								key={obj.name}
								icon={obj.icon}
								name={obj.name}
								activeSocial={activeSocial}
								setActiveSocial={setActiveSocial}
								isEnabled={obj.isEnabled}
							/>
						);
					})}

					<SidebarBtn
						key="settings"
						icon={faCog}
						isEnabled={true}
						name="settings"
						activeSocial={activeSocial}
						setActiveSocial={setActiveSocial}
					/>
				</Sidebar>
				<div
					className="main"
					style={
						nativeTitlebar ? { paddingTop: "0px" } : { paddingTop: "32px" }
					}
				>
					<Detector
						render={({ online }) => (
							<div
								className={`${
									nativeTitlebar ? "offlineViewNative" : "offlineView"
								} ${online ? "hidden" : ""}
						`}
							>
								<div className="offlineText">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="64"
										height="64"
										fill="currentColor"
										viewBox="0 0 16 16"
										className="offlineIcon"
									>
										<path d="M10.706 3.294A12.545 12.545 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c.63 0 1.249.05 1.852.148l.854-.854zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.448 8.448 0 0 1 3.51-1.27L8 6zm2.596 1.404.785-.785c.63.24 1.227.545 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.462 8.462 0 0 0-1.98-.932zM8 10l.933-.933a6.455 6.455 0 0 1 2.013.637c.285.145.326.524.1.75l-.015.015a.532.532 0 0 1-.611.09A5.478 5.478 0 0 0 8 10zm4.905-4.905.747-.747c.59.3 1.153.645 1.685 1.03a.485.485 0 0 1 .047.737.518.518 0 0 1-.668.05 11.493 11.493 0 0 0-1.811-1.07zM9.02 11.78c.238.14.236.464.04.66l-.707.706a.5.5 0 0 1-.707 0l-.707-.707c-.195-.195-.197-.518.04-.66A1.99 1.99 0 0 1 8 11.5c.374 0 .723.102 1.021.28zm4.355-9.905a.53.53 0 0 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75l10.75-10.75z" />
									</svg>
									<br />
									You are not connected to the internet. Please reconnect to use
									Socially.
								</div>
							</div>
						)}
					/>

					{sidebarEnumerate().map((obj, i) => {
						if (obj.useragent) {
							return (
								<webview
									key={obj.name}
									className={`${nativeTitlebar ? "webviewNative" : "webview"}
									${activeSocial === obj.name ? "fadein" : "hidden"}`}
									src={obj.url}
									useragent={obj.useragent}
								/>
							);
						} else {
							return (
								<webview
									key={obj.name}
									className={`${nativeTitlebar ? "webviewNative" : "webview"}
                                ${
																	activeSocial === obj.name
																		? "fadein"
																		: "hidden"
																}`}
									src={obj.url}
								/>
							);
						}
					})}
					<Settings
						isActive={activeSocial === "settings" ? true : false}
						socials={socials}
						setSocials={setEnabledSocials}
						sidebarEnumerate={sidebarEnumerate}
					/>
					<InitialPage
						isActive={activeSocial === "first-time" ? true : false}
					/>
				</div>
			</div>
		);
	}
}

export default App;

import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import SidebarBtn from "./components/SidebarBtn";
import Titlebar from "./components/Titlebar";
import TitlebarMac from "./components/TitlebarMac";
import {
	faWhatsapp,
	faFacebookMessenger,
	faInstagram,
	faTwitter,
	faSlack,
	faLinkedin,
	faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import Settings from "./components/Settings";
import InitialPage from "./components/InitialPage";
import WelcomePage from "./components/WelcomePage";

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
	const [twitterSocial, setTwitterSocial] = useState({
		name: "twitter",
		url: "https://twitter.com/",
		icon: faTwitter,
		isEnabled: socially.appdata.isEnabled("twitter") ?? false,
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
		twitter: (d) =>
			setTwitterSocial({
				...socials.twitter,
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
		twitter: twitterSocial,
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

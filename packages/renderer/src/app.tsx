import React, { useEffect, useState } from "react";
import "./app.css";
import Sidebar from "./components/Sidebar";
import Titlebar from "./components/Titlebar";
import Socials from "./socials";

const App: React.FC = () => {
    const [isFullscreen, setFullscreen] = useState<boolean>(false);

    // Sidebar App Logic
    const [activeSocial, setActiveSocial] = useState<number>(0);
    const [disabledSocials, setDisabledSocials] = useState<number[]>([]);

    return (
        <div className="app">
            <Titlebar
                isFullscreen={isFullscreen}
                setFullscreen={setFullscreen}
            />
            <main
                className={"content " + (isFullscreen ? "" : "contentTitlebar")}
            >
                <Sidebar
                    socials={Socials}
                    activeSocial={activeSocial}
                    setActiveSocial={setActiveSocial}
                    disabledSocials={disabledSocials}
                    setDisabledSocials={setDisabledSocials}
                />
                <div>CONTENT</div>
            </main>
        </div>
    );
};

export default App;

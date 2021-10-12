import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./styles/SidebarBtn.css";

interface SidebarBtnProps {
    id: number;
    icon: string;
    isActive: boolean;
    isEnabled: boolean;
    isSettings: boolean;
    setActiveSocial: Dispatch<SetStateAction<number>>;
}

const SidebarBtn: React.FC<SidebarBtnProps> = (props: SidebarBtnProps) => {
    return (
        <a
            className={`sidebar-btn ${
                props.isActive ? "social-active" : "sidebar-btn"
            } ${
                props.isEnabled ? "sidebar-icon-zoomin" : "sidebar-icon-zoomout"
            }`}
            style={
                props.isSettings
                    ? { position: "fixed", bottom: "10px" }
                    : undefined
            }
            onClick={() => {
                //socially.appdata.setLastApp(props.name);
                props.setActiveSocial(props.id);
            }}
        >
            <img
                src={props.icon}
                className="sidebarIcon"
                width="28px"
                height="28px"
            />
        </a>
    );
};

export default SidebarBtn;

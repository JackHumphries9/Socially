import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SidebarBtn from "./SidebarBtn";
import "./styles/Sidebar.css";

interface SidebarProps {
    socials: Social[];
    disabledSocials: number[];
    setDisabledSocials: Dispatch<SetStateAction<number[]>>;
    activeSocial: number;
    setActiveSocial: Dispatch<SetStateAction<number>>;
}

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
    return (
        <div className="sidebar">
            {props.socials.map((social: Social, id: number) => {
                return (
                    <SidebarBtn
                        id={id}
                        key={social.name}
                        icon={social.icon}
                        isActive={props.activeSocial == id ? true : false}
                        isEnabled={true}
                        isSettings={false}
                        setActiveSocial={props.setActiveSocial}
                    />
                );
            })}
            <SidebarBtn
                id={-1}
                key="settings"
                icon="../../assets/icons/socials/sidebar/cog-solid.svg"
                isActive={props.activeSocial == -1 ? true : false}
                isEnabled={true}
                isSettings={true}
                setActiveSocial={props.setActiveSocial}
            />
        </div>
    );
};

export default Sidebar;

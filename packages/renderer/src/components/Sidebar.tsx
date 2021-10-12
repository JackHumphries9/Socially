import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./styles/Sidebar.css";

interface SidebarProps {
    socials: Social[];
    disabledSocials: number[];
    setDisabledSocials: Dispatch<SetStateAction<number[]>>;
    activeSocial: number;
    setActiveSocial: Dispatch<SetStateAction<number>>;
}

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
    return <div>{props.socials[0].name}</div>;
};

export default Sidebar;

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./styles/Titlebar.css";

interface TitlebarProps {
  isFullscreen: boolean;
  setFullscreen: Dispatch<SetStateAction<boolean>>;
}

const Titlebar: React.FC<TitlebarProps> = (props: TitlebarProps) => {
  const [isMaximized, setMaximized] = useState(false);

  // Add handler to detect maximizes or fullscreeens
  useEffect(() => {
    async function handleResize() {
      if (await window.electron.isMaximised()) {
        setMaximized(true);
      } else {
        setMaximized(false);
      }

      if (await window.electron.isFullscreen()) {
        props.setFullscreen(true);
      } else {
        props.setFullscreen(false);
      }
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <header
      className={
        "titlebar " +
        (isMaximized ? `maximized` : ``) +
        (props.isFullscreen ? `hidden` : ``)
      }
    >
      <div className="drag-region"></div>
      <div
        className={
          "window-controls " +
          (window.electron.getPlatform() == "darwin" ? "macos" : "")
        }
      >
        <div
          className={"button min-button "}
          onClick={() => {
            window.electron.minimize();
          }}
        >
          <img
            className="icon"
            srcSet="../../assets/icons/titlebar/min-w-10.png 1x, ../../assets/icons/titlebar/min-w-12.png 1.25x, ../../assets/icons/titlebar/min-w-15.png 1.5x, ../../assets/icons/titlebar/min-w-15.png 1.75x, ../../assets/icons/titlebar/min-w-20.png 2x, ../../assets/icons/titlebar/min-w-20.png 2.25x, ../../assets/icons/titlebar/min-w-24.png 2.5x, ../../assets/icons/titlebar/min-w-30.png 3x, ../../assets/icons/titlebar/min-w-30.png 3.5x"
            draggable="false"
          />
        </div>

        <div
          className="button max-button"
          onClick={() => {
            setMaximized(true);
            window.electron.maximize();
          }}
        >
          <img
            className="icon"
            srcSet="../../assets/icons/titlebar/max-w-10.png 1x, ../../assets/icons/titlebar/max-w-12.png 1.25x, ../../assets/icons/titlebar/max-w-15.png 1.5x, ../../assets/icons/titlebar/max-w-15.png 1.75x, ../../assets/icons/titlebar/max-w-20.png 2x, ../../assets/icons/titlebar/max-w-20.png 2.25x, ../../assets/icons/titlebar/max-w-24.png 2.5x, ../../assets/icons/titlebar/max-w-30.png 3x, ../../assets/icons/titlebar/max-w-30.png 3.5x"
            draggable="false"
          />
        </div>

        <div
          className="button restore-button"
          onClick={() => {
            setMaximized(false);
            window.electron.restore();
          }}
        >
          <img
            className="icon"
            srcSet="../../assets/icons/titlebar/restore-w-10.png 1x, ../../assets/icons/titlebar/restore-w-12.png 1.25x, ../../assets/icons/titlebar/restore-w-15.png 1.5x, ../../assets/icons/titlebar/restore-w-15.png 1.75x, ../../assets/icons/titlebar/restore-w-20.png 2x, ../../assets/icons/titlebar/restore-w-20.png 2.25x, ../../assets/icons/titlebar/restore-w-24.png 2.5x, ../../assets/icons/titlebar/restore-w-30.png 3x, ../../assets/icons/titlebar/restore-w-30.png 3.5x"
            draggable="false"
          />
        </div>

        <div
          className="button close-button"
          onClick={() => {
            window.electron.close();
          }}
        >
          <img
            className="icon"
            srcSet="../../assets/icons/titlebar/close-w-10.png 1x, ../../assets/icons/titlebar/close-w-12.png 1.25x, ../../assets/icons/titlebar/close-w-15.png 1.5x, ../../assets/icons/titlebar/close-w-15.png 1.75x, ../../assets/icons/titlebar/close-w-20.png 2x, ../../assets/icons/titlebar/close-w-20.png 2.25x, ../../assets/icons/titlebar/close-w-24.png 2.5x, ../../assets/icons/titlebar/close-w-30.png 3x, ../../assets/icons/titlebar/close-w-30.png 3.5x"
            draggable="false"
          />
        </div>
      </div>
    </header>
  );
};

export default Titlebar;

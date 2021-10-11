import React, { useState } from "react";
import "./app.css";
import Titlebar from "./components/Titlebar";

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Titlebar />
      <main className="content">
        <div>CONTENT</div>
      </main>
    </div>
  );
};

export default App;

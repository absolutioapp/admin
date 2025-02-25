import React, { useState } from "react";
import Auth from "./components/Box/Box.tsx";

const App = (): React.ReactElement => {
  const [test, setTest] = useState<string>("test");

  return (
    <>
      <h1 className="text-2xl bg-amber-700">Hello, {test}</h1>
        <Auth />
    </>
  );
};

export default App;

import React, { useState } from "react";

const App = (): React.ReactElement => {
  const [test, setTest] = useState<string>("test");

  return (
    <>
      <h1 className="text-2xl bg-amber-700">Hello, {test}</h1>
    </>
  );
};

export default App;

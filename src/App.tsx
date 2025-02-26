import React from "react";
import Auth from "./components/Box/Box.tsx";
import { useAppStore, Pages } from "./stores/app.store.ts";

const App = (): React.ReactElement => {

  const {page} = useAppStore();

  return (
    <>
      {page === Pages.Home && <Auth />}
    </>
  );
};

export default App;

import React from "react";
import Auth from "./components/Auth/Auth.tsx";
import { useAppStore, Pages } from "./stores/app.store.ts";
import EventWrapper from "./utils/EventWrapper/EventWrapper.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";

const App = (): React.ReactElement => {
  const { page } = useAppStore();

  return (
    <EventWrapper>
      <>
        {page === Pages.Home && <Auth />}
        {page === Pages.Dashboard && <Dashboard />}
      </>
    </EventWrapper>
  );
};

export default App;

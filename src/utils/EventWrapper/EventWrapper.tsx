import React, { useEffect } from "react";
import { useAppStore } from "../../stores/app.store";
import { useAuthStore } from "../../stores/auth.store";

interface EventWrapperInterface {
  children?: React.ReactNode;
}

const EventWrapper: React.FC<EventWrapperInterface> = ({ children }) => {
  const { setPage } = useAppStore();
  const { setUser } = useAuthStore();
  useEffect(() => {
    if (window) {
      if (window.localStorage.getItem("user")) {
        const user = JSON.parse(window.localStorage.getItem("user") || "{}");
        console.log("User from localStorage:", user);
        setUser(user);

        setPage(1);
      }
    }
  }, []);

  return <>{children}</>;
};

export default EventWrapper;

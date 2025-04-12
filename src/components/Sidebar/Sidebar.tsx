import { useState, memo, useMemo, useCallback } from "react";
import {
  Home,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Images,
  User,
} from "lucide-react";
import { useAuthStore } from "../../stores/auth.store";
import useDashboardStore from "../../stores/dashboard.store";

// Memoized menu item component
const MenuItem = ({ icon, label, expanded, active, click }: any) => (
  <div
    onClick={click}
    className={`text-text-100 details-content:hover:bg-primary-90 flex cursor-pointer items-center gap-4 px-4 py-2 duration-75 hover:scale-105`}
  >
    <div>{icon}</div>
    <div
      className={`${expanded ? "" : "opacity-0"} transition-all duration-100 ${active ? "font-bold" : ""}`}
    >
      {label}
    </div>
  </div>
);

MenuItem.displayName = "MenuItem";

// Move menuItems outside component or use useMemo
const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const { user, clearStore } = useAuthStore();

  // Memoize menu items so icons don't re-render
  const menuItems = useMemo(
    () => [
      { icon: <Home size={24} />, label: "Dashboard" },
      { icon: <User size={24} />, label: "User" },
      { icon: <Images size={24} />, label: "Images Editor" },

      { icon: <Settings size={24} />, label: "Settings" },
    ],
    [],
  );

  const { currentChapter, setCurrentChapter } = useDashboardStore();

  // Memoize logout function
  const logout = useCallback(() => {
    if (window) {
      window.localStorage.clear();
      clearStore();
      window.location.reload();
    }
  }, []);

  const name = "Admin"; // Replace with actual user name

  // Memoize toggle function
  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <div
      className={`bg-opacity-50 fixed inset-0 ${expanded ? "w-64" : "w-20"} overflow-hidden transition-all duration-300`}
    >
      <div
        className={`border-primary-90 flex h-screen flex-col justify-between border-r-2 bg-white text-white shadow-xl`}
      >
        {/* Top: Logo */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2 text-xl font-bold">
            <img
              src="/assets/images/logos/LOGO_WITHOUT_BG_WITHOUT_TEXT.svg"
              className="w-15 duration-300"
            />
            {expanded && (
              <span className="text-primary-90 ml-2 font-bold">Absolutio</span>
            )}
          </div>
          {/* <button
            className="text-zinc-400 hover:text-white"
            onClick={toggleExpanded}
          >
            {expanded ? (
              <ChevronLeft size={24} color="rgba(51, 51, 51, 1)" />
            ) : (
              <ChevronRight size={24} color="rgba(51, 51, 51, 1)" />
            )}
          </button> */}
        </div>

        {/* Middle: Navigation */}
        <nav className="">
          {menuItems.map((item, index) => (
            <MenuItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={index === currentChapter}
              expanded={expanded}
              click={() => {
                setCurrentChapter(index);
              }}
            />
          ))}
        </nav>

        {/* Bottom: Account */}
        <div className="pb-4 pl-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-zinc-700"></div>
            {expanded && (
              <div className="flex w-[70%] justify-between">
                <div className="flex flex-col">
                  <span className="text-text-100 text-sm font-medium">
                    {name}
                  </span>
                  <span className="text-text-100 flex items-center justify-center gap-2 text-xs">
                    {user.email}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  <LogOut size={14} className="pointer" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);

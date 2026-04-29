import homeWhite from "../../assets/icons/home-white.svg";
import home from "../../assets/icons/home.svg";
import dashboardWhite from "../../assets/icons/dashboard-white.svg";
import dashboard from "../../assets/icons/dashboard.svg";
import billWhite from "../../assets/icons/bill-white.svg";
import bill from "../../assets/icons/bill.svg";
import logoutWhite from "../../assets/icons/logout-white.svg";
import logout from "../../assets/icons/logout.svg";
import menuWhite from "../../assets/icons/menu-white.svg";
import menu from "../../assets/icons/menu.svg";
import usersWhite from "../../assets/icons/users-white.svg";
import users from "../../assets/icons/users.svg";

import { NavLink } from "react-router-dom";

export function Navbar({ role }) {
  return (
    <div className="sticky top-0 h-screen md:col-span-1 flex flex-col items-center py-10 print:hidden md:block hidden">
      <nav className="max-w-25 flex flex-col justify-between h-full">
        <div className="space-y-2">
          {role === "kasir" && (
            <>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "bg-pink-700 py-3 px-2 flex flex-col items-center rounded-2xl cursor-pointer text-white"
                    : "py-3 px-2 flex flex-col items-center rounded-2xl cursor-pointer text-gray-600"
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? homeWhite : home}
                      alt="home"
                      className="max-w-8"
                    />
                    <h2 className="font-medium">Home</h2>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "bg-pink-700 py-3 px-2 flex flex-col items-center rounded-2xl cursor-pointer text-white"
                    : "py-3 px-2 flex flex-col items-center rounded-2xl cursor-pointer text-gray-600"
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? dashboardWhite : dashboard}
                      alt="dashboard"
                      className="max-w-8"
                    />
                    <h2 className="font-medium">Dashboard</h2>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/bill"
                className={({ isActive }) =>
                  isActive
                    ? "bg-pink-700 py-3 px-2 flex flex-col items-center rounded-2xl cursor-pointer text-white"
                    : "py-3 px-2 flex flex-col items-center rounded-2xl cursor-pointer text-gray-600"
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? billWhite : bill}
                      alt="bill"
                      className="max-w-8"
                    />
                    <h2 className="font-medium">Bill</h2>
                  </>
                )}
              </NavLink>
            </>
          )}

          {/* level Oprator */}
          {role === "oprator" && (
            <>
              <NavLink
                to="/monitoring"
                className={({ isActive }) =>
                  isActive
                    ? "bg-pink-700 py-3 px-2 flex flex-col items-center rounded-2xl cursor-pointer text-white"
                    : "py-3 px-2 flex flex-col items-center rounded-2xl cursor-pointer text-gray-600"
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? dashboardWhite : dashboard}
                      alt="monitoring"
                      className="max-w-8"
                    />
                    <h2 className="font-medium">Monitoring</h2>
                  </>
                )}
              </NavLink>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  isActive
                    ? "bg-pink-700 py-3 px-2 flex flex-col items-center rounded-2xl cursor-pointer text-white"
                    : "py-3 px-2 flex flex-col items-center rounded-2xl cursor-pointer text-gray-600"
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? menuWhite : menu}
                      alt="menu"
                      className="max-w-8"
                    />
                    <h2 className="font-medium">Menu</h2>
                  </>
                )}
              </NavLink>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive
                    ? "bg-pink-700 py-3 px-2 flex flex-col items-center rounded-2xl cursor-pointer text-white"
                    : "py-3 px-2 flex flex-col items-center rounded-2xl cursor-pointer text-gray-600"
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? usersWhite : users}
                      alt="users"
                      className="max-w-8"
                    />
                    <h2 className="font-medium">Users</h2>
                  </>
                )}
              </NavLink>
            </>
          )}
        </div>

        <NavLink
          to="/logout"
          className={({ isActive }) =>
            isActive
              ? "bg-pink-700 py-3 px-2 flex flex-col items-center rounded-2xl cursor-pointer text-white"
              : "py-3 px-2 flex flex-col items-center rounded-2xl cursor-pointer text-gray-600"
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? logoutWhite : logout}
                alt="logout"
                className="max-w-8"
              />
              <h2 className="font-medium">Logout</h2>
            </>
          )}
        </NavLink>
      </nav>
    </div>
  );
}

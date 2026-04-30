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
  // 1. Ekstraksi logika styling agar lebih bersih dan mudah dimaintain
  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "bg-pink-700 p-2 md:py-3 md:px-2 flex flex-col items-center justify-center rounded-xl md:rounded-2xl cursor-pointer text-white flex-1 md:flex-none min-w-[60px]"
      : "p-2 md:py-3 md:px-2 flex flex-col items-center justify-center rounded-xl md:rounded-2xl cursor-pointer text-gray-600 hover:bg-gray-100 flex-1 md:flex-none min-w-[60px]";

  return (
    // 2. Ubah struktur container:
    // Mobile -> Fixed Bottom Navigation
    // Desktop (md:) -> Sticky Sidebar
    <div className="fixed bottom-0 left-0 w-full bg-white z-50 border-t border-gray-200 print:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:shadow-none md:border-none md:bg-transparent md:sticky md:top-0 md:h-screen md:w-auto md:col-span-1 md:flex md:flex-col md:items-center md:py-10">
      {/* 3. Pengaturan Flexbox berubah berdasarkan ukuran layar */}
      <nav className="flex flex-row justify-around items-center w-full h-16 md:h-full md:flex-col md:justify-between md:max-w-25 px-2 md:px-0">
        {/* 4. Trik 'contents' di mobile agar NavLink di dalam div ini menjadi bagian dari flex-row element <nav> secara langsung */}
        <div className="contents md:flex md:flex-col md:space-y-2">
          {role === "kasir" && (
            <>
              <NavLink to="/" end className={navLinkClasses}>
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? homeWhite : home}
                      alt="home"
                      className="w-5 h-5 md:w-8 md:h-8"
                    />
                    <h2 className="text-[10px] md:text-base font-medium mt-1">
                      Home
                    </h2>
                  </>
                )}
              </NavLink>

              <NavLink to="/dashboard" className={navLinkClasses}>
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? dashboardWhite : dashboard}
                      alt="dashboard"
                      className="w-5 h-5 md:w-8 md:h-8"
                    />
                    <h2 className="text-[10px] md:text-base font-medium mt-1">
                      Dashboard
                    </h2>
                  </>
                )}
              </NavLink>

              <NavLink to="/bill" className={navLinkClasses}>
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? billWhite : bill}
                      alt="bill"
                      className="w-5 h-5 md:w-8 md:h-8"
                    />
                    <h2 className="text-[10px] md:text-base font-medium mt-1">
                      Bill
                    </h2>
                  </>
                )}
              </NavLink>
            </>
          )}

          {/* level Oprator */}
          {role === "oprator" && (
            <>
              <NavLink to="/monitoring" className={navLinkClasses}>
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? dashboardWhite : dashboard}
                      alt="monitoring"
                      className="w-5 h-5 md:w-8 md:h-8"
                    />
                    <h2 className="text-[10px] md:text-base font-medium mt-1">
                      Monitor
                    </h2>
                  </>
                )}
              </NavLink>
              <NavLink to="/menu" className={navLinkClasses}>
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? menuWhite : menu}
                      alt="menu"
                      className="w-5 h-5 md:w-8 md:h-8"
                    />
                    <h2 className="text-[10px] md:text-base font-medium mt-1">
                      Menu
                    </h2>
                  </>
                )}
              </NavLink>
              <NavLink to="/users" className={navLinkClasses}>
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? usersWhite : users}
                      alt="users"
                      className="w-5 h-5 md:w-8 md:h-8"
                    />
                    <h2 className="text-[10px] md:text-base font-medium mt-1">
                      Users
                    </h2>
                  </>
                )}
              </NavLink>
            </>
          )}
        </div>

        {/* Tombol Logout */}
        <NavLink to="/logout" className={navLinkClasses}>
          {({ isActive }) => (
            <>
              <img
                src={isActive ? logoutWhite : logout}
                alt="logout"
                className="w-5 h-5 md:w-8 md:h-8"
              />
              <h2 className="text-[10px] md:text-base font-medium mt-1">
                Logout
              </h2>
            </>
          )}
        </NavLink>
      </nav>
    </div>
  );
}

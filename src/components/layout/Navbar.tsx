import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const translateClass =
    i18n.language === "ar" ? "xl:-translate-x-5" : "xl:translate-x-5";
    const toggleLanguage = () => {
      const newLang = i18n.language === "en" ? "ar" : "en";
      i18n.changeLanguage(newLang);
      localStorage.setItem("language", newLang);
    };
  const navTextAlignClass = i18n.language === "ar" ? "xl:translate-x-20 xl:text-[14px]" : "";
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { path: "/", label: t("common.dashboard") },
    { path: "/patients", label: t("common.patients") },
    { path: "/treatments", label: t("common.treatments") },
    { path: "/history", label: t("common.history") },
    { path: "/specialized", label: t("common.specialized") },
    { path: "/appointments", label: t("common.appointments") },
  ];

  return (
    <nav className="bg-teal-700 shadow-md max-h-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-1 ms-auto flex items-center">
              <div className="flex justify-start ms-auto w-full">
                <h1 className="text-white font-bold text-lg transition-all duration-300 hover:scale-105">
                  {t("common.clinicName")}
                </h1>
              </div>
              <span className="text-teal-200 ml-2 text-xs  flex">
                {t("common.specialty")}
              </span>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden xl:flex xl:items-center justify-center  xl:space-x-0">
            {isAuthenticated && (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-[11.5px] font-medium transition-all duration-300 transform hover:scale-105 ${navTextAlignClass} ${
                      location.pathname === item.path
                        ? "bg-teal-800 text-white"
                        : "text-teal-100 hover:bg-teal-600 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="px-3 py-2 rounded-md text-sm font-medium text-teal-100 flex items-center">
                  <User size={16} className="mr-1" />
                  <span>{user?.name || ""}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-2 2xl:px-4 py-2 rounded-md text-sm font-medium text-teal-100 hover:bg-teal-600 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  {t("common.logout")}
                </button>
              </>
            )}

            <button
              onClick={toggleLanguage}
              className={`bg-teal-600 px-3 py-2 ${translateClass} rounded-md text-sm font-medium text-white hover:bg-teal-500 transition-all duration-300 transform hover:scale-105`}
            >
              {t("common.changeLanguage")}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-teal-100 hover:text-white hover:bg-teal-600 focus:outline-none transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`xl:hidden bg-teal-800 transform transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 translate-y-0 overflow-hidden"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {isAuthenticated && (
            <>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${navTextAlignClass} ${
                    location.pathname === item.path
                      ? "bg-teal-600 text-white"
                      : "text-teal-100 hover:bg-teal-700 hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="px-3 py-2 rounded-md text-base font-medium text-teal-100 flex items-center">
                <User size={16} className="mr-1" />
                <span>{user?.name || ""}</span>
              </div>

              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-md text-base font-medium text-teal-100 hover:bg-teal-700 hover:text-white transition-colors duration-200 flex items-center"
              >
                <LogOut size={16} className="mx-1" />
                {t("common.logout")}
              </button>
            </>
          )}

          <button
            onClick={() => {
              toggleLanguage();
              setIsMenuOpen(false);
            }}
            className={`text-left block px-3 py-2 ${translateClass} rounded-md text-base font-medium bg-teal-600 text-white hover:bg-teal-500 transition-colors duration-200`}
          >
            {t("common.changeLanguage")}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

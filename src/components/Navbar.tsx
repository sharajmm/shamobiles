import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Smartphone, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userData, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Buy", path: "/buy" },
    { name: "Contact", path: "/contact" },
  ];

  if (userData?.role === "admin") {
    navLinks.push({ name: "Admin", path: "/admin" });
  }

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Smartphone className="h-8 w-8 text-green-600" />
            <span className="font-bold text-xl text-gray-900">RepairPro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-700 hover:text-green-600"
                } py-2`}
              >
                {link.name}
              </Link>
            ))}

            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">
                  {userData?.name || currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </div>
            )}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-green-600"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-green-600 bg-green-50"
                      : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {currentUser ? (
                <div className="px-3 py-2 space-y-2">
                  <div className="text-gray-700 font-medium">
                    {userData?.name || currentUser.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export const openLogin = () => {
  window.location.href = "/login";
};
export default Navbar;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiContactsLine, RiBarChartHorizontalFill } from "react-icons/ri";

const Sidebar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-auto sm:w-64 my-3 border-r-2 px-4 py-8">
      <div className="space-y-4">
        <Link
          to="/contacts"
          className={`flex items-center justify-start p-2 rounded ${
            isMobile ? "pl-4" : ""
          } hover:bg-slate-600 hover:text-gray-300`}
        >
          <RiContactsLine size={20} className="mr-2" />
          <span className="mr-2 hidden md:block">Contacts</span>
        </Link>
        <Link
          to="/charts"
          className={`flex items-center justify-start p-2 rounded ${
            isMobile ? "pl-4" : ""
          } hover:bg-slate-600 hover:text-gray-300`}
        >
          <RiBarChartHorizontalFill size={20} className="mr-2" />
          <span className="mr-2 hidden md:block">Charts and Maps</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

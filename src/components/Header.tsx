import React from "react";

const Header: React.FC = () => {
  return (
    <header className=" mx-4 px-4 py-1 md:py-4 border-b-2">
      <div className="text-center">
        <h1 className="md:text-2xl font-semibold">
          CONTACTS MANAGEMENT DASHBOARD
        </h1>
      </div>
    </header>
  );
};

export default Header;

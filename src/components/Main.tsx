import React from "react";
import { Routes, Route } from "react-router-dom";
import Contacts from "./contacts/Contacts";
import Charts from "./chart/Charts";

const Main: React.FC = () => {
  return (
    <div className="flex-1 p-4">
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/charts" element={<Charts />} />
      </Routes>
    </div>
  );
};

export default Main;

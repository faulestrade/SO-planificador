import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import ProcessPlanner from "./components/ProcessPlanner/Logic/ProcessPlanner";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/planificador" element={<ProcessPlanner />} />
    </Routes>
  );
};

export default Router;

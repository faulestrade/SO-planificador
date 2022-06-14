import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./components/Home/Home";

const Router = () => {
  return (
    <Routes>
      <>
        {/* <Route path="/planificador" element={<Register />} /> */}
        <Route path="*" element={<Home />} />
      </>
      )
    </Routes>
  );
};

export default Router;

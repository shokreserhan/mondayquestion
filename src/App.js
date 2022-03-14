import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Play from "./components/play";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Play />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./SkinTheory/Navbar";
import Hero from "./SkinTheory/Hero";
import ProductSection from "./SkinTheory/ProductSection";
import TipSection from "./SkinTheory/TipsSection";
import SubmitTipSection from "./SkinTheory/SubmitTipSection";
import Login from "./SkinTheory/Login";
import Signup from "./SkinTheory/Signup";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/productsection" element={<ProductSection />} />
        <Route path="/tipsection" element={<TipSection />} />
        <Route path="/submittipsection" element={<SubmitTipSection />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

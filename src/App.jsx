import "./sass/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Contact from "pages/Contact";
import { LangProvider } from "utils/LangContext";
import ScrollToTop from "components/ScrollToTop";

function App() {
  return (
    <LangProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </LangProvider>
  );
}

export default App;

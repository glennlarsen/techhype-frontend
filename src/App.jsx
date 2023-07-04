import "./sass/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import { LangProvider } from "utils/LangContext";

function App() {
  return (
    <LangProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </LangProvider>
  );
}

export default App;

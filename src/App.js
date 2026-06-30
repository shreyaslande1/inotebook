import Navbar from "./components/Navbar";
import NoteState from "./Contexts/NoteState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert messagee = "this is amazing react course"/>
          <div className="container">
            <Routes>
              <Route exact path="/about" element={<About />} />
              <Route exact path="/" element={<Home />} />
            </Routes>
          </div>

        </Router>
      </NoteState>
    </>
  );
}

export default App;

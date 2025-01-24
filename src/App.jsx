import "./App.css";
import { useState, useRef } from "react";
import Header from "./Home/Header/Header";
import Main from "./Home/Main/Main";
import Footer from "./Home/Footer/Footer";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleButtonRef = useRef();
  return (
    <>
      <Header
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleButtonRef={toggleButtonRef}
      />
      <Main
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleButtonRef={toggleButtonRef}
      />
      <Footer />
    </>
  );
}

export default App;

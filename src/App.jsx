import "./App.css";
import { useState } from "react";
import Header from "./Home/Header/Header";
import Main from "./Home/Main/Main";
import Footer from "./Home/Footer/Footer";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <Main isOpen={isOpen} />
      <Footer />
    </>
  );
}

export default App;

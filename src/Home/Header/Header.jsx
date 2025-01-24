import "./Header.css";
import settings from "../../assets/settings.png";
import close from "../../assets/close.png";

const Header = ({ isOpen, setIsOpen }) => {
  return (
    <div className="header">
      <h1>TypeBlaster</h1>
      <div className="imgcontainer">
        {isOpen ? (
          <img src={close} alt="close" onClick={() => setIsOpen(false)}></img>
        ) : (
          <img
            src={settings}
            alt="settings"
            onClick={() => setIsOpen(true)}
          ></img>
        )}
      </div>
    </div>
  );
};

export default Header;

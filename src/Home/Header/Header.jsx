import "./Header.css";
import ThemeToggle from "../../components/ThemeToggle";
import settings from "../../assets/settings.png";
import close from "../../assets/close.png";

const Header = ({ isOpen, setIsOpen }) => {
  const { theme, setTheme } = ThemeToggle();
  return (
    <div className="header">
      <h1>TypeBlaster</h1>
      <div className="imgcontainer">
        {isOpen ? (
          <img
            src={close}
            alt="close"
            onClick={() => setIsOpen(false)}
            style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}
          ></img>
        ) : (
          <img
            src={settings}
            alt="settings"
            onClick={() => setIsOpen(true)}
            style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}
          ></img>
        )}
      </div>
    </div>
  );
};

export default Header;

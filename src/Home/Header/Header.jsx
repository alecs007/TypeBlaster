import "./Header.css";
import PropTypes from "prop-types";
import ThemeToggle from "../../components/ThemeToggle";
import settings from "../../assets/settings.png";
import close from "../../assets/close.png";

const Header = ({ isOpen, setIsOpen, toggleButtonRef, setOpenCategory }) => {
  const { theme } = ThemeToggle();
  return (
    <div className="header">
      <h1>TypeBlaster</h1>
      <div className="imgcontainer" ref={toggleButtonRef}>
        {isOpen ? (
          <img
            src={close}
            alt="close"
            onClick={() => {
              setIsOpen(!isOpen);
              setOpenCategory(null);
            }}
            className={theme === "dark" ? "invert" : ""}
          ></img>
        ) : (
          <img
            src={settings}
            alt="settings"
            onClick={() => setIsOpen(!isOpen)}
            className={theme === "dark" ? "invert" : ""}
          ></img>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  toggleButtonRef: PropTypes.object.isRequired,
  setOpenCategory: PropTypes.func.isRequired,
};

export default Header;

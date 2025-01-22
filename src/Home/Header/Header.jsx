import "./Header.css";
import settings from "../../assets/settings.png";

const Header = () => {
  return (
    <div className="header">
      <h1>TypeBlaster</h1>
      <img src={settings} alt="Settings" />
    </div>
  );
};

export default Header;

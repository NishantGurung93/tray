import { useRouteMatch } from "react-router-dom";
import './header.css';

const Header = () => {
  // Determining the current path of the application to decide which step the user is on
  const userPage = useRouteMatch("/details");
  const privacyPage = useRouteMatch("/privacy");
  const confirmationPage = useRouteMatch("/confirmation");

  return (
    <div className="header-wrapper">
      <div className={userPage ? 'active' : ''}> User</div>
      <div className={privacyPage ? 'active' : ''}> Privacy</div>
      <div className={confirmationPage ? 'active' : ''}> Done</div>
    </div>
  )
};

export default Header;

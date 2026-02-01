import { useLocation } from "react-router-dom";
import BackButton from "../BackButton";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideBackButton = location.pathname === "/";

  return (
    <div className="relative min-h-screen">
      {!hideBackButton && <BackButton />}
      {children}
    </div>
  );
};

export default Layout;

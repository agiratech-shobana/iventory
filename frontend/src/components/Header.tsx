// src/components/Header.tsx
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Header = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  return (
    <div className="header">
      <h2>Inventory App - {role?.toUpperCase()}</h2>
    </div>
  );
};

export default Header;

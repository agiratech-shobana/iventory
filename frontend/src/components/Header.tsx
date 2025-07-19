// src/components/Header.tsx
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Header = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  return (
    <div style={{ backgroundColor: "#222", color: "white", padding: "1rem" }}>
      <h2>Inventory App - {role?.toUpperCase()}</h2>
    </div>
  );
};

export default Header;

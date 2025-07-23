// src/components/Layout.tsx
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/style.css"
import "../App.css"; // Import your global styles

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div  className="body" style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <div style={{ padding: "1rem", flex: 1 }}>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

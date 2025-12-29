import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Contribuyentes from "./contribuyentes/Contribuyentes";
import Comprobantes from "./comprobantes/Comprobantes";
import Footer from  "./Footer";
import "./dashboard.css";

export default function Dashboard() {
  const [panel, setPanel] = useState("contribuyentes");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="dashboard">
      <Sidebar
        panel={panel}
        setPanel={setPanel}
        collapsed={sidebarCollapsed}
        toggleSidebar={() => setSidebarCollapsed(p => !p)}
      />

      <div className="main">
        <Topbar />

        <div className="content">
          {panel === "contribuyentes" && <Contribuyentes />}
          {panel === "comprobantes" && <Comprobantes />}
        </div>

        <Footer />
      </div>
    </div>
  );
}




import React, { useState } from "react";
import Header from "./menu/header"
import "../styles/menu.css"; 

import Body from "./menu/body";
import Info from "./info/info";
import Losses from "./losses/losses";
import Production from "./production/production";
import Table from "./table/table";
function Menu( { onLogout }) {
  const [activeTab, setActiveTab] = useState('body');
   const renderContent = () => {
    switch(activeTab) {
      case 'body': return <Body />;
      case 'production': return <Production />;
      case 'table': return <Table />;
      case 'losses': return <Losses />;
      case 'info': return <Info />;
      default: return <Body />;
    }
  };
return (
    <div className="bodycolor">
      <Header onLogout={onLogout} setActiveTab={setActiveTab} />
      <div className="content">
        {renderContent()}
      </div>
    </div>
    )
}
export default Menu;
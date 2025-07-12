import React from "react";
import FirstDiagramm from "./firstDiagramm"
import SecondDiagramm from "./secondDiagramm"
import ThirdDiagramm from "./thirdDiagramm"
import Depo from "./depo"
import "../../styles/body.css"; 
function Body() {
    return(
  <div className="container">
  <div className="bodyinfo">
  <FirstDiagramm/>
  <SecondDiagramm/>
  <ThirdDiagramm/>
  
  </div>
  <div className="bottom-item"><Depo/></div>
  </div>
    )
}
export default Body;
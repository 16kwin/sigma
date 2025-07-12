import "../../styles/thirdDiagramm.css";

function ThirdDiagramm() { 
  return (
    <div className="third-container">
      {/* Шапка с выравниванием по левому краю */}
      <div className="third-header">
        Загрузка производства
      </div>
      
      {/* Единственный основной блок */}
      <div className="third-main-block">
        Гистограмма
      </div>
    </div>
  );
}

export default ThirdDiagramm;
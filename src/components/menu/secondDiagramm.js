import "../../styles/secondDiagramm.css";

function SecondDiagramm() { 
  return (
    <div className="second-container">
      {/* Синяя шапка */}
      <div className="second-header">
        Производство
      </div>
      
      {/* 4 блока */}
      <div className="second-grid">
        <div className="second-cell cell-1">Диаграмма 1</div>
        <div className="second-cell cell-2">Диаграмма 2</div>
        <div className="second-cell cell-3">Диаграмма 3</div>
        <div className="second-cell cell-4">Диаграмма 4</div>
      </div>
    </div>
  );
}

export default SecondDiagramm;
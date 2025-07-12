import "../../styles/firstDiagramm.css";

function FirstDiagramm() { 
  return (
    <div className="firstdiagramm">
      {/* Синяя шапка */}
      <div className="diagram-header">
        Текущие показатели 
      </div>
      
      {/* Явно прописанные 6 блоков (3x2) */}
      <div className="blocks-wrapper">
        <div className="block block1">Диаграмма 1</div>
        <div className="block block2">Диаграмма 2</div>
        <div className="block block3">Диаграмма 3</div>
        <div className="block block4">Диаграмма 4</div>
        <div className="block block5">Диаграмма 5</div>
        <div className="block block6">Диаграмма 6</div>
      </div>
    </div>
  );
}

export default FirstDiagramm;
import React from "react";
import "../../styles/firstDiagramm.css";

function FirstDiagramm({ header }) {
  return (
    <div className="firstdiagramm">
      {/* Синяя шапка */}
      <div className="diagram-header">Текущие показатели</div>

      {/* Явно прописанные 6 блоков (3x2) */}
      <div className="blocks-wrapper">
        <div className="block block1"> Транзакций в работе <br/>
          {header ? header.totalTransactionsInWork : "Загрузка..."}
        </div>
        <div className="block block2"> Выработано производством <br/>
          {header
            ? `${header.totalOperationsWorkTimeSum} / ${header.planPppSum}`
            : "Загрузка..."} <br/>
            часов
        </div>
        <div className="block block3">Загрузка персонала <br/> (версия 2.0)</div>
        <div className="block block4">Время межоперационного ожидания<br/>{header.totalTimeBetweenOperationsHours}<br/>часов</div>
<div className="block block5">
  <div className="block5-header">Отклонение от плана</div> {/* Обернули заголовок */}
  <div className="block5-content"> {/* Контейнер для двух частей */}
    <span className="left-part">{header.planPppDiffPercentage}</span>
    <span className="right-part">{header.planPppDiff}<br/>часов</span> {/* Заметьте: ваш код передает {header.planPppDifft}, но ранее мы считали {header.planPppDiff}. Предполагаю, что это опечатка и должно быть {header.planPppDiff} */}
  </div>
</div>
        <div className="block block6">Количество отклонений <br/>{header.noOperationsCount}</div>
      </div>
    </div>
  );
}

export default FirstDiagramm;
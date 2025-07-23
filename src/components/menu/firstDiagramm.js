import React from "react";
import "../../styles/firstDiagramm.css";

function FirstDiagramm({ header }) {
  const isLoading = !header;

  // Функция для форматирования чисел (например, добавление пробелов)
  const formatNumber = (number) => {
    if (number === null || number === undefined) {
      return "Нет данных"; // Или другое сообщение
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="firstdiagramm">
      <div className="diagram-header">Текущие показатели</div>
      <div className="blocks-wrapper">
        {/* Блок 1 */}
        <div className="block block1">
          Транзакций в работе
          <br />
          <span>
            {isLoading ? "Загрузка..." : formatNumber(header.totalTransactionsInWork)}
          </span>
        </div>

<div className="block block2">
  Выработано производством
  <br />
  <span>
    {isLoading ? (
      "Загрузка..."
    ) : (
      <>
        <span
          style={{
            color:
              header.totalOperationsWorkTimeSum > header.planPppSum ? "red" : "inherit",
          }}
        >
          {formatNumber(header.totalOperationsWorkTimeSum)}
        </span>
        {" / "}
        {formatNumber(header.planPppSum)}
      </>
    )}
  </span>
  часов
</div>

        {/* Блок 3 */}
        <div className="block block3">
          Загрузка персонала
          <br />
          <span>(версия 2.0)</span>
        </div>

        {/* Блок 4 */}
        <div className="block block4">
          Время межоперационного ожидания
          <br />
          <span>
            {isLoading
              ? "Загрузка..."
              : formatNumber(header.totalTimeBetweenOperationsHours)}
          </span>
          часов
        </div>

        {/* Блок 5 */}
        <div className="block block5">
          <div className="block5-header">Отклонение от плана</div>
          <div className="block5-content">
            <span className="left-part">
              <span>
                {isLoading ? "Загрузка..." : header?.planPppDiffPercentage}%
              </span>
            </span>
            <span className="right-part">
              <span>{isLoading ? "Загрузка..." : header?.planPppDiff}</span>
              часов
            </span>
          </div>
        </div>

        {/* Блок 6 */}
        <div className="block block6">
          Количество отклонений
          <br />
          <span>
            {isLoading ? "Загрузка..." : formatNumber(header.noOperationsCount)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FirstDiagramm;
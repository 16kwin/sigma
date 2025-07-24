import React from "react";
import "../../styles/secondDiagramm.css";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function SecondDiagramm({ header }) {
  const isLoading = !header;

  const chartData = {
    labels: ["Просрочено", "Выполнение в срок"],
    datasets: [
      {
        data: [
          isLoading ? 0 : header.noOperationsCount,
          isLoading ? 0 : header.yesOperationsCount,
        ],
        backgroundColor: ["#F7464A", "#46BFBD"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              const total = context.chart.data.datasets[0].data.reduce(
                (a, b) => a + b,
                0
              );
              const percentage = ((context.raw / total) * 100).toFixed(1);
              label += `${context.parsed} (${percentage}%)`;
            }
            return label;
          },
        },
      },
    },
  };

  // Данные для второй диаграммы
  const chartData2 = {
    labels: [
      "Входной контроль",
      "Подключение",
      "Проверка механиком",
      "Проверка электронщиком",
      "Проверка механиком",
      "Выходной контроль",
      "Транспортное положение",
    ],
    datasets: [
      {
        data: [
          isLoading ? 0 : header.vhodControlExceededCount,
          isLoading ? 0 : header.electricExceededCount,
          isLoading ? 0 : header.mechanicExceededCount,
          isLoading ? 0 : header.electronExceededCount,
          isLoading ? 0 : header.techExceededCount,
          isLoading ? 0 : header.vihodControlExceededCount,
          isLoading ? 0 : header.transportExceededCount,
        ],
        backgroundColor: [
          "#F9766E",
          "#FF60CC",
          "#C87CFF",
          "#00A9FF",
          "#01BFC6",
          "#01BE67",
          "#CD9600",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options2 = {
    responsive: true,
    aspectRatio: 3, // <--- Важно: отключаем сохранение пропорций
    plugins: {
      legend: {
        display: false,
        position: "bottom", //  Пока оставим снизу
        labels: {
          font: {
            size: 7,
          },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              const total = context.chart.data.datasets[0].data.reduce(
                (a, b) => a + b,
                0
              );
              const percentage = ((context.raw / total) * 100).toFixed(1);
              label += `${context.parsed} (${percentage}%)`;
            }
            return label;
          },
        },
      },
    },
  };
  const chartData4 = {
    labels: ["Фонд рабочего времени", "Выработка"],
    datasets: [
      {
        data: [
          isLoading ? 0 : header.totalHoursMounth,
          isLoading ? 0 : header.totalWorkTimeHoursFromEmployees,
        ],
        backgroundColor: ["#63ff7dff", "#63e0ffff"], //  Другие цвета
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options4 = {
    responsive: true,
    aspectRatio: 4,
    plugins: {
      legend: {
        display: true,
        position: 'right', 
        labels: {
          font: {
                    size: 10, // Уменьшаем размер шрифта
                },
                boxWidth: 12,   // Ширина цветного квадратика
            }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              const total = context.chart.data.datasets[0].data.reduce(
                (a, b) => a + b,
                0
              );
              const percentage = ((context.raw / total) * 100).toFixed(1);
              label += `${context.parsed} (${percentage}%)`;
            }
            return label;
          },
        },
      },
    },
     layout: {
        padding: {
            right: 20,  // Увеличиваем отступ справа для легенды
        }
    }
  };
 const renderCustomLegend = (data, isLoading) => {
    if (isLoading) return null;

    return (
      <div className="custom-legend">
        <ul className="legend-list">
          {data.labels.map((label, index) => (
            <li key={index} className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
              ></span>
              <span className="legend-label">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <div className="second-container">
      <div className="second-header">Производство</div>
      <div className="second-grid">
        <div className="second-cell cell-1">
          ВЫПОЛНЕНИЕ В СРОК
          <div className="chart-wrapper">
            {isLoading ? (
              <div className="loading-placeholder">Загрузка диаграммы...</div>
            ) : (
              <Pie data={chartData} options={options} />
            )}
          </div>
        </div>

        {/* Остальные блоки, если нужны, пока остаются пустыми */}
        <div className="second-cell cell-2">
          ЭТАПЫ ПРОИЗВОДСТВА
          <div className="chart-wrapper">
          {isLoading ? (
            <div className="loading-placeholder">Загрузка диаграммы...</div>
          ) : (
            <Pie data={chartData2} options={options2} />
          )}</div>
          <div className="chart-wrapper">
           {renderCustomLegend(chartData2, isLoading)}</div>
        </div>
        <div className="second-cell cell-3">ЗАГРУЗКА ПЕРСОНАЛА<br/><br/>(ВЕРСИЯ 2.0)</div>
         <div className="second-cell cell-4">
          ВЫРАБОТКА ПЕРСОНАЛА
          <div className="chart-wrapper">
            {isLoading ? (
              <div className="loading-placeholder">Загрузка диаграммы...</div>
            ) : (
              <Pie data={chartData4} options={options4} />
            )}
          </div>
          </div>
      </div>
    </div>
  );
}

export default SecondDiagramm;
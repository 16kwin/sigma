import React from "react";
import "../../styles/secondDiagramm.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell} from "recharts";
import { Tooltip as RechartsTooltip } from 'recharts';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function SecondDiagramm({ header }) {
  const isLoading = !header;
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          position: 'absolute',
          right: '-120px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'white',
          padding: '10px',
          border: '1px solid #D4EFDF',
          borderRadius: '6px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          minWidth: '100px',
          transition: 'opacity 0.3s ease',
          zIndex: 100
        }}>
          <div style={{ 
            position: 'absolute',
            left: '-6px',
            top: '50%',
            width: '0',
            height: '0',
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderRight: '6px solid #D4EFDF',
            transform: 'translateY(-50%)'
          }}></div>
          <p style={{ 
            margin: 0, 
            color: '#5A5A5A',
            fontWeight: 'bold',
            fontSize: '12px'
          }}>{payload[0].payload.name}</p>
          <p style={{ 
            margin: '4px 0 0 0',
            color: '#7F7F7F',
            fontSize: '12px'
          }}>{`${payload[0].value} ч.`}</p>
        </div>
      );
    }
    return null;
  };

  // Кастомный тултип для 3-й диаграммы - с детализацией по профессиям
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isBusy = data.name === "Заняты";
      
      // Данные по специальностям
      const specializations = ["Механик", "Электронщик", "Технолог", "Электрик", "Комплектация"];
      
      return (
        <div style={{
          position: 'absolute',
          left: '100px',
          top: isBusy ? '40%' : '60%', // Разное позиционирование для двух тултипов
          transform: 'translateY(-50%)',
          background: 'white',
          padding: '8px',
          border: '1px solid #D4EFDF',
          borderRadius: '6px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          minWidth: '150px',
          transition: 'opacity 0.3s ease',
          zIndex: 100
        }}>
          <div style={{ 
            position: 'absolute',
            left: '-6px',
            top: '50%',
            width: '0',
            height: '0',
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderRight: '6px solid #D4EFDF',
            transform: 'translateY(-50%)'
          }}></div>
          <div>
            <p style={{ 
              margin: '0 0 6px 0', 
              color: '#5A5A5A',
              fontWeight: 'bold',
              fontSize: '12px'
            }}>
              {data.name}: {data.value} чел.
            </p>
            
            <div style={{ marginTop: '4px' }}>
              {specializations.map(spec => {
                if (header?.employeesBySpecialization && header?.busyEmployeesBySpecialization) {
                  const totalSpec = header.employeesBySpecialization[spec] || 0;
                  const busySpec = header.busyEmployeesBySpecialization[spec] || 0;
                  const freeSpec = totalSpec - busySpec;
                  
                  const value = isBusy ? busySpec : freeSpec;
                  
                  if (value > 0) {
                    return (
                      <div key={spec} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '3px'
                      }}>
                        <span style={{
                          color: '#7F7F7F',
                          fontSize: '11px',
                          flex: 1
                        }}>
                          {spec}:
                        </span>
                        <span style={{
                          color: isBusy ? '#FF6B6B' : '#4ECDC4',
                          fontSize: '11px',
                          fontWeight: '600',
                          marginLeft: '8px'
                        }}>
                          {value} чел.
                        </span>
                      </div>
                    );
                  }
                }
                return null;
              })}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // 1. Первая круговая диаграмма (Выполнение в срок операций)
  const chartData = {
    labels: ["Операции просрочены", "Операции, выполненные в срок"],
    datasets: [{
      data: [header?.noOperationsCount || 0, header?.yesOperationsCount || 0],
      backgroundColor: ["#FFB6B6", "#D4EFDF"],
      borderColor: "#ffffff",
      borderWidth: 2
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "bottom", align: "start"},
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? ((ctx.raw / total) * 100).toFixed(1) : 0;
            return `${ctx.label}: ${ctx.raw} (${percentage}%)`;
          }
        }
      }
    }
  };

  // 2. Вторая круговая диаграмма (Этапы производства)
  const chartData2 = {
    labels: [
      "Входной контроль", "Подключение", "Проверка механиком",
      "Проверка электронщиком", "Проверка технологом",
      "Выходной контроль", "Транспортное положение"
    ],
    datasets: [{
      data: [
        header?.vhodControlExceededCount || 0,
        header?.electricExceededCount || 0,
        header?.mechanicExceededCount || 0,
        header?.electronExceededCount || 0,
        header?.techExceededCount || 0,
        header?.vihodControlExceededCount || 0,
        header?.transportExceededCount || 0
      ],
      backgroundColor: ["#D4E6EF", "#FFD3D3", "#EFF7D4", "#FFD8B6", "#E8D4EF", "#D4EFE6", "#FFC4B8"],
      borderColor: "#ffffff",
      borderWidth: 2
    }]
  };

  const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? ((ctx.raw / total) * 100).toFixed(1) : 0;
            return `${ctx.label}: ${ctx.raw} (${percentage}%)`;
          }
        }
      }
    }
  };

  // 3. Третья круговая диаграмма (Загрузка персонала онлайн) - данные для кастомного тултипа
  const busyCount = header?.busyEmployees || 0;
  const freeCount = (header?.totalEmployees || 0) - busyCount;
  
  const pieData = [
    { name: "Заняты", value: busyCount, color: "#FF6B6B" },
    { name: "Свободны", value: freeCount, color: "#4ECDC4" }
  ];

  const chartData3 = {
    labels: ["Заняты", "Свободны"],
    datasets: [{
      data: [busyCount, freeCount],
      backgroundColor: ["#FF6B6B", "#4ECDC4"],
      borderColor: "#ffffff",
      borderWidth: 2
    }]
  };

  // Опции для третьей диаграммы - отключаем стандартные тултипы
  const options3 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false // Отключаем стандартные тултипы Chart.js
      }
    },
    // Добавляем отступы для увеличения диаграммы
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }
    }
  };

  // Состояния для отслеживания активных элементов в 3-й диаграмме
  const [activeBusyIndex, setActiveBusyIndex] = React.useState(null);
  const [activeFreeIndex, setActiveFreeIndex] = React.useState(null);

  // Данные для гистограммы (Выработка персонала за месяц)
  const barData = [
    { name: "Фонд рабочего времени", value: header?.totalHoursMounth || 0 },
    { name: "Выработка", value: header?.totalWorkTimeHoursFromEmployees || 0 }
  ];

  // Кастомная легенда для второй диаграммы
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
        
        {/* 1. Первая диаграмма: Выполнение в срок операций */}
        <div className="second-cell cell-1">
          ВЫПОЛНЕНИЕ В СРОК ОПЕРАЦИЙ ПО ТРАНЗАКЦИЯМ В РАБОТЕ
          <div className="chart-wrapper">
            {isLoading ? (
              <div className="loading-placeholder">Загрузка...</div>
            ) : (
              <Pie data={chartData} options={options} />
            )}
          </div>
        </div>

        {/* 2. Вторая диаграмма: Этапы производства */}
        <div className="second-cell cell-2">
          ЭТАПЫ ПРОИЗВОДСТВА ПО ТРАНЗАКЦИЯМ В РАБОТЕ
          <div className="chart-wrapper">
            {isLoading ? (
              <div className="loading-placeholder">Загрузка...</div>
            ) : (
              <Pie data={chartData2} options={options2} />
            )}
          </div>
          <div className="chart-wrapper">
            {renderCustomLegend(chartData2, isLoading)}
          </div>
        </div>

        {/* 3. Третья диаграмма: Загрузка персонала онлайн */}
        <div className="second-cell cell-3">
          ЗАГРУЗКА ПЕРСОНАЛА ОНЛАЙН
          <div className="chart-wrapper" style={{ 
            height: '110px',
            minWidth: '300px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            gap: '15px'
          }}>
            {isLoading ? (
              <div className="loading-placeholder">Загрузка...</div>
            ) : (
              <>
                {/* Диаграмма слева с обработчиками событий */}
                <div style={{ 
                  width: '60%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative'
                }}>
                  <div 
                    style={{ 
                      height: '100px',
                      width: '100px',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                  >
                    <Pie 
                      data={chartData3} 
                      options={options3}
                    />
                    
                    {/* Тултип для "Заняты" */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '50%',
                        height: '100%',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={() => setActiveBusyIndex(0)}
                      onMouseLeave={() => setActiveBusyIndex(null)}
                    >
                      <CustomPieTooltip 
                        active={activeBusyIndex !== null}
                        payload={activeBusyIndex !== null ? [{ payload: pieData[0] }] : []}
                      />
                    </div>
                    
                    {/* Тултип для "Свободны" */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '50%',
                        height: '100%',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={() => setActiveFreeIndex(1)}
                      onMouseLeave={() => setActiveFreeIndex(null)}
                    >
                      <CustomPieTooltip 
                        active={activeFreeIndex !== null}
                        payload={activeFreeIndex !== null ? [{ payload: pieData[1] }] : []}
                      />
                    </div>
                  </div>
                </div>

                {/* Легенда справа */}
                <div className="custom-legend" style={{
                  paddingLeft: '15px',
                  borderLeft: '1px solid #eee',
                  fontSize: '13px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  width: '40%'
                }}>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      minWidth: '100%',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={() => setActiveBusyIndex(0)}
                    onMouseLeave={() => setActiveBusyIndex(null)}
                  >
                    <div style={{
                      flexShrink: 0,
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#FF6B6B',
                      marginRight: '10px',
                      borderRadius: '3px'
                    }} />
                    <span style={{ 
                      whiteSpace: 'nowrap',
                      fontSize: '13px'
                    }}>
                      Заняты: {busyCount} чел.
                    </span>
                  </div>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      minWidth: '100%',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={() => setActiveFreeIndex(1)}
                    onMouseLeave={() => setActiveFreeIndex(null)}
                  >
                    <div style={{
                      flexShrink: 0,
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#4ECDC4',
                      marginRight: '10px',
                      borderRadius: '3px'
                    }} />
                    <span style={{ 
                      whiteSpace: 'nowrap',
                      fontSize: '13px'
                    }}>
                      Свободны: {freeCount} чел.
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: '100%',
                    marginTop: '8px',
                    paddingTop: '8px',
                    borderTop: '1px solid #eee'
                  }}>
                    <div style={{
                      flexShrink: 0,
                      width: '16px',
                      height: '16px',
                      backgroundColor: 'transparent',
                      marginRight: '10px',
                    }} />
                    <span style={{ 
                      whiteSpace: 'nowrap',
                      fontWeight: 'bold',
                      fontSize: '13px'
                    }}>
                      Всего: {header?.totalEmployees || 0} чел.
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 4. Гистограмма: Выработка персонала за месяц */}
        <div className="second-cell cell-4">
          ВЫРАБОТКА ПЕРСОНАЛА ЗА МЕСЯЦ
          <div className="chart-wrapper" style={{ 
            height: '85px', 
            minWidth: '250px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            gap: '10px'
          }}>
            {isLoading ? (
              <div className="loading-placeholder">Загрузка...</div>
            ) : (
              <>
                {/* Основной график с тултипом */}
                <ResponsiveContainer width="60%" height="100%">
                  <BarChart
                    data={[
                      { name: "Фонд рабочего времени", value: header?.totalHoursMounth || 0 },
                      { name: "Выработка", value: header?.totalWorkTimeHoursFromEmployees || 0 }
                    ]}
                    margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
                  >
                    <XAxis 
                      dataKey="name" 
                      tick={false}
                      axisLine={false}
                    />
                    {/* Компонент Tooltip */}
                    <RechartsTooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                    />
                    <Bar 
                      dataKey="value" 
                      barSize={20}
                    >
                      <Cell fill="#D4EFDF" />
                      <Cell fill="#D4E6EF" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>

                {/* Легенда */}
                <div className="custom-legend" style={{
                  paddingLeft: '10px',
                  borderLeft: '1px solid #eee',
                  fontSize: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: '100%'
                  }}>
                    <div style={{
                      flexShrink: 0,
                      width: '14px',
                      height: '14px',
                      backgroundColor: '#D4EFDF',
                      marginRight: '8px',
                      borderRadius: '2px'
                    }} />
                    <span style={{ whiteSpace: 'nowrap' }}>Фонд рабочего времени</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: '100%'
                  }}>
                    <div style={{
                      flexShrink: 0,
                      width: '14px',
                      height: '14px',
                      backgroundColor: '#D4E6EF',
                      marginRight: '8px',
                      borderRadius: '2px'
                    }} />
                    <span style={{ whiteSpace: 'nowrap' }}>Выработка</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondDiagramm;
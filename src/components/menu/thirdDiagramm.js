import React, { useState, useEffect } from 'react';
import "../../styles/thirdDiagramm.css";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const getSeasonColor = (month) => {
  const monthNumber = parseInt(month.substring(5, 7), 10);
  switch (monthNumber) {
    case 12:
    case 1:
    case 2:
      return '#EAF2F8';
    case 3:
    case 4:
    case 5:
      return '#D4EFDF';
    case 6:
    case 7:
    case 8:
      return '#FCF3CF';
    case 9:
    case 10:
    case 11:
      return '#F5B7B1';
    default:
      return '#D4AC0D';
  }
};

const getMonthName = (month) => {
  const monthNumber = parseInt(month.substring(5, 7), 10);
  const monthNamesShort = ["Янв", "Фев", "Март", "Апр", "Май", "Июнь",
    "Июль", "Авг", "Сент", "Окт", "Ноя", "Дек"
  ];
  return monthNamesShort[monthNumber - 1] || '';
};

const getFullMonthName = (month) => {
  const monthNumber = parseInt(month.substring(5, 7), 10);
  const monthNamesFull = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];
  return monthNamesFull[monthNumber - 1] || '';
};

function ThirdDiagramm({ months }) {
  const [diagramType, setDiagramType] = useState('month'); // 'month' или 'year'
  const [data, setData] = useState([]);

  const aggregateByMonth = (months) => {
    const monthlyData = {};
    for (let i = 1; i <= 12; i++) {
      const month = i.toString().padStart(2, '0');
      monthlyData[`2025-${month}`] = 0;
    }

    months.forEach(item => {
      if (item.month.startsWith('2025')) {
        monthlyData[item.month] = item.transactionCount;
      }
    });

    return Object.entries(monthlyData).map(([month, transactionCount]) => {
      const monthName = getMonthName(month);
      const color = getSeasonColor(month);
      const fullMonthName = getFullMonthName(month); // Получаем полное имя месяца
      return {
        month: monthName,
        transactionCount,
        color,
        fullMonth: fullMonthName, // Добавляем полное имя месяца в данные
      };
    });
  };

  const aggregateByYear = (months) => {
    const yearlyData = {
      '2023': 0,
      '2024': 0,
      '2025': 0,
    };

    months.forEach(item => {
      const year = item.month.substring(0, 4);
      if (yearlyData.hasOwnProperty(year)) {
        yearlyData[year] += item.transactionCount;
      }
    });

    return Object.entries(yearlyData).map(([year, transactionCount]) => ({
      year,
      transactionCount,
      color: '#8884d8',
    }));
  };

  useEffect(() => {
    if (diagramType === 'month') {
      setData(aggregateByMonth(months));
    } else {
      setData(aggregateByYear(months));
    }
  }, [diagramType, months]);

  return (
    <div className="third-container">
      <div className="third-header">
        Загрузка производства
      </div>

      <div className="volume-and-buttons">
        <div className="volume-text">ОБЪЕМ ТРАНЗАКЦИЙ</div>
        <div className="diagram-buttons">
          <button onClick={() => setDiagramType('month')}>Месяц</button>
          <button onClick={() => setDiagramType('year')}>Год</button>
        </div>
      </div>

      <div className="third-main-block">
<BarChart width={600} height={200} data={data}>
  <XAxis dataKey={diagramType === 'month' ? "month" : "year"} interval={0} />
  <Tooltip 
    formatter={(value) => [`${value}`, 'Закрытых транзакций ']} 
    labelFormatter={(label) => {
      if (diagramType === 'month') {
        const monthData = data.find(item => item.month === label);
        return monthData?.fullMonth || label;
      } else {
        return label;
      }
    }}
  />
  <Bar dataKey="transactionCount">
    {data.map((item, index) => (
      <Cell key={`cell-${index}`} fill={item.color} />
    ))}
  </Bar>
</BarChart>
      </div>
    </div>
  );
}

export default ThirdDiagramm;
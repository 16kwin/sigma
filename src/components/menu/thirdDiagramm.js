import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList, Legend, Cell, ResponsiveContainer } from 'recharts';
import "../../styles/thirdDiagramm.css";

const getSeasonColor = (month) => {
  const monthNumber = parseInt(month.substring(5, 7), 10);
  switch (monthNumber) {
    case 12: case 1: case 2: return '#EAF2F8';
    case 3: case 4: case 5: return '#D4EFDF';
    case 6: case 7: case 8: return '#FCF3CF';
    case 9: case 10: case 11: return '#F5B7B1';
    default: return '#D4AC0D';
  }
};

const getMonthName = (month) => {
  const monthNamesShort = ["Янв", "Фев", "Мар", "Апр", "Май", "Июнь", 
                         "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек"];
  return monthNamesShort[parseInt(month.substring(5, 7), 10) - 1] || '';
};

const getFullMonthName = (month) => {
  const monthNamesFull = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                         "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  return monthNamesFull[parseInt(month.substring(5, 7), 10) - 1] || '';
};

const getCurrentMonthKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p style={{ fontWeight: 'bold' }}>{payload[0].payload.name}</p>
        <p>Транзакций: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

function ThirdDiagramm({ months }) {
  const [diagramType, setDiagramType] = useState('month');
  const [selectedKey, setSelectedKey] = useState(null);
  const [data, setData] = useState([]);

  const aggregateByMonth = (months) => {
    const monthlyData = {};
    for (let i = 1; i <= 12; i++) {
      const month = i.toString().padStart(2, '0');
      monthlyData[`2025-${month}`] = { 
        transactionCount: 0,
        onTimeCount: 0,
        delayedCount: 0
      };
    }

    months.forEach(item => {
      if (item.month.startsWith('2025')) {
        monthlyData[item.month] = {
          transactionCount: item.transactionCount,
          onTimeCount: item.onTimeCount,
          delayedCount: item.delayedCount
        };
      }
    });

    return Object.entries(monthlyData).map(([month, data]) => ({
      monthKey: month,
      month: getMonthName(month),
      fullMonth: getFullMonthName(month),
      ...data,
      color: getSeasonColor(month)
    }));
  };

  const aggregateByYear = (months) => {
    const yearlyData = {
      '2025': { transactionCount: 0, onTimeCount: 0, delayedCount: 0 },
      '2024': { transactionCount: 0, onTimeCount: 0, delayedCount: 0 },
      '2023': { transactionCount: 0, onTimeCount: 0, delayedCount: 0 }
    };

    months.forEach(item => {
      const year = item.month.substring(0, 4);
      if (yearlyData[year]) {
        yearlyData[year].transactionCount += item.transactionCount;
        yearlyData[year].onTimeCount += item.onTimeCount;
        yearlyData[year].delayedCount += item.delayedCount;
      }
    });

    return Object.entries(yearlyData).map(([year, data]) => ({
      year,
      ...data,
      color: '#E6E6FA'
    }));
  };

  const handleBarClick = (data) => {
    const payload = data?.activePayload?.[0]?.payload;
    if (!payload) return;

    const key = diagramType === 'month' ? payload.monthKey : payload.year;
    setSelectedKey(key);
  };

  const performanceData = useMemo(() => {
    let targetData;
    
    if (selectedKey) {
      targetData = data.find(item => 
        diagramType === 'month' 
          ? item.monthKey === selectedKey 
          : item.year === selectedKey
      );
    }
    
    if (!targetData) {
      targetData = diagramType === 'month'
        ? data.find(item => item.monthKey === getCurrentMonthKey())
        : data[0];
    }

    return [
      { name: 'Закрыто в срок', value: targetData?.onTimeCount || 0, color: '#D4EFDF' },
      { name: 'Закрыто не в срок', value: targetData?.delayedCount || 0, color: '#FFB6B6' }
    ];
  }, [selectedKey, data, diagramType]);

  const bottomChartLabel = useMemo(() => {
    if (selectedKey) {
      return diagramType === 'month'
        ? `Закрытие транзакций за: ${getFullMonthName(selectedKey)}`
        : `Закрытие транзакций за: ${selectedKey} год`;
    }
    return diagramType === 'month'
      ? `Закрытие транзакций за: ${getFullMonthName(getCurrentMonthKey())}`
      : `Закрытие транзакций за: ${data[0]?.year || '2025'} год`;
  }, [selectedKey, diagramType, data]);

  useEffect(() => {
    const newData = diagramType === 'month' 
      ? aggregateByMonth(months) 
      : aggregateByYear(months);
    setData(newData);
    
    const defaultKey = diagramType === 'month' 
      ? getCurrentMonthKey() 
      : '2025';
    setSelectedKey(defaultKey);
  }, [diagramType, months]);

  return (
    <div className="third-container">
      <div className="third-header">
        Загрузка производства
      </div>

      <div className="volume-and-buttons">
        <div className="volume-text">ОБЪЕМ ТРАНЗАКЦИЙ</div>
        <div className="diagram-buttons">
          <div 
            className={`toggle-option ${diagramType === 'month' ? 'active' : ''}`}
            onClick={() => setDiagramType('month')}
          >
            <span className="toggle-circle"></span>
            <span>Месяц</span>
          </div>
          <div 
            className={`toggle-option ${diagramType === 'year' ? 'active' : ''}`}
            onClick={() => setDiagramType('year')}
          >
            <span className="toggle-circle"></span>
            <span>Год</span>
          </div>
        </div>
      </div>

      <div className="third-main-block">
        <div className="main-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data}
              onClick={handleBarClick}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <XAxis 
                dataKey={diagramType === 'month' ? "month" : "year"} 
                tick={{ fontSize: 12 }}
                interval={0}
              />
              <Tooltip 
                formatter={(value) => [`${value}`, 'Транзакций']}
                labelFormatter={(label) => diagramType === 'month' 
                  ? data.find(d => d.month === label)?.fullMonth || label
                  : `${label} год`
                }
              />
              <Bar 
                dataKey="transactionCount"
                barCategoryGap="15%"
                onClick={handleBarClick}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bottom-block">
          <div className="bottom-chart-label">
            {bottomChartLabel}
          </div>

          <div className="performance-chart-container">
            <div className="performance-chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  layout="vertical"
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <YAxis type="category" dataKey="name" hide />
                  <XAxis type="number" hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" barSize={20}>
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList 
                      dataKey="value" 
                      position="insideRight"
                      fill="#000"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="performance-legend3">
              <div className="legend-item3">
                <div className="legend-color3" style={{ background: '#D4EFDF' }} />
                <span>Транзакции в срок ({performanceData[0].value})</span>
              </div>
              <div className="legend-item3">
                <div className="legend-color3" style={{ background: '#FFB6B6' }} />
                <span>Транзакции с задержкой ({performanceData[1].value})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThirdDiagramm;
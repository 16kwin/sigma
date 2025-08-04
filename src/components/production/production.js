// src/components/Production.js
import React, { useState, useEffect, useMemo } from 'react';
import ProductionFilter from './productionFilter';
import './productionFilter.css';
import './production.css';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Production = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedPercentage, setSelectedPercentage] = useState(80);
  const [showOnlyActive, setShowOnlyActive] = useState(false);

  // Тексты для тултипов
  const TOOLTIPS = {
    onTimeRatio: "Количество этапов выполненных в срок/ количество выполненных этапов",
    normCompletion: "(Нормативное время работы/Фактическое время работы)*100",
    productivity: "(Фактическое время работы/Фонд рабочего времени)*100"
  };

  const handleFilterChange = (newFilterParams) => {
    setSelectedYear(newFilterParams.year);
    setSelectedMonth(newFilterParams.month);
    setSelectedPercentage(newFilterParams.percentage);
    setShowOnlyActive(newFilterParams.showOnlyActive || false);
  };

  const filterParams = useMemo(() => ({
    year: selectedYear,
    month: selectedMonth,
  }), [selectedYear, selectedMonth]);

  const filteredData = useMemo(() => {
    if (!data) return null;
    return showOnlyActive 
      ? data.filter(employee => employee.transactionCount > 0) 
      : data;
  }, [data, showOnlyActive]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      let apiUrl = 'http://194.87.56.253:8081/api/analis/employees';

      if (filterParams.year && filterParams.month) {
        const formattedMonth = filterParams.month < 10 ? `0${filterParams.month}` : `${filterParams.month}`;
        apiUrl += `?month=${filterParams.year}-${formattedMonth}`;
      }

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filterParams]);

  const getPercentageCellStyle = (percentageValue, comparisonValue) => {
    if (percentageValue === "Нет данных") {
      return { backgroundColor: 'lightyellow' };
    }

    try {
      const numericValue = parseFloat(percentageValue.toString().replace(',', '.').replace('%', ''));

      if (isNaN(numericValue)) {
        return { backgroundColor: 'white' };
      }

      if (numericValue >= comparisonValue) {
        return { backgroundColor: '#D4EFDF' };
      } else {
        return { backgroundColor: '#FFB6B6' };
      }
    } catch (e) {
      console.error("Error parsing percentage:", percentageValue, e);
      return { backgroundColor: 'white' };
    }
  };

  return (
    <div>
      <ProductionFilter onFilterChange={handleFilterChange} />

      <div className="table-container2">
        {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
        {loading && <p>Загрузка данных...</p>}

        <table className="table-format2">
          <thead>
            <tr>
              <th className='colonkahead head2' data-tooltip-id="employee-tooltip">Сотрудник</th>
              <th className='colonkahead head2' data-tooltip-id="specialization-tooltip">Специализация</th>
              <th className='colonkahead head2' data-tooltip-id="completedStages-tooltip">Кол-во выполненных этапов</th>
              <th className='colonkahead head2' data-tooltip-id="onTimeStages-tooltip">Кол-во этапов, <br/>выполненных в срок</th>
              <th className='colonkahead head2' data-tooltip-id="onTimeRatio-tooltip">Доля этапов, <br/>выполненных в срок</th>
              <th className='colonkahead head2' data-tooltip-id="normTime-tooltip">Нормативное время работы, час</th>
              <th className='colonkahead head2' data-tooltip-id="actualTime-tooltip">Фактическое время работы, час</th>
              <th className='colonkahead head2' data-tooltip-id="normCompletion-tooltip">Коэффициент выполнености норм, %</th>
              <th className='colonkahead head2' data-tooltip-id="workTimeFund-tooltip">Фонд рабочего времени, час</th>
              <th className='colonkahead head2' data-tooltip-id="productivity-tooltip">Выработка сотрудника, %</th>
            </tr>
          </thead>

          <Tooltip id="employee-tooltip" place="bottom" content={TOOLTIPS.employee} />
          <Tooltip id="specialization-tooltip" place="bottom" content={TOOLTIPS.specialization} />
          <Tooltip id="completedStages-tooltip" place="bottom" content={TOOLTIPS.completedStages} />
          <Tooltip id="onTimeStages-tooltip" place="bottom" content={TOOLTIPS.onTimeStages} />
          <Tooltip id="onTimeRatio-tooltip" place="bottom" content={TOOLTIPS.onTimeRatio} />
          <Tooltip id="normTime-tooltip" place="bottom" content={TOOLTIPS.normTime} />
          <Tooltip id="actualTime-tooltip" place="bottom" content={TOOLTIPS.actualTime} />
          <Tooltip id="normCompletion-tooltip" place="bottom" content={TOOLTIPS.normCompletion} />
          <Tooltip id="productivity-tooltip" place="bottom-start" content={TOOLTIPS.productivity} />

          <tbody>
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((employee, index) => (
                <tr key={employee.employeeName || index}>
                  <td className='colonka2'>{employee.employeeName}</td>
                  <td className='colonka2'>{employee.employeeSpecialization}</td>
                  <td className='colonka2'>{employee.transactionCount}</td>
                  <td className='colonka2'>{employee.exceededTimeCount}</td>
                  <td
                    className='colonka2'
                    style={{
                      backgroundColor:
                        employee.exceededOrNoOperations === "Нет операций"
                          ? 'lightyellow'
                          : (() => {
                              const parsedValue = parseFloat(employee.exceededOrNoOperations.replace(',', '.'));
                              if (isNaN(parsedValue)) return 'white';
                              if (parsedValue < 1) return '#FFB6B6';
                              if (parsedValue === 1) return '#D4EFDF';
                              return 'white';
                            })()
                    }}
                  >
                    {employee.exceededOrNoOperations}
                  </td>
                  <td className='colonka2'>{employee.totalNormTime}:00:00</td>
                  <td className='colonka2'>{employee.totalWorkTime}</td>
                  <td
                    className='colonka2'
                    style={getPercentageCellStyle(employee.workTimePercentage, selectedPercentage)}
                  >
                    {employee.workTimePercentage}
                  </td>
                  <td className='colonka2'>{employee.hoursMounth}</td>
                  <td
                    className='colonka2'
                    style={getPercentageCellStyle(employee.hoursMounthPercentage, selectedPercentage)}
                  >
                    {employee.hoursMounthPercentage}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
              </tr>
            )}
          </tbody>
        </table>

        {!loading && !error && !data && <p>Выберите год и месяц для отображения данных.</p>}
      </div>
    </div>
  );
};

export default Production;
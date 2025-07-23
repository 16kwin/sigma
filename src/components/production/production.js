// src/components/Production.js
import React, { useState, useEffect, useMemo } from 'react';
import ProductionFilter from './productionFilter';
// Импортируем CSS для фильтра
import './productionFilter.css';
// Импортируем ваш новый CSS для таблицы
import './production.css'; // Предполагаем, что вы сохранили CSS в Production.css

const Production = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
   const [selectedPercentage, setSelectedPercentage] = useState(80);

  const handleFilterChange = (newFilterParams) => {
    setSelectedYear(newFilterParams.year);
    setSelectedMonth(newFilterParams.month);
    setSelectedPercentage(newFilterParams.percentage);
  };

  const filterParams = useMemo(() => ({
    year: selectedYear,
    month: selectedMonth,
  }), [selectedYear, selectedMonth]);

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
    // Проверяем, если значение "Нет данных"
    if (percentageValue === "Нет данных") {
      return { backgroundColor: 'lightyellow' }; // Или другой цвет, если нужно
    }

    try {
      // Парсим значение: заменяем запятую на точку, удаляем '%'
      const numericValue = parseFloat(percentageValue.toString().replace(',', '.').replace('%', ''));

      // Проверяем, удалось ли распарсить в число
      if (isNaN(numericValue)) {
        return { backgroundColor: 'white' }; // Если не число, оставляем белым
      }

      // Сравниваем распарсенное значение с значением из фильтра
      if (numericValue >= comparisonValue) {
        return { backgroundColor: 'lightgreen' }; // Зеленый, если >=
      } else {
        return { backgroundColor: 'lightcoral' }; // Красный, если <
      }
    } catch (e) {
      // Обработка возможных ошибок парсинга, хотя isNaN должен это покрыть
      console.error("Error parsing percentage:", percentageValue, e);
      return { backgroundColor: 'white' };
    }
  };

  return (
    <div>
      <ProductionFilter onFilterChange={handleFilterChange} />

      {/* Оборачиваем всю таблицу в container */}
      <div className="table-container2">
        {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}

        {data && data.length > 0 ? (
         
          <table className="table-format2">
            <thead>
              <tr>
                <th className = 'colonkahead head2'>Сотрудник</th>
                <th className = 'colonkahead head2'>Специализация</th>
                <th className = 'colonkahead head2'>Кол-во выполненных этапов</th>
                <th className = 'colonkahead head2'>Кол-во этапов, <br/>выполненных в срок</th>
                <th className = 'colonkahead head2'>Доля этапов, <br/>выполненных в срок</th>
                <th className = 'colonkahead head2'>Нормативное время работы, час</th>
                <th className = 'colonkahead head2'>Фактическое время работы, час</th>
                <th className = 'colonkahead head2'>Коэффициент выполнености норм, %</th>
                <th className = 'colonkahead head2'>Фонд рабочего времени, час</th>
                <th className = 'colonkahead head2'>Выработка сотрудника, %</th>
              </tr>
            </thead>
            <tbody>
              {/* Применяем классы к каждой строке и ячейке */}
              {data.map((employee, index) => (
                
                <tr key={employee.employeeName || index}> 
                  <td className = 'colonka2'>
                    {employee.employeeName}
                  </td>
                  <td className = 'colonka2'>
                    {employee.employeeSpecialization}
                  </td>
                  <td className = 'colonka2'>
                    {employee.transactionCount}
                  </td>
                  <td className = 'colonka2'>
                    {employee.exceededTimeCount}
                  </td>
<td
  className='colonka2'
  style={{
    backgroundColor:
      employee.exceededOrNoOperations === "Нет операций"
        ? 'lightyellow' // Желтый, если "Нет операций"
        : (() => {
          // Парсим строку в число, заменяя запятую на точку
          const parsedValue = parseFloat(employee.exceededOrNoOperations.replace(',', '.'));

          // Проверяем, удалось ли распарсить строку в число
          if (isNaN(parsedValue)) {
            return 'white'; // Если не удалось распарсить, возвращаем белый цвет
          }

          // Сравниваем распарсенное значение с 1
          if (parsedValue < 1) {
            return 'lightcoral'; // Красный, если меньше 1
          } else if (parsedValue === 1) {
            return 'lightgreen'; // Зеленый, если равно 1
          } else {
            return 'white'; // Белый в остальных случаях
          }
        })() // Вызываем функцию сразу же
  }}
>
  {employee.exceededOrNoOperations}
</td>
                  <td className = 'colonka2'>
                    {employee.totalNormTime}:00:00
                  </td>
                  <td className = 'colonka2'>
                    {employee.totalWorkTime}
                  </td>
                  {/* Ячейка workTimePercentage */}
                  <td
                    className='colonka2'
                    style={getPercentageCellStyle(employee.workTimePercentage, selectedPercentage)}
                  >
                    {employee.workTimePercentage}
                  </td>
                  {/* Ячейка hoursMounth */}
                  <td className='colonka2'>
                    {employee.hoursMounth}
                  </td>
                  {/* Ячейка hoursMounthPercentage */}
                  <td
                    className='colonka2'
                    style={getPercentageCellStyle(employee.hoursMounthPercentage, selectedPercentage)}
                  >
                    {employee.hoursMounthPercentage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && !error && <p>Нет данных для отображения.</p>
        )}

        {!loading && !error && !data && <p>Выберите год и месяц для отображения данных.</p>}
      </div>
    </div>
  );
};

export default Production;
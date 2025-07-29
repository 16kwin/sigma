// src/components/ProductionFilter.js
import React, { useState, useEffect } from 'react';
// Импортируем CSS файл
import './productionFilter.css';

const ProductionFilter = ({ onFilterChange }) => {
  const months = [
    { value: 1, label: 'Январь' },
    { value: 2, label: 'Февраль' },
    { value: 3, label: 'Март' },
    { value: 4, label: 'Апрель' },
    { value: 5, label: 'Май' },
    { value: 6, label: 'Июнь' },
    { value: 7, label: 'Июль' },
    { value: 8, label: 'Август' },
    { value: 9, label: 'Сентябрь' },
    { value: 10, label: 'Октябрь' },
    { value: 11, label: 'Ноябрь' },
    { value: 12, label: 'Декабрь' },
  ];

  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()+1);
  // Новый стейт для выбора процента, по умолчанию 80
  const [selectedPercentage, setSelectedPercentage] = useState(80);

  const generateYears = () => {
    const years = [];
    const startYear = 2023;
    const endYear = 2025;
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  };

  // Функция для генерации списка процентов от 50 до 100
  const generatePercentageOptions = () => {
    const options = [];
    for (let i = 50; i <= 100; i += 10) {  // Шаг +10
      options.push({ value: i, label: `${i}%` });
    }
    return options;
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  // Обработчик для нового фильтра процентов
  const handlePercentageChange = (event) => {
    setSelectedPercentage(parseInt(event.target.value, 10));
  };

  // Обновляем useEffect, чтобы передавать новое значение selectedPercentage
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        year: selectedYear,
        month: selectedMonth,
        percentage: selectedPercentage // Добавляем процент в передаваемый объект
      });
    }
  }, [selectedYear, selectedMonth, selectedPercentage, onFilterChange]); // Добавляем selectedPercentage в зависимости

  return (
    <div className="filter-container">
      <div className="filter-item">
        <label htmlFor="year-select" className="filter-label">Год: </label>
        <select id="year-select" value={selectedYear} onChange={handleYearChange} className="filter-select">
          {generateYears().map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="month-select" className="filter-label">Месяц: </label>
        <select id="month-select" value={selectedMonth} onChange={handleMonthChange} className="filter-select">
          {months.map((month) => (
            <option key={month.value} value={month.value}>{month.label}</option>
          ))}
        </select>
      </div>

      {/* Новый элемент фильтра для процентов */}
      <div className="filter-item">
        <label htmlFor="percentage-select" className="filter-label">Процент: </label>
        <select
          id="percentage-select"
          value={selectedPercentage}
          onChange={handlePercentageChange}
          className="filter-select"
        >
          {generatePercentageOptions().map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductionFilter;
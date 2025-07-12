import React, { useState, useEffect } from 'react';
import './TableFilter.css';

const TableFilter = ({ transactions, onFilter }) => {
  const [planDateStartMonth, setPlanDateStartMonth] = useState('');
  const [planDateStartYear, setPlanDateStartYear] = useState('');
  const [factDateStartMonth, setFactDateStartMonth] = useState('');
  const [factDateStartYear, setFactDateStartYear] = useState('');
  const [transactionFilter, setTransactionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('В работе');

  const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

  const getMonthName = (month) => {
    return monthNames[month - 1];
  };

  useEffect(() => {
    const filteredTransactions = transactions.filter(transaction => {
      // Фильтр по planDateStart
      const planDateStartMatch =
        (!planDateStartMonth || (transaction.planDateStart && new Date(transaction.planDateStart).getMonth() + 1 === parseInt(planDateStartMonth))) &&
        (!planDateStartYear || (transaction.planDateStart && new Date(transaction.planDateStart).getFullYear() === parseInt(planDateStartYear)));

      // Фильтр по factDateStart
      const factDateStartMatch =
        (!factDateStartMonth || (transaction.factDateStart && transaction.factDateStart !== 'Нет данных' && new Date(transaction.factDateStart).getMonth() + 1 === parseInt(factDateStartMonth))) &&
        (!factDateStartYear || (transaction.factDateStart && transaction.factDateStart !== 'Нет данных' && new Date(transaction.factDateStart).getFullYear() === parseInt(factDateStartYear)));

      // Фильтр по транзакции
      const transactionMatch =
        !transactionFilter || transaction.transaction.toLowerCase().includes(transactionFilter.toLowerCase());

      // Фильтр по статусу
      const statusMatch = !statusFilter || transaction.status === statusFilter;

      return planDateStartMatch && factDateStartMatch && transactionMatch && statusMatch;
    });

    onFilter(filteredTransactions);
  }, [
    planDateStartMonth,
    planDateStartYear,
    factDateStartMonth,
    factDateStartYear,
    transactionFilter,
    statusFilter,
    transactions,
    onFilter,
  ]);

  const years = Array.from({ length: 5 }, (_, i) => 2023 + i); // Создаем массив лет с 2022 по 2026

    return (
    <div className="filter-container">
      {/* Фильтр по planDateStart */}
      <label className="filter-label">
        Начало (план):
        <select className="filter-select" value={planDateStartMonth} onChange={e => setPlanDateStartMonth(e.target.value)}>
          <option value="">Все месяцы</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {getMonthName(i + 1)}
            </option>
          ))}
        </select>
        <select className="filter-select" value={planDateStartYear} onChange={e => setPlanDateStartYear(e.target.value)}>
          <option value="">Все года</option>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>

      {/* Фильтр по factDateStart */}
      <label className="filter-label">
        Начало (факт):
        <select className="filter-select" value={factDateStartMonth} onChange={e => setFactDateStartMonth(e.target.value)}>
          <option value="">Все месяцы</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {getMonthName(i + 1)}
            </option>
          ))}
        </select>
        <select className="filter-select" value={factDateStartYear} onChange={e => setFactDateStartYear(e.target.value)}>
          <option value="">Все года</option>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>

      {/* Фильтр по транзакции */}
      <label className="filter-label">
        Транзакция:
        <input type="text" className="filter-input" value={transactionFilter} onChange={e => setTransactionFilter(e.target.value)} />
      </label>

      {/* Фильтр по статусу */}
      <label className="filter-label">
        Статус:
        <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">Все</option>
          <option value="Закрыта">Закрыта</option>
          <option value="В работе">В работе</option>
          <option value="Ждет отгрузки">Ждет отгрузки</option>
        </select>
      </label>
    </div>
  );
};

export default TableFilter;
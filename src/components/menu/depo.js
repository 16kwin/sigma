import React, { useMemo, useState } from 'react';
import "../../styles/depo.css";

function Depo({ data }) {
  const [isPaused, setIsPaused] = useState(false);

  const doubledTransactions = useMemo(() => {
    if (!data?.transactions) return [];
    return [...data.transactions, ...data.transactions];
  }, [data]);

  const toggleAnimation = () => {
    setIsPaused(prev => !prev);
  };

  if (!data?.transactions) {
    return <div className="depo-loading">Загрузка данных...</div>;
  }

  return (
    <div className="depo-wrapper">
      <div className="depo-main-header">Депо транзакций</div>
      <div className="depo-container">
        <div className="depo-table-header">
          <div className="depo-cell">Транзакция</div>
          <div className="depo-cell">Входной контроль</div>
          <div className="depo-cell">Подключение</div>
          <div className="depo-cell">Проверка механиком</div>
          <div className="depo-cell">Проверка электронщиком</div>
          <div className="depo-cell">Проверка технологом</div>
          <div className="depo-cell">Выходной контроль</div>
          <div className="depo-cell">Транспортное</div>
        </div>
        <div 
          className="depo-table-body-wrapper"
          onClick={toggleAnimation}
        >
          <div 
            className={`depo-table-body ${isPaused ? 'paused' : ''}`}
          >
            {doubledTransactions.map((transaction, index) => (
              <div key={`${transaction.transaction}-${index}`} className="depo-row">
                <div className="depo-cell">{transaction.transaction}</div>
                <div className={`depo-cell ${getStatusClass(transaction.vhodControlTimeExceeded)}`}></div>
                <div className={`depo-cell ${getStatusClass(transaction.electricTimeExceeded)}`}></div>
                <div className={`depo-cell ${getStatusClass(transaction.mechanicTimeExceeded)}`}></div>
                <div className={`depo-cell ${getStatusClass(transaction.electronTimeExceeded)}`}></div>
                <div className={`depo-cell ${getStatusClass(transaction.techTimeExceeded)}`}></div>
                <div className={`depo-cell ${getStatusClass(transaction.vihodControlTimeExceeded)}`}></div>
                <div className={`depo-cell ${getStatusClass(transaction.transportTimeExceeded)}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusClass(status) {
  if (status === 'да') return 'success';
  if (status === 'Нет данных') return 'white';
  return 'error';
}

export default Depo;
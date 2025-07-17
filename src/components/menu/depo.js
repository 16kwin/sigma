import React from 'react';
import "../../styles/depo.css";

function Depo({ data }) {
  // Проверяем, что данные были получены
  if (!data || !data.transactions) {
    return <div>Загрузка данных...</div>; // Или какое-то другое сообщение
  }

  const { transactions } = data;

  return (
    <div className="depo-wrapper">
      {/* Синяя шапка с названием */}
      <div className="depo-main-header">
        Депо транзакций
      </div>

      {/* Контейнер таблицы */}
      <div className="depo-container">
        {/* Шапка таблицы */}
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

        {/* Тело таблицы */}
        <div className="depo-table-body">
          {transactions.map((transaction) => (
            <div key={transaction.transaction} className="depo-row">
              <div className="depo-cell">{transaction.transaction}</div>
              <div className={`depo-cell ${transaction.vhodControlTimeExceeded === 'да' ? 'success' : (transaction.vhodControlTimeExceeded === 'Нет данных' ? 'yellow' : 'error')}`}></div>
              <div className={`depo-cell ${transaction.electricTimeExceeded === 'да' ? 'success' : (transaction.electricTimeExceeded === 'Нет данных' ? 'yellow' : 'error')}`}></div>
              <div className={`depo-cell ${transaction.mechanicTimeExceeded === 'да' ? 'success' : (transaction.mechanicTimeExceeded === 'Нет данных' ? 'yellow' : 'error')}`}></div>
              <div className={`depo-cell ${transaction.electronTimeExceeded === 'да' ? 'success' : (transaction.electronTimeExceeded === 'Нет данных' ? 'yellow' : 'error')}`}></div>
              <div className={`depo-cell ${transaction.techTimeExceeded === 'да' ? 'success' : (transaction.techTimeExceeded === 'Нет данных' ? 'yellow' : 'error')}`}></div>
              <div className={`depo-cell ${transaction.vihodControlTimeExceeded === 'да' ? 'success' : (transaction.vihodControlTimeExceeded === 'Нет данных' ? 'yellow' : 'error')}`}></div>
              <div className={`depo-cell ${transaction.transportTimeExceeded === 'да' ? 'success' : (transaction.transportTimeExceeded === 'Нет данных' ? 'yellow' : 'error')}`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Depo;
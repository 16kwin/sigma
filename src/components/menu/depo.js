import React from 'react';
import "../../styles/depo.css";

function Depo() {
  // Пример данных
  const transactions = [
    { id: 'TR-2023-001', status: 'completed' },
    { id: 'TR-2023-002', status: 'in-progress' },
    { id: 'TR-2023-003', status: 'failed' },
    { id: 'TR-2023-004', status: 'completed' },
    { id: 'TR-2023-005', status: 'pending' }
  ];

  // Статусы проверок
  const checkStatus = {
    inputControl: true,
    connection: false,
    mechanic: true,
    electrician: false,
    technologist: true,
    outputControl: false,
    transport: true
  };

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
            <div key={transaction.id} className="depo-row">
              <div className="depo-cell">{transaction.id}</div>
              <div className={`depo-cell ${checkStatus.inputControl ? 'success' : 'error'}`}></div>
              <div className={`depo-cell ${checkStatus.connection ? 'success' : 'error'}`}></div>
              <div className={`depo-cell ${checkStatus.mechanic ? 'success' : 'error'}`}></div>
              <div className={`depo-cell ${checkStatus.electrician ? 'success' : 'error'}`}></div>
              <div className={`depo-cell ${checkStatus.technologist ? 'success' : 'error'}`}></div>
              <div className={`depo-cell ${checkStatus.outputControl ? 'success' : 'error'}`}></div>
              <div className={`depo-cell ${checkStatus.transport ? 'success' : 'error'}`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Depo;
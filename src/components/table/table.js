import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableFilter from './TableFilter'; // Убедитесь, что путь правильный
import "./table.css";

function calculateDays(days) {
  if (!days || days === "Нет данных") {
    return "Нет данных";
  }

  const daysInt = parseInt(days, 10); // Преобразуем в число

  const remainder10 = daysInt % 10;
  const remainder100 = daysInt % 100;

  if (remainder10 === 1 && remainder100 !== 11) {
    return `(${daysInt} рабочий день)`;
  } else if (remainder10 >= 2 && remainder10 <= 4 && (remainder100 < 10 || remainder100 >= 20)) {
    return `(${daysInt} рабочих дня)`;
  } else {
    return `(${daysInt} рабочих дней)`;
  }
}

function calculateDaysFromTime(time) {
  if (!time || time === "Нет данных") {
    return "Нет данных";
  }

  const [hours, minutes, seconds] = time.split(':').map(Number);
  const totalHours = hours + minutes / 60 + seconds / 3600;
  const days = Math.ceil(totalHours / 8); // 8 рабочих часов в день

  return calculateDays(days); // Вызываем функцию для форматирования
}

function Table() {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState([]); // Добавляем состояние

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://194.87.56.253:8081/api/analis/transactions');
        setJsonData(response.data);
        setFilteredTransactions(response.data.transactions); // Инициализируем filteredTransactions
      } catch (err) {
        setError(err);
        console.error("Ошибка при получении данных:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Загрузка данных...</p>;
  }

  if (error) {
    return <p>Ошибка при загрузке данных: {error.message}</p>;
  }

  if (!jsonData) {
    return <p>Данные не найдены.</p>;
  }

  const { header, transactions } = jsonData;

  return (
    <div className="table-container">
      <TableFilter transactions={transactions} onFilter={setFilteredTransactions} header={header} />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>{/* Оборачиваем таблицу в div */}
        <table className="table-format">
          <thead className="head"> 
            <tr className="strokahead">
              <td className="colonkahead" rowspan="2">Статус</td>
              <td className="colonkahead" rowspan="2">Транзакция</td>
              <td className="colonkahead" rowspan="2">План на ППП, час</td>
              <td className="colonkahead" rowspan="2">Операция</td>
              <td className="colonkahead" rowspan="2">Норматив на операцию, час</td>
              <td className="colonkahead" rowspan="2">Норматив на опцию, час</td>
              <td className="colonkahead" rowspan="2">Затрачено факт, час</td>
              <td className="colonkahead" rowspan="2">Закрытие в срок</td>
              <td className="colonkahead" rowspan="2">Устранение замечаний по потерям, час</td>
              <td className="colonkahead" colspan="3">Начало ППП</td>
              <td className="colonkahead" rowspan="2">Входной контроль</td>
              <td className="colonkahead" rowspan="2">Подключение</td>
              <td className="colonkahead" rowspan="2">Проверка механиком</td>
              <td className="colonkahead" rowspan="2">Проверка электронщиком</td>
              <td className="colonkahead" rowspan="2">Проверка технологом</td>
              <td className="colonkahead" rowspan="2">Выходной контроль</td>
              <td className="colonkahead" rowspan="2">Транспортное</td>
              <td className="colonkahead" colspan="3">Завершение ППП</td>
              <td className="colonkahead" colspan="3">Дата отргузки</td>
            </tr>
            <tr className="strokacolonkahead">
              <td className="colonkahead">План <br/>(По БОС)</td>
              <td className="colonkahead">Прогноз <br/>(Упр.сделками)</td>
              <td className="colonkahead">Факт <br/>(Факт начала)</td>
              <td className="colonkahead">План <br/>(По БОС)</td>
              <td className="colonkahead">Прогноз <br/>(Упр.сделками)</td>
              <td className="colonkahead">Факт <br/>(Факт завершения)</td>
              <td className="colonkahead">План</td>
              <td className="colonkahead">Прогноз</td>
              <td className="colonkahead">Факт</td>
            </tr>
          </thead>
          {filteredTransactions.map(transactions => (
            <React.Fragment key={transactions.transaction}>
              <tbody className="table-body">
                <tr className="stroka">
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.planDateStart}</td>
                  <td className="colonka">{transactions.forecastDateStart}</td>
                  <td className="colonka">{transactions.factDateStart}</td>
                  <td className="colonka">Межоперационное ожидание (рабочие дни)</td>
                  <td className="colonka">Межоперационное ожидание (рабочие дни)</td>
                  <td className="colonka">Межоперационное ожидание (рабочие дни)</td>
                  <td className="colonka">Межоперационное ожидание (рабочие дни)</td>
                  <td className="colonka">Межоперационное ожидание (рабочие дни)</td>
                  <td className="colonka">Межоперационное ожидание (рабочие дни)</td>
                  <td className="colonka">Межоперационное ожидание (рабочие дни)</td>
                  <td className="colonka">{transactions.planDateStop}</td>
                  <td className="colonka">{transactions.forecastDateStop}</td>
                  <td className="colonka">{transactions.factDateStop}</td>
                  <td className="colonka" rowspan="8" >{transactions.planDateShipment}</td>
                  <td className="colonka" rowspan="8" >{transactions.forecastDateShipment}</td>
                  <td className="colonka" rowspan="8" >{transactions.factDateShipment}</td>
                </tr>

                <tr className="stroka">
                  <td className="colonka" rowspan="7">{transactions.status}</td>
                  <td className="colonka" rowspan="7">{transactions.transaction}</td>
                  <td className="colonka" rowspan="7">{transactions.planPpp}:00:00</td>
                  <td className="colonka">Входной контроль</td>
                  <td className="colonka">{header.vhodNorm}:00</td>
                  <td className="colonka">0:00</td>
                  <td className="colonka">{transactions.vhodControlWorkTime}</td>
                  <td className="colonka"   
                    style={{
                      backgroundColor:
                        transactions.vhodControlTimeExceeded === 'Нет данных'
                          ? 'lightyellow'
                          : parseFloat(transactions.vhodControlTimeExceeded.replace(',', '.').replace('%', '')) >= 100
                            ? 'lightgreen'
                            : 'lightcoral',
                    }}>{transactions.vhodControlTimeExceeded}</td>
                  <td className="colonka">0</td>
                  <td className="colonka">{transactions.planDateStart}</td>
                  <td className="colonka">
                    {transactions.factDateStart ? transactions.factDateStart : transactions.forecastDateStart}
                  </td>
                  <td className="colonka">{transactions.vhodControlStartTime}</td>
                  <td className="colonka">{transactions.vhodControlEmployee}  <span className='no-break'><br/> Операция:{transactions.vhodControlWorkTime} <br/> Опция: 00:00:00 </span></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.planDate1}</td>
                  <td className="colonka">{transactions.factDate1}</td>
                  <td className="colonka">{transactions.vhodControlStopTime}</td>
                </tr>

                <tr className="stroka">
                  <td className="colonka">Подключение</td>
                  <td className="colonka">{header.podklyuchenieNorm}:00</td>
                  <td className="colonka">{transactions.electricNorm}:00 </td>
                  <td className="colonka">{transactions.electricTotalWorktime}</td>
                  <td className="colonka" 
                    style={{
                      backgroundColor:
                        transactions.electricTimeExceeded === 'Нет данных'
                          ? 'lightyellow'
                          : parseFloat(transactions.electricTimeExceeded.replace(',', '.').replace('%', '')) >= 100
                            ? 'lightgreen'
                            : 'lightcoral',
                    }}>{transactions.electricTimeExceeded}</td>
                  <td className="colonka">{transactions.electricProblemHours} </td>
                  <td className="colonka">{transactions.planDate1}</td>
                  <td className="colonka">{transactions.factDate1}</td>
                  <td className="colonka">{transactions.podkluchenieStartTime}</td>
                  <td className="colonka">{transactions.timeBetweenVhodAndPodkluchenie}<br/>{calculateDaysFromTime(transactions.timeBetweenVhodAndPodkluchenie)}</td>
                  <td className="colonka">{transactions.podkluchenieEmployee} <span className='no-break'><br/>Операция:{transactions.podkluchenieWorkTime}<br/>Опция:{transactions.electricOptionWorktype}</span></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.planDate2}</td>
                  <td className="colonka">{transactions.factDate2}</td>
                  <td className="colonka">{transactions.podkluchenieStopTime}</td>
                </tr>

                <tr className="stroka">
                  <td className="colonka">Проверка механиком</td>
                  <td className="colonka">{header.mechOperationNorm}:00</td>
                  <td className="colonka">{transactions.mechanicNorm}:00</td>
                  <td className="colonka">{transactions.mechanicTotalWorktime}</td>
                  <td className="colonka"  style={{
                      backgroundColor:
                        transactions.mechanicTimeExceeded === 'Нет данных'
                          ? 'lightyellow'
                          : parseFloat(transactions.mechanicTimeExceeded.replace(',', '.').replace('%', '')) >= 100
                            ? 'lightgreen'
                            : 'lightcoral',
                    }}>{transactions.mechanicTimeExceeded}</td>
                  <td className="colonka">{transactions.mechanicProblemHours}</td>
                  <td className="colonka">{transactions.planDate2}</td>
                  <td className="colonka">{transactions.factDate2}</td>
                  <td className="colonka"> {transactions.proverkaMehanikomStartTime}</td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.timeBetweenPodkluchenieAndProverkaMehanikom}<br/>{calculateDaysFromTime(transactions.timeBetweenPodkluchenieAndProverkaMehanikom)}</td>
                  <td className="colonka">{transactions.proverkaMehanikomEmployee} <span className='no-break'><br/>Операция:{transactions.proverkaMehanikomWorkTime}<br/>Опция:{transactions.mechanicOptionWorktype}</span></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.planDate3}</td>
                  <td className="colonka">{transactions.factDate3}</td>
                  <td className="colonka">{transactions.proverkaMehanikomStopTime}</td>
                </tr>

                <tr className="stroka">
                  <td className="colonka">Проверка электронщиком</td>
                  <td className="colonka">{header.electronOperationNorm}:00</td>
                  <td className="colonka">{transactions.electronNorm}:00</td>
                  <td className="colonka">{transactions.electronTotalWorktime}</td>
                  <td className="colonka"  style={{
                      backgroundColor:
                        transactions.electronTimeExceeded === 'Нет данных'
                          ? 'lightyellow'
                          : parseFloat(transactions.electronTimeExceeded.replace(',', '.').replace('%', '')) >= 100
                            ? 'lightgreen'
                            : 'lightcoral',
                    }}>{transactions.electronTimeExceeded}</td>
                  <td className="colonka">{transactions.electronProblemHours}</td>
                  <td className="colonka">{transactions.planDate3}</td>
                  <td className="colonka">{transactions.factDate3}</td>
                  <td className="colonka">{transactions.proverkaElectronStartTime}</td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.timeBetweenProverkaMehanikomAndProverkaElectron}<br/>{calculateDaysFromTime(transactions.timeBetweenProverkaMehanikomAndProverkaElectron)}</td>
                  <td className="colonka">{transactions.proverkaElectronEmployee} <span className='no-break'><br/>Операция:{transactions.proverkaElectronWorkTime}<br/>Опция{transactions.electronOptionWorktype}</span>
                  </td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.planDate4}</td>
                  <td className="colonka">{transactions.factDate4}</td>
                  <td className="colonka">{transactions.proverkaElectronStopTime}</td>
                </tr>

                <tr className="stroka">
                  <td className="colonka">Проверка технологом</td>
                  <td className="colonka">{header.techOperationNorm}:00</td>
                  <td className="colonka">{transactions.techNorm}:00</td>
                  <td className="colonka">{transactions.techTotalWorktime}</td>
                  <td className="colonka"   style={{
                      backgroundColor:
                        transactions.techTimeExceeded === 'Нет данных'
                          ? 'lightyellow'
                          : parseFloat(transactions.techTimeExceeded.replace(',', '.').replace('%', '')) >= 100
                            ? 'lightgreen'
                            : 'lightcoral',
                    }}>{transactions.techTimeExceeded}</td>
                  <td className="colonka">{transactions.techProblemHours}</td>
                  <td className="colonka">{transactions.planDate4}</td>
                  <td className="colonka">{transactions.factDate4}</td>
                  <td className="colonka">{transactions.proverkaTehnologomStartTime}</td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.timeBetweenProverkaElectronAndProverkaTehnologom}<br/>{calculateDaysFromTime(transactions.timeBetweenProverkaElectronAndProverkaTehnologom)}</td>
                  <td className="colonka">{transactions.proverkaTehnologomEmployee} <span className='no-break'><br/>Операция:{transactions.proverkaTehnologomWorkTime}<br/>Опция:{transactions.techOptionWorktype}</span></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.planDate5}</td>
                  <td className="colonka">{transactions.factDate5}</td>
                  <td className="colonka">{transactions.proverkaTehnologomStopTime}</td>
                </tr>

                <tr className="stroka">
                  <td className="colonka">Выходной контроль</td>
                  <td className="colonka">{header.vihodNorm}:00</td>
                  <td className="colonka">0:00</td>
                  <td className="colonka">{transactions.vihodControlWorkTime}</td>
                  <td className="colonka"  style={{
                      backgroundColor:
                        transactions.vihodControlTimeExceeded === 'Нет данных'
                          ? 'lightyellow'
                          : parseFloat(transactions.vihodControlTimeExceeded.replace(',', '.').replace('%', '')) >= 100
                            ? 'lightgreen'
                            : 'lightcoral',
                    }}>{transactions.vihodControlTimeExceeded}</td>
                  <td className="colonka">0</td>
                  <td className="colonka">{transactions.planDate5}</td>
                  <td className="colonka">{transactions.factDate5}</td>
                  <td className="colonka">{transactions.vihodControlStartTime}</td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.timeBetweenProverkaTehnologomAndVihodControl}<br/>{calculateDaysFromTime(transactions.timeBetweenProverkaTehnologomAndVihodControl)}</td>
                  <td className="colonka">{transactions.vihodControlEmployee} <span className='no-break'><br/>Операция:{transactions.vihodControlWorkTime}<br/>Опция:00.00.00</span></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.planDate6}</td>
                  <td className="colonka">{transactions.factDate6}</td>
                  <td className="colonka">{transactions.vihodControlStopTime}</td>
                </tr>

                <tr className="stroka">
                  <td className="colonka">Транспортное положение</td>
                  <td className="colonka">{header.transportNorm}:00</td>
                  <td className="colonka">0:00</td>
                  <td className="colonka">{transactions.transportPolozhenieWorkTime}</td>
                  <td className="colonka"  style={{
                      backgroundColor:
                        transactions.transportTimeExceeded === 'Нет данных'
                          ? 'lightyellow'
                          : parseFloat(transactions.transportTimeExceeded.replace(',', '.').replace('%', '')) >= 100
                            ? 'lightgreen'
                            : 'lightcoral',
                    }}>{transactions.transportTimeExceeded}</td>
                  <td className="colonka">{transactions.complexProblemHours}</td>
                  <td className="colonka">{transactions.planDate6}</td>
                  <td className="colonka">{transactions.factDate6}</td>
                  <td className="colonka">{transactions.transportPolozhenieStartTime}</td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.timeBetweenVihodControlAndTransportPolozhenie}<br/>{calculateDaysFromTime(transactions.timeBetweenVihodControlAndTransportPolozhenie)}</td>
                  <td className="colonka">{transactions.transportPolozhenieEmployee} <span className='no-break'><br/>Операция:{transactions.transportPolozhenieWorkTime}<br/>Опция:00.00.00</span></td>
                  <td className="colonka">{transactions.planDate7}</td>
                  <td className="colonka">{transactions.factDate7}</td>
                  <td className="colonka">{transactions.transportPolozhenieStopTime}</td>
                </tr>

                <tr className="stroka">
                  <td className="colonka"></td>
                  <td className="colonka">Отклонение от плана (План ППП/Факт ППП)</td>
                  <td className="colonka" style={{
                      backgroundColor:
                        parseFloat(transactions.percentagePlanPpp.replace(',', '.').replace('%', '')) >= 100
                          ? 'lightgreen'
                          : 'lightcoral',
                    }}>{transactions.percentagePlanPpp}</td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">Затрачено часов</td>
                  <td className="colonka">{transactions.totalOperationsWorkTime}</td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.totalProblemHours}</td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">Межоперационное ожидание</td>
                  <td className="colonka">{transactions.totalTimeBetweenOperations}</td>
                  <td className="colonka"></td>
                  <td className="colonka">Итоговое время цикла</td>
                  <td className="colonka">{transactions.totalTimeAll}<br/>{calculateDaysFromTime(transactions.totalTimeAll)}</td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                </tr>
              </tbody>      
              <br/>
            </React.Fragment>
          ))}
        </table>
    </div>
  );
}

export default Table;
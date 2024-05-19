const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Промежуточное ПО для разбора JSON-тел
app.use(bodyParser.json());

// Включение CORS для всех источников
app.use(cors());

// Конечная точка для конвертации валюты
app.post('/convertCurrency', (req, res) => {
  // Извлечение данных из тела запроса
  const { currencyStart, currencyEnd, currencyEndValue } = req.body;

  // Генерация случайного значения currencyStartValue между 50 и 100
  const currencyStartValue = Math.floor(Math.random() * (10000 - 5000) + 5000);

  // Отправка ответа
  res.json({
    currencyStart,
    currencyEnd,
    currencyStartValue,
    currencyEndValue
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер слушает на http://localhost:${port}`);
});

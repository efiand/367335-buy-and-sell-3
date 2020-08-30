'use strict';

const {ExitCode, LogMode} = require(`./constants`);
const chalk = require(`chalk`);

/**
 * Перетасовка массива по алгоритму Фишера—Йетса.
 *
 * @param {Array} array
 * @return {Array}
 */
const shuffle = (array) => {
  const resultArray = array.slice();
  for (let i = resultArray.length - 1; i > 0; i--) {
    const randomNumber = Math.floor(Math.random() * (i + 1));
    [resultArray[randomNumber], resultArray[i]] = [resultArray[i], resultArray[randomNumber]];
  }

  return resultArray;
};

/**
 * Возвращает случайное число в диапазоне
 * `min` и `max`.
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Возвращает случайный элемент заданного массива
 *
 * @param {Array} someArray
 * @return {*}
 */
const getRandomItem = (someArray) => someArray[getRandomInt(0, someArray.length - 1)];

/**
 * Выводит число с ведущим нулем для цифры
 *
 * @param {Number} num
 * @return {String}
 */
const formatNumWithLead0 = (num) => `${(num < 10) ? `0` : ``}${num}`;

/**
 * Выводит результат в консоль в зависимости от режима из справочника `LogMode`
 *
 * @param {*} res
 * @param {String} [modeName=`DEFAULT`]
 */
const outputRes = (res, modeName = `DEFAULT`) => {
  const {method, color, exitCode} = LogMode[modeName];
  console[method](chalk[color](res));
  if (exitCode) {
    process.exit(ExitCode[exitCode]);
  }
};

module.exports = {
  shuffle,
  getRandomInt,
  getRandomItem,
  formatNumWithLead0,
  outputRes
};

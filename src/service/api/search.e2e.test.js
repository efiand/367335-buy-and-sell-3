'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {StatusCodes} = require(`http-status-codes`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);
const mockData = [
  {
    id: `Opp9hU`,
    category: [
      `Животные`,
      `Юмор`,
      `Журналы`,
      `Пословицы`,
      `Разное`,
      `Софт`,
      `Хит`,
      `Игры`,
      `Книги`,
      `Любовные романы`,
      `Посуда`
    ],
    comments: [
      {
        id: `tNIEdn`,
        text: `А где блок питания? Неплохо, но дорого.`
      }
    ],
    description: `Если найдётся хозяин товара, валите всё на нас. Самовывоз в течение дня, вход без масок запрещён. При покупке с меня бесплатная доставка в черте города. Пользовались бережно и только по большим праздникам.`,
    picture: `item15.jpg`,
    title: `Куплю антиквариат`,
    type: `sale`,
    sum: 50750
  },
  {
    id: `HYzW93`,
    category: [
      `Юмор`,
      `Журналы`,
      `Софт`,
      `Политика`,
      `Игры`,
      `Любовные романы`,
      `Разное`
    ],
    comments: [
      {
        id: `G_lSyW`,
        text: `А где блок питания? Совсем немного... Оплата наличными или перевод на карту? Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво? А сколько игр в комплекте?`
      },
      {
        id: `3QITPg`,
        text: `Почему в таком ужасном состоянии? А где блок питания? А сколько игр в комплекте? Совсем немного... Неплохо, но дорого. Вы что?! В магазине дешевле. Оплата наличными или перевод на карту?`
      },
      {
        id: `TrEGcq`,
        text: `Неплохо, но дорого. Оплата наличными или перевод на карту? А где блок питания? А сколько игр в комплекте? Вы что?! В магазине дешевле. Почему в таком ужасном состоянии? С чем связана продажа? Почему так дешёво?`
      }
    ],
    description: `Самовывоз в течение дня, вход без масок запрещён. При покупке с меня бесплатная доставка в черте города. Скидки в честь Дня конституции. Таких предложений больше нет!`,
    picture: `item13.jpg`,
    title: `Отдам почетные грамоты даром`,
    type: `offer`,
    sum: 58746
  },
  {
    id: `G6VAhG`,
    category: [
      `Разное`,
      `Животные`,
      `Любовные романы`,
      `Посуда`,
      `Игры`,
      `Софт`,
      `Журналы`,
      `Пословицы`,
      `Книги`,
      `Юмор`
    ],
    comments: [
      {
        id: `lyhWDk`,
        text: `Оплата наличными или перевод на карту? С чем связана продажа? Почему так дешёво? А где блок питания? Совсем немного... Вы что?! В магазине дешевле. А сколько игр в комплекте?`
      }
    ],
    description: `Если товар не понравится — верну всё до последней копейки. Это настоящая находка для коллекционера! При покупке с меня бесплатная доставка в черте города. Самовывоз в течение дня, вход без масок запрещён.`,
    picture: `item02.jpg`,
    title: `Научу писать рандомную фигню за 50 рублей`,
    type: `sale`,
    sum: 35101
  },
  {
    id: `Mkh8tu`,
    category: [
      `Книги`,
      `Животные`,
      `Посуда`,
      `Хит`,
      `Пословицы`,
      `Политика`,
      `Игры`,
      `Юмор`,
      `Журналы`,
      `Софт`,
      `Разное`
    ],
    comments: [
      {
        id: `ypEZLb`,
        text: `Оплата наличными или перевод на карту? С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии? А сколько игр в комплекте? Неплохо, но дорого. А где блок питания? Вы что?! В магазине дешевле.`
      },
      {
        id: `gRneP1`,
        text: `С чем связана продажа? Почему так дешёво? Неплохо, но дорого. Совсем немного... Вы что?! В магазине дешевле. Почему в таком ужасном состоянии? А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца.`
      }
    ],
    description: `Продаю с болью в сердце... Таких предложений больше нет! Это настоящая находка для коллекционера! Если товар не понравится — верну всё до последней копейки.`,
    picture: `item11.jpg`,
    title: `Куплю человеческие волосы`,
    type: `sale`,
    sum: 17590
  },
  {
    id: `kT24_W`,
    category: [
      `Политика`,
      `Разное`,
      `Игры`
    ],
    comments: [
      {
        id: `n-nRZx`,
        text: `Оплата наличными или перевод на карту? Неплохо, но дорого. А сколько игр в комплекте?`
      },
      {
        id: `QsuhbX`,
        text: `Вы что?! В магазине дешевле. Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        id: `gxX4Fb`,
        text: `Вы что?! В магазине дешевле. С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии?`
      },
      {
        id: `7XQo8W`,
        text: `С чем связана продажа? Почему так дешёво? А где блок питания? А сколько игр в комплекте?`
      }
    ],
    description: `Пользовались бережно и только по большим праздникам. Если найдётся хозяин товара, валите всё на нас. Самовывоз в течение дня, вход без масок запрещён. Скидки в честь Дня конституции.`,
    picture: `item09.jpg`,
    title: `Куплю человеческие волосы`,
    type: `sale`,
    sum: 20843
  }
];

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns offer based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/search`).query({
      query: `Куплю человеческие волосы`
    });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(StatusCodes.OK));
  test(`2 offer found`, () => expect(response.body.length).toBe(2));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`Mkh8tu`));
});

test(`API returns code 404 if nothing is found`, () => request(app)
  .get(`/search`)
  .query({
    query: `Продам свою душу`
  })
  .expect(StatusCodes.NOT_FOUND));

test(`API returns 400 when query string is absent`, () => request(app)
  .get(`/search`)
  .expect(StatusCodes.BAD_REQUEST));

'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {StatusCodes} = require(`http-status-codes`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);
const mockData = require(`./search.e2e.test.json`);

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

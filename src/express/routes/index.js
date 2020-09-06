'use strict';

const {Router} = require(`express`);
const indexRouter = new Router();

const template = `
  /
  <br><br>
  <a href="/register">/register</a><br>
  <a href="/login">/login</a><br>
  <a href="/my">/my</a><br>
  <a href="/my/comments">/my/comments</a><br>
  <a href="/offers/category/1">/offers/category/:id</a><br>
  <a href="/offers/add">/offers/add</a><br>
  <a href="/search">/search</a><br>
  <a href="/offers/edit/1">/offers/edit/:id</a><br>
  <a href="/offers/1">/offers/:id</a><br>
`;

indexRouter.get(`/`, (req, res) => {
  res.send(template);
});

module.exports = indexRouter;
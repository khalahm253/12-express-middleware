'use strict';

import express from 'express';
const router = express.Router();

import modelFinder from '../middleware/models.js';
router.param('model', modelFinder);

let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

let sendJSON204 = (res, data) => {
  res.statusCode = 204;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

let serverError = (res, err) => {
  let error = { error: err };
  res.statusCode = 404;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};

router.get('/api/v1/:model', (req, res) => {
  req.model.fetchAll(req.dataModel)
    .then(data => sendJSON(res, data))
    .catch(err => serverError(res, err));
});

router.get('/api/v1/:model/:id', (req, res) => {
  let id = req.params.id;
  req.model.fetchOne(id, req.dataModel)
    .then(data => sendJSON(res, data))
    .catch(err => serverError(res, err));
});

router.post('/api/v1/:model', (req, res) => {
  let record = new req.model(req.body);
  record.save(req.dataModel)
    .then(data => sendJSON(res, data))
    .catch(err => serverError(res, err));
});

router.delete('/api/v1/:model/:id', (req, res) => {
  let id = req.params.id;
  req.model.deleteOne(id, req.dataModel)
    .then(data => sendJSON204(res, data))
    .catch(err => serverError(res, err));
});

export default router;
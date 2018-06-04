'use strict';

import requireAll from 'require-dir';
const models = requireAll('../models');

export default (req, res, next) => {
    if (req.params.model && models[req.params.model] && models[req.params.model].default) {
      req.model = models[req.params.model].default;
      req.dataModel = req.params.model;
      next();
    } else {
      throw `Model ${req.params.model} not found.`;
    }
};
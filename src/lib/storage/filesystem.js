'use strict';

import fs from 'fs';

const dataDirectory = `${__dirname}/../../../data/`;

const storage = {};
const database = {};

storage.fetchAll = (dataModel) => {
  return new Promise((resolve, reject) => {
    let directory = `${dataDirectory}${dataModel}/` ;
    fs.readdir(directory, (err, files) => {
      if (err) { reject(err); }
      else {
        let promises = [];
        files.forEach((el) => {
          let id = el.replace(/\.json/, '');
          promises.push(storage.fetchOne(id, dataModel));
        });
        Promise.all(promises)
          .then(contents => resolve(contents))
          .catch(err => reject(err));
      }
    });
  });

};

storage.fetchOne = (id, dataModel) => {
  return new Promise((resolve, reject) => {
    let file = `${dataDirectory}/${dataModel}/${id}.json`;
    fs.readFile(file, (err, data) => {
      if (err) { reject(err); }
      if (data) {
        let record = JSON.parse(data.toString());
        resolve(record);
      } else {
        reject('Nothing Found');
      }
    });
  });
};

storage.delete = (id, dataModel) => {
  return new Promise((resolve, reject) => {
    let file = `${dataDirectory}/${dataModel}/${id}.json`;
    fs.unlink(file, (err) => {
      if (err) { reject(err); }
      else {
        resolve('Entry Was Deleted');
      }
    });
  });
};

storage.save = (record, dataModel) => {
  return new Promise((resolve, reject) => {
    let file = `${dataDirectory}/${dataModel}/${record.id}.json`;
    let text = JSON.stringify(record);
    fs.writeFile(file, text, (err) => {
      if (err) { reject(err); }
      else { resolve(record); }
    });
  });
};

export default storage;
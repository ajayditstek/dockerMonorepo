import Middleware from '../middlewares';
import Helper from '../helpers';
import Service from '../services';
import express from 'express';
// const {  userClient } = require('../grpc/client');
import { UserClient } from '../grpc/client';

export default express
  .Router()
  .get('/status', (_req, res) => {
    res.send({
      status: 'Notificaiton service working fine',
    });
  })
  .get('/user', (_req, res) => {
    UserClient.getUserById({userId:'01b5d9-a4bf-4a54-8960-06' }, (err, response) => {
      console.log(err);
      if (err) {
        return res.send({
          status: err,
        });
      }
      return res.send({
        payload: response,
      });
    })
  })

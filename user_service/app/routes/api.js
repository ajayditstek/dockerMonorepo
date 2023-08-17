import Middleware from '../middlewares';
import Helper from '../helpers';
import Service from '../services';
import express from 'express';

/*const apiRoute = async (app) => {
  app.post('/api/register', Middleware.Validation.validate, Service.Users.register);
  app.post('/api/login', Middleware.Validation.validate, Service.Users.login);
  app.put('/api/update/:id?', Middleware.Auth.jwtVerify, Middleware.Validation.validate, Service.Users.updateProfile);

  app.all('/api/*', Middleware.Auth.jwtVerify, Middleware.Validation.validate, async (req,res)=> {
    Helper.ResponseHelper.error(res);
  });
};*/

export default express
  .Router()
  .get('/status', (_req, res) => {
    res.send({
      status: 'Users service working fine',
    })
  })
  .post('/post', (_req, res) => {
    res.send({
      status: 'post method called',
    })
  })
  .post('/register', Middleware.Validation.validate, Service.Users.register);
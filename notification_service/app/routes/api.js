import Middleware from '../middlewares';
import Helper from '../helpers';
import Service from '../services';

const apiRoute = async (app) => {
  app.post('/api/register', Middleware.Validation.validate, Service.Users.register);
  app.post('/api/login', Middleware.Validation.validate, Service.Users.login);
  app.put('/api/update/:id?', Middleware.Auth.jwtVerify, Middleware.Validation.validate, Service.Users.updateProfile);

  // app.all('/api/*', Middleware.Auth.jwtVerify, Middleware.Validation.validate, async (req,res)=> {
  //   Helper.ResponseHelper.error(res);
  // });
};


export default apiRoute;

import constant from '../constant';
import Helper from '../helpers';
import ApiRoute from './api';
import swagger from '../swagger';
import { UserClient } from '../grpc/client';

const routes = async ( app ) => {
    if( constant.env.SWAGGER ) {
      swagger.swag(app);
    }
    app.get('/user', async (req,res) => {
      UserClient.getUserById({userId:'149f5b-f18a-4fe3-b361-ac'},(err,response)=> {
        if(err) {
          return Helper.ResponseHelper.error(res,{message:err});
        }
        Helper.ResponseHelper.success(res,response);
      })
    })
    ApiRoute(app);
    app.all('/*', async (req,res)=> {
        Helper.ResponseHelper.error(res);
	  });
};

  export default routes;

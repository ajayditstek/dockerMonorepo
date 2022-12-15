import constant from '../constant';
import Helper from '../helpers';
import ApiRoute from './api';
import swagger from '../swagger';

const routes = async ( app ) => {
    if( constant.env.SWAGGER ) {
      swagger.swag(app);
    }
    ApiRoute(app);
    app.all('/*', async (req,res)=> {
        Helper.ResponseHelper.error(res);
	  });
};

  export default routes;

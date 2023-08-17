import constant from '../constant';
import Helper from '../helpers';
import ApiRoute from './api';
import swagger from '../swagger';

const routes = async ( app ) => {
  console.log('1111----inside route--------');
    // if( constant.env.SWAGGER ) {
    //   swagger.swag(app);
    // }
    console.log('inside route--------');
    ApiRoute(app);
    app.get('/success', async (req,res)=> {
      return res.status(200).send({ success : 'success'})
    });
    app.get('/fail', async (req,res)=> {
      return res.status(200).send({ success : 'fail'})
    });
    console.log('-------------->');
    // app.all('/*', async (req,res)=> {
    //     Helper.ResponseHelper.error(res);
	  // });
};

  export default routes;

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import constant from './constant';
import routes from './routes';
import apiroutes from './routes/api';
const app = express();
class Application {
  constructor() {
    app.use(helmet.hidePoweredBy());
    app.use(helmet.frameguard());
    app.use(helmet.xssFilter());
    app.use(cors({origin:'*'}));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.set('port', constant.env.PORT);
    app.listen( app.get('port'),() => {
      console.log(`Server is running on port ${app.get('port')}.`);
    });
    app.use('/notification', apiroutes);
    // routes(app);
  }
}

export default Application;
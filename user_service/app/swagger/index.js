import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger/swagger.json';
var options = {
  //customCss: '.swagger-ui .topbar { display: none }'
};

//export { swaggerDocument, options }

class Swagger {
    swag(app) {
        return app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(swaggerDocument,options)
          );
    }
}

export default new Swagger();
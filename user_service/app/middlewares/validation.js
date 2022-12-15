import Helper from '../helpers';
import Validator from 'jsonschema';
import constant from '../constant';
let v = new Validator.Validator();

class ValidationMiddleware {
    validate(req,res,next) {
        let path = req.route.path || req.originalUrl;
        let { schema, val } = Helper.ValidationHelper.validate(path, req.method.toLowerCase(), v);
        
        if ( !schema ) {
          return Helper.ResponseHelper.error(res,{ message:  constant.message.VALIDATION_FAILED})
        }
        let validationResponse = val.validate(req.body, schema);
        
        if ( validationResponse.errors.length > 0) {
          let errorMessage = validationResponse.errors.map((item)=>{
            let _item = {};
            Object.assign(_item,{ message : item.message, param : item.argument});
            return _item;
          });
          return Helper.ResponseHelper.error(res,{ payload: errorMessage });
        }
        next();
    }
}

export default new ValidationMiddleware();
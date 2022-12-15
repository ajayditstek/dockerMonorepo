import Helper from "../helpers";
import jwt from "jsonwebtoken";
import constant from "../constant";

class authValidaton{
    jwtVerify(req, res, next) {
        const token =
        req.body.accessToken ||
        req.query.accessToken ||
        req.headers['api-access-token'];
        jwt.verify(token, constant.env.JWTSECRET, async (err,decoded) => {
          if (err) {
            return Helper.ResponseHelper.error(res,{ message:err.message, code:401 });
          }
          
          try {
            if ( constant.env.REDIS ) {
              const exist = await Helper.RedisHelper.getString(
                'jwt_token_' + decoded.jwtData.id,
              );

              if ( exist != null ) {
                console.log('exist inside',exist);
                req.userInfo = decoded;
                return next();
              } else {
                return Helper.ResponseHelper.error(res);
              }
            } 
            req.userInfo = decoded;
            next();
          } catch (error) {
            console.log('error in jwt middlw',err);
            return Helper.ResponseHelper.error(res);
          }
    })
  }

  generateJWT(jwtData) {
    return  new Promise((resolve, reject) => {
      try {
        let JWT = jwt.sign({ jwtData }, constant.env.JWTSECRET, {
          expiresIn: 86400,
        });
        resolve(JWT);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new authValidaton;
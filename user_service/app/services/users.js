import Helper from '../helpers';
import Constant from '../constant';
import UsersModel from '../models/user';
import Middlewares from '../middlewares';
import constant from '../constant';

class Users {
    async login(req, res) {
        try {
            let user = await UsersModel.findOne({
                where : { 
                    email : req.body.email 
                },
                raw : true
            });
            if (user) {
                if ( Helper.Utils.verifyPassword(req.body.password,user.password)) {
                    let token = await Middlewares.Auth.generateJWT({id:user.id,email:user.email});
                    Helper.RedisHelper.setString({
                        key : 'jwt_token_'+user.id,
                        value : token
                    });
                    let obj = {
                        "message": Constant.message.LOGIN_SUCCESS,
                        "payload": {token:token}
                    }
                    return Helper.ResponseHelper.success(res, obj);
                }
                return Helper.ResponseHelper.error(res, {message:Constant.message.PASSWORD_NOT_MATCHED});
            }
            Helper.ResponseHelper.error(res, {message:Constant.message.LOGIN_USER_ERROR});
        }  catch(err) {
            Helper.ResponseHelper.error(res, {message : Constant.message.LOGIN_ERROR});
        }
    }

    async register(req,res) {
        try {
            let user = await UsersModel.findOne({
                where : { 
                    email : req.body.email 
                }
            });
            if (user) {
                return Helper.ResponseHelper.error(res, {message:Constant.message.USER_ALREADY_EXISTS});
            }
            req.body.password = await Helper.Utils.encryptPassword(req.body.password);
            let registerUser = await UsersModel.create({
                ...req.body,
                status: 'active'
            });

            if ( registerUser ) {
                console.log('you are inside');
                let token = await Middlewares.Auth.generateJWT({id:registerUser.id,email:registerUser.email});
                // Helper.RedisHelper.setString({
                //     key : 'jwt_token_'+registerUser.id,
                //     value : token
                // });
                let obj = {
                    "message": Constant.message.REGISTER_SUCCESS,
                    "payload": { token : token }
                }
                console.log('you are inside',obj);
                return Helper.ResponseHelper.success(res, obj);
            }

            //Helper.ResponseHelper.error(res, {message:Constant.message.REGISTER_ERROR});
        }  catch(err) {
            Helper.ResponseHelper.error(res, {message:err});
        }
    }

    async updateProfile(req,res) {
        try {
            // let id = req.userInfo.jwtData.id;
            let id = '';
            if(req?.params?.id) {
                id = req.params.id;
            }

            if (req.body.password) {
                req.body.password = await Helper.Utils.encryptPassword(req.body.password);
            }


            let updateData = await UsersModel.update(
                {...req.body},
                {
                    where : { 
                        id : id 
                    }
                },
            );

            if ( updateData[0] ) {
                return Helper.ResponseHelper.success(res,{ message : constant.message.UPDATED_SUCCESS});
            } 
            Helper.ResponseHelper.error(res,{ message : constant.message.UPDATED_ERROR});
        } catch(err) {
            console.log('------------',err);
            //Helper.ResponseHelper.error(res,{ message : constant.message.UPDATED_ERROR});
        }
    }

    async getUserById(request) {
        let user = await UsersModel.findOne({
            where : { 
                id : request.userId 
            },
            raw : true
        });
        return { message : 'User Detail', status : false, payload : user};
    }
}

export default new Users();
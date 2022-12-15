import constant from "../constant";
import bcrypt from "bcrypt";
class UtilHelper {
    encryptPassword(password){
        return bcrypt.hash(password,parseInt(constant.env.BCRYPT_SALT));
    }

    verifyPassword(password,hashedPassword) {
        return bcrypt.compare(password,hashedPassword);
    }
}
export default new UtilHelper();
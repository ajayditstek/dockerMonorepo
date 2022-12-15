import _CONF from '../config/config.json';
import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd()+'/app/config/.env' });
export default {
    PORT: process.env.PORT,
    REDIS: process.env.REDIS || true,
    REDIS_HOSTNAME: process.env.REDIS_HOSTNAME || '127.0.0.1',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    REDIS_AUTH: process.env.REDIS_AUTH || 'redis://127.0.0.1:6379',
    JWTSECRET: process.env.JWTSECRET || 'jwtsecte',
    BCRYPT_SALT: process.env.BCRYPT_SALT || 10,

    DB_HOST: process.env.DB_HOST || _CONF.development.host,
    DB_DB: process.env.DB_DB || _CONF.development.database,
    DB_USER: process.env.DB_USER || _CONF.development.username,
    DB_PASSWORD: process.env.DB_PASSWORD || _CONF.development.password,
    DB_DIALECT : process.env.DB_DIALECT || _CONF.development.dialect,
    SWAGGER : process.env.SWAGGER || true,

    NODE_ENV: process.env.NODE_ENV || 'development'
}
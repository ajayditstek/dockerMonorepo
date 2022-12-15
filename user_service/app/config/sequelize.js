import _CONF from './config.json';
import constant from '../constant';
import Sequelize from 'sequelize';
const sequelize = new Sequelize(constant.env.DB_DB, constant.env.DB_USER, constant.env.DB_PASSWORD, {
	host: _CONF[constant.env.NODE_ENV].host,
	dialect: constant.env.DB_DIALECT,
	freezeTableName: true,
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

export default sequelize;
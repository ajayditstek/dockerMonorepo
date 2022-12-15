
const fs = require('fs');

const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const db = {};

let sequelize= new Sequelize('nodemysql', 'admin','Admin@123', {
	host: 'localhost',
	dialect: 'mysql',
	freezeTableName: true,
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    import (model).then(db[model.name] = model)
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


import _CONF from './config.json';
import mysql from 'mysql2'
var pool  = mysql.createPool({
    connectionLimit : 10,
    host        : _CONF.mysql.host,
    user        : _CONF.mysql.user,
    password    : _CONF.mysql.password,
    port        : _CONF.mysql.port,
    database    : _CONF.mysql.database,
    timeout: 60000
  });
  
module.exports = pool;
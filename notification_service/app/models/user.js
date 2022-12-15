// // const {
// //   Model
// // } = require('sequelize');
// import {Model} from 'sequelize';
// export default (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     fullName: DataTypes.STRING,
//     DOB: DataTypes.DATE,
//     email: DataTypes.STRING,
//     status: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };

import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
const generateUUID = () => {
  return 'xxxxxx-xxxx-4xxx-yxxx-xx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
const UsersModel = sequelize.define(
  'Users',
  {
    id: {
      type: DataTypes.STRING(24),
      //defaultValue: DataTypes.UUIDV4,
      defaultValue:generateUUID(),
      primaryKey: true,
    },  
    fullname: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    DOB: DataTypes.DATE,
    email: DataTypes.STRING(200),
    password : DataTypes.STRING(200),
    status: DataTypes.ENUM('active','suspended','archived')
  });

  export default UsersModel;
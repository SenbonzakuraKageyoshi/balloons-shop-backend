import { DataTypes } from "sequelize";
import sequelize from '../db.js';

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    userFirstName: {type: DataTypes.STRING, allowNull: false},
    userLastName: {type: DataTypes.STRING, allowNull: false},
    userTelephone: {type: DataTypes.STRING, allowNull: false, unique: true},
    userEmail: {type: DataTypes.STRING, allowNull: false, unique: true},
    userPasswordHash: {type: DataTypes.STRING, allowNull: false},
});

export {
    User
}
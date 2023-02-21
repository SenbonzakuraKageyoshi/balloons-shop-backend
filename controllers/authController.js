import { User } from '../models/models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';

const register = async (req, res) => {
    try {
        const { ...args } = req.body;

        const userByEmail = await User.findOne({where: { userEmail: args.userEmail }});
        const userByTelephone = await User.findOne({where: { userTelephone: args.userTelephone }});
        
        if(userByEmail || userByTelephone){
            return res.status(400).json({message: "Такой пользователь уже существует"}); 
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(args.userPassword, salt);

        const user = await User.create({...args, userPasswordHash: passwordHash});

        const token = generateToken(user.dataValues.id);
        
        res.json({...user.dataValues, token});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Не удалось зарегистрироваться, пожалуйста, попробуйте позже"}); 
    }
};

const login = async (req, res) => {
    try {
        const { userEmail, userTelephone, userPassword } = req.body;

        const user = await User.findOne({where: { userEmail, userTelephone }});

        if(!user){
            return res.status(404).json({message: 'Неверный логин, телефон, или пароль'});
        };

        const isValidPass = await bcrypt.compare(userPassword, user.dataValues.userPasswordHash);

        if(!isValidPass){
            return res.status(404).json({message: 'Неверный логин, телефон, или пароль'});
        };

        const token = generateToken(user.dataValues.id);
        
        res.json({...user.dataValues, token});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Не удалось авторизоваться"}); 
    };
};

const getUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if(!token) {
            return res.status(404).json({message: 'Пользователь не найден'})
        };

        const { id } = jwt.verify(token, '1a2b-3c4d-5e6f-7g8h');
        
        const user = await User.findOne({where: { id }});

        if(!user){
            return res.status(404).json({message: 'Пользователь не найден'})
        };

        res.json({...user.dataValues, token});
    } catch (error) {
        res.status(404).json({message: "Не удалось получить данные пользователя"}); 
    };
};

export {
    register,
    login,
    getUser
}
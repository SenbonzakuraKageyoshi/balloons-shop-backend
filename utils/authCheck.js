import { User } from '../models/models.js';
import jwt from 'jsonwebtoken';

const authCheck = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if(!token) {
            return res.status(404).json({message: 'Пользователь не авторизован'})
        };

        const { id } = jwt.verify(token, '1a2b-3c4d-5e6f-7g8h');
        
        const user = await User.findOne({where: {id}});

        if(!user){
            return res.status(404).json({message: 'Пользователь не авторизован'})
        };

        next();
    } catch (error) {
        res.status(404).json({message: 'Пользователь не авторизован'});
    }
};

export default authCheck;
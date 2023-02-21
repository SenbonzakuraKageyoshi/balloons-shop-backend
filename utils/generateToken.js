import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
    return jwt.sign({ id }, '1a2b-3c4d-5e6f-7g8h', {expiresIn: '30d'});
};
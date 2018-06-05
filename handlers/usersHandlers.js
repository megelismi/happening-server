import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

export const encryptPassword = password => {
    return bcrypt.hashSync(password, salt);
};

export const sanitizePhone = phone => {
    return phone.replace(/\D/g,"");
};
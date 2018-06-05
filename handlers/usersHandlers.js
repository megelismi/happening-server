import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

export const encryptPassword = password => {
    return bcrypt.hashSync(password, salt);
};

export const verifyPassword = (candidatePassword, encryptedPassword) => {
    candidatePassword = bcrypt.hashSync(candidatePassword, salt);

    return candidatePassword === encryptedPassword;
};

export const sanitizePhone = phone => {
    return phone.replace(/\D/g,"");
};



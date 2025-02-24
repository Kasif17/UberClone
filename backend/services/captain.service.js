const captainModel = require('../models/captian.model');

const createCaptain = async ({ firstName, lastName, email, password,color, plate, capacity, vehicalType }) => {

    if (!firstName || !email || !password || !color || !plate || !capacity || !vehicalType) {
        throw new Error('All fields are required');
    }

    const captain = await captainModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        vehical:{
            color,
            plate,
            capacity,
            vehicalType,
        }
    });

    return captain;
};

module.exports = {
    createCaptain
};

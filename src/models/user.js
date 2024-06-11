import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.validPassword = function (password) {
    return password === this.password
};

const User = mongoose.model('usuarios', userSchema);

export default User;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        mobile: {
            type: String, 
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required!"],
            validate: {
                validator: function(v) {
                  return !(v.length<8);
                },
                message: "Password with minimum 8 chars required!"
            },
        },
    },
    {timestamps: true}
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordValid = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            //expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model("User", userSchema);
module.exports = User;

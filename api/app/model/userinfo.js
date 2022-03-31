module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    return mongoose.model(
        'Userinfo',
        new Schema({
            // 邮箱
            mail: {
                type: String,
                required: true,
                unique: true,
                trim: true,
                maxlength: 50,
                match: /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
            },
            // 密码
            password: {
                type: String,
                required: true,
                trim: true,
                maxlength: 20,
                match: /^[0-9A-Za-z]+$/
            },
            // 昵称
            nick: {
                type: String,
                required: true,
                trim: true,
                maxlength: 10,
            },
            // 注册时间
            registerTime: {
                type: Number,
                default: new Date().getTime(),
            },
            // 最后登入时间
            lastTime: {
                type: Number,
                default: 0,
                validate: (d) => { return d >= 0 }
            },
            // 登入IP
            ip: {
                type: String,
                trim: true,
            },
        })
        , 'user_info'
    );
}
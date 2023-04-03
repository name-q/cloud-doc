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
                maxlength: 30,
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
                default: Date.now(),
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
            // 随笔数
            essaysNumber: {
                type: Number,
                default: 0,
            },
            // 造极数
            zaojiNumber: {
                type: Number,
                default: 0,
            },
            // 粉丝数
            fansNumber: {
                type: Number,
                default: 0,
            },
            // 会员等级
            level: {
                type: Number,
                default: 1,
            },
            // 最后签到时间戳
            lastSignTime: {
                type: Number,
                default: 0,
            },
        })
        , 'user_info'
    );
}
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    return mongoose.model(
        'Oss',
        new Schema({
            // 邮箱
            mail: {
                type: String,
                trim: true,
                maxlength: 30,
                match: /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/,
                required: true,
            },
            // STS授权路径
            dirPath: {
                type: String,
                trim: true,
                required: true,
            },
            // 是否用过此STS
            ststus: {
                type: Boolean,
                default: false,
            },
            // 创建此STS时间
            createTime: {
                type: Number,
                require:true,
            },
            // 造极ID
            zjId: {
                type: String,
                trim: true,
            },
        })
        , 'oss'
    );
}
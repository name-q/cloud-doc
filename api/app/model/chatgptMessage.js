module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  return mongoose.model(
    "ChatGPTMessage",
    new Schema({
      // 对话id 也是对话的创建时间
      message_id: {
        type: Number,
        unique: true,
        default: new Date().getTime(),
      },
      // 用户objectID
      user_id: {
        type: String,
        required: true,
        trim: true,
      },
      // message历史对话
      message_history: {
        type: Array,
        default: [],
      },
      // 对话标题
      title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 10,
      },
      // 对话更新时间
      updateTime: {
        type: Number,
        default: new Date().getTime(),
        validate: (d) => {
          return d >= 0;
        },
      },
    }),
    "chatgpt_message"
  );
};

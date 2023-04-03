module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  return mongoose.model(
    "Chatgpt",
    new Schema({
      // 对话创建时间
      createTime: {
        type: Number,
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
        maxlength: 20,
      },
      // 对话更新时间
      updateTime: {
        type: Number,
      },
    }),
    "chatgpt_message"
  );
};

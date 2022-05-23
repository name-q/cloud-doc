import mitt from 'mitt'

/*
 *  //绑定
 *  msg.on('hello', (param) => console.log(param))
 *  //触发
 *  msg.emit('hello', 'hello')
 *  //解绑
 *  msg.off('hello')
*/
export default mitt()
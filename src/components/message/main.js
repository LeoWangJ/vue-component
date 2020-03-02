import Vue from 'vue'
import main from './main.vue'
const MainContructor = Vue.extend(main)
const Message = function (options = {}) {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  console.log(options)
  const instance = new MainContructor({
    data: options
  }).$mount()
  console.log(instance)
  document.body.appendChild(instance.$el)
};

['success', 'error'].forEach((type) => {
  Message[type] = options => {
    options.type = type
    return Message(options)
  }
})

export default Message

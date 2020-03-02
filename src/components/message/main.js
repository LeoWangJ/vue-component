import Vue from 'vue'
import main from './main.vue'
const MainContructor = Vue.extend(main)
const message = function (options = {}) {
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
}

export default message

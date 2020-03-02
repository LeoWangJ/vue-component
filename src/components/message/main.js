import Vue from 'vue'
import main from './main.vue'
const MainContructor = Vue.extend(main)
const message = function (options = {}) {
  const instance = new MainContructor(options).$mount()
  document.body.appendChild(instance.$el)
}

export default message

<template>
  <div>
    <label v-if="label"  :class="{ 'i-form-item-label-required': isRequired }">{{label}}</label>
    <div>
      <slot></slot>
       <div v-if="validateState === 'error'" class="i-form-item-message">{{ validateMessage }}</div>
    </div>
  </div>
</template>

<script>
import Emitter from '../../mixins/emitter.js'
import AsyncValidator from 'async-validator'

export default {
  name: 'iFormItem',
  mixins: [Emitter],
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },
  data () {
    return {
      isRequired: false, // 是否为必填
      validateState: '', // 校驗狀態
      validateMessage: '' // 校驗不通過時的提示信息
    }
  },
  computed: {
    fieldValue () {
      return this.form.model[this.prop]
    }
  },
  mounted () {
    if (this.prop) {
      this.dispatch('iForm', 'on-form-item-add', this)
      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.fieldValue
      this.setRules()
    }
  },
  beforeDestroy () {
    this.dispatch('iForm', 'on-form-item-remove', this)
  },
  methods: {
    setRules () {
      this.$on('on-form-blur', this.onFieldBlur)
      this.$on('on-form-change', this.onFieldChange)
    },
    getRules () {
      let formRules = this.form.rules
      formRules = formRules ? formRules[this.prop] : []
      return [].concat(formRules || [])
    },
    // 只支持 blur 和 change，所以過濾出符合要求的 rule 規則
    getFilteredRule (trigger) {
      const rules = this.getRules()
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },
    validate (trigger, callback = () => {}) {
      const rules = this.getFilteredRule(trigger)
      if (!rules || rules.length === 0) {
        return true
      }

      this.validateState = 'validating'

      const descriptor = {}
      descriptor[this.prop] = rules

      const validator = new AsyncValidator(descriptor)
      const model = {}

      model[this.prop] = this.fieldValue

      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''
        callback(this.validateMessage)
      })
    },
    onFieldBlur () {
      this.validate('blur')
    },
    onFieldChange () {
      this.validate('change')
    },
    resetField () {
      this.validateState = ''
      this.validateMessage = ''
      this.form.model[this.prop] = this.initialValue
    }
  }
}
</script>

<style>
  .i-form-item-label-required:before {
    content: '*';
    color: red;
  }
  .i-form-item-message {
    color: red;
  }
</style>

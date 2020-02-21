<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'iForm',
  provide () {
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  },
  data () {
    return {
      fields: []
    }
  },
  created () {
    this.$on('on-form-item-add', (field) => {
      console.log(field)
      if (field) this.fields.push(field)
    })

    this.$on('on-form-item-remove', (field) => {
      console.log(this.fields.indexOf(field))
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1)
    })
  }
}
</script>

<style>

</style>

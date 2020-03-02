<template>
  <div>
    <h3>elementUI message</h3>
    <button @click="handleMessage">呼叫message</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    handleMessage () {
      this.$message({
        message: '有成功嗎？',
        duration: 300
      })
    }
  }
}
</script>

<style>

</style>

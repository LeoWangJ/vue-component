<template>
  <transition>
    <div class="leo-message">
      <p>{{message}}</p>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      message: 'test',
      duration: 3000
    }
  },
  mounted () {
    setTimeout(() => {
      this.$destroy()
      this.$el.parentNode.removeChild(this.$el)
    }, this.duration)
  }
}
</script>

<style lang="scss">
  .leo-message{
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: #fff;
    z-index: 9999;
    background: transparent;
    > p {
      padding: 12px 22px;
      font-size: 18px;
      border-radius: 4px;
      background: rgba(17, 17, 17, 0.7);
    }
  }
</style>

<template>
  <div class="load">
    <img src="./loading.gif" alt="">
    <p>{{ title }}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在加载...'
    }
  }
}
</script>

<style lang="" scoped>
  .load {
    width: 100%;
    text-align: center
  }
  .load img {
    width: 24px;
    height: 24px;
  }
  .load p {
    font-size: 14px;
    color: #000;
  }
</style>

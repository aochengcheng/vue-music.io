<template>
  <div>
    <h1>测试组件</h1>
  </div>
</template>

<script>
import axios from 'axios'
import {getRecommend} from './common/recommoned'
export default {
  created() {
      this.getRcommon()
      this.getHot()
  },
  methods: {
    getRcommon() {
      getRecommend().then((res) => {
        console.log(res)
      })
    },
    getHot() {
      axios.get('http://127.0.0.1:3000/getJson')
        .then(function (res) {
          console.log(res.data)
        })
    }
  },
  mounted() {      
  },
}
</script>

<style>

</style>

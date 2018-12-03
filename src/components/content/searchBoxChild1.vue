<template>
    <div class="search-item">
      <h3>热门搜索</h3>
      <div>
        <a href="#" v-for="(item, index) in songName" :key="item.n">
          {{ item.k }}
        </a>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import {getRecommend} from '../common/recommoned'
export default {
  data() {
    return {
      songName: []
    }
  },
  created() {
    this.getHot()
  },
  methods: {
    
    getHot() {
      let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
      getRecommend(url).then((res) => {
        console.log(res.data)
        this.songName = res.data.hotkey
      })
    }
  }
}
</script>
<style lang="" scoped>
  .search-item {
    background-color: #fff;
    padding: 15px 15px 10px 15px;
  }
  .search-item h3 {
    color: rgba(0,0,0,.6);
    margin-bottom: 8px;
  }
  .search-item div a {
    display: inline-block;
    font-size: 14px;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    color: #000;
    border: 1px solid rgba(0,0,0,.6);
    border-radius: 99px;
    word-break: keep-all;
    margin-bottom: 10px;
    margin-right: 14px;
  }
  .search-item div a:first-child {
    color: #fc4524;
    border-color: #fc4524;
  }
</style>

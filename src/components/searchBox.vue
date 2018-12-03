<template>
  <div class="search-box">
    <div class="search-bar">
      <div class="search-form" @click="openBox">
        <form action="#">
          <input type="text" placeholder="搜索歌曲、歌单、专辑" autocomplete="off">
          <span>搜索</span>
        </form>
      </div>
      <div class="search-close" v-if="open" @click="closeBox">取消</div>
    </div>
    <transition mode="out-in">
       <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import {getRecommend} from './common/recommoned'
export default {
  data() {
    return {
      songName: [],
      open: false
    }
  },
  created() {
    this.getHot()
  },
  methods: {
    openBox() {
      this.open = true
      this.$router.push({name: 'content2'})
    },
    closeBox() {
      this.$router.push({name: 'content1'})
      this.open = false
    },
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
  .v-enter,
  .v-leave-to {
    opacity: 0;
    /* transform: translateX(100%)  */
  }
  .v-leave-to {
    opacity: 0;
    /* transform: translateX(-100%); */
    position: absolute
  }
  .v-enter-active,
  .v-leave-active {
    transition: all .3s ease
  }
  .search-bar {
    padding: 10px;
    background-color: #f4f4f4;
    display: flex;
  }
  .search-bar .search-close {
    padding-right: 10px;
    padding-left: 10px;
    font-size: 14px;
    height: 36px;
    line-height: 36px;
  }
  .search-bar .search-form {
    padding: 8px 12px 8px 35px;
    position: relative;
    border-radius: 5px;
    background-color: #fff;
    flex: 1
  }

  .search-bar .search-form form input {
    border: 0;
    color: rgba(0,0,0,.3);
    height: 20px;
    line-height: 20px;
    width: 100%;
    font-size: 14px
  }
  .search-bar .search-form form span {
    text-indent: -9999px;
    position: absolute;
    width: 18px;
    height: 18px;
    left: 10px;
    top: 10px;
    background: url(../../static/qq_music/quan.png) no-repeat center / cover;
  }

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

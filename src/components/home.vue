<template>
  <div class="home-container" :style=" !swiperList.length ? 'height:100vh':'' ">
    
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in swiperList" :key="index" >
          <a :href="item.linkUrl">
           <img :src="item.picUrl">
          </a>
      </mt-swipe-item>
    </mt-swipe> 

    <div class="radio some">
      <h2>电台</h2>
      <ul>
        <li v-for="(item, index) in radioList" :key="index">
          <a href="#" class="clearFix">
            <div class="img">
              <img :src="item.picUrl" alt="">
              <span></span>
            </div>
            <div class="txt">{{ item.Ftitle }}</div>
          </a>
        </li>
      </ul>
    </div>

    <div class="hot some">
      <h2>热门歌单</h2>
      <ul>
        <li v-for="(item, index) in songList" :key="index">
          <a href="#" class="clearFix">
            <div class="img">
              <img :src="item.picUrl" alt="">
            </div>
            <div class="list-info">
              <h3 class="list-tit">{{ item.songListDesc }}</h3>
              <p class="list-text">{{ item.songListAuthor }}</p>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <footer class="footer">
      <div class="tab">
        <a href="#">查看电脑版网页</a>
      </div>
      <div class="foot-logo">
          QQ音乐
      </div>
      <p class="copy">
        Copyright © 1998 - 2018 Tencent. All Rights Reserved.
      </p>
      <p class="phone">
        练习电话: 17630971140 QQ: 1156438031
      </p>
    </footer>
    <div class="loading-container" v-show="!swiperList.length">
      <Loading></Loading>
    </div>
  </div>
</template>
<script>
import Loading from '../base/loading/loading'
import axios from 'axios'
import {getRecommend} from './common/recommoned'
export default {
  data() {
    return {
      swiperList: [],
      radioList: [],
      songList: []
    }
  },

  created() {
    this.getRcommon()
  },
  methods: {
    getRcommon() {
      let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
      getRecommend(url).then((res) => {
        this.swiperList = res.data.slider
        console.log(res)
        this.radioList = res.data.radioList
        this.songList = res.data.songList
      })
    }
  },
  components: {
    Loading
  }
}
</script>
<style lang="" scoped>
  .mint-swipe {
    height: 165px;
    margin-bottom: 15px;
  }
  .mint-swipe-items-wrap > div {
    height: 100%;
  }
  .mint-swipe img {
    width: 100%;
  }
  
  .mint-swipe-indicator.is-active {
    background-color: #fff !important;
  }

  .home-container {
    background-color: #f4f4f4;
    overflow: hidden;
    position: relative;
  }
  
  .home-container .radio,
  .home-container .hot {
    margin: 0 10px 7px;
  }
  .home-container .some h2 {
    font-size: 16px;
    color: #000;
    margin-bottom: 11px;
    font-style: normal;
    font-weight: 400;
  }
   .home-container .some ul {
     overflow: hidden;
    margin-right: -8px
   }
   .home-container .some ul li {
     float: left;
     width: 50%;
     padding-right: 8px;
   }
   .home-container .some ul li a {
     display: block;
     background-color: #fff;
   }
   .home-container .some ul li .img {
     display: block;
     position: relative;
     margin-bottom: 5px;
   }
   .home-container .some ul li .img span {
     position: absolute;
     height: 24px;
     bottom: 5px;
     right: 5px;
     width: 24px;
     background-position: 0 0;
     background-image: url(../../static/qq_music/list_sprite.png);
     background-size: 24px 60px;
     background-repeat: no-repeat;
   }
   .home-container .some ul li .img img {
     width: 100%;
     display: block;
   }
   .home-container .some ul li .txt {
      padding: 0 7px 5px;
      color: #000;
      height: 36px;
      line-height: 18px;
      white-space: normal;
      word-wrap: break-word;
      font-size: 14px;
   }
   .home-container .hot .list-info {
     padding: 0 7px 5px;
     color: #000;
   }
   .home-container .hot li {
     margin-bottom: 10px;
   }
   .home-container .hot .list-info .list-tit {
     white-space: nowrap;
     text-overflow: ellipsis;
     overflow: hidden;
     font-size: 14px;
     font-weight: 400;
   }
   .home-container .hot .list-info .list-text{
      font-size: 12px;
   }
   .home-container .footer {
     padding: 15px 0;
   }
   .home-container .footer .tab {
     margin-bottom: 16px;
     text-align: center;
   }
   .home-container .footer .tab a {
     position: relative;
     display: inline-block;
     padding: 0 15px;
     font-size: 14px;
     height: 14px;
     line-height: 14px;
     color: #000;
   }
   .home-container .footer .foot-logo {
     background: url(../../static/qq_music/logo_footer.png) no-repeat 0 0 / cover;
     width: 82px;
     height: 24px;
     margin: 0 auto 10px;
     text-indent: -99999px;
   }
   .home-container .footer .copy,
   .home-container .footer .phone{
     font-size: 10px;
     color: rgba(0,0,0,.5);
     text-align: center;
   }
   .home-container .footer .phone {
     margin-top: 5px;
   }

   .loading-container {
     position: absolute;
     width: 100%;
     height: 100%;
     top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
   }
</style>
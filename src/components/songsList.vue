<template>
  <div class="songs-container" :style="!songsBox.length ? 'height:100vh' : ''">
    <scroll :data="songsBox" class="toplist">
      <div class="songs-list">
        <ul>
          <li v-for="(item, index) in songsBox" :key="item.id" @click="songsList(item)">
            <div class="top-main">
              <a href="#" class="top-media">
                <img :src="item.picUrl" alt>
              </a>
              <div class="top-info">
                <div class="top-count">
                  <h3 class="top-tit">{{ item.topTitle }}</h3>
                  <p v-for="(li, index) in item.songList">
                    {{ index+1 }}
                    <span>{{ li.songname }}</span>
                    {{ li.singername }}
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="loading-container" v-if="!songsBox.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import Loading from "../base/loading/loading";
import axios from "axios";
import { getRecommend } from "./common/recommoned";
import json from "./common/jsonp";
import Scroll from "../base/scroll/scroll";
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      songsBox: []
    };
  },
  created() {
    setTimeout(() => {
      this.getHot();
    }, 1000);
  },
  methods: {
    songsList(item) {
      this.$router.push({
        path: "/songs/" + item.id
      });
      this.rankList(item)
    },
    getHot() {
      axios.get("http://127.0.0.1:3000/getJson").then(res => {
        this.songsBox = JSON.parse(res.data);
        console.log(this.songsBox);
      });
    },
    ...mapMutations({
      rankList: 'SET_RANKLIST'
    }) 
  },
  components: {
    Loading,
    Scroll
  }
};
</script>

<style lang="" scoped>
.songs-container {
  background-color: #f4f4f4;
  /* position: relative; */
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
.songs-container .songs-list {
  margin: 10px;
}
.songs-container .toplist {
  overflow: hidden;
  height: 100%;
}
.songs-container .songs-list ul {
}
.songs-container .songs-list ul li {
  overflow: hidden;
  margin-bottom: 10px;
}
.songs-container .songs-list ul li .top-main {
  display: flex;
  background-color: #fff;
}
.songs-container .songs-list ul li .top-main .top-media {
  position: relative;
  width: 100px;
  height: 100px;
  display: block;
}
.songs-container .songs-list ul li .top-main .top-media img {
  width: 100%;
  display: block;
}
.songs-container .songs-list ul li .top-main .top-info {
  position: relative;
  flex: 1;
  overflow: hidden;
}
.songs-container .songs-list ul li .top-main .top-info .top-count {
  margin: 0 10px 0 15px;
}
.songs-container .songs-list ul li .top-main .top-info .top-count .top-tit {
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: 400;
  color: #000;
}
.songs-container .songs-list ul li .top-main .top-info .top-count p {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 4px;
  max-width: 260px;
}
.songs-container .songs-list ul li .top-main .top-info .top-count p span {
  color: #000;
  margin-left: 8px;
  margin-right: 5px;
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
  z-index: 1111111;
}

.te {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
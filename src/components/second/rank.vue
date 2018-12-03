<template>
  <!-- <div class="rank-container">
    <div class="rank-list">
      <div class="rank-i">
        <div class="album">
          <div class="album-img">
            <img src="../../../static/qq_music/T002R300x300M0000007sxRu0jEvnU.jpg" alt>
          </div>
          <div class="album-t">
            <h1>巅峰榜·流行指数</h1>
            <p>第334天</p>
            <p>2018-11-30 更新</p>
          </div>
        </div>
        <div class="opt-box"></div>
      </div>
      <img class="bg" src="../../../static/qq_music/T002R300x300M0000007sxRu0jEvnU.jpg" alt>
    </div>

    <div class="song-list">
      <div class="list-main">
        <div class="count">排行榜
          <span>100</span>首
        </div>
        <ul>
          <li v-for="(item, index) of list" :key="index">
            <div class="list-order">
              <span>{{ index + 1 }}</span>
            </div>
            <div class="list-name">
              <div>
                <h3>{{ item.data.songname }}</h3>
                <p>{{ item.data.singer[0].name }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>-->
  <transition mode="out-in">
    <music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>
<script>
import axios from "axios";
import { getMusicList } from "../common/recommoned";
import musicList from "./musicList";
import { mapGetters } from "vuex";
import { createSong } from "../common/song.js";
export default {
  data() {
    return {
      show_head: true,
      songs: [],
      topList: this.$route.params,
      bg: ""
    };
  },
  computed: {
    title() {
      return this.rankList.topTitle;
    },
    bgImage() {
      return this.bg;
    },
    ...mapGetters(["rankList"])
  },
  created() {
    this._getMusicList();
    // console.log(this.list)
    console.log(this.rankList);
  },
  methods: {
    _getMusicList() {
      getMusicList(this.topList.id).then(res => {
        this.songs = this._normalizeSongs(res.songlist)
        this.bg = res.topinfo.pic_album
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        const musicData = item.data;
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  },
  components: {
    musicList
  }
};
</script>

<style lang="" scoped>
.v-enter,
.v-leave-to {
  transform: translate3d(100%, 0, 0);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.4s;
}
.rank-list {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 274px;
  overflow: hidden;
  color: #fff;
  background: #fff;
}
.rank-list .bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-transform: scale(1.1) translateZ(0);
  -webkit-filter: blur(36px);
}
.rank-list .rank-i {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
}
.rank-list .rank-i .album {
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  -webkit-box-sizing: border-box;
  width: 100%;
  margin-top: 17px;
  padding: 0 16px;
  overflow: hidden;
}
.rank-list .rank-i .album .album-img {
  position: relative;
  width: 125px;
  height: 125px;
  margin-right: 10px;
  overflow: hidden;
}
.rank-list .rank-i .album .album-img img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.rank-list .rank-i .album .album-t {
  position: relative;
  -webkit-box-flex: 1;
}
.rank-list .rank-i .album .album-t h1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 47px;
  line-height: 1.3;
  overflow: hidden;
  font-size: 18px;
}
.rank-list .rank-i .album .album-t p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 36px;
  overflow: hidden;
  margin-top: 8px;
}

.song-list {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  padding-bottom: 0;
  overflow: hidden;
}
.song-list .list-main {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  padding-top: 274px;
  padding-bottom: 50px;
  overflow: hidden;
  will-change: transform;
}
.song-list .list-main .count {
  position: relative;
  display: -webkit-box;
  -webkit-box-align: center;
  height: 54px;
  margin: 0 16px -10px;
  font-size: 14px;
}
.song-list .list-main ul {
  overflow: hidden;
}
.song-list .list-main ul li {
  display: flex;
  position: relative;
}
.song-list .list-main ul li .list-order {
  width: 45px;
  margin-right: -16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.song-list .list-main ul li:nth-child(1) .list-order span,
.song-list .list-main ul li:nth-child(2) .list-order span,
.song-list .list-main ul li:nth-child(3) .list-order span {
  color: #ff400b;
}
.song-list .list-main ul li .list-name {
  position: relative;
  -webkit-box-flex: 1;
  display: -webkit-box;
  -webkit-box-align: center;
  padding: 10px 16px;
  overflow: hidden;
}
.song-list .list-main ul li .list-name div {
  flex: 1;
  position: relative;
}
.song-list .list-main ul li .list-name div h3 {
  font-size: 16px;
  color: #000;
  font-weight: 300;
}
.song-list .list-main ul li .list-name div p {
  display: -webkit-box;
  -webkit-box-align: center;
  overflow: hidden;
  color: #777;
}
</style>
<template>
  <div class="musicList-container">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
       <div class="filter" ref="filter"></div>
      <div class="play-wrapper">
        <div ref="playBtn" class="play" v-show="songs.length > 0">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
     
    </div>
    <div class="bg-layer" ref="layer"></div>
    <Scroll
      :data="songs"
      :probe-type="probeType"
      :listen-scroll="listenScroll"
      @scroll="scroll"
      class="list"
      ref="list"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" :rank="rank"></song-list>
      </div>
      <div v-show="!songs.length"  class="loading-container">
        <loading></loading>
      </div>
    </Scroll>
  </div>
</template>
<script>
import Scroll from "../../base/scroll/scroll";
import SongList from "../../base/songsLists/songLists";
import Loading from '../../base/loading/loading'
const MAX_HEIGHT = 40
export default {
  props: {
    songs: {
      type: Array,
      default: []
    },
    bgImage: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scrollY: 0
    };
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`;
    }
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.minTranslateY = -this.imageHeight + MAX_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`;
  },

  methods: {
    scroll(e) {
      this.scrollY = e.y
    }
  },
  watch: {
    scrollY(newval, oldval) {
      // console.log(oldval)
      // console.log('new: %s----old: %s',newval,oldval)
      let translateY = Math.max(this.minTranslateY, newval)
      let zIndex = 0
      let scale = 0
      this.$refs.layer.style['transform'] = `translate3d(0, ${translateY}px, 0)`
      let skewing = Math.abs(newval / this.imageHeight)
      if (newval > 0) {
        this.$refs.bgImage.style['transform'] = `scale(${1 + skewing})`
        zIndex = 10
      }

      if (newval < this.minTranslateY) {
        zIndex = 10
        this.$refs.bgImage.style['paddingTop'] = 0
        this.$refs.bgImage.style['height'] = `${MAX_HEIGHT}px`
        this.$refs.playBtn.style['display'] = 'none'
      } else {
        this.$refs.bgImage.style['paddingTop'] = '70%'
        this.$refs.bgImage.style['height'] = 0
         this.$refs.playBtn.style['display'] = ''
      }
      this.$refs.bgImage.style['zIndex'] = zIndex
    }
  },
  components: {
    Scroll,
    SongList,
    Loading
  }
};
</script>
<style scoped>
.musicList-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 111;
  background-color: #fff;
}
.back {
  position: absolute;
  top: 0;
  left: 6px;
  z-index: 50;
}
.icon-back {
  display: block;
  padding: 10px;
  font-size: 22px;
  color: #ffcd32;
}
.title {
  position: absolute;
  top: 0;
  left: 10%;
  z-index: 40;
  width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  color: #31c27c;
}
.bg-image {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 70%;
  transform-origin: top;
  background-size: cover;
}
.play-wrapper {
  position: absolute;
  bottom: 20px;
  width: 100%;
}
.play {
  box-sizing: border-box;
  width: 135px;
  padding: 7px 0;
  margin: 0 auto;
  text-align: center;
  border: 1px solid #31c27c;
  color: #31c27c;
  border-radius: 100px;
  font-size: 0;
}
.icon-play {
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
  font-size: 16px;
}
.text {
  display: inline-block;
  vertical-align: middle;
  font-size: 12px;
}
.bg-layer {
  position: relative;
  height: 100%;
  background: #fff;
}
.list {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
}
.song-list-wrapper {
  padding: 20px 30px;
}
.filter {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(7, 17, 27, 0.4);
}

.loading-container{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #000
}
</style>

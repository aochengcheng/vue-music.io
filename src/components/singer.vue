<template>
  <div class="singer-container">
    <scroll :data="list_group" class="listview" @scroll="scroll" ref="listview">
      <ul>
        <li class="list-group" v-for="(group, index) in list_group" :key="index" ref="listGroup">
          <h2 class="list-group-title">{{ group.title }}</h2>
          <ul>
            <li class="list-group-item" v-for="item in group.items" @click="select(item)">
              <img class="avatar" :src="item.avatar">
              <span class="name">{{ item.name }}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="bar">
        <ul
          @touchstart.stop.prevent="onTouchStart"
          @touchmove.stop.prevent="onTouchMove"
          @touchend.stop
        >
          <li v-for="(item, index) in letter" :data-index="index" v-text="item" :class="{'current': currentIndex===index}">

          </li>
        </ul>
      </div>

      <div class="list-fixed" ref="fixed" v-show="fixedTitle">
        <div class="fixed-title">{{ fixedTitle }}</div>
      </div>
    </scroll>

    <!-- <div class="loading-container" v-if="!list_group.length">
      <Loading></Loading>
    </div>-->

      <router-view></router-view>

    
  </div>
</template>
<script>
import Loading from "../base/loading/loading";
import Scroll from "../base/scroll/scroll";
import axios from "axios";
import { getSingerList } from "./common/recommoned";
import Singer from "./common/singer";
import { mapMutations } from 'vuex'


const HOT_SINGER_LEN = 10;
const HOT_NAME = "热门";
const TITLE_HEIGHT = 30;
const ANCHOR_HEIGHT = 18;
export default {
  data() {
    return {
      list_group: [],
      letter: [],
      currentIndex: 0,
      scrollY: -1,
      diff: -1
    };
  },
  created() {
    this._getSingerList();
    this.probeType = 3;
    this.listenScroll = true;
    this.touch = {};
    this.listHeight = [];
  },
  mounted() {
    // console.log(this.$store.state)
  },
  computed: {
    fixedTitle() {
      if (this.scrollY > 0) {
        return "";
      }
      return this.list_group[this.currentIndex]
        ? this.list_group[this.currentIndex].title
        : "";
    }
  },
  methods: {
    select(item) {
      this.$router.push({
        path: '/singer/' + item.id
      })
      this.add_singer(item)
    },
    _getSingerList() {
      getSingerList()
        .then(result => {
          this.list_group = this._normalizeSinger(result.data.list);
          this.list_group.map(group => {
            this.letter.push(group.title.substr(0, 1));
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            })
          );
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          })
        );
      });
      // 为了得到有序列表，我们需要处理 map
      let ret = [];
      let hot = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    },
    getData(el, name, val) {
      let pox = "data-";
      if (val) {
        return el.setAttribute(pox + name, val);
      }
      return el.getAttribute(pox + name);
    },
    selectItem(item) {
      this.$emit("select", item);
    },
    onTouchStart(e) {
      let anchorIndex = this.getData(e.target, "index");
      let firstTouch = e.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.touch.anchorIndex = anchorIndex;
      this._scrollTo(anchorIndex);
    },
    onTouchMove(e) {
      
      let firstTouch = e.touches[0];
      this.touch.y2 = firstTouch.pageY;
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0;
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
      console.log(anchorIndex)
      this._scrollTo(anchorIndex);
    },
    refresh() {
      this.$refs.listview.refresh();
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    _calculateHeight() {
      this.listHeight = [];
      const list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return;
      }
      if (index < 0) {
        index = 0;
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2;
      }
      this.scrollY = -this.listHeight[index];
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
    },

    ...mapMutations({
      add_singer: 'SET_SINGER'
    })
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
    scrollY(newY) {
      const listHeight = this.listHeight;
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
          this.diff = height2 + newY;
          return;
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2;
    },
    diff(newVal) {
      let fixedTop =
        newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0;
      if (this.fixedTop === fixedTop) {
        return;
      }
      this.fixedTop = fixedTop;
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
    }
  },

  components: {
    Scroll,
    Loading
  }
};
</script>

<style lang="" scoped>
.singer-container {
  position: fixed;
  top: 84px;
  bottom: 0;
  width: 100%;
}
.singer-container > div.one {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
}
.list-group {
  padding-bottom: 30px;
}
.list-group-title {
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: #fff;
  background: #31c27c;
}
.list-group-item {
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding: 20px 0 0 30px;
}
.list-group-item .avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.list-group-item .name {
  margin-left: 20px;
  /* color: rgba(255,255,255,0.5); */
  color: #000;
  font-size: 14px;
}

.bar {
  position: absolute;
  z-index: 30;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  padding: 20px 0;
  border-radius: 10px;
  text-align: center;
  background: #31c27c;
}
.bar ul li {
  padding: 3px;
  line-height: 1;
  /* color: rgba(255, 255, 255, 0.5); */
  color: #fff;
  font-size: 12px;
}
.bar ul li.current {
  color: #000;
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
  background-color: #000;
  z-index: 1111111;
}

.listview {
  height: 100%;
  overflow: hidden;
}
.current {
  color: #000
}

.list-fixed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.fixed-title {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: 12px;
    color: #fff;
    background: #31c27c;
}

/* .v-enter,
.v-leave-to {
  transform: translate3d(100%,0,0);
}
.v-enter-active,
.v-leave-active {
  transition: all .4s;
} */
</style>
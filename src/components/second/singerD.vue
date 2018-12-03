<template>
  <transition mode="out-in">
    <musicList :songs="songs" :title="title" :bgImage="bgImage"></musicList>
  </transition>
</template>
<script>
import musicList from "./musicList";
import { mapGetters } from "vuex";
import { getSingerDetail } from "../common/recommoned.js";
import { createSong } from "../common/song.js";
export default {
  data() {
    return {
      songs: []
    };
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(["singer"])
    // singer() {
    //   return this.$store.getters.singer
    // }
  },
  created() {
    console.log(this.singer);
    setTimeout(() => {
      this._getSingerDetail();  
    }, 1000);
    
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(result => {
        this.songs = this._normalizeSongs(result.data.list)
       
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        let { musicData } = item;
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
<style scoped>
.v-enter,
.v-leave-to {
  transform: translate3d(100%, 0, 0);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.4s;
}
</style>



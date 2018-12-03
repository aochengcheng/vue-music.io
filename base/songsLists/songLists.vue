<template>

  <div class="songList-container">
    <ul>
      <li v-for="(item, index) in songs" class="item" :key="index">
        <div class="content">
          <h2 class="name">{{ item.name }}</h2>
          <p class="desc">{{ getDesc(item) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    songs: {
      type: Array,
      default: []
    }
  },
  mounted(){
  },
  methods: {
    getDesc(song) {
      return `${song.singer} ~ ${song.album}`
    }
  },

};
</script>
<style scoped>
.item {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 64px;
  font-size: 14px;
}
.songList-container .content {
  flex: 1;
  line-height: 20px;
  overflow: hidden;
}
.content .name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #000;
  font-size: 14px;
  font-weight: 400;
}
.content .desc {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 4px;
  color: #31c27c;
}
</style>



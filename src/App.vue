<template>
  <div id="app">
    
      <headers v-if="header_show" v-show="$route.meta.showHeader"></headers>
    
    <nav class="category"  v-if="header_show" v-show="$route.meta.showHeader">
      <router-link :to="{ path: '/home' }" >推荐</router-link>
      <router-link :to="{ path: '/singer' }">歌手</router-link>
      <router-link :to="{ path: '/songs' }">排行榜</router-link>
      <router-link :to="{ path: '/searchBox/content1' }">搜索</router-link>
    </nav>
    <keep-alive>
      <transition mode="out-in" >
        <router-view></router-view>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
import headers from './components/base/search'

export default {
  name: 'App',
  data() {
    return {
      header_show: true,
      footer_show: true,
    }
  },
  created() {
    // console.log(this.$route)
  },
  methods: {
    
  },
  components: {
    headers
  }
}
</script>

<style scoped>
.v-enter,
.v-leave-to {
  /* opacity: 0; */
  transform: translateX(100%) 
}
.v-leave-to {
  /* opacity: 0; */
  transform: translateX(-100%);
  position: absolute
}
.v-enter-active,
.v-leave-active {
  transition: all .5s ease
}
.router-link-active {
  position: relative;
    color: #31c27c;
}
  #app {
    min-width: 320px;
    max-width: 640px;
    width: 100%;
    margin: 0 auto;
    overflow-x: hidden;
  }

   .category {
    display: flex;
    height: 40px;
    background-color: #fff;
  }
  .category a {
    flex: 1;
    height: 40px;
    line-height: 40px;
    color: rgba(0,0,0,.6);
    text-align: center;
    font-size: 16px;
  }
   /* .category a.current {
    position: relative;
    color: #31c27c;
  } */
  .category a.router-link-active::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: 0;
    left: 0;
    background-color: #31c27c;
  }
</style>

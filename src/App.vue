<template>
  <div id="app">
        <myHeader></myHeader>
        <my-tab></my-tab>
        <!-- 路由 -->
        <keep-alive>
        <!-- <keep-alive exclude="recommend,singer"> -->
        <router-view></router-view>
        </keep-alive>
        <player></player>
  </div>
</template>

<script>
import player from 'pages/player/player'
import myHeader from './components/my-header.vue'
import myTab from './components/my-tab.vue'
export default {
  components:{myHeader,myTab,player},
 
}
</script>

<style lang="less" scoped>
@import url('./style/index.less');
// #app{
  
// }

</style>

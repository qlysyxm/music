<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in data "
                                  :key="index"
        >
        <img :src="item" alt="">
        </div>

    </div>
  </div>  
</template>
</template>

<script>
import Swiper from 'swiper'
export default {
props: {
    data: {
      type: Array,
      default: [4, 5, 6]
    }
  },
methods:{
  initBanner () {
      /* 轮播图类名要加点 */
      new Swiper ('.swiper-container', {
        // 自动播放
        autoplay: true,
        // 循环模式选项
        loop: true,         
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
    }
},
watch: {
    // watch 监听的 DOM 元素是 修改之前的
    data (newValue, oldValue) {
      // 初始化 DOM 元素的时候，能不能获取到 DOM
      this.$nextTick(() => {
        this.initBanner()
      })
    }
  },
mounted(){
      this.initBanner()
    }    
}
</script>


<style scoped lang="less">
@import url('../../node_modules/swiper/css/swiper.css');
@import url(../style/index.less);
img{
  .w(375);
  .h(150)
}
</style>

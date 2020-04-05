<template>
<div class="singer-box">
  <div class="singer">
    <!-- 歌手列表 -->
    <ul>
      <li v-for="(item,index) in singers"
        :key='index'
         ref='test'
      >
      <div class="title">{{item.title}}</div>

      <ol>
        <li v-for="(sItem,sIndex) in item.list"
          :key='sIndex'
          @click="jumpDetail(sItem.Fsinger_mid)"
        > 
          <img :src="'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + (sItem.Fsinger_mid) + '.jpg'" alt="">
          <span>{{sItem.Fsinger_name}}</span>
          
        </li>
      </ol>

      </li>
    </ul>
    <!-- 右边栏 -->
    <ul class="slider"
          @touchstart='touchStart'
          @touchmove.stop='touchMove'
          @touchend='touchEnd'
    >
      <li v-for="(item,index) in sliderData" 
          :key="index"
          :class='selIndex===item?"sel":""'
          @click="sliderClick(item)"
    >
          {{item}}
      </li>
    </ul>
  </div>
  <router-view></router-view>
</div>
  
</template>

<script>
import {getSingerList} from 'api/index.js'
import {initSingerData} from './singer.js'
import Bs from 'better-scroll'
export default {
  data(){
    return{
      singers:[],
      selIndex:''
    }
  },
  computed:{
    sliderData(){
      let result = this.singers.map((item,index)=>{
        return item.title
      })
      return result
    }
  },
  methods:{
    jumpDetail(mid){
        var mid=mid||'002J4UUk29y8BY'
        this.$router.push(`./singer/${mid}`)
    },
    initBs(){
      this.bs=new Bs('.singer',{
        probeType:3,
        click:true
      })
      this.bs.on('scroll',(pos)=>{
          let y = Math.abs(pos.y)  //获取向上滚动距离
          // console.log(y)
          let index=0
          for (let i = 0; i < this.tops.length; i++) {
                if(y>=this.tops[i]&&y<this.tops[i+1]){
                  index=i
                  // console.log('满足',i)
                }
          }
          // console.log(index)
          this.selIndex = this.sliderData[index]
      })
    },
// 获取滚动高度列表数据
    getTops(){
      this.tops = this.$refs.test.map((item,index)=>{
            return item.offsetTop
      })
      // console.log(this.tops)
    },
// 点击侧边栏
    sliderClick(item){
        this.selIndex=item
        let index = this.sliderData.indexOf(item)
        this.moveElement(index)
    },
    moveElement(index){
        this.bs.scrollToElement(this.$refs.test[index])
    },
//滑动事件
    touchStart(){
      console.log('按下')
    },
    touchMove(e){
      let distanceY=e.touches[0].pageY-100
      let num = parseInt(distanceY/18)
      this.moveElement(num)
      console.log('移动',distanceY,num)
    },
    touchEnd(){
      console.log('抬起')
    },
  },
  
  created(){
      getSingerList().then((res)=>{
            let result = initSingerData(res.data.list)
            this.singers=result
            this.$nextTick(()=>{
            this.getTops()
            })
        })
    },
  mounted(){
      this.initBs()
    }

}
</script>


<style scoped lang="less">
@import url(~style/index.less);
.singer{
  .fixed(88,0,0,0,@black);
  overflow: hidden;
  background: @black;
  .title{
    .w(375);
    .h(30);
    background:#333333;
    .l_h(30);
    font-size: @fs-xs;
    color: rgba(255, 255, 255, .5);
    .padding(0,0,20,0);
  }
  ol{
    li{
      .w(375);
      .h(70);
      font-size: @fs-m;
      .padding(20,0,30,0);
      span{
        .margin(0,0,20,0);
        color: rgba(255, 255, 255, .5);
      };
      img{
        .w(50);
        .h(50);
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle
      }
    }
  }
  .slider{
    position: absolute;
    top: 70px;
    right:0px;
    z-index: 2;
    font-size: @fs-xs;
    background:rgba(0,0,0,.3);
    border-radius: 10px;
     li{
       .w(20);
       .h(18);
       .l_h(18);
       .t_c();
       color:#fff;
       opacity: .5;

     }
    .sel{
        color: @yellow;
      }
  }
}





</style>

<template>
  <div class="rank">
    <div class="view-box">
      <ul class="bigbigbig">
        <li class="every" v-for="(item,index) in list"
            :key="index"
        >
          <img :src='item.picUrl' alt="">
          <ul class="songlist">
            <li v-for="(sItem, sIndex) in item.songList"
              :key="sIndex"
              @click="tiao('/rankdetail')"
            >
              <span>{{ sIndex + 1 }}. </span>
              <span>{{ sItem.songname }} - {{ sItem.singername }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getRankList} from '../api'
import Bs from 'better-scroll'
export default {
  data(){
    return {
      list:{}
    }
  },
  methods:{
    initBs(){
      new Bs('.view-box',{
         click:true
      })
    },
    tiao(url){
      this.$router.push(url)
      console.log('我同桌最可爱');
    }
  },
  created(){
    getRankList().then((data)=>{
      // console.log(data)
      this.list = data.data.topList
      // console.log(this.list)
    })
  },
  mounted(){
    this.initBs()
  }
}
</script>


<style scoped lang="less">
@import url('../style/index.less');
.rank{
  .fixed(88,0,0,0,@black);
  .view-box{
    width: 100%;
    height: 100%;
    background:@black;
    overflow: hidden;
    .bigbigbig{
      display: flex;
      flex-direction: column;
      align-items: center;
      .every{
        display: flex;
        justify-content: space-around;
        .padding(10,10,0,0);
        img{
        .w(100);
        .h(100);
      }
      .songlist{
        .w(235);
        .h(100);
        background: #333;
        font-size: @fs-xs;
        color: rgba(255, 255, 255, .3);
        .padding(0,0,10,10);
        li{
          .h(30);
          .l_h(30)
        }
      }
      }
     
    }
  }
}

</style>

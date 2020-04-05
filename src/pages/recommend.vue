<template>
  <div class="recommend">
        <div class="view-box">
          <div class="content">
              <div class="banner">
                 <mt-swipe :auto="4000">
                  <mt-swipe-item
                  v-for='(item,index) in banners'
                  :key='index'
                  >
                    <img :src="item" alt="">
                  </mt-swipe-item>
                </mt-swipe>
                <!-- <my-banner :data="banners"></my-banner> -->
              </div>
              <ul>
                <h3>热门歌单推荐</h3>
                <li v-for="(item,index) in list" :key="index"  @click="tiao('/recommenddetail')">
                  <!-- <img :src='item.imgurl' alt=""> -->
                   <img v-lazy='item.imgurl' alt="">
                 <p>
                   <b>{{item.creator.name}}</b>
                   <br/>
                   <em>{{item.dissname}}</em>
                 </p> 
                </li>
              </ul>
          </div>
        </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';
import myBanner from '../components/my-banner'
import Bs from 'better-scroll'
import {getBannerList,getRecommendList} from '../api'
export default {
  components:{myBanner},
  data(){
    return{
      list:[],
      banners:[]
    }
  },
  methods:{
      initBs(){
        this.bs = new Bs('.view-box',{
         click:true,
         pullUpLoad: {
         threshold: 50
        },
        pullDownRefresh: {
          threshold: 50,
          stop: 20
        }
      })
      // 下拉刷新
      this.bs.on('pullingDown',()=>{
        console.log('下拉刷新');
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        Indicator.open('加载中...');
          getRecommendList().then((data)=>{
          this.list=data.data.list
          this.bs.finishPullDown();
          Indicator.close();
      })
      })
      //上拉加载触发的事件
      this.bs.on('pullingUp',()=>{
        console.log('加载更多');
       //下一页的ajax请求
        this.bs.finishPullUp()
      })
      },
       tiao(url){
      this.$router.push(url)
      console.log('我最可爱');
    }
  },
      // 生命周期钩子
      activated(){
      console.log('激活触发')
    },
      deactivated(){
      console.log('失活触发')
    },
  created(){
    console.log('推荐创建');
      getRecommendList().then((data)=>{
        // console.log(data)
        this.list=data.data.list
        // console.log(this.list)
      })
      getBannerList().then((res)=>{
        this.banners=res.data.slider.map((item)=>{
            return item.picUrl
        })
        // console.log(this.banners)
        })
  },
  mounted(){
    this.initBs()
  }  
}
</script>


<style scoped lang="less">
@import url(../style/index.less);
.recommend{
  .fixed(88,0,0,0,@black);
  .view-box{
     width: 100%;
     height: 100%;
     overflow: hidden;
     .content{
       .w(375);
       .banner{
         .w(375);
         .h(150);
         img{
           .w(375);
           .h(150);
         }
      }
      ul{
        font-size: @fs-s;
        margin-top:20px;
        h3{
          .t_c();
          color: @yellow
        }
        li{
          .margin(10,0,0,0)
        }
        img{
          .w(60);
          .h(60);
          .margin(10,10,20,10)
        }
        p{
          .w(255);
          float: right;
          b{
            .margin(10,0,0,0);
            display: inline-block;
            font-weight:normal;
            color: #fff
          };
          em{
            .margin(16,0,0,0);
            display: inline-block;
            font-style: normal;
            color: #999
          }
        }
      }
     }
  };
   
}
</style>

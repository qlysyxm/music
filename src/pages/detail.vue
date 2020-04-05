<template>
  <div class="detail">
    <div class="head" :style="bgstyle">
        <div class="toptop">
          <b @click="back">&lt;</b>
            <span>{{name}}</span>
            <span></span>
        </div>
            
    </div>  
    <div class="view-box">
    <ul class="content">
          <li v-for="(item ,index) in list" :key="index" @click="goPlay(index)">
              <p class="song">{{item.songname}}</p>
              <p class="album">
                <span v-for="(singername,singerindex) in item.singer" :key="singerindex">
                    {{singername.name}}
                </span>·
                {{item.albumname}}
              </p>
      </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Bs from 'better-scroll'
import {getSongList,getMusicUrl} from 'api/index.js'
import {songData,getAvatorUrl} from 'utils/song.js'
import {mapMutations} from 'vuex'
export default {
  data(){
     return{
        name:'',
        img:'' || '002J4UUk29y8BY',
        list:[]
     }
  },
  computed:{
    bgstyle(){
      return `background-image:url(${this.img})`
    }
  },
  methods:{
    initBs(){
      new Bs('.view-box',{
          probeType:3,
          click:true
      })
    },
    ...mapMutations(['addSongList','changeNowIndex']),
    goPlay(index){
      // console.log('111')
      // getMusicUrl(songmid).then((res)=>{console.log(res)})
      this.addSongList(this.list)
      this.changeNowIndex(index)
    },
    back(){
      this.$router.go(-1)
    },
    getSongData(mid){
      getSongList(mid).then((res)=>{
        // console.log(res)
        this.name = res.data.singer_name
        this.img = getAvatorUrl(res.data.singer_mid)
        let tmpdata = songData(res.data.list)
        getMusicUrl(tmpdata).then((res)=>{
          // console.log(res)
          this.list = res
          })
        // console.log('处理后歌手数据',this.list)
      })
    }
  },
  created(){
    let mid = this.$route.params.mid
    // console.log(mid)
    this.getSongData(mid)
  },
  mounted(){
    this.initBs()
  }
}
</script>


<style scoped lang="less">
@import '~style/index.less';
.detail{
  .fixed(0,0,0,0,@black);
  .head{
    .w(375);
    .h(262.5);
    background-size: 100%,100%;
    .toptop{
      .w(375);
      .h(40);
      display: flex;
      justify-content: space-around;
      align-items: center;
      span{
        font-size: @fs-l;
        color: #ffffff;
      }
      b{
        color: @yellow;
        .margin(0,0,-26,0)
      }
    }
  }
  .view-box{
    width: 100%;
    height: 100%;
    background:@black;
    
    .content{
      // .w(375);
      // .w(315);
      // .fixed(262.5,0,0,0,@black);
      background: #222;
    li{
      .w(315);
      .h(64);
      font-size: @fs-s;
      font-weight:400;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .padding(0,0,30,0);
      .song{
        color: #fff;
      };
      .album{
        color: rgba(255, 255, 255, .3)
      }
    }
    }
  }
}
</style>

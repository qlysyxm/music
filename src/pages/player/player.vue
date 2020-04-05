<template>
  <div class="player" v-if="songList.length>0">
    <div class="big" v-if="fullScreen">
           <div class="bg">
               <img :src="currentSong.albumUrl" alt="">
           </div>
            <!-- <button class="back" @click="changeSmall">V</button> -->
            <h3 @click="changeSmall">V</h3>
            <h1>
                {{currentSong.songname}}
            </h1>
            <h2>
                <span v-for="(item,index) in currentSong.singer" :key="index">
                    {{item.name}}
                </span>
            </h2>
            <div class="img">
                <img :src="currentSong.albumUrl" :class='cdClass' alt="">
            </div>
            <div class="musicUrl">
                <audio ref='audio' 
                        :src="currentSong.musicUrl" 
                        @ended="musicEnd"
                        @canplay="canplay"
                        @timeupdate='timeupdate'
                       
                ></audio>
            </div>
            <div class="lyric">
                {{text}}
            </div>
            <my-progress :endTime='currentSong.interval'
                         :startTime='currentTime'
                         :changePlayTime='changePlayTime'
            >
            </my-progress>
            <div class="bofangqi">
                <i @click="prev" class="iconfont icon-shangyishou"></i>
                <i :class="playing?'iconfont icon-bofangqi-zanting':'iconfont icon-xingzhuang'" @click="play"></i>
                <i @click="next" class="iconfont icon-xiayishou"></i>
            </div>
    </div>

    <div @click="changeBig" class="small" v-else>
            <div class="small-img">
                <img :src="currentSong.albumUrl" :class='cdClass' alt="">
            </div>
            <h5>
               {{currentSong.songname}} 
            </h5>
            <h6>
                <span v-for="(item,index) in currentSong.singer" :key="index">
                    {{item.name}}
                </span>
            </h6>
            <i :class="playing?'iconfont icon-bofangqi-zanting':'iconfont icon-xingzhuang'" @click="play"></i>
            
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations,mapGetters} from 'vuex'
import MyProgress from 'components/my-progress.vue'
import {getLyric} from 'api/index.js'
import {Base64} from 'js-base64'
import Lyric from 'lyric-parser'
export default {
    components:{MyProgress},
    data(){
        return{
            text:'暂无歌词',
            currentTime:0,
            playing:false
        }
    },
    computed:{
        ...mapState(['songList','fullScreen','nowIndex','loop']),
        ...mapGetters(['currentSong']),
        cdClass(){
            return this.playing?'play':'paly paused'
        }
    },
    methods:{
        ...mapMutations(['toggleScreen','changeNowIndex']),
        changeSmall(){
            this.toggleScreen(false)
        },
        changeBig(){
            this.toggleScreen(true)
        },
        play(){
            
            if(this.playing){
                this.playing=false
                this.audio.pause()
            }else{
                this.audio.play()
                this.playing=true
            }
            this.lyricObj.togglePlay()
        },
        // 上一曲
        prev(){
            let nowIndex = this.nowIndex
            let nextIndex = --nowIndex
            this.changeNowIndex(nextIndex)
        },
        // 下一曲
        next(){
            let nowIndex = this.nowIndex
            let nextIndex = ++nowIndex
            this.changeNowIndex(nextIndex)
        },
        musicEnd(){
            this.playing = false
            this.musicLoop(2)
        },
        musicLoop(loopstate){
            switch (loopstate) {
                case 0:
                    break;
                case 1:
                    this.playing = true
                    this.audio.play()
                    break;
                case 2:
                    this.playing = true
                    let length = this.songList.length
                    let index = parseInt(Math.random()*length)
                    this.changeNowIndex(index)
                    break;
                default:
                    break;
            }
        },
        // 歌曲时间变化监听
        timeupdate(e){
            // console.log('时间变了')
            this.currentTime=e.target.currentTime
        },
        changePlayTime(time){
            if(!this.audio)
            return false
            this.audio.currentTime=time
            this.lyricObj.seek(time*1000)
        },
        canplay(){
            if(!this.audio){
                this.audio=this.$refs.audio
            }
            if(this.playing){
                this.audio.play()
            }
            // console.log('可以播放')
        }
    },
    created(){
    },
    watch:{
        currentSong(newValue,oldVlaue){
            let songmid = newValue.songmid
            getLyric(songmid).then((res)=>{
                let string = Base64.decode(res.lyric)
                this.lyricObj = new Lyric(string,(text)=>{
                    this.text=text.txt
                })
                // console.log(this.lyricObj)
            })
        }
    }
}
</script>


<style scoped lang="less">
@import '~style/index.less';
@import url('../../assets/ic/iconfont.css');
.player{
   .big{
       .fixed(0,0,0,0,rgba(0,0,0,.7));
        z-index: 4;
        h3{
            color:@yellow;
        }
        .bg{
            width: 100%;
            height: 100%;
            position: absolute;
            z-index:-10;
            img{
                width: 100%;
                height: 100%;
                filter: blur(5px);
            }
        }
        h1{
            .t_c;
            font-size: @fs-xl;
            margin-top: 10px;
            color: #fff;
        }
        h2{
            font-size: @fs-s;
            .t_c;
            margin-top: 10px;
            color: #fff
        }
        .img{
            display: flex;
            justify-content: center;
            img{
                .w(280);
                .h(280);
                border-radius: 50%;
                margin-top: 10px;
                &.play{
                    animation: rotate 5s linear infinite;
                }
                &.paused{
                    animation-play-state: paused;
                }
                
            };
            
        }
        .musicUrl{
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
        .lyric{
            font-size: @fs-s;
            color:rgba(255,255,255,.5);
            .t_c;
        }
        .bofangqi{
            display: flex;
            justify-content: space-around;
            i{
                font-size: 30px;
                color: @yellow
            }
        }
   }
   .small{
       position: fixed;
       height: 80px;
       background:#333;
       .w(375);
       .h(60);
       bottom: 0;
       z-index: 4;
       display: flex;
       .small-img{
           img{
               .w(55.67);
               .h(55.67);
                border-radius: 50%;
                .margin(2,2,10,0)
           }
       }
       h5{
            .t_c;
            font-size: @fs-s; 
            .margin(8,0,12,0);
            color: #fff;
        }
        h6{
            .t_c;
            font-size: @fs-xs;
            .margin(33,0,-33,0);
            color: #fff;
        };
        i{
            font-size: 30px;
            color: @yellow;
            .margin(10,0,160,0);
        }
   }
   @keyframes rotate {
       0% {
           transform: rotate(0deg)
       }
       100% {
           transform: rotate(360deg)
       }
   }

}
</style>
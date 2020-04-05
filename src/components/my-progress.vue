<template>
  <div class="progress">
      <span>{{startTime|timeFilter  }}</span>
      <div class="progress-box" ref="box">
          <div class="progress-content" ref="progress" :style="{width:percent}">
              <div class="dot" ref="dot"
                    @touchstart="touchStart"
                    @touchmove="touchMove"
                    @touchend="touchEnd"
              >
              </div>
          </div>
      </div>
      <span>{{endTime|timeFilter}}</span>

  </div>
</template>

<script>
export default {
    props:['endTime','startTime','changePlayTime'],
    computed:{
        percent(){
            return this.startTime/this.endTime*100+'%'
        }
    },
    filters:{
        timeFilter(data){
        var data = parseInt(data)
        let m = parseInt(data/60)<10?'0'+parseInt(data/60):parseInt(data/60)
        let s = data%60<10?'0'+data%60:data%60
        return `${m}:${s}`
    }
    },
    methods:{
        touchStart(){
            this.left = this.$refs.box.getBoundingClientRect().x
            
            // console.log(this.left)
        },
        touchEnd(){

        },
        touchMove(e){
            // console.log(e.touches[0].pageX)
            let x = e.touches[0].pageX - this.left-10
            if(x>=0&&x<=this.w){
                this.offsetWidth(x)
                let percent = (x/this.w)
                let time = percent*this.endTime
                // console.log(percent)
                // console.log(time)
                this.changePlayTime(time)
             }
            },
        offsetWidth(distance){
             this.$refs.dot.style.transform = `translate(${distance}px,0)`
             this.$refs.progress.style.width = distance +'px'
        },
    },
    watch:{
        startTime(newTime,oldTime){
            let distance = (newTime/this.endTime)*this.w
            this.offsetWidth(distance)
        }
    },
    mounted(){
        this.w = this.$refs.box.getBoundingClientRect().width
    }
   
}
</script>


<style scoped lang="less">
@import '~style/index.less';
.progress{
    display: flex;
    .margin(30,20,38,30);
    .w(300);
    .h(50);
    span{
        font-size: @fs-s;
        .margin(0,0,4,4);
        color: #fff
    }
    .progress-box{
        position: relative;
        .w(340);
        height: 4px;
        background:white;
        margin-top: 8px;
        .progress-content{
              width: 0px;
              height: 4px;  
              border-radius: 2px;
              background: @yellow;
        }
        .dot{
            width: 12px;
            height: 12px;
            background:@yellow;
            border-radius: 50%;
            position:absolute;
            left: 0;
            top:-4px;
        }
    }
}
</style>
<template>
  <div class="recommenddetail">
    <div class="header">
      <h1>{{dissname}}</h1>
    </div>
    <div class="view-box">
      <ul class="content">
        <li v-for="(item,index) in list.songlist" :key="index">
        <p>{{item.albumname}}</p>
        <p>{{name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Bs from 'better-scroll'
import {getTuijian} from 'api/index'
export default {
  data(){
    return{
      list:[],
      dissname:'',
      name:''
    }
  },
  methods:{
    initBs(){
      new Bs('.view-box',{
          probeType:3,
          click:true
      })
    },
  },
  created(){
    getTuijian().then((data)=>{
      this.list=data.cdlist[0]
      console.log(this.list);
    })
  },
   mounted(){
    this.initBs()
  }
}
</script>

<style scoped lang="less">
@import '~style/index.less';
.recommenddetail{
  .fixed(0,0,0,0,@black);
  p{
    font-size:@fs-s;
    color: #969696;
    .padding(0,0,30,0);
  }
}
</style>
<template>
  <div class="seach">
    <div class="search-box">
      <div class="kk">
         <el-input
          placeholder="搜索歌曲, 歌手"
          v-model="input">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <h1 class="title">热门搜索</h1>
      <ul class="ss">
        <li class="every" v-for="(item,index) in list"
            :key="index"
        >
        <span>{{item.k}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getSeach} from '../api'
import Bs from 'better-scroll'
export default {
  data(){
    return {
      list:[],
      input:''
    }
  },
  created(){
    getSeach().then((data)=>{
        this.list = data.data.hotkey
        this.list = this.list.slice(0,10)
    })
  }
}
</script>


<style scoped lang="less">
@import url('../style/index.less');
.seach{
  .fixed(88,0,0,0,@black);
  .search-box{
    width: 100%;
    height: 100%;
    background:@black;
    overflow: hidden;
    .kk{
      position: relative;
      width:90%;
      left:5%;
      top:15px;
      background: @black;
      opacity: 0.8;
      color: #333;
      i{
        color: #222;
      }
    }
    .title{
      font-size: @fs-m;
      margin-top:35px;
      margin-left:18px;
      color:rgba(255,255,255,0.5)
    }
    .ss{
      width:335px;
      margin-left:20px;
      display: flex;
      margin-top:20px;
      flex-wrap: wrap;
      li{
        background: #333;
        width:90px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top:10px;
        margin-right:20px;
        border-radius:7px;
        span{
          width:100%;
          height: 16px;
          color:rgba(255,255,255,0.3);
          font-size:@fs-xs;
          margin-left:20px;
        }
      }
    }
      } 
    }

</style>


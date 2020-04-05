<template>
  <div class="my-tab">
    <ul>
      <router-link active-class='sel' tag='li' to="/recommend"><span>推荐</span></router-link>
      <router-link active-class='sel' tag='li' to="/singer"><span>歌手</span></router-link>
      <router-link active-class='sel' tag='li' to="/rank"><span>排行</span></router-link>
      <router-link active-class='sel' tag='li' to="/search"><span>搜索</span></router-link>
    </ul>
  </div>
</template>

<script>
export default {
  
}
</script>


<style scoped lang="less">
@import url(../style/index.less);
.my-tab{
    background: @black;
    .w(375);
    .h(44);
    color: rgba(255, 255, 255, .5);
    font-size: @fs-s;
    ul{
      display: flex;
      li{
      flex: 1;
      .t_c;
      // display: flex;
      // justify-content: center;
      span{
        display: inline-block;
        border-bottom: 2px solid @black;
        .h(44);
        .l_h(44);
        box-sizing: border-box;
      }
    }
    };
    .sel{
      color: @yellow;
      span{
        border-bottom: 2px solid @yellow;
      }
    }
    
}
</style>
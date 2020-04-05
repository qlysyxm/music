<template>
  <div class="my-header">
    <img src="/logo.png" alt="">
    <span>Chicken Music</span>
    <i class="iconfont icon-gerenzhongxin "></i>
  </div>
</template>
<script>
export default {
  
}
</script>


<style scoped lang="less">
@import url('../style/index.less');
@import url('../assets/icon/iconfont.css');
.my-header{
  .w(375);
  .h(44);
  background: @black;
  color: @yellow;
  font-size: @fs-l;
  .t_c();
  .l_h(44);
    img{
      .w(32);
      .h(32);
      .padding(0,0,0,4);
      vertical-align: middle;
    }
    span{
      display: inline-block;
    }
    i{
      font-size:@fs-xl;
      position: relative;
      left:80px;
    }
  
}
</style>
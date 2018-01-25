<template>
  <div class="main">
    <header class="main-header">
      <nav class="main-nav">
        <span><i class="el-icon-d-arrow-left"></i></span>
        <div class="nav-menu">
          <ul>
            <li>sss</li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
$height: 50px;
$width: 220px;
$color: #3c8dbc;
.main{
  &-header{
    height: $height;
    background-color: $color;
    display: flex;
  }
  &-logo{
    width: $width;
    height: $height;
    line-height: $height;
    text-align: center;
    color: #fff;
    font-weight: 700;
    background-color: darken($color: $color, $amount: 4%);
    font-size: 20px;
  }
  &-nav{
    flex: 1;
    height: $height;
    line-height: $height;
    color: #fff;
    .nav-menu{
      float: right;
      ul{
        padding: 0;
        margin: 0;
        list-style: none;
      }
    }
  }
}
</style>

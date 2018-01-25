<template>
  <div class="layout">

    <div class="layout-left">
      <div class="main-logo">Admin Tmpl</div>
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
    </el-menu>
    </div>
    <div class="layout-right">
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
$width: 240px;
$color: #3c8dbc;
$bgcolor: #222d32;
.layout{
  display: flex;
  &-left{
    width: $width;
    background-color: $bgcolor;
    .el-menu{
      border: none;
    }
    .main-logo{
      width: $width;
      height: $height;
      line-height: $height;
      text-align: center;
      color: #fff;
      font-weight: 700;
      background-color: darken($color: $color, $amount: 4%);
      font-size: 20px;
    }
  }
  &-right{
    flex: 1;
    .main-header{
      height: $height;
      background-color: $color;
      .main-nav{
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
  }
}
</style>

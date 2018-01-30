<template>
  <div class="layout">
    <div class="layout-left hidden-xs-only" :class="{collpase : collapse}">
      <div class="main-logo">
        <span v-show="!collapse">Admin Tmpl</span>
        <span v-show="collapse">A</span>
      </div>
      <!-- background-color="#545c64" text-color="#fff" -->
      <div class="user-panle" >
        <div class="user-panle-left">
          <img src="../../assets/avatar.jpg" :class="{small : collapse}">
        </div>
        <transition name="fade">
          <div class="user-panle-right" v-show="!collapse">
            <p>qhx0807</p>
            <a>Super Administrator</a>
          </div>
        </transition>
      </div>
      <div class="search-panel" v-show="!collapse">
        <input type="text" placeholder="Search...">
        <i class="el-icon-search"></i>
      </div>
      <div class="menu-title" v-show="!collapse">主导航</div>
      <div class="menu-warp">
        <el-menu
        :collapse="collapse"
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#222d32"
        text-color="#b8c7ce"
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

    </div>
    <div class="layout-right">
      <header class="main-header">
        <a href="" class="main-title hidden-sm-and-up">Admin Tmpl</a>
        <nav class="main-nav">
          <span class="toggle-nav" @click="collapse = !collapse"><i class="iconfont icon-menu"></i></span>
          <div class="nav-menu">
            <ul>
              <li>
                <img class="avatar" src="../../assets/avatar.jpg" alt="">
                <span class="name">qhx0807</span>
              </li>
              <li><i class="el-icon-setting"></i></li>
            </ul>
          </div>
        </nav>
      </header>
<<<<<<< HEAD
      <div class="layout-content">
        <router-view></router-view>
      </div>

=======
      <el-popover
  ref="popover1"
  placement="top-start"
  title="标题"
  width="200"
  trigger="hover"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
</el-popover>

<el-popover
  ref="popover2"
  placement="bottom"
  title="标题"
  width="200"
  trigger="click"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
</el-popover>

<el-button v-popover:popover1>hover 激活</el-button>
<el-button v-popover:popover2>click 激活</el-button>
>>>>>>> 894968830c45cb6b1968c543abc5e201b8eff781
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      collapse: false
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 50px;
$width: 220px;
$color: #fff;
$bgcolor: #222d32;
$deepBgcolor: #1a2226;
$menucolor: #4b646f;
.layout{
  display: flex;
  display: -webkit-box;
  display: -ms-flex-box;
  display: -webkit-flex;
  height: 100%;
  width: 100%;
  background-color: #F0F0F0;
  &-left{
    width: $width;
    background-color: $bgcolor;
    height: 100%;
    transition: width .3s ease;
    &.collpase{
      width: 64px!important;
    }
    .el-menu{
      border: none;
    }
    .main-logo{
      width: 100%;
      height: $height;
      line-height: $height;
      text-align: center;
      color: #fff;
      font-weight: 700;
      background-color: $deepBgcolor;
      font-size: 20px;
    }
    .user-panle{
      height: 65px;
      padding: 10px;
      display: flex;
      &-left{
        width: 45px;
        img{
          height: 100%;
          width: 100%;
          border-radius: 50%;
        }
      }
      &-right{
        flex: 1;
        padding: 5px 5px 5px 15px;
        p{
          font-weight: 700;
          color: #fff;
          padding: 0;
          margin: 0;
          margin-bottom: 5px;
          font-size: 14px;
        }
        a{
          font-size: 12px;
          color: #fff;
        }
      }
    }
    .search-panel{
      padding: 10px;
      position: relative;
      input{
        height: 35px;
        width: 100%;
        border: none;
        outline: none;
        font-size: 14px;
        padding: 6px 12px;
        color: #666;
        background-color: #374850;
        border-radius: 2px;
        &:focus{
          background-color: #fff;
        }
      }
      i{
        position: absolute;
        color: #999;
        font-size: 16px;
        font-weight: 700;
        right: 20px;
        top: 20px;
      }

    }
    .menu-title{
      background-color: $deepBgcolor;
      color: $menucolor;
      padding: 10px 15px;
      font-size: 12px;
    }
    .menu-warp{
      // height: 300px;
      // overflow: inherit;
      &::-webkit-scrollbar{
        width: 5px;
        height: 1px;
      }
      &::-webkit-scrollbar-thumb{
        background-color: $deepBgcolor;
      }
      &::-webkit-scrollbar-track{
        background: $bgcolor;
      }
    }
    .el-menu-item [class^="el-icon-"],.el-submenu [class^="el-icon-"]{
      margin-right: 0!important;
    }
  }
  &-right{
    flex: 1;
    .main-header{
      // height: $height;
      background-color: $color;
      // box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
      // position: fixed;
      // right: 0;
      // left: $width;
      // transition: all .3s ease-in-out;
      .main-title{
        display: block;
        height: 50px;
        background-color: $deepBgcolor;
        color: #fff;
        transition: all .3s ease-in-out;
        font-size: 20px;
        line-height: 50px;
        text-align: center;
        padding: 0 15px;
        font-weight: 300;
        overflow: hidden;
        text-decoration: none;
      }
      .main-nav{
        flex: 1;
        height: $height;
        line-height: $height;
        color: #999;
        .toggle-nav{
          height: $height;
          line-height: $height;
          padding: 0 14px;
          display: inline-block;
          cursor: pointer;
          &:hover{
            background-color: darken($color: $color, $amount: 4%);
          }
        }
        .nav-menu{
          float: right;
          ul{
            padding: 0;
            margin: 0;
            list-style: none;
            li{
              height: 50px;
              padding: 0 14px;
              float: left;
              border-left: 1px solid #eee;
              vertical-align: middle;
              color: #333;
              cursor: pointer;
              &:hover{
                color: rgb(124, 124, 124);
              }
              .avatar{
                height: 25px;
                width: 25px;
                vertical-align: middle;
                border-radius: 50%;
              }
              .name{
                vertical-align: middle;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
    .layout-content{
      padding: 10px;
      width: 100%;
      height: calc(100% - 50px);
      overflow: hidden;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

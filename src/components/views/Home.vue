<template>
  <el-container style="height:100%">
    <el-aside width="auto" class="hidden-xs-only">
      <div class="layout-left" :class="{collpase : collapse}">
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
              <p>{{name}}</p>
              <a>Administrator</a>
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
          default-active="Dashboard"
          class="el-menu-vertical-demo"
          background-color="#222d32"
          text-color="#b8c7ce"
          active-text-color="#ffd04b"
          unique-opened
          @select="onSelectMenu">
          <el-menu-item v-if="!item.childern" v-for="(item, index) in menu" :key="index" :index="item.url">
            <i :class="[item.icon]"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
          <el-submenu  v-if="item.childern" v-for="(item, index) in menu" :key="index" :index="'i-'+index">
            <template slot="title">
              <i :class="[item.icon]"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item v-for="(n, index) in item.childern" :key="index" :index="n.url">{{n.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
        </div>
      </div>
    </el-aside>
    <el-container>
      <el-header height="50px">
        <header class="main-header">
          <a class="main-title hidden-sm-and-up">Admin Tmpl</a>
          <nav class="main-nav">
            <!-- <el-popover
              popper-class="menu-proper"
              ref="popover1"
              placement="top-start"
              width="220"
              trigger="click"
              style="padding:0;"
              :disabled="xsMenuShow">
              <el-menu
                default-active="Dashboard"
                class="el-menu-vertical-demo"
                text-color="#b8c7ce"
                @select="onSelectMenu"
                active-text-color="#ffd04b">
                <el-menu-item v-for="(item, index) in menu" :key="index" :index="item.url">
                  <i :class="[item.icon]"></i>
                  <span slot="title">{{item.name}}</span>
                </el-menu-item>
              </el-menu>
            </el-popover> -->
            <span class="toggle-nav" @click="toggle" v-popover:popover1><i class="iconfont icon-menu"></i></span>
            <div class="nav-menu">
              <el-popover
                ref="popover1"
                placement="bottom-end"
                width="150"
                trigger="hover">
                <div class="user-menu">
                  <ul>
                    <li><i class="iconfont icon-user"></i>个人信息</li>
                    <li><i class="iconfont icon-password"></i>修改密码</li>
                    <li @click="powerOff"><i class="iconfont icon-poweroff"></i>退出登录</li>
                  </ul>
                </div>
              </el-popover>
              <ul>
                <li>
                  <img class="avatar" src="../../assets/avatar.jpg" alt="">
                  <span class="name">{{name}}</span>
                </li>
                <li v-popover:popover1><i class="el-icon-setting"></i></li>
              </ul>
            </div>
          </nav>
        </header>
      </el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>

  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      collapse: true,
      xsMenuShow: true,
      menu: [
        {
          name:'数据分析',
          url:'Dashboard',
          icon: 'el-icon-tickets'
        },
        {
          name:'申报',
          icon: 'el-icon-menu',
          childern: [
            {
              name:'预算支出明细（部门）',
              url:'Table1',
              icon: 'el-icon-document'
            },
            {
              name:'预算支出明细（项目）',
              url:'Table2',
              icon: 'el-icon-menu'
            },
            {
              name:'预算支出明细',
              url:'Table3',
              icon: 'el-icon-more'
            },
            {
              name:'院系教行费（部门）',
              url:'Table4',
              icon: 'el-icon-share'
            },
            {
              name:'院系教行费（项目）',
              url:'Table5',
              icon: 'el-icon-star-on'
            },
            {
              name:'部门申报合计对比表',
              url:'Table6',
              icon: 'el-icon-sort'
            }
          ]
        },
        {
          name:'预算',
          icon: 'el-icon-menu',
          childern: [
            {
              name: '全学院预算总体情况',
              icon: '',
              url: 'btable1'
            },
            {
              name: '部门预算执行情况',
              icon: '',
              url: 'btable2'
            },
            {
              name: '项目预算执行情况',
              icon: '',
              url: 'btable3'
            },
            {
              name: '项目费用执行情况',
              icon: '',
              url: 'btable4'
            },
            {
              name: '数据分析表-当年预算执行',
              icon: '',
              url: 'btable5'
            },
            {
              name: '2017年与2016年预算对比',
              icon: '',
              url: 'btable51'
            },
            {
              name: '三年教行费使用统计',
              icon: '',
              url: 'btable52'
            },
            {
              name: '各系教行费',
              icon: '',
              url: 'btable53'
            }
          ]
        }
      ],
      name: ''
    }
  },
  created () {
    let name = window.sessionStorage.name
    if(name){
      this.name = name
    }else{
      this.$router.replace({name: 'Login'})
    }
  },
  methods: {
    toggle () {
      if(document.body.clientWidth < 768){
        this.xsMenuShow = false
      }else{
        this.xsMenuShow = true
        this.collapse = !this.collapse
      }
    },
    onSelectMenu (e) {
      this.$router.push({name: e})
    },
    powerOff(){
      this.$confirm('退出当前登录账户, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$router.replace({name: 'Login'})
          window.sessionStorage.clear()
          this.$message({
            type: 'success',
            message: '已退出!'
          })
        }).catch(() => {})
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
@media screen and (max-width:768px){
  .el-main{
    margin-top: 50px;
  }
}
.layout {
  &-left {
    width: $width;
    background-color: $bgcolor;
    height: 100%;
    transition: width 0.3s ease;
    &.collpase {
      width: 64px !important;
    }
    .el-menu {
      border: none;
    }
    .main-logo {
      width: 100%;
      height: $height;
      line-height: $height;
      text-align: center;
      color: #fff;
      font-weight: 700;
      background-color: $deepBgcolor;
      font-size: 20px;
    }
    .user-panle {
      height: 65px;
      padding: 10px;
      display: flex;
      &-left {
        width: 45px;
        img {
          height: 100%;
          width: 100%;
          border-radius: 50%;
        }
      }
      &-right {
        flex: 1;
        padding: 5px 5px 5px 15px;
        p {
          font-weight: 700;
          color: #fff;
          padding: 0;
          margin: 0;
          margin-bottom: 5px;
          font-size: 14px;
        }
        a {
          font-size: 12px;
          color: #fff;
        }
      }
    }
    .search-panel {
      padding: 10px;
      position: relative;
      input {
        height: 35px;
        width: 100%;
        border: none;
        outline: none;
        font-size: 14px;
        padding: 6px 12px;
        color: #666;
        background-color: #374850;
        border-radius: 2px;
        &:focus {
          background-color: #fff;
        }
      }
      i {
        position: absolute;
        color: #999;
        font-size: 16px;
        font-weight: 700;
        right: 20px;
        top: 20px;
      }
    }
    .menu-title {
      background-color: $deepBgcolor;
      color: $menucolor;
      padding: 10px 15px;
      font-size: 12px;
    }
    .menu-warp {
      // height: 300px;
      // overflow: inherit;
      &::-webkit-scrollbar {
        width: 5px;
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: $deepBgcolor;
      }
      &::-webkit-scrollbar-track {
        background: $bgcolor;
      }
    }
    .el-menu-item [class^='el-icon-'],
    .el-submenu [class^='el-icon-'] {
      margin-right: 0 !important;
    }
  }
}
.el-header{
  padding: 0;
}
.el-aside{
  overflow: inherit;
}

// .el-main{
//   background-color: #f8f8f8;
// }
.el-popover{
  padding: 0!important;
}
.menu-proper{
  padding: 0!important;
}
.main-header {
  // height: $height;
  background-color: $color;
  // box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
  box-shadow: 0 4px 10px 0 rgba(29, 29, 31, 0.07);
  // position: fixed;
  // right: 0;
  // left: $width;
  // transition: all .3s ease-in-out;
  .main-title {
    display: block;
    height: 50px;
    background-color: $deepBgcolor;
    color: #fff;
    transition: all 0.3s ease-in-out;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    padding: 0 15px;
    font-weight: 300;
    overflow: hidden;
    text-decoration: none;
  }
  .main-nav {
    flex: 1;
    height: $height;
    line-height: $height;
    color: #999;
    .toggle-nav {
      height: $height;
      line-height: $height;
      padding: 0 14px;
      display: inline-block;
      cursor: pointer;
      &:hover {
        background-color: darken($color: $color, $amount: 4%);
      }
    }
    .nav-menu {
      float: right;
      ul {
        padding: 0;
        margin: 0;
        list-style: none;
        li {
          height: 50px;
          padding: 0 14px;
          float: left;
          border-left: 1px solid #eee;
          vertical-align: middle;
          color: #333;
          cursor: pointer;
          &:hover {
            color: rgb(124, 124, 124);
          }
          .avatar {
            height: 25px;
            width: 25px;
            vertical-align: middle;
            border-radius: 50%;
          }
          .name {
            vertical-align: middle;
            font-size: 14px;
          }
        }
      }
    }
  }
}

.el-submenu .el-menu-item{
  min-width: auto;
}
.user-menu{
  ul{
    padding: 0;
    margin: 0;
    list-style: none;
    li{
      height: 35px;
      line-height: 35px;
      cursor: pointer;
      // text-align: center;
      i{
        font-size: 14px;
        margin-right: 8px;
      }
      &:hover{
        background-color: #f8f8f8;
      }
    }
  }
}
</style>

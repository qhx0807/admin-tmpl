<template>
  <div class="login-wrap">
    <canvas id="canvas"></canvas>
    <el-card class="login-card">
      <h3>身份验证</h3>
      <el-form label-width="0px" ref="ruleForm" :model="formLabelAlign" :rules="rules">
        <el-form-item  prop="name">
          <el-input size="medium" prefix-icon="iconfont icon-user" v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input size="medium" prefix-icon="iconfont icon-password" type="password" v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="submitForm('ruleForm')">立即登录</el-button>
          <el-button size="medium" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      formLabelAlign: {
        name: '',
        password: ''
      },
      rules: {
          name: [
            { required: true, message: '请输入账号名称', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
    }
  },
  mounted() {
    this.bgCanvas()
  },
  methods: {
    bgCanvas() {
      class Circle {
        //创建对象
        //以一个圆为对象
        //设置随机的 x，y坐标，r半径，_mx，_my移动的距离
        //this.r是创建圆的半径，参数越大半径越大
        //this._mx,this._my是移动的距离，参数越大移动
        constructor(x, y) {
          this.x = x
          this.y = y
          this.r = Math.random() * 11
          this._mx = Math.random()
          this._my = Math.random()
        }
        //canvas 画圆和画直线
        //画圆就是正常的用canvas画一个圆
        //画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
        drawCircle(ctx) {
          ctx.beginPath()
          //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
          ctx.arc(this.x, this.y, this.r, 0, 360)
          ctx.closePath()
          ctx.fillStyle = 'rgba(204, 204, 204, 0.3)'
          ctx.fill()
        }

        drawLine(ctx, _circle) {
          let dx = this.x - _circle.x
          let dy = this.y - _circle.y
          let d = Math.sqrt(dx * dx + dy * dy)
          if (d < 210) {
            ctx.beginPath()
            //开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
            ctx.moveTo(this.x, this.y) //起始点
            ctx.lineTo(_circle.x, _circle.y) //终点
            ctx.closePath()
            ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)'
            ctx.stroke()
          }
        }

        // 圆圈移动
        // 圆圈移动的距离必须在屏幕范围内
        move(w, h) {
          this._mx = this.x < w && this.x > 0 ? this._mx : -this._mx
          this._my = this.y < h && this.y > 0 ? this._my : -this._my
          this.x += this._mx / 2
          this.y += this._my / 2
        }
      }
      //鼠标点画圆闪烁变动
      class currentCirle extends Circle {
        constructor(x, y) {
          super(x, y)
        }
        drawCircle(ctx) {
          ctx.beginPath()
          //注释内容为鼠标焦点的地方圆圈半径变化
          //this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
          this.r = 8
          ctx.arc(this.x, this.y, this.r, 0, 360)
          ctx.closePath()
          //ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
          ctx.fillStyle = 'rgba(204, 204, 204, 0.3)'
          ctx.fill()
        }
      }
      //更新页面用requestAnimationFrame替代setTimeout
      window.requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let w = (canvas.width = canvas.offsetWidth)
      let h = (canvas.height = canvas.offsetHeight)
      let circles = []
      let current_circle = new currentCirle(0, 0)
      let draw = function() {
        ctx.clearRect(0, 0, w, h)
        for (let i = 0; i < circles.length; i++) {
          circles[i].move(w, h)
          circles[i].drawCircle(ctx)
          for (let j = i + 1; j < circles.length; j++) {
            circles[i].drawLine(ctx, circles[j])
          }
        }
        if (current_circle.x) {
          current_circle.drawCircle(ctx)
          for (var k = 1; k < circles.length; k++) {
            current_circle.drawLine(ctx, circles[k])
          }
        }
        requestAnimationFrame(draw)
      }
      let init = function(num) {
        for (var i = 0; i < num; i++) {
          circles.push(new Circle(Math.random() * w, Math.random() * h))
        }
        draw()
      }
      window.addEventListener('load', init(50))
      window.onmousemove = function(e) {
        e = e || window.event
        current_circle.x = e.clientX
        current_circle.y = e.clientY
      }
      window.onmouseout = function() {
        current_circle.x = null
        current_circle.y = null
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrap {
  height: 100%;
  width: 100%;
  // background: url('../../assets/loginbg.png');
  // background-repeat: no-repeat;
  // background-color: #f8f8f8;
  // background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  #canvas {
    display: block;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    background-color: #f9f9f9;
  }
  .login-card{
    width:380px;
    background-color: #fff;
  }
}
</style>

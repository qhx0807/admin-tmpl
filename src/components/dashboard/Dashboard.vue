<template>
  <div class="dashboard">
    <!-- <div>
      <p class="title">重庆第二师范学院</p>
    </div> -->
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <el-card :body-style="cardStyle">
          <div class="leftbox" style="background: #00C0EF;">
            <i class="iconfont icon-money-o moneys" style="color:#FFF;"></i>
          </div>
          <div class="rightbox">
            <p>{{topData.bnsb}}万元</p>
            <p>本年第一次申报数</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <el-card :body-style="cardStyle">
          <div class="leftbox" style="background: #DD4B39;">
            <i class="iconfont icon-money-o moneys" style="color:#FFF;"></i>
          </div>
          <div class="rightbox">
            <p>{{topData.bnjys}}万元</p>
            <p>一下建议安排数</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <el-card :body-style="cardStyle">
          <div class="leftbox" style="background: #00A65A;">
            <i class="iconfont icon-money-o moneys" style="color:#FFF;"></i>
          </div>
          <div class="rightbox">
            <p>{{topData.bnsb2}}万元</p>
            <p>本年第二次申报数</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <el-card :body-style="cardStyle">
          <div class="leftbox" style="background: #F39C12;">
            <i class="iconfont icon-money-o moneys" style="color:#FFF;"></i>
          </div>
          <div class="rightbox">
            <p>{{topData.bnys}}万元</p>
            <p>二下建议安排数</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="block dates">
        <el-date-picker
          v-model="value1"
          type="year"
          placeholder="选择日期" @change="time">
        </el-date-picker>
      </div>
    <div class="tabOne" id="tabOne">

    </div>
    <!-- <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="tabTwo" id="tabTwo"></div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="tabThree" id="tabThree"></div>
      </el-col>
    </el-row> -->

  </div>
</template>

<script>
import postApi from "../../axios"
import echarts from "echarts"
export default {
  name: "dashboard",
  data() {
    return {
      cardStyle: {
        padding: "0px"
      },
      value1:new Date(),
      topData:{},
    }
  },
  //一开始执行
  created() {
    this.tabOne(this.value1.getFullYear())
    // this.loadTableData()
    // this.getTopNum(this.value1.getFullYear())
    // this.tabTwo()
  },
  methods: {
    tabOne(e) {
      let option = { kjnd: e, flag: '0' }
      postApi(
        "ESYysgl_BMhzb",
        option,
        response => {
          // console.log(response)
          this.getTopNum(this.value1.getFullYear())
          if (response.data.Status == 1) {
            let obj = JSON.parse(response.data.Data)
            // console.log(JSON.stringify(obj))
            let barList = []
            let bmlist = []
            let snysOne = []
            let snzxOne = []
            let bnsbOne = []
            let bnsb2One = []
            let bnjysOne = []
            let bnysOne = []

            let xbar = [
              "上年预算", //snys
              "上年执行数" //snzx
            ]
            for (let i = 0; i < obj.length; i++) {
              bmlist.push(obj[i].bmmc)
              snysOne.push(obj[i].snys)
              snzxOne.push(obj[i].snzx)
            }
            let arr = [snysOne, snzxOne]

            for (let e = 0; e < xbar.length; e++) {
              let sdatas = {}
              sdatas.name = xbar[e]
              sdatas.type = "bar"
              sdatas.data = arr[e]
              barList.push(sdatas)
            }
            let option = {
              title: {
                text: "xxxxxxxxxxx"+ e +"年预算项目明细表",
                top: "0",
                left: "37%"
              },
              tooltip: {
                trigger: "axis"
              },
              legend: {
                bottom: "0px",
                data: xbar
              },
              toolbox: {
                show: true,
                feature: {
                  dataView: { show: true, readOnly: false },
                  magicType: { show: true, type: ["line", "bar"] },
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
              calculable: true,
              xAxis: [
                {
                  type: "category",
                  data: bmlist,
                  axisLabel: {
                    interval: 0, //横轴信息全部显示
                    rotate: 25 //-30度角倾斜显示
                  }
                }
              ],
              yAxis: [
                {
                  type: "value"
                }
              ],
              series: barList
            }
            var myChart = echarts.init(document.getElementById("tabOne"))
            myChart.setOption(option)
          } else {
            this.$message(response.data.Message)
          }
        },
        error => {
          console.log(error)
        }
      )
    },
    time(e){
      this.tabOne(e.getFullYear())
    },
    getTopNum(e){
      let option = { kjnd: e, flag: '1' }
      postApi(
        "ESYysgl_BMhzb",
        option,
        response => {
          // console.log(response)
          if (response.data.Status == 1) {
            let obj = JSON.parse(response.data.Data)
            this.topData = obj[0]
            // console.log(this.topData)
          } else {
            this.$message(response.data.Message)
          }
        },
        error => {
          console.log(error)
        }
      )
    },

  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  color: #444;
}
.leftbox {
  float: left;
  height: 70px;
  width: 50px;
  line-height: 70px;
  text-align: center;
  .moneys {
    font-size: 40px;
    margin: 0;
  }
}
.rightbox {
  float: right;
  height: 70px;
  line-height: 22px;
  padding-right: 8px;
  padding-top: 3px;
  p {
    font-size: 14px;
    margin: 8px 0 0 0;
    text-align: right;
    color: #666;
  }
}
.dates{
  text-align: center;
  margin-top: 20px;
}
.tabOne {
  height: 450px;
  width: 100%;
  padding-top: 24px;
}
</style>



<template>
  <el-row>
    <el-col :span="24">
      <el-date-picker
        v-model="year"
        type="year"
        size="small"
        style="width:160px"
        placeholder="选择年份">
      </el-date-picker>
      <el-button style="margin-left:8px;" :loading="queryLoading" type="primary" size="small" icon="el-icon-search" @click="queryHandler">查询</el-button>
      <el-button size="small" icon="el-icon-printer" @click="exportTable">导出EXCEL</el-button>
    </el-col>
    <el-col :span="24">
      <el-tabs v-model="activeTabName">
        <el-tab-pane label="数据报表" name="first">
          <div style="width:100%">
            <el-table
              :data="tableData"
              size="mini"
              style="width: 100%"
              show-summary
              resizable
              border
              v-loading="loading"
              :max-height="tableBodyHeight"
              >
              <el-table-column label="重庆第二师范学院2017年预算项目明细表 （单位：万元）" width="100%" align="center" :render-header="rendeHead">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="bmbh" label="部门编号" width="100" sortable></el-table-column>
                <el-table-column prop="bmmc" label="部门名称" sortable></el-table-column>
                <el-table-column prop="snys" label="上年预算" sortable></el-table-column>
                <el-table-column prop="snzx" label="上年执行数" sortable></el-table-column>
                <el-table-column prop="bnsb" label="本年一次申报数" sortable></el-table-column>
                <el-table-column prop="bnjys" label="一下建议安排数" sortable></el-table-column>
                <el-table-column prop="bnsb2" label="本年二次申报数" sortable></el-table-column>
                <el-table-column prop="bnys" label="二下建议安排数" sortable></el-table-column>
                <el-table-column prop="bnzx" label="本年执行数" sortable></el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="图表分析" name="second">
          <div style="width:1500px; height:600px;" id="chart"></div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import postApi from '../../axios/index.js'
import echarts from "echarts"
import { exportExcel } from '../../utlis/exportExcel'
export default {
  name: 'table1',
  data() {
    return {
      tableData: [],
      tableBodyHeight: 500,
      loading: true,
      activeTabName: 'first',
      year: new Date(),
      queryLoading: false
    }
  },
  created() {
    let n = new Date().getFullYear()
    this.loadTableData(n)
  },
  mounted() {
    let winH = document.body.clientHeight
    this.tableBodyHeight = winH - 180
  },
  methods: {
    loadTableData(year) {
      if (!year) {
        return false
      }
      this.loading = true
      let option = { kjnd: year }
      postApi(
        'ESYysgl_BMhzb',
        option,
        response => {
          if (response.data.Status == 1) {
            let obj = JSON.parse(response.data.Data)
            this.tableData = obj

            let barList = []
            let bmlist = []
            let mData = {
              snys: [],
              snzx: [],
              bnsb: [],
              bnjys: [],
              bnsb2: [],
              bnys: [],
            }
            let xbar = [
              {
                text:"上年预算",
                value: 'snys',
              },
              {
                text:"上年执行数",
                value: 'snzx',
              },
              {
                text:"本年一次申报数",
                value: 'bnsb',
              },
              {
                text:"一下建议安排数",
                value: 'bnjys',
              },
              {
                text:"本年二次申报数",
                value: 'bnsb2',
              },
              {
                text:"'二下'数",
                value: 'bnys',
              }
            ]
            for (let i = 0; i < obj.length; i++) {
              bmlist.push(obj[i].bmmc)
              mData.snys.push(obj[i].snys)
              mData.snzx.push(obj[i].snzx)
              mData.bnsb.push(obj[i].bnsb)
              mData.bnjys.push(obj[i].bnjys)
              mData.bnsb2.push(obj[i].bnsb2)
              mData.bnys.push(obj[i].bnys)
            }
            let seriesData = []
            for (let e = 0; e < xbar.length; e++) {
              seriesData.push({
                name: xbar[e].text,
                type: 'bar',
                data: mData[xbar[e].value]
              })
            }

            console.log(seriesData)

            let option = {
              title : {
                text: '年预算项目明细表'
              },
              tooltip : {
                trigger: 'axis'
              },
              legend: {
                bottom: "0px",
                data: xbar
              },
              toolbox: {
                show : true,
                feature : {
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
              },
              calculable : true,
              xAxis : [
                {
                  type : 'category',
                  data : bmlist,
                  axisLabel: {
                    interval: 0,
                    rotate: 25
                  }
                }
              ],
              yAxis : [
                {
                  type : 'value'
                }
              ],
              series : seriesData
            }
            var myChart = echarts.init(document.getElementById("chart"))
            myChart.setOption(option)

          } else {
            this.$message(response.data.Message)
          }
          this.loading = false
          this.queryLoading = false
        },
        error => {
          this.loading = false
          this.queryLoading = false
          console.log(error)
        }
      )
    },
    rendeHead(h, self) {
      let year = this.year.getFullYear()
      return h(
        'p',
        {
          class: 'renderTableHead'
        },
        [`xxxxxxxxxxxxxxx${year}年预算项目明细表 （单位：万元）`]
      )
    },
    queryHandler() {
      if (!this.year) {
        this.$message('请选择年份，再查询数据！')
        return false
      }
      this.queryLoading = true
      let n = this.year.getFullYear()
      this.loadTableData(n)
    },
    exportTable() {
      exportExcel(this.tableData, '预算项目明细表')
    },
  }
}
</script>

<style lang="scss">
.renderTableHead {
  text-align: center;
  margin: 0;
}
#chart{
  height: 600px;
  width: 1500px;
}
</style>

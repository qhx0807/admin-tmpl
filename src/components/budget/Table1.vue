<template>
  <el-row>
    <el-col :span="24">
      <el-date-picker
        v-model="year"
        type="month"
        size="small"
        style="width:160px"
        placeholder="选择年份">
      </el-date-picker>
      <el-button style="margin-left:8px;" :loading="queryLoading" type="primary" size="small" icon="el-icon-search" @click="queryHandler">查询</el-button>
      <el-button size="small" icon="el-icon-printer" @click="exportTable">导出EXCEL</el-button>
    </el-col>
    <el-col :span="24" style="padding-top:20px;">
      <table class="table">
        <thead>
          <tr>
            <th colspan="7">项目预算总体情况（单位：万元）</th>
          </tr>
          <tr>
            <th colspan="4">{{tableYear}}年总预算金额</th>
            <th rowspan="2">{{tableYear}}年已执行预算金额</th>
            <th rowspan="2">{{tableYear}}年预算结余金额</th>
            <th rowspan="2">{{tableYear}}年预算执行率</th>
          </tr>
          <tr>
            <th>年初结转和结余</th>
            <th>年初预算</th>
            <th>年中转入金额</th>
            <th>小计</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{tableData.bnyszz}}</td>
            <td>{{tableData.bnys}}</td>
            <td>{{tableData.zfjr}}</td>
            <td>{{tableData.xj}}</td>
            <td>{{tableData.zxje}}</td>
            <td>{{tableData.ysjrje}}</td>
            <td>{{tableData.yszxy}}</td>
          </tr>
        </tbody>
      </table>
    </el-col>
  </el-row>
</template>

<script>
import postApi from '../../axios/index.js'
import { exportExcel } from '../../utlis/exportExcel'
export default {
  name: 'table1',
  data() {
    return {
      tableData: {},
      tableBodyHeight: 500,
      loading: true,
      activeTabName: 'first',
      year: new Date(),
      tableYear: new Date().getFullYear(),
      queryLoading: false
    }
  },
  created() {
    let n = new Date().getFullYear()
    let m = new Date().getMonth()+1
    if(m/10 <1) {
      m = '0'+m
    }
    this.loadTableData(n, m)
  },
  mounted() {
    let winH = document.body.clientHeight
    this.tableBodyHeight = winH - 180
  },
  methods: {
    loadTableData(year, month) {
      if (!year) {
        return false
      }
      this.loading = true
      let option = { kjnd: year, kjqj: month}
      postApi(
        'ESYysgl_yszx_qxyzt',
        option,
        response => {
          console.log(response)
          if (response.data.Status == 1) {
            let obj = JSON.parse(response.data.Data)
            this.tableData = obj[0]
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
    queryHandler() {
      if (!this.year) {
        this.$message('请选择年份，再查询数据！')
        return false
      }
      this.queryLoading = true
      let n = this.year.getFullYear()
      let m = this.year.getMonth()+1
      if(m/10 <1) {
        m = '0'+m
      }
      this.loadTableData(n, m)
      this.tableYear = n
    },
    exportTable() {
      exportExcel(this.tableData, '项目预算总体情况')
    },
  }
}
</script>

<style lang="scss">
.renderTableHead {
  text-align: center;
  margin: 0;
}
.table{
  width: 100%;
  font-size: 12px;
  margin-top: 20px;
  table-layout: fixed;
      empty-cells: show;
      border-collapse: collapse;
      margin: 0 auto;
      color: #666;
      th{
        border: 1px solid #ddd;
          padding: 0 1em 0;
          height: 35px;
          text-align: center;
      }
      td{
        border: 1px solid #ddd;
          padding: 0 1em 0;
          height: 35px;
          text-align: center;
      }
}
</style>

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
    <el-col :span="24">
        <div style="width:100%;padding-top:20px">
          <el-table
            :data="tableData"
            size="mini"
            style="width: 100%"
            resizable
            border
            v-loading="loading"
            :max-height="tableBodyHeight"
            >
            <!--  show-summary -->
            <el-table-column label="重庆第二师范学院2017年具体项目预算执行情况（单位：万元）" width="100%" align="center" :render-header="rendeHead">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column label="学院/部门">
                <el-table-column label="编号" prop="bmbh" width="80"></el-table-column>
                <el-table-column label="名称" prop="bmmc"></el-table-column>
              </el-table-column>
              <el-table-column label="项目">
                <el-table-column label="编号" prop="xmbh" width="80"></el-table-column>
                <el-table-column label="项目" prop="xmmc"></el-table-column>
              </el-table-column>
              <el-table-column label="年总预算金额">
                <el-table-column label="年初结转和结余" prop="bnyszz"></el-table-column>
                <el-table-column label="年初预算" prop="bnys"></el-table-column>
                <el-table-column label="年中转入金额" prop="zfjr"></el-table-column>
                <el-table-column label="小计" prop="xj"></el-table-column>
              </el-table-column>
              <el-table-column label="已执行金额" prop="zxje"></el-table-column>
              <el-table-column label="预算结余" prop="ysjrje"></el-table-column>
              <el-table-column label="预算执行率" prop="yszxy"></el-table-column>
            </el-table-column>
          </el-table>
        </div>

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
      tableData: [],
      tableBodyHeight: 500,
      loading: true,
      activeTabName: 'first',
      year: new Date(),
      queryLoading: false,
      tableYear: new Date().getFullYear(),
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
        'ESYysgl_yszx_xybm',
        option,
        response => {
          console.log(response)
          if (response.data.Status == 1) {
            let obj = JSON.parse(response.data.Data)
            this.tableData = obj
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
        [`重庆第二师范学院${year}具体项目预算执行情况 （单位：万元）`]
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
</style>

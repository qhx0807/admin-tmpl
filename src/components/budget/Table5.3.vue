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
        <div style="width:100%;padding-top:20px">
          <el-table
            :data="tableData"
            size="mini"
            style="width: 100%"
            resizable
            border
            show-summary
            v-loading="loading"
            :max-height="tableBodyHeight"
            >
            <el-table-column label="各系部教行费明细统计数（单位：万元）" width="100%" align="center" :render-header="rendeHead">
              <el-table-column label="编号" width="80" prop="bmbh"></el-table-column>
              <el-table-column label="系部" prop="bmmc"></el-table-column>
              <el-table-column label="三年比例合计数" prop="hj"></el-table-column>
              <el-table-column label="基本运行费22%" prop="jbyxf"></el-table-column>
              <el-table-column label="专业建设费22%" prop="zyjsf"></el-table-column>
              <el-table-column label="教师培训16%" prop="jspsf"></el-table-column>
              <el-table-column label="学生实习15%" prop="xssxf"></el-table-column>
              <el-table-column label="业务费15%" prop="ywf"></el-table-column>
              <el-table-column label="其他10%" prop="otherf"></el-table-column>
              <el-table-column label="实际下达金额" prop="bnys"></el-table-column>
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
      let option = { kjnd: year}
      postApi(
        'ESYysgl_yszx_yxjxf',
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
        [`重庆第二师范学院${this.tableYear}各系部教行费明细统计数 （单位：元）`]
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

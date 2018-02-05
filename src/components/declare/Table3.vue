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
              <el-table-column label="重庆第二师范学院2017年院系预算教行费明细表" width="100%" align="center" :render-header="rendeHead">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column label="学院/部门" align="center">
                  <el-table-column prop="bmbh" label="编号" sortable></el-table-column>
                  <el-table-column prop="bmmc" label="名称" sortable></el-table-column>
                </el-table-column>
                <el-table-column label="项目" align="center">
                  <el-table-column prop="xmbh" label="编号" sortable></el-table-column>
                  <el-table-column prop="xmmc" label="名称" sortable></el-table-column>
                </el-table-column>
                <el-table-column label="费用" align="center">
                  <el-table-column prop="edkzbm" label="编号" sortable></el-table-column>
                  <el-table-column prop="edkzmc" label="名称" sortable></el-table-column>
                </el-table-column>
                <el-table-column prop="snys" label="2017年预算金额" sortable></el-table-column>
                <el-table-column prop="snzx" label="备注" sortable></el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="图表分析" name="second">
          <div style="width:100%; height:500px;">
            <chart1></chart1>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import postApi from '../../axios/index.js'
import chart1 from '../charts/Chart'
import { exportExcel } from '../../utlis/exportExcel'
export default {
  name: 'table1',
  data() {
    return {
      tableData: [],
      tableBodyHeight: 500,
      loading: true,
      activeTabName:'first',
      year: new Date(),
      queryLoading: false,
    }
  },
  components: {
    chart1
  },
  created() {
    let n = new Date().getFullYear()
    this.loadTableData(n)
  },
  mounted () {
    let winH = document.body.clientHeight
    this.tableBodyHeight = winH -180
  },
  methods: {
    loadTableData(year){
      if(!year){
        return false
      }
      this.loading = true
      let option = {kjnd: year}
      postApi('ESYysgl_ZCmxb', option, (response) => {
        if(response.data.Status == 1){
          let obj = JSON.parse(response.data.Data)
          this.tableData = obj
        }else{
          this.$message(response.data.Message)
        }
        this.loading = false
        this.queryLoading = false
      }, (error) => {
        this.loading = false
        this.queryLoading = false
        console.log(error)
      })
    },
    rendeHead(h, self){
      let year = this.year.getFullYear()
      return h('p', {
        'class': 'renderTableHead'
      },[`xxxxxxxxxxxxxxx${year}年院系预算教行费明细表 （单位：万元）`])
    },
    queryHandler(){
      if(!this.year){
        this.$message("请选择年份，再查询数据！")
        return false
      }
      this.queryLoading = true
      let n = this.year.getFullYear()
      this.loadTableData(n)
    },
    exportTable(){
      exportExcel(this.tableData, '预算项目明细表')
    }
  }
}
</script>

<style lang="scss">
.renderTableHead{
  text-align: center;
  margin: 0;
}
</style>




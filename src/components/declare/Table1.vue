<template>
  <el-row>
    <el-col :span="24">
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
            <el-table-column label="重庆第二师范学院2017年预算项目明细表" width="100%" align="center">
              <el-table-column label="重庆第二师范学院2017年预算项目明细表" width="100%" align="center" :render-header="rendeHead">
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
            </el-table-column>

          </el-table>
        </div>
    </el-col>
  </el-row>
</template>

<script>
import postApi from '../../axios/index.js'
export default {
  name: 'table1',
  data() {
    return {
      tableData: [],
      tableBodyHeight: 500,
      loading: true
    }
  },
  created() {
    this.loadTableData()
  },
  mounted () {
    let winH = document.body.clientHeight
    this.tableBodyHeight = winH -100
  },
  methods: {
    loadTableData(){
      let option = {kjnd: '2017'}
      postApi('ESYysgl_BMhzb', option, (response) => {
        if(response.data.Status == 1){
          let obj = JSON.parse(response.data.Data)
          this.tableData = obj
        }else{
          this.$message(response.data.Message)
        }
        this.loading = false
      }, (error) => {
        this.loading = false
        console.log(error)
      })
    },
    rendeHead(h, self){
      return h('header', {
        'class': 'renderTableHead'
      },[
        h('span',{'class': 'info'},['编制单位：重庆第二师范学院']),
        h('span',{'class': 'info'},['年度：2017年']),
        h('span',{'class': 'info'},['单位：万元'])
      ])
    }
  }
}
</script>

<style lang="scss">
.el-table thead.is-group th{
  // background-color: #fff;
}
.renderTableHead{
  display: flex;
  span{
    flex: 1;
    font-weight: normal;
    &:first-child{
      text-align: left;
    }
    &:last-child{
      text-align: right;
    }
  }
}
</style>


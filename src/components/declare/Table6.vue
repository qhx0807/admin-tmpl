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
            <el-table-column label="2016、2017两年部门申报合计数对比表" width="100%" align="center">
              <el-table-column width="100%" align="center" :render-header="rendeHead">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="bmbh" label="部门编号" width="100" sortable></el-table-column>
                <el-table-column prop="bmmc" label="部门名称" sortable></el-table-column>
                <el-table-column prop="bnys" label="2017年二次申报合计" sortable></el-table-column>
                <el-table-column prop="snys" label="2016预算下达合计" sortable></el-table-column>
                <el-table-column prop="zz" label="增长" sortable></el-table-column>
                <el-table-column prop="zzy" label="增长率" sortable></el-table-column>
                <el-table-column prop="bnsb2" label="2016年项目支出" sortable></el-table-column>
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
  name: 'table6',
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
      postApi('ESYysgl_BMhjzzb', option, (response) => {
        if(response.data.Status == 1){
          let obj = JSON.parse(response.data.Data)
          this.tableData = obj
        }else{
          this.$message(response.data.Message)
        }
        this.loading = false
      }, (error) => {
        console.log(error)
        this.loading = false
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

<style lang="scss" scoped>
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


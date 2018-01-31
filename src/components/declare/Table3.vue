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
            :max-height="tableBodyHeight"
            >
            <el-table-column label="重庆第二师范学院2017年院系预算教行费明细表" width="100%" align="center">
              <el-table-column width="100%" align="center" :render-header="rendeHead">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column label="学院/部门" align="center">
                  <el-table-column prop="bmbh" label="编号" sortable></el-table-column>
                  <el-table-column prop="bmmc" label="名称" sortable></el-table-column>
                </el-table-column>
                <el-table-column label="项目" align="center">
                  <el-table-column prop="bmbh" label="编号" sortable></el-table-column>
                  <el-table-column prop="xmmc" label="名称" sortable></el-table-column>
                </el-table-column>
                <el-table-column label="费用" align="center">
                  <el-table-column prop="bmbh" label="编号" sortable></el-table-column>
                  <el-table-column prop="xmmc" label="名称" sortable></el-table-column>
                </el-table-column>
                <el-table-column prop="snys" label="2017年预算金额" sortable></el-table-column>
                <el-table-column prop="snzx" label="备注" sortable></el-table-column>
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
  name: 'table3',
  data() {
    return {
      tableData: [],
      tableBodyHeight: 500
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
      postApi('ESYysgl_ZCmxb', option, (response) => {
        if(response.data.Status == 1){
          let obj = JSON.parse(response.data.Data)
          this.tableData = obj
        }else{
          this.$message(response.data.Message)
        }
      }, (error) => {
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



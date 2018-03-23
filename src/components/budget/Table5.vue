<template>
  <el-row>
    <el-col :span="24">
       123
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

  },
  methods: {
    loadTableData(year, month) {
      if (!year) {
        return false
      }
      this.loading = true
      let option = { kjnd: year, kjqj: month}
      postApi(
        'ESYysgl_yszx_xybm2',
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

  }
}
</script>

<style lang="scss">
.renderTableHead {
  text-align: center;
  margin: 0;
}
</style>

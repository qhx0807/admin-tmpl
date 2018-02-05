<template>
<div class="index">
  <input type="file" @change="importFile($event)" id="imFile" style="display: none"
     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
  <a id="downlink"></a>
  <el-button class="button" @click="uploadFile">导入</el-button>
  <el-button class="button" @click="downloadFile">导出</el-button>
  <el-table :data="excelData">
    <el-table-column label="名称" prop="name" show-overflow-tooltip></el-table-column>
    <el-table-column label="分量" prop="size" show-overflow-tooltip></el-table-column>
    <el-table-column label="口味" prop="taste" show-overflow-tooltip></el-table-column>
    <el-table-column label="单价(元)" prop="price" show-overflow-tooltip></el-table-column>
    <el-table-column label="剩余(份)" prop="remain" show-overflow-tooltip></el-table-column>
  </el-table>
</div>
</template>

<script>

import {exportExcel, importExcel} from '../../utlis/exportExcel'
export default {
  name: 'Index',
  data() {
    return {
      excelData: [
        // 测试数据
        {
          name: '红烧鱼',
          size: '大',
          taste: '微辣',
          price: '40',
          remain: '100'
        },
        {
          name: '麻辣小龙虾',
          size: '大',
          taste: '麻辣',
          price: '138',
          remain: '200'
        },
        {
          name: '清蒸小龙虾',
          size: '大',
          taste: '清淡',
          price: '138',
          remain: '200'
        },
        {
          name: '香辣小龙虾',
          size: '大',
          taste: '特辣',
          price: '138',
          remain: '200'
        },
        {
          name: '十三香小龙虾',
          size: '大',
          taste: '中辣',
          price: '138',
          remain: '108'
        },
        {
          name: '蒜蓉小龙虾',
          size: '大',
          taste: '中辣',
          price: '138',
          remain: '100'
        },
        {
          name: '凉拌牛肉',
          size: '中',
          taste: '中辣',
          price: '48',
          remain: '60'
        },
        {
          name: '虾仁寿司',
          size: '大',
          taste: '清淡',
          price: '29',
          remain: '无限'
        },
        {
          name: '海苔寿司',
          size: '大',
          taste: '微辣',
          price: '26',
          remain: '无限'
        },
        {
          name: '金针菇寿司',
          size: '大',
          taste: '清淡',
          price: '23',
          remain: '无限'
        },
        {
          name: '泡菜寿司',
          size: '大',
          taste: '微辣',
          price: '24',
          remain: '无限'
        },
        {
          name: '鳗鱼寿司',
          size: '大',
          taste: '清淡',
          price: '28',
          remain: '无限'
        },
        {
          name: '肉松寿司',
          size: '大',
          taste: '清淡',
          price: '22',
          remain: '无限'
        },
        {
          name: '三文鱼寿司',
          size: '大',
          taste: '清淡',
          price: '30',
          remain: '无限'
        },
        {
          name: '蛋黄寿司',
          size: '大',
          taste: '清淡',
          price: '20',
          remain: '无限'
        }
      ]
    }
  },
  mounted() {

  },
  methods: {
    uploadFile(){
      document.getElementById("imFile").click()
      //importExcel(file[0])
    },
    downloadFile(){
      exportExcel(this.excelData, '呵呵呵呵呵')
    },
    importFile(e){
      importExcel(e.target.files[0]).then(function(json){
        console.log(json)
        this.excelData = json
      }.bind(this)).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style>
.el-table th > .cell {
  text-align: center;
}
.button {
  margin-bottom: 20px;
}
</style>

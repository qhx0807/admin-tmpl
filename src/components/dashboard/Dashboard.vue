<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <el-card>
          <i class="iconfont icon-money-o"></i>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6"><el-card></el-card></el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6"><el-card></el-card></el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6"><el-card></el-card></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'dashboard'
}
</script>

<style lang="scss" scoped>

</style>



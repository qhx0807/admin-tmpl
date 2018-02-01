<template>
  <div id="main" style="width: 900px; height:400px;" ></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'chart',
  data() {
    return {}
  },
  mounted() {
    let dom = document.getElementById('main')
    var myChart = echarts.init(dom)
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }
    myChart.setOption(option)
    // this.$nextTick(function(){
    //   alert(window.getComputedStyle(dom, null).width)
    // })
  },

}
</script>

<style lang="scss" scoped>
</style>

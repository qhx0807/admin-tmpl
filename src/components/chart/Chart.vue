<template>
  <el-row>
    <el-col :span="24">
      <div id="main"></div>
    </el-col>
  </el-row>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'chart',
  data() {
    return {
      option: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
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
    }
  },
  mounted() {
    var option = {
      color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['蒸发量', '降水量', '平均温度']
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '水量',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} ml'
          }
        },
        {
          type: 'value',
          name: '温度',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} °C'
          }
        }
      ],
      series: [
        {
          name: '蒸发量',
          type: 'bar',
          data: [
            2.0,
            4.9,
            7.0,
            23.2,
            25.6,
            76.7,
            135.6,
            162.2,
            32.6,
            20.0,
            6.4,
            3.3
          ]
        },
        {
          name: '降水量',
          type: 'bar',
          data: [
            2.6,
            5.9,
            9.0,
            26.4,
            28.7,
            70.7,
            175.6,
            182.2,
            48.7,
            18.8,
            6.0,
            2.3
          ]
        },
        {
          name: '平均温度',
          type: 'line',
          yAxisIndex: 1,
          data: [
            2.0,
            2.2,
            3.3,
            4.5,
            6.3,
            10.2,
            20.3,
            23.4,
            23.0,
            16.5,
            12.0,
            6.2
          ]
        }
      ]
    }
    var myChart = echarts.init(document.getElementById('main'))
    myChart.setOption(option)
  }
}
</script>

<style lang="scss" scoped>
#mian{
  width: 100%;
  height: 400px;
  overflow: hidden;
}
</style>

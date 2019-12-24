<template>
  <div
    :id="id"
    :class="className"
    :style="{height:height,width:width}"
  />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    usage: {
      type: Number,
      default: 0
    },
    capacity: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    usage () {
      this.updateData()
    },
    capacity () {
      this.updateData()
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        series: [
          {
            name: '状态',
            type: 'pie',
            radius: ['60%', '70%'],
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '14',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: this.usage, name: '已使用', itemStyle: { color: '#77c5ee' }, label: { show: true, formatter: '{d}%\n\n{b}' } },
              { value: this.capacity - this.usage, name: '未使用', itemStyle: { color: '#d1cfd1' }, label: { formatter: '' } }
            ]
          }
        ]
      })
    },
    updateData () {
      this.chart.setOption({
        series: [{
          data: [
            { value: this.usage, name: '已使用', itemStyle: { color: '#77c5ee' }, label: { show: true, formatter: '{d}%\n\n{b}' } },
            { value: this.capacity - this.usage, name: '未使用', itemStyle: { color: '#d1cfd1' }, label: { formatter: '' } }
          ]
        }]
      })
    }
  }
}
</script>
<style lang="sass" scoped>

</style>

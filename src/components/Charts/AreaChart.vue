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
    data: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    data () {
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
        xAxis: {
          show: false,
          type: 'time',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          show: false,
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [{
          showSymbol: false,
          data: this.data,
          type: 'line',
          color: '#77c5ee',
          areaStyle: {
            color: '#c9e4f6'
          }
        }]
      })
    },
    updateData () {
      this.chart.setOption({
        series: [{
          data: this.data
        }]
      })
    }
  }
}
</script>
<style lang="sass" scoped>

</style>

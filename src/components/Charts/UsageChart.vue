<template>
  <div class="usage-chart-container">
    <el-row>
      <h4>{{ title }}</h4>
    </el-row>
    <el-row class="header">
      <el-col
        :span="8"
        class="usage"
      >{{ usage }} {{ unit || '%' }}</el-col>
      <el-col
        :span="8"
        class="capacity"
      >
        <el-row>Available</el-row>
        <el-row>of {{ capacity }} {{ unit || '%' }}</el-row>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <div class="chart1">
        <doughnut-chart
          :id="chartID1"
          width="150px"
          height="150px"
          :capacity="capacity || 100"
          :usage="usage"
          style="margin:0 auto;"
        />
      </div>
    </el-row>
    <el-row :gutter="20">
      <div class="chart2">
        <area-chart
          :id="chartID2"
          class="chart2"
          width="100%"
          height="150px"
          :data="areaChartData"
        />
      </div>
      <!-- <dynamic-line-chart
        :id="chartID2"
        class="chart2"
        width="150px"
        height="150px"
      /> -->
    </el-row>
  </div>
</template>

<script>
import DynamicLineChart from './DynamicLineChart'
import DoughnutChart from './DoughnutChart'
import AreaChart from './AreaChart'
export default {
  components: { DynamicLineChart, DoughnutChart, AreaChart },
  props: {
    usage: {
      type: Number,
      default: 50
    },
    capacity: {
      type: Number,
      default: 100
    },
    title: {
      type: String,
      default: 'UsageChart'
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      chart: null,
      chartID1: this.genrateChartID(),
      chartID2: this.genrateChartID(),
      areaChartData: []
    }
  },
  mounted () {
    setInterval(() => {
      const dataSize = 20
      this.areaChartData.push({
        name: new Date(),
        value: [new Date(), this.usage / (this.capacity || 100) * 100]
      })
      // if (this.areaChartData.length > dataSize) {
      //   this.areaChartData.splice(this.areaChartData.length - dataSize, dataSize)
      // }
    }, 2000)
  },
  methods: {
    genrateChartID () {
      function generateUUID () {
        var d = new Date().getTime()
        if (window.performance && typeof window.performance.now === 'function') {
          d += performance.now() // use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0
          d = Math.floor(d / 16)
          return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
        })
        return uuid
      }
      return generateUUID()
    }
  }
}
</script>
<style scoped>
.chart1,
.chart2 {
  width: 100%;
}
.chart2 {
  margin-top: -50px;
}
.header {
  border: solid #888;
  border-width: 0 0 2px 0;
}
.usage,
.capacity {
  text-align: center;
}
.usage {
  line-height: 40px;
  font-size: 18px;
  font-weight: bold;
}
.capacity {
  font-size: 14px;
}
</style>

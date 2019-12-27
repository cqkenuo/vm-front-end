<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <!-- 大图 -->
        <el-card
          class="image-card"
          shadow="never"
        >
          <div>
            大图
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <!-- 虚拟机细节 -->
        <el-card
          class="detail-card"
          shadow="never"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <span>详情</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
            >操作按钮</el-button>
          </div>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">名称: {{ vm.name }}</el-col>
              <el-col :span="12">所属集群: {{ vm.cluster_name || vm.gid }}</el-col>
              <el-col :span="12">所属主机: {{ vm.host_name || vm.hid }}</el-col>
              <el-col :span="12">操作系统: {{ vm.os }}</el-col>
              <el-col :span="12">内存大小: {{ vm.mem_size }}</el-col>
              <el-col :span="12">磁盘大小: {{ vm.disk_size }}</el-col>
              <el-col :span="12">状态: {{ vm.state }}</el-col>
              <el-col :span="12">CPU个数: {{ vm.cpu_num }}</el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <!-- 快照 -->
        <el-card
          class="snapshot-card"
          shadow="never"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <span>快照</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
            >操作按钮</el-button>
          </div>
          <div>
            <div
              v-for="o in 4"
              :key="o"
              class="text item"
            >
              {{ '快照 ' + o }}
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="16">
        <!-- 使用状况 -->
        <el-card
          class="usage-card"
          shadow="never"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <span>性能监控</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
            >操作按钮</el-button>
          </div>
          <div>
            <el-row :gutter="20">
              <el-col :span="6">
                <usage-chart
                  title="CPU"
                  usage="20"
                  capacity="100"
                  height="100%"
                  width="100%"
                />
              </el-col>
              <el-col :span="6">
                <usage-chart
                  title="Memory"
                  usage="2.18"
                  capacity="7"
                  unit="GB"
                  height="100%"
                  width="100%"
                />
              </el-col>
              <el-col :span="6">
                <usage-chart
                  title="Networking"
                  usage="21.9"
                  capacity="100"
                  height="100%"
                  width="100%"
                />
              </el-col>
              <el-col :span="6">
                <usage-chart
                  title="Disk"
                  usage="2.18"
                  capacity="7"
                  unit="GB"
                  height="100%"
                  width="100%"
                />
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-row>
          <!-- 网络 -->
          <el-card
            class="network-card"
            shadow="never"
          >
            <div
              slot="header"
              class="clearfix"
            >
              <span>网络接口</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
              >操作按钮</el-button>
            </div>
            <div>
              <div
                v-for="o in 4"
                :key="o"
                class="text item"
              >
                {{ '网络 ' + o }}
              </div>
            </div>
          </el-card>
        </el-row>

        <el-row>
          <!-- 磁盘 -->
          <el-card
            class="disk-card"
            shadow="never"
          >
            <div
              slot="header"
              class="clearfix"
            >
              <span>存储域</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
              >操作按钮</el-button>
            </div>
            <div>
              <div
                v-for="o in 4"
                :key="o"
                class="text item"
              >
                {{ '存储域 ' + o }}
              </div>
            </div>
          </el-card>
        </el-row>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import UsageChart from '@/components/Charts/UsageChart'
export default {
  components: { UsageChart },
  props: {
    detailData: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      host: {},
      cluster: {}
    }
  },
  computed: {
    vm () {
      return this.detailData
    }
  }
}
</script>

<style lang='scss' scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.image-card,
.detail-card,
.snapshot-card,
.disk-card,
.network-card,
.usage-card {
  border-radius: 0px;
  border: 1px solid #eee;
}

.image-card,
.detail-card,
.snapshot-card {
  height: 200px;
}

.disk-card,
.network-card {
  height: 190px;
}
.usage-card {
  height: 400px;
}
</style>

<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <div class="tree-container">
      <!-- 节点树 -->
      <el-tree
        ref="nodeTree"
        :props="defaultProps"
        :filter-node-method="filterNode"
        :load="loadTreeData"
        lazy
        class="filter-tree"
        @node-click="handleNodeClick"
      />
    </div>
    <div class="right-container">
      <!-- 头部信息 -->
      <el-row
        :gutter="20"
        class="dashboard-header"
      >
        <el-col :span="4">
          <!-- 数据中心 -->
          <el-card
            shadow="never"
            class="header-card"
          >
            <div>
              <i class="el-icon-info" /> 数据中心
            </div>
            <div>
              {{ dataCenterNum }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <!-- 集群 -->
          <el-card
            shadow="never"
            class="header-card"
          >
            <div>
              集群
            </div>
            <div>
              {{ clusterNum }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <!-- 主机 -->
          <el-card
            shadow="never"
            class="header-card"
          >
            <div>
              主机
            </div>
            <div>
              {{ hostNum }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <!-- 存储域 -->
          <el-card
            shadow="never"
            class="header-card"
          >
            <div>
              存储域
            </div>
            <div>
              {{ storageNum }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <!-- 虚拟机 -->
          <el-card
            shadow="never"
            class="header-card"
          >
            <div>
              虚拟机
            </div>
            <div>
              {{ vmNum }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <!-- 事件 -->
          <el-card
            shadow="never"
            class="header-card"
          >
            <div>
              事件
            </div>
            <div>
              {{ eventNum }}
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
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
                    :usage="cpu_used"
                    :capacity="100"
                    height="100%"
                    width="100%"
                  />
                </el-col>
                <el-col :span="6">
                  <usage-chart
                    title="Memory"
                    :usage="mem_used"
                    :capacity="mem_size"
                    unit="GB"
                    height="100%"
                    width="100%"
                  />
                </el-col>
                <el-col :span="6">
                  <usage-chart
                    title="Networking"
                    :usage="network_used"
                    :capacity="100"
                    height="100%"
                    width="100%"
                  />
                </el-col>
                <el-col :span="6">
                  <usage-chart
                    title="Disk"
                    :usage="disk_used"
                    :capacity="disk_size"
                    unit="GB"
                    height="100%"
                    width="100%"
                  />
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    </el-card>
    </el-col>
    </el-row>
  </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import UsageChart from '@/components/Charts/UsageChart'
import { getClusterTree, loadTreeNode } from '@/api/cluster'

export default {
  name: 'Dashboard',
  components: { UsageChart },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data () {
    return {
      dataCenterNum: 0,
      clusterNum: 0,
      hostNum: 0,
      storageNum: 0,
      vmNum: 0,
      eventNum: 0,

      cpu_used: 0,
      mem_used: 0,
      mem_size: 0,
      network_used: 0,
      disk_used: 0,
      disk_size: 0,

      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'isLeaf'
      }
    }
  },
  watch: {
    filterText (val) {
      this.$refs.nodeTree.filter(val)
    }
  },
  mounted () {
    setInterval(() => { this.randomData() }, 2000)
  },
  methods: {
    // 模拟用的假数据
    randomData () {
      this.cpu_used = parseFloat((Math.random() * 100).toFixed(2))
      this.network_used = parseFloat((Math.random() * 100).toFixed(2))

      this.mem_size = parseInt((Math.random() * 10)) * 4
      this.mem_used = parseInt(this.mem_size * Math.random())

      this.disk_size = parseInt((Math.random() * 10)) * 4
      this.disk_used = parseInt(this.disk_size * Math.random())
    },
    // 树操作
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    loadTreeData (node, resolve) {
      if (node.level === 0) {
        return loadTreeNode().then(data => {
          resolve(data)
        })
      }

      if (node.level === 1) {
        node.data.data.parentId = 0
      }
      loadTreeNode(node.data.data).then(data => {
        resolve(data)
      })
    },
    handleNodeClick (node) {
      if (node.data.vmId !== null) {
        // ToDo: 节点点击后刷新左侧数据
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$treeWidth: 150px;
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.tree-container {
  position: absolute;
  display: inline-block;
  width: $treeWidth;
}
.right-container {
  display: inline-block;
  width: calc(100% - 160px);
  margin-left: $treeWidth + 10px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.header-card {
  box-sizing: border-box;

  text-align: center;

  border-style: solid;
  border-color: #77c5ee #eee #eee;
  border-width: 5px 1px 1px 1px;
  border-radius: 0;
  height: 80px;
}
.usage-card {
  height: 420px;
}
</style>

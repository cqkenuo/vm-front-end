<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="Filter keyword"
      style="margin-bottom:30px;"
    />

    <el-tree
      ref="tree2"
      :data="treeData"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import { getClusterTree } from '@/api/cluster'
export default {

  data () {
    return {
      filterText: '',
      treeData: []
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree2.filter(val)
    }
  },
  mounted () {
    this.updateTreeData()
  },

  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    updateTreeData () {
      getClusterTree().then(data => {
        this.treeData = data
        console.log(data)
      })
    }
  }
}
</script>


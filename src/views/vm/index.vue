<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="虚拟机名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        创建
      </el-button>

    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        label="ID"
        prop="id"
        align="center"
        width="80"
      >
        <template slot-scope="{row}">
          <span>{{ row.vid }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="名称"
        width="150px"
        align="center"
      >
        <template slot-scope="{row}">
          <span
            class="link-type"
            @click="handleShow(row)"
          >{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="所属主机"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.hid }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="所属集群"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.gid }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="描述"
        width="150px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.desc }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作系统"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.os }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ stateDict[row.state] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="row.status!='runing'"
            size="mini"
            type="success"
            @click="handleOperate(row, 1)"
          >
            运行
          </el-button>
          <el-button
            v-if="row.status!='pause'"
            size="mini"
            @click="handleOperate(row, 2)"
          >
            挂起
          </el-button>
          <el-button
            v-if="row.status!='deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row,'deleted')"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <!-- 表单修改 模态框 -->
    <el-dialog
      :title="dialogTextMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >

        <el-form-item
          label="名称"
          prop="name"
        >
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item
          label="所属集群"
          prop="gid"
        >
          <el-select
            v-model="temp.gid"
            class="filter-item"
            placeholder="请选择所属集群"
          >
            <el-option
              v-for="item in clusterDict"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="所属主机"
          prop="hid"
        >
          <el-select
            v-model="temp.hid"
            class="filter-item"
            placeholder="请选择所属主机"
          >
            <el-option
              v-for="item in hostDict"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="CPU个数"
          prop="cpu_num"
        >
          <el-select
            v-model="temp.cpu_num"
            class="filter-item"
            placeholder="CPU个数"
          >
            <el-option
              v-for="item in cpuDict"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="内存大小"
          prop="mem_size"
        >
          <el-input v-model="temp.mem_size" />
        </el-form-item>
        <el-form-item
          label="磁盘大小"
          prop="disk_size"
        >
          <el-input v-model="temp.disk_size" />
        </el-form-item>
        <el-form-item
          label="存储地址"
          prop="storage"
        >
          <el-select
            v-model="temp.storage"
            class="filter-item"
            placeholder="请选择存储地址"
          >
            <el-option
              v-for="item in storageDict"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="ISO"
          prop="iso"
        >
          <el-select
            v-model="temp.iso"
            class="filter-item"
            placeholder="请选择ISO"
          >
            <el-option
              v-for="item in isoDict"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="temp.desc"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入描述"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >
          确认
        </el-button>
      </div>
    </el-dialog>

    <!-- 详情展示 模态框 -->
    <el-dialog
      title="详细信息"
      :visible.sync="dialogDetailVisible"
      width="100%"
    >
      <detail :data="dialogDetailData" />
    </el-dialog>
  </div>

</template>

<script>
import { getVMList, getVM, createVM, updateVM, deleteVM, operateVM } from '@/api/vm'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import Detail from './detail' // secondary package based on el-pagination
export default {
  components: { Pagination, Detail },
  data () {
    return {
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      dialogTextMap: { 'create': '新增', 'update': '更新' },
      dialogDetailVisible: false,
      dialogDetailData: null,
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {},
      rules: {},
      clusterDict: [],
      cpuDict: [],
      hostDict: [],
      storageDict: [],
      isoDict: [],
      stateDict: ['运行', '空闲', '挂起', 'shutdown', 'shutoff', 'crashed', 'nostate']
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 搜索
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    // 获取列表
    getList () {
      this.listLoading = true
      getVMList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 进行操作
    handleOperate (row, type) {
      operateVM(row, type).then(
        response => {
          this.$message({
            message: '操作Success',
            type: 'success'
          })
          row.state = response
        }
      )
    },
    // 创建
    handleCreate () {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.temp = {}
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createVM(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 更新
    handleUpdate (row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateVM(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 删除
    handleDelete (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteVM(row).then(response => {
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 展示
    handleShow (row) {
      this.dialogDetailData = Object.assign({}, row)
      this.dialogDetailVisible = true
    }
  }
}
</script>

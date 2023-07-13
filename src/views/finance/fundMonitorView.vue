<template>
  <div class="filters">
    <el-input class="filter-input" v-model="query.filters.codes" placeholder="代码"></el-input>
    <el-select
      class="filter-select mr10" 
     v-model="query.filters.monitorType"
     clearable
     placeholder="请选择类型"
     >
      <el-option
       v-for="item in montitorTypeOption"
       :key="item.value"
       :label="item.label"
       :value="item.value"
       ></el-option>
    </el-select>
    <el-button type="primary" :icon="Search" @click="handleSearch" >搜索</el-button>
    <el-button type="primary" :icon="Add" @click="addVisible = true" >添加</el-button>
  </div>

  <el-table
    :data="tableData"
    border
    style="width: 100%;"
    class="table"
    ref="multipleTable"
    header-cell-class-name="table-header"
    >
    <el-table-column type="expand">
      <template #default="scope">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item v-if="scope.row.option['cost']" label="成本"><span>{{ scope.row.option["cost"] }}</span></el-form-item>
          <el-form-item v-if="scope.row.option['worth']" label="阈值（净值）"><span>{{ scope.row.option["worth"] }}</span></el-form-item>
          <el-form-item v-if="scope.row.option['growth']" label="增长率"><span>{{ scope.row.option["growth"] }} %</span></el-form-item>
          <el-form-item v-if="scope.row.option['lessen']" label="降低率"><span>{{ scope.row.option["lessen"] }} %</span></el-form-item>
          <el-form-item v-if="scope.row.option['3']" label="3日增长率"><span>{{ scope.row.option["3"] }} %</span></el-form-item>
          <el-form-item v-if="scope.row.option['-3']" label="3日降低率"><span>{{ scope.row.option["-3"] }} %</span></el-form-item>
          <el-form-item v-if="scope.row.option['7']" label="7日增长率"><span>{{ scope.row.option["7"] }} %</span></el-form-item>
          <el-form-item v-if="scope.row.option['-7']" label="7日降低率"><span>{{ scope.row.option["-7"] }} %</span></el-form-item>
          <el-form-item v-if="scope.row.option['15']" label="15日增长率"><span>{{ scope.row.option["15"] }} %</span></el-form-item>
          <el-form-item v-if="scope.row.option['-15']" label="15日降低率"><span>{{ scope.row.option["-15"] }} %</span></el-form-item>
          <el-form-item v-if="scope.row.option['30']" label="30日增长率"><span>{{ scope.row.option["30"] }} %</span></el-form-item>
          <el-form-item v-if="scope.row.option['-30']" label="30日降低率"><span>{{ scope.row.option["-30"] }} %</span></el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="代码" prop="code" align="center"></el-table-column>
    <el-table-column label="名称" prop="name" align="center"></el-table-column>
    <el-table-column label="类型" prop="type" align="center">
      <template #default="scope">
        {{ scope.row.type === 'rate' ? '增长率' : '净值' }}
      </template>
    </el-table-column>
    <el-table-column label="更新时间" prop="update_at" align="center"></el-table-column>
    <el-table-column label="备注" prop="remark" align="center"></el-table-column>
    <el-table-column label="操作" width="180" align="center">
      <template #default="scope">
          <el-button
            type="primary"
            :icon="Edit"
            size="small"
            @click="handleEdit(scope.row)"
            >编辑</el-button>
          <el-button
            type="danger"
            :icon="Delete"
            size="small"
            @click="handleDelete(scope.row)"
            >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
    background
    :current-page="query.currentPage"
    :page-size="query.pageSize"
    :page-sizes="[10, 30, 50, 100]"
    layout="total, sizes, prev, pager, next"
    :total="total"
    @current-change="handlePageChange"
    @size-change="handleSizeChange"
    ></el-pagination>
  </div>

  <!-- 编辑框 -->
  <el-dialog v-model="editVisible" width="30%">
    <el-form :model="editForm">
      <el-form-item label="备注"><el-input v-model="editForm.remark"></el-input></el-form-item>
      <template v-if="formType == 'worth'">
        <el-form-item label="成本">
          <el-input v-model="editForm[formType].cost"></el-input>
        </el-form-item>
        <el-form-item label="阈值（净值）">
          <el-input v-model="editForm[formType].worth"></el-input>
        </el-form-item>
        <el-form-item label="增长率">
          <el-input v-model="editForm[formType].growth"></el-input>
        </el-form-item>
        <el-form-item label="降低率">
          <el-input v-model="editForm[formType].lessen"></el-input>
        </el-form-item>
      </template>
      <template v-else-if="formType == 'rate'">
        <el-form-item label="3日增长率"><el-input v-model="editForm[formType]['3']"></el-input></el-form-item>
        <el-form-item label="3日降低率"><el-input v-model="editForm[formType]['-3']"></el-input></el-form-item>
        <el-form-item label="7日增长率"><el-input v-model="editForm[formType]['7']"></el-input></el-form-item>
        <el-form-item label="7日降低率"><el-input v-model="editForm[formType]['-7']"></el-input></el-form-item>
        <el-form-item label="15日增长率"><el-input v-model="editForm[formType]['15']"></el-input></el-form-item>
        <el-form-item label="15日降低率"><el-input v-model="editForm[formType]['-15']"></el-input></el-form-item>
        <el-form-item label="30日增长率"><el-input v-model="editForm[formType]['30']"></el-input></el-form-item>
        <el-form-item label="30日降低率"><el-input v-model="editForm[formType]['-30']"></el-input></el-form-item>
      </template>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editVisible=false">取消</el-button>
        <el-button type="primary" @click="saveEdit">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 添加框 -->
  <el-dialog v-model="addVisible" width="30%">
    <el-form :model="addForm" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="代码" prop="code"><el-input v-model="addForm.code" /></el-form-item>
      <el-form-item label="备注" prop="remark"><el-input v-model="addForm.remark" /></el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="addForm.type" placholder="请选择类型" clearable>
            <el-option v-for="typeOption in montitorTypeOption" :key="typeOption.value" :label="typeOption.label" :value="typeOption.value"></el-option>
        </el-select>
      </el-form-item>
      <template v-if="addForm.type == 'worth'">
        <el-form-item label="成本"><el-input v-model="addForm[addForm.type]['cost']"></el-input></el-form-item>
        <el-form-item label="阈值（净值）"><el-input v-model="addForm[addForm.type]['worth']"></el-input></el-form-item>
        <el-form-item label="增长率"><el-input v-model="addForm[addForm.type]['growth']"></el-input></el-form-item>
        <el-form-item label="降低率"><el-input v-model="addForm[addForm.type]['lessen']"></el-input></el-form-item>
      </template>
      <template v-else-if="addForm.type == 'rate'">
        <el-form-item label="3日增长率"><el-input v-model="addForm[addForm.type]['3']"></el-input></el-form-item>
        <el-form-item label="3日降低率"><el-input v-model="addForm[addForm.type]['-3']"></el-input></el-form-item>
        <el-form-item label="7日增长率"><el-input v-model="addForm[addForm.type]['7']"></el-input></el-form-item>
        <el-form-item label="7日降低率"><el-input v-model="addForm[addForm.type]['-7']"></el-input></el-form-item>
        <el-form-item label="15日增长率"><el-input v-model="addForm[addForm.type]['15']"></el-input></el-form-item>
        <el-form-item label="15日降低率"><el-input v-model="addForm[addForm.type]['-15']"></el-input></el-form-item>
        <el-form-item label="30日增长率"><el-input v-model="addForm[addForm.type]['30']"></el-input></el-form-item>
        <el-form-item label="30日降低率"><el-input v-model="addForm[addForm.type]['-30']"></el-input></el-form-item>
      </template>

      <el-form-item>
        <el-button type="primary" @click="handleAdd">提交</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as fundApi from '../../api/fund.js'
import * as dashboardApi from '../../api/dashboard.js'
import { reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const query = reactive({
  filters: {
    codes: '',
    monitorType: ''
  },
  pageSize: 10,
  currentPage: 1
})

const montitorTypeOption = ref([])

const getTypeOptions = () => {
  const filter_name = 'fund_monitor_type'
  dashboardApi.getFiltersConfig([filter_name]).then((res) => {
    montitorTypeOption.value = res.data[filter_name].options
  })
}

const tableData = ref([])
const total = ref(0)

// 查询
const fetchData = () => {
  fundApi.getFundMonitors(query.filters.codes, query.filters.monitorType, query.currentPage, query.pageSize)
  .then((res) => {
    tableData.value = res.data
    total.value = res.total
  })
}

const handleSearch = () => {
  query.currentPage = 1
  fetchData()
}

function handlePageChange(newPage) {
    query.currentPage = newPage
    fetchData()
}

function handleSizeChange(newSize) {
    query.pageSize = newSize
    fetchData()
}

// 编辑
const editVisible = ref(false)
let formType = ref()
const editForm = reactive({
  row: null,
  remark: null,
  rate: {
    "3": null,
    "-3": null,
    "7": null,
    "-7": null,
    "15": null,
    "-15": null,
    "30": null,
    "-30": null,
  },
  worth: {
    cost: null,
    worth: null,
    growth: null,
    lessen: null,
  }
})

function handleEdit(row) {
  editVisible.value = true
  formType.value = row["type"]
  editForm.row = row
  editForm.remark = row["remark"]
  Object.keys(editForm[formType.value]).forEach((key) => {
    editForm[formType.value][key] = row["option"][key]
  })
}

function saveEdit() {
  editVisible.value = false
  const rowData = editForm.row
  fundApi.updateFundMonitor(rowData["id"], rowData["update_at"], {option: editForm[rowData["type"]], remark: editForm.remark}).then(() => {
    ElMessage.success('更改成功')
    handleSearch()
  })
}

// 删除
function handleDelete(row) {
  ElMessageBox.confirm("确定删除吗？", "提示", {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        fundApi.delFundMonitor(row["id"], row["update_at"]).then(() => {
          ElMessage.success('删除成功')
          handleSearch()
        })
    }).catch(() => {})
}

// 添加
const addVisible = ref(false)
const addForm = reactive({
  code: null,
  type: null,
  remark: null,
  rate: {
    "3": null,
    "-3": null,
    "7": null,
    "-7": null,
    "15": null,
    "-15": null,
    "30": null,
    "-30": null,
  },
  worth: {
    cost: null,
    worth: null,
    growth: null,
    lessen: null,
  }
})
const formRef = ref()
const rules = {
  code: [{ required: true, message: '请输入代码', trigger: "blur" }],
  type: [{ required: true, message: '请选择类型', trigger: "blur" }],
}

function checkOption() {
  let success = false
  if (addForm.type === 'rate') {
    Object.keys(addForm[addForm.type]).forEach((key) => {
      if (addForm[addForm.type][key]) {
        success = true
      }
    })
  } else if (addForm.type === 'worth') {
    addForm[addForm.type]["cost"] ? success = true : false
  }
  return success
}

function handleAdd() {
  addVisible.value = false
  formRef.value.validate((valid) => {
    if (valid) {
      const option = addForm[addForm.type]
      if (!checkOption()) {return false}
      fundApi.addFundMonitors(addForm.code, addForm.type, option, addForm.remark).then((res) => {
        ElMessage.success('添加成功')
        onReset()
        handleSearch()
      })
    } else {
      return false
    }
  })
}

function onReset() {
    formRef.value.resetFields();
    ["rate", "worth"].forEach((type) => {
      Object.keys(addForm[type]).forEach((key) => {
        addForm[type][key] = null
      })
    })
}

onMounted(() => {
  getTypeOptions()
  handleSearch()
})
</script>

<style scoped>
.filters {
  margin-bottom: 20px;
}

.filter-select {
  width: 120px;
}

.filter-input {
  width: 300px;
  display: inline-block;
}

.demo-table-expand {
  font-size: 0;
  margin-left: 50px;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.mr10 {
  margin-right: 10px;
}
</style>
<script setup lang="ts">
import {
  getCataForm,
  deleteCata,
  updateCata,
  addCata,
  getCataOptions,
  listCatas,
} from "@/api/cata";

import { CataVO, CataForm, CataQuery } from "@/api/cata/types";

defineOptions({
  name: "Cata",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);
const CataFormRef = ref(ElForm);

const loading = ref(false);
const ids = ref<number[]>([]);
const dialog = reactive({
  title: "",
  visible: false,
});

const queryParams = reactive<CataQuery>({});
const cataList = ref<CataVO[]>();

const cataOptions = ref<OptionType[]>();

const formData = reactive<CataForm>({
  status: 1,
  parentId: 0,
  sort: 1,
});

const rules = reactive({
  parentId: [{ required: true, message: "上级目录不能为空", trigger: "blur" }],
  name: [{ required: true, message: "目录名称不能为空", trigger: "blur" }],
  sort: [{ required: true, message: "显示排序不能为空", trigger: "blur" }],
});

/** 查询 */
function handleQuery() {
  loading.value = true;
  listCatas(queryParams)
    .then(({ data }) => {
      cataList.value = data;
    })
    .finally(() => {
      loading.value = false;
    });
}

/**重置查询 */
function resetQuery() {
  queryFormRef.value.resetFields();
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  ids.value = selection.map((item: any) => item.id);
}

/** 获取目录下拉数据  */
async function loadcataOptions() {
  getCataOptions().then((response) => {
    cataOptions.value = [
      {
        value: 0,
        label: "顶级目录",
        children: response.data,
      },
    ];
  });
}

/**
 * 打开弹窗
 *
 * @param parentId 父目录ID
 * @param cataId 目录ID
 */
async function openDialog(parentId?: number, cataId?: number) {
  await loadcataOptions();
  dialog.visible = true;
  if (cataId) {
    dialog.title = "修改目录";
    getCataForm(cataId).then(({ data }) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增目录";
    formData.parentId = parentId ?? 0;
  }
}

/** 表单提交 */
function handleSubmit() {
  CataFormRef.value.validate((valid: any) => {
    if (valid) {
      const cataId = formData.id;
      loading.value = true;
      if (cataId) {
        updateCata(cataId, formData)
          .then(() => {
            ElMessage.success("修改成功");
            closeDialog();
            handleQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        addCata(formData)
          .then(() => {
            ElMessage.success("新增成功");
            closeDialog();
            handleQuery();
          })
          .finally(() => (loading.value = false));
      }
    }
  });
}

/** 删除目录 */
function handleDelete(cataId?: number) {
  const cataIds = [cataId || ids.value].join(",");

  if (!cataIds) {
    ElMessage.warning("请勾选删除项");
    return;
  }

  ElMessageBox.confirm(`确认删除已选中的数据项?`, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    deleteCata(cataIds).then(() => {
      ElMessage.success("删除成功");
      resetQuery();
    });
  });
}

/** 关闭弹窗 */
function closeDialog() {
  dialog.visible = false;
  resetForm();
}

/** 重置表单  */
function resetForm() {
  CataFormRef.value.resetFields();
  CataFormRef.value.clearValidate();

  formData.id = undefined;
  formData.parentId = 0;
  formData.status = 1;
  formData.sort = 1;
}

onMounted(() => {
  handleQuery();
});
</script>
<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="关键字" prop="keywords">
          <el-input
            v-model="queryParams.keywords"
            placeholder="目录名称"
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <el-form-item label="目录状态" prop="status">
          <el-select
            v-model="queryParams.status"
            placeholder="目录状态"
            clearable
          >
            <el-option :value="1" label="正常" />
            <el-option :value="0" label="禁用" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="filter-item" type="primary" @click="handleQuery">
            <i-ep-search />
            搜索
          </el-button>
          <el-button @click="resetQuery"> <i-ep-refresh />重置 </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never" class="table-container">
      <template #header>
        <el-button type="success" @click="openDialog(0, undefined)"
          ><i-ep-plus />新增</el-button
        >
        <el-tooltip
          effect="dark"
          :disabled="ids.length !== 0"
          content="请选择需删除的数据"
          placement="top"
        >
          <span style="margin-left: 10px">
            <el-button
              type="danger"
              :disabled="ids.length === 0"
              @click="handleDelete()"
              ><i-ep-delete />删除
            </el-button>
          </span>
        </el-tooltip>
      </template>

      <el-table
        v-loading="loading"
        :data="cataList"
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="name" label="目录名称" min-width="200" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.status == 1" type="success">正常</el-tag>
            <el-tag v-else type="info">禁用</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="sort" label="排序" width="100" />

        <el-table-column label="操作" fixed="right" align="center" width="200">
          <template #default="scope">
            <el-button
              type="primary"
              link
              size="small"
              @click.stop="openDialog(scope.row.id, undefined)"
              ><i-ep-plus />新增
            </el-button>
            <el-button
              type="primary"
              link
              size="small"
              @click.stop="openDialog(scope.row.parentId, scope.row.id)"
              ><i-ep-edit />编辑
            </el-button>
            <el-button
              type="primary"
              link
              size="small"
              @click.stop="handleDelete(scope.row.id)"
            >
              <i-ep-delete />删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      v-model="dialog.visible"
      :title="dialog.title"
      width="600px"
      @closed="closeDialog"
    >
      <el-form
        ref="CataFormRef"
        :model="formData"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="上级目录" prop="parentId">
          <el-tree-select
            v-model="formData.parentId"
            placeholder="选择上级目录"
            :data="cataOptions"
            filterable
            check-strictly
            :render-after-expand="false"
          />
        </el-form-item>
        <el-form-item label="目录名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入目录名称" />
        </el-form-item>
        <el-form-item label="显示排序" prop="sort">
          <el-input-number
            v-model="formData.sort"
            controls-position="right"
            style="width: 100px"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="目录状态">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit"> 确 定 </el-button>
          <el-button @click="closeDialog"> 取 消 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

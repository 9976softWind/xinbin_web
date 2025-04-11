<!-- 目录文件管理 -->
<script setup lang="ts">
defineOptions({
  name: "User",
  inheritAttrs: false,
});

import {
  getCataFileList,
  uploadCataFile,
  deleteCataFile,
} from "@/api/cataFile";
import { CataFilePageVO, CataFilePageQuery } from "@/api/cataFile/type";

import { getCataOptions } from "@/api/cata";

import type { UploadFile, UploadInstance } from "element-plus";
import TextViewer from "./components/textView.vue";

import JSZip from "jszip";

const queryFormRef = ref(ElForm); // 查询表单

const uploadRef = ref<UploadInstance>(); // 上传组件

const loading = ref(false); //  加载状态
const removeIds = ref([]); // 删除ID集合 用于批量删除
const downLoadUrls = ref([]);
const queryParams = reactive<CataFilePageQuery>({
  pageNum: 1,
  pageSize: 10,
});
const total = ref(0); // 数据总数
const pageData = ref<CataFilePageVO[]>(); // 目录文件分页数据
const cataList = ref<OptionType[]>(); // 目录下拉数据源
const fileViewUrl = ref("");
const fileViewName = ref("");
// 弹窗对象
const dialog = reactive({
  visible: false,
  type: "user-form",
  width: 800,
  title: "",
  fullscreenFlag: false,
});

// 目录文件导入数据
const importData = reactive({
  cataId: undefined,
  fileList: [] as UploadFile[],
});

/** 查询 */
function handleQuery() {
  loading.value = true;
  getCataFileList(queryParams)
    .then(({ data }) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置查询 */
function resetQuery() {
  queryFormRef.value.resetFields();
  queryParams.pageNum = 1;
  queryParams.fileName = undefined;
  queryParams.cataId = undefined;
  handleQuery();
}

/** 行选中 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
  downLoadUrls.value = selection.map((item: any) => item.filePath);
}

/** 加载目录下拉数据源 */
async function loadCataOptions() {
  getCataOptions().then((response) => {
    cataList.value = response.data;
  });
}

function convertToMB(input: string) {
  return (Number.parseInt(input.trim()) / 1024).toFixed(2);
}

/**
 * 打开弹窗
 *
 * @param type 弹窗类型  文件上传：cataFile-import | 文件查看：cataFile-view
 * @param id 目录文件ID
 */
async function openDialog(type: string, file?: CataFilePageVO) {
  dialog.visible = true;
  dialog.type = type;
  if (dialog.type === "cataFile-import") {
    dialog.title = "文件上传";
    dialog.width = 600;
    loadCataOptions();
  } else if (dialog.type === "cataFile-view") {
    dialog.title = "文件查看";
    dialog.width = 800;
    fileViewUrl.value = file!.filePath;
    fileViewName.value = file!.fileName;
  }
}

/**
 * 关闭弹窗
 *
 * @param type 弹窗类型 文件上传：cataFile-import | 文件查看：cataFile-view
 */
function closeDialog() {
  dialog.visible = false;
  if (dialog.type === "cataFile-import") {
    importData.fileList = [];
  }
}

/** 表单提交 */
const handleSubmit = useThrottleFn(() => {
  if (dialog.type === "cataFile-import") {
    if (!importData?.cataId) {
      ElMessage.warning("请选择目录");
      return false;
    }
    if (importData?.fileList.length == 0) {
      ElMessage.warning("上传文件不能为空");
      return false;
    }
    uploadCataFile(importData?.cataId, importData.fileList).then((response) => {
      ElMessage.success("文件上传成功，上传数量：" + response.data);
      closeDialog();
      resetQuery();
    });
  }
}, 3000);

/** 删除目录文件 */
function handleDelete(id?: number) {
  const fileIds = [id || removeIds.value].join(",");
  if (!fileIds) {
    ElMessage.warning("请勾选删除项");
    return;
  }

  ElMessageBox.confirm("确认删除该文件?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(function () {
    deleteCataFile(fileIds).then(() => {
      ElMessage.success("删除成功");
      resetQuery();
    });
  });
}

const handleFileChange = (file: UploadFile, files: UploadFile[]) => {
  // 验证文件类型
  const isTxt = file.name?.split(".").pop()?.toLowerCase() === "txt";
  // 验证文件大小（示例限制5MB）
  // const isOverSize = file.size! / 1024 / 1024 > 5;
  if (!isTxt) {
    ElMessage.error("只能上传txt格式文件");
    const index = importData.fileList.findIndex((item) => {
      return (item.uid = file.uid);
    });
    importData.fileList.splice(index, -1);
    return;
  }
  importData.fileList.push(file);
};
/** Excel文件 Exceed  */
function handleFileExceed(files: any) {
  ElMessage.warning("当前超出可上传文件最大数量");
  return;
}

/** 下载目录文件 */
async function handleDownloadFile() {
  try {
    const zip = new JSZip();
    // 并行获取所有文件
    const fetchPromises = downLoadUrls.value.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch ${url}`);
      console.log(response);

      return {
        data: await response.blob(),
        name: (url as String).split("/").pop() || `${Date.now()}.txt`,
      };
    });
    // 等待所有请求完成
    const files = await Promise.all(fetchPromises);
    // 将文件添加到 ZIP
    files.forEach(({ data, name }) => {
      zip.file(name, data);
    });
    // 生成 ZIP 文件
    const zipBlob = await zip.generateAsync({ type: "blob" });
    // 触发下载
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = `files-${Date.now()}.zip`;
    link.click();
    // 清理资源
    URL.revokeObjectURL(link.href);
    return true;
  } catch (error) {
    console.error("打包下载失败:", error);
    return false;
  }
}

onMounted(() => {
  handleQuery();
});
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!-- 目录树 -->
      <el-col :lg="4" :xs="24" class="mb-[12px]">
        <cata-tree v-model="queryParams.cataId" @node-click="handleQuery" />
      </el-col>

      <!-- 目录文件列表 -->
      <el-col :lg="20" :xs="24">
        <div class="search-container">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="文件名称" prop="fileName">
              <el-input
                v-model="queryParams.fileName"
                placeholder="请输入文件名称"
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleQuery"
                ><i-ep-search />搜索</el-button
              >
              <el-button @click="resetQuery">
                <i-ep-refresh />
                重置</el-button
              >
            </el-form-item>
          </el-form>
        </div>

        <el-card shadow="never" class="table-container">
          <template #header>
            <div class="flex justify-between">
              <div>
                <el-button type="success" @click="openDialog('cataFile-import')"
                  ><i-ep-plus />上传</el-button
                >
                <el-tooltip
                  effect="dark"
                  :disabled="removeIds.length !== 0"
                  content="请选择需删除的数据"
                  placement="top"
                >
                  <span style="margin-left: 10px">
                    <el-button
                      type="danger"
                      :disabled="removeIds.length === 0"
                      @click="handleDelete()"
                      ><i-ep-delete />删除</el-button
                    >
                  </span>
                </el-tooltip>
              </div>
              <div>
                <el-tooltip
                  effect="dark"
                  :disabled="downLoadUrls.length !== 0"
                  content="请选择需下载的文件"
                  placement="top"
                >
                  <span style="margin-left: 10px">
                    <el-button
                      class="ml-3"
                      :disabled="downLoadUrls.length == 0"
                      @click="handleDownloadFile"
                      ><template #icon><i-ep-download /></template
                      >下载</el-button
                    >
                  </span>
                </el-tooltip>
              </div>
            </div>
          </template>

          <el-table
            v-loading="loading"
            :data="pageData"
            stripe
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column
              type="index"
              width="100"
              align="center"
              label="编号"
            />
            <el-table-column
              key="fileName"
              label="文件名称"
              align="center"
              prop="fileName"
            />
            <el-table-column
              label="文件大小"
              width="120"
              align="center"
              prop="fileSize"
            >
              <template #default="scope">
                <el-tag>{{ convertToMB(scope.row.fileSize) + "kB" }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="文件类型"
              width="100"
              align="center"
              prop="fileType"
            />
            <el-table-column
              label="上传时间"
              width="200"
              align="center"
              prop="createTime"
            />
            <el-table-column
              label="操作"
              fixed="right"
              width="220"
              align="center"
            >
              <template #default="scope">
                <!-- <el-button
                  type="primary"
                  link
                  size="small"
                  @click="openDialog('user-form', scope.row.id)"
                  ><i-ep-edit />编辑</el-button
                > -->
                <el-button
                  type="primary"
                  link
                  size="small"
                  @click="openDialog('cataFile-view', scope.row)"
                  ><i-ep-view />查看</el-button
                >
                <el-button
                  type="primary"
                  link
                  size="small"
                  @click="handleDelete(scope.row.id)"
                  ><i-ep-delete />删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <pagination
            v-if="total > 0"
            v-model:total="total"
            v-model:page="queryParams.pageNum"
            v-model:limit="queryParams.pageSize"
            @pagination="handleQuery"
          />
        </el-card>
      </el-col>
    </el-row>

    <!-- 弹窗 -->
    <el-dialog
      v-model="dialog.visible"
      :title="dialog.title"
      :width="dialog.width"
      :fullscreen="dialog.fullscreenFlag"
      append-to-body
      @close="closeDialog"
    >
      <el-form
        v-if="dialog.type === 'cataFile-import'"
        :model="importData"
        label-width="100px"
      >
        <el-form-item label="目录">
          <el-tree-select
            v-model="importData.cataId"
            placeholder="请选择目录"
            :data="cataList"
            filterable
            check-strictly
          />
        </el-form-item>

        <el-form-item label="文件">
          <el-upload
            ref="uploadRef"
            action=""
            drag
            accept=".txt"
            multiple
            :limit="10"
            :auto-upload="false"
            :file-list="importData.fileList"
            :on-change="handleFileChange"
            :on-exceed="handleFileExceed"
          >
            <el-icon class="el-icon--upload">
              <i-ep-upload-filled />
            </el-icon>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <template #tip>
              <div>每次至多上次10个文件，文件格式：txt</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>

      <div v-if="dialog.type === 'cataFile-view'">
        <el-tag type="success">{{ fileViewName }}</el-tag>
        <TextViewer :url="fileViewUrl" />
      </div>

      <template #footer v-if="dialog.type === 'cataFile-import'">
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

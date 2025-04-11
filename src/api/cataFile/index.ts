import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { CataFilePageQuery, CataFilePageVO } from './type';
import { UploadFile } from "element-plus";

/**
 * 获取文件分页列表
 * @param params 
 * @returns 
 */
export function getCataFileList(params: CataFilePageQuery): AxiosPromise<PageResult<CataFilePageVO[]>> {
  return request({
    url: "/api/v1/cata-file/list",
    method: "get",
    params: params
  });
}


export function uploadCataFile(cataId: number, files: UploadFile[]) {
  const formData = new FormData();
  formData.append("cataId", cataId.toString());
  files.forEach((file, index) => {
    formData.append(`files`, file.raw as File);
  });
  return request({
    url: "/api/v1/cata-file",
    method: "post",
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}


// /**
//  * 删除站点数据
//  * @param id 
//  * @returns 
//  */
// export function deleteStationData(id: number) {
//   return request({
//     url: "/api/v1/stationBasic/delete/" + id,
//     method: "delete",
//   });
// }

// /**
//  * 修改站点数据
//  * @param devType 
//  * @returns 
//  */
// export function setStationData(data: any, id: number,) {
//   return request({
//     url: "/api/v1/stationBasic/set/" + id,
//     method: "put",
//     data: data,
//   });
// }



import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { CataForm, CataQuery, CataVO } from "./types";

/**
 * 目录树形表格
 *
 * @param queryParams
 */
export function listCatas(queryParams?: CataQuery): AxiosPromise<CataVO[]> {
  return request({
    url: "/api/v1/cata",
    method: "get",
    params: queryParams,
  });
}

/**
 * 目录下拉列表
 */
export function getCataOptions(): AxiosPromise<OptionType[]> {
  return request({
    url: "/api/v1/cata/options",
    method: "get",
  });
}

/**
 * 获取目录详情
 *
 * @param id
 */
export function getCataForm(id: number): AxiosPromise<CataForm> {
  return request({
    url: "/api/v1/cata/" + id + "/form",
    method: "get",
  });
}

/**
 * 新增目录
 *
 * @param data
 */
export function addCata(data: CataForm) {
  return request({
    url: "/api/v1/cata",
    method: "post",
    data: data,
  });
}

/**
 *  修改目录
 *
 * @param id
 * @param data
 */
export function updateCata(id: number, data: CataForm) {
  return request({
    url: "/api/v1/cata/" + id,
    method: "put",
    data: data,
  });
}

/**
 * 删除目录
 *
 * @param ids
 */
export function deleteCata(ids: string) {
  return request({
    url: "/api/v1/cata/" + ids,
    method: "delete",
  });
}

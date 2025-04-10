/**
 * 目录查询参数
 */
export interface CataQuery {
  keywords?: string;
  status?: number;
}

/**
 * 目录类型
 */
export interface CataVO {
  /**
   * 子目录
   */
  children?: CataVO[];
  /**
   * 创建时间
   */
  createTime?: Date;
  /**
   * 目录ID
   */
  id?: number;
  /**
   * 目录名称
   */
  name?: string;
  /**
   * 父目录ID
   */
  parentId?: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 状态(1:启用；0:禁用)
   */
  status?: number;
  /**
   * 修改时间
   */
  updateTime?: Date;
}

/**
 * 目录表单类型
 */
export interface CataForm {
  /**
   * 目录ID(新增不填)
   */
  id?: number;
  /**
   * 目录名称
   */
  name?: string;
  /**
   * 父目录ID
   */
  parentId: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 状态(1:启用；0：禁用)
   */
  status?: number;
}

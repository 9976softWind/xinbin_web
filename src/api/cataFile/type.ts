
export interface CataFilePageQuery extends PageQuery {
  fileName?: string;
  cataId?: string;
}


export interface CataFilePageVO {

  id: number,

  fileId: string,

  fileName: string,

  filePath: string,

  fileType: string,

  fileSize: number,

  cataId: number,

  createTime: string;

  updateTime: string;

}

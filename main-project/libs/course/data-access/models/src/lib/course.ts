export interface List {
  pageSize?: number,
  pageNumber?: number,
  sortName?: string,
  sortASC?: boolean,
  keyword?: string,
  maKhoaHoc?: string,
  isVisible?: boolean
}

export interface KhoaHoc {
  id ?: number,
  idGuid ?: string,
  maKhoaHoc ?: string,
  tenKhoaHoc ?: string,
  moTaNgan ?: string,
  soThuTu ?: number,
  isVisible ?: boolean
}

export interface List {
  pageSize: number,
  pageNumber: number,
  sortName: string,
  sortASC: boolean,
  keyword: string,
  isVisible: boolean,
}


export interface QuocGia {
  id: number,
  maQuocGia: string,
  tenQuocGia: string,
  soThuTu: number,
  isVisible: true,
  ghiChu: string
}

export interface createQuocGia {
  maQuocGia: string,
  tenQuocGia: string,
  soThuTu: number,
  isVisible: boolean,
  ghiChu: string
}


export interface QuocGiaById {
  id: number,
  maQuocGia: string,
  tenQuocGia: string,
  soThuTu: number,
  isVisible: boolean,
  ghiChu: string
}


export interface createDanToc {
  maDanToc: string,
  tenDanToc: string,
  soThuTu: number,
  isVisible: boolean,
  ghiChu: string
}

export interface DanToc{
  id: number,
  maDanToc: string,
  tenDanToc: string,
  soThuTu: number,
  isVisible: boolean,
  ghiChu: string
}

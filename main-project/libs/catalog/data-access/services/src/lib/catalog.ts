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

export interface DanToc {
  id: number,
  maDanToc: string,
  tenDanToc: string,
  soThuTu: number,
  isVisible: boolean,
  ghiChu: string
}
export interface createTonGiao {
  maTonGiao: string,
  tenTonGiao: string,
  soThuTu: number,
  isVisible: boolean,
  ghiChu: string
}
export interface TonGiao {
  id: number,
  maTonGiao: string,
  tenTonGiao: string,
  soThuTu: number,
  isVisible: boolean,
  ghiChu: string
}
export interface createKhoiNganh {
  maKhoiNganh: string,
  tenKhoiNganh: string,
  soThuTu: number,
  isVisible: boolean,
  ghiChu: string
}
export interface KhoiNganh {
  id: number,
  maKhoiNganh: string,
  tenKhoiNganh: string,
  soThuTu: number,
  isVisible: boolean,
  ghiChu: string
}
export interface NganhHocList {
  pageSize: number,
  pageNumber: number,
  sortName: string,
  sortASC: boolean,
  keyword: string,
  idPhongBan: number,
  idKhoiNganh: number
}

export interface createNganhHoc {
  maNganh: string,
  tenNganh: string,
  tenVietTat: string,
  tenTiengAnh: string,
  maTuyenSinh: string,
  idPhongBan: number,
  idKhoiNganh: number,
  soThuTu: number,
  isVisible: boolean,
  ghiChu: string
}

export interface NganhHoc {
  id: number,
  maNganh: string,
  tenNganh: string,
  tenVietTat: string,
  tenTiengAnh: string,
  maTuyenSinh: string,
  idPhongBan: number,
  idKhoiNganh: number,
  soThuTu: number,
  isVisible: boolean,
  ghiChu: string
}

export interface TinhThanhList {
  pageSize: number,
  pageNumber: number,
  sortName: string,
  sortASC: boolean,
  keyword: string,
  idQuocGia: number,
}

export interface QuanHuyenList {
  pageSize: number,
  pageNumber: number,
  sortName: string,
  sortASC: boolean,
  keyword: string,
  idTinhThanh: number,
}

export interface TinhThanh {
  id: number,
  idQuocGia: number,
  maTinhThanh: string,
  tenTinhThanh: string,
  soThuTu: number,
  isVisible: boolean,
  ghiChu: string
}

export interface QuanHuyen{
  id: number,
  idTinhThanh: number,
  maQuanHuyen: string,
  tenQuanHuyen: string,
  soThuTu: number,
  isVisible: boolean,
  ghiChu: string
}

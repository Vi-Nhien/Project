export interface ThongBao {
  idGuid: string,
  loaiThongBao: number,
  maTraCuu: string,
  tieuDe: string,
  noiDung: string,
  ngayHetHan: Date,
  idTinhChat: number,
  forWeb: 0,
  idsCoSo: number[],
  idsPhongBan: number[],
  fileAttaches: [
    {
      fileType: string,
      fileName: string,
      filePath: string,
      fileSize: 0
    }
  ]
}

export interface ThongBaoList{
  pageSize: number,
  pageNumber: number,
  sortName: string,
  sortASC: true,
  keyword: string,
  idNguoiTao: number,
  maTraCuu: string,
  ngayTaoTu: Date,
  ngayTaoDen: Date,
  ngayHetHanTu: Date,
  ngayHetHanDen: Date,
  trangThaiHetHan:number,
  trangThaiXem: number,
  flag: number,
  idTinhChat: number
}

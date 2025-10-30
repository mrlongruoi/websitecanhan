import SectionAnhHung from "./sections/SectionAnhHung"
import { SectionBlog } from "./sections/SectionBlog"
import { SectionChungThuc } from "./sections/SectionChungThuc"
import { SectionDichVu } from "./sections/SectionDichVu"
import { SectionDuAn } from "./sections/SectionDuAn"
import { SectionGiaoDuc } from "./sections/SectionGiaoDuc"
import { SectionGioiThieu } from "./sections/SectionGioiThieu"
import { SectionKinhNgiem } from "./sections/SectionKinhNgiem"
import { SectionKyNang } from "./sections/SectionKyNang"
import { SectionLienHe } from "./sections/SectionLienHe"
import { SectionThanhTich } from "./sections/SectionThanhTich"
import { SectionXacThuc } from "./sections/SectionXacThuc"



const DanhMucDautu = async () => {
  return (
    <>
      <SectionAnhHung />
      <SectionGioiThieu />
      <SectionChungThuc />
      <SectionKyNang/>
      <SectionKinhNgiem/>
      <SectionGiaoDuc/>
      <SectionDuAn/>
      <SectionXacThuc/>
      <SectionThanhTich/>
      <SectionDichVu/>
      <SectionBlog/>
      <SectionLienHe/>
    </>
  )
}

export default DanhMucDautu

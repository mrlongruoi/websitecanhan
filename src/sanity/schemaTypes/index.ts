import type { SchemaTypeDefinition } from "sanity";
import blog from "./blog";
import hoso from "./hoso";
import duan from "./duan";
import dichvu from "./dichvu";
import kynang from "./kynang";
import lienhe from "./lienhe";
import thanhtich from "./thanhtich";
import chungnhan from "./chungnhan";
import dieuhuong from "./dieuhuong";
import kinhnghiem from "./kinhnghiem";
import loichungthuc from "./loichungthuc";
import caidatTrangweb from "./caidatTrangweb";
import hocvan from "./hocvan";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hoso,
    duan,
    kynang,
    kinhnghiem,
    loichungthuc,
    chungnhan,
    thanhtich,
    blog,
    dichvu,
    lienhe,
    caidatTrangweb,
    dieuhuong,
    hocvan,
  ],
};

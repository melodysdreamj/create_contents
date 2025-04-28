import { LegoUtil } from "../../../util";
import postgres from "postgres";
import { Base64 } from "js-base64";

import path from "path";

// 무료 디비 서버
// https://admin.alwaysdata.com/database/?type=mysql -> hostAddress:mysql-[user id].alwaysdata.net -> 가서 phpmyadmin에 가서 데이터베이스 하나 만들고 그거 하단에 적어두기
//
const dbName = "databaseName";
const userName = "userName";
const password = "password"; // do not use #,*..etc special characters in password
const portNumber = 3306; // 5432
const hostAddress = "hostAddress";

export class New {
  constructor() {
    this.docId = LegoUtil.randomString(10);
  }

  // s000: string = "";
  // s001: string = "";
  // s002: string = "";
  // s003: string = "";
  // s004: string = "";
  // s005: string = "";
  // s006: string = "";
  // s007: string = "";
  // s008: string = "";
  // s009: string = "";
  // s010: string = "";
  // s011: string = "";
  // s012: string = "";
  // s013: string = "";
  // s014: string = "";
  // s015: string = "";
  // s016: string = "";
  // s017: string = "";
  // s018: string = "";
  // s019: string = "";
  // s020: string = "";
  // s021: string = "";
  // s022: string = "";
  // s023: string = "";
  // s024: string = "";
  // s025: string = "";
  // s026: string = "";
  // s027: string = "";
  // s028: string = "";
  // s029: string = "";
  // s030: string = "";
  // s031: string = "";
  // s032: string = "";
  // s033: string = "";
  // s034: string = "";
  // s035: string = "";
  // s036: string = "";
  // s037: string = "";
  // s038: string = "";
  // s039: string = "";
  // s040: string = "";
  // s041: string = "";
  // s042: string = "";
  // s043: string = "";
  // s044: string = "";
  // s045: string = "";
  // s046: string = "";
  // s047: string = "";
  // s048: string = "";
  // s049: string = "";
  // s050: string = "";
  // s051: string = "";
  // s052: string = "";
  // s053: string = "";
  // s054: string = "";
  // s055: string = "";
  // s056: string = "";
  // s057: string = "";
  // s058: string = "";
  // s059: string = "";
  // s060: string = "";
  // s061: string = "";
  // s062: string = "";
  // s063: string = "";
  // s064: string = "";
  // s065: string = "";
  // s066: string = "";
  // s067: string = "";
  // s068: string = "";
  // s069: string = "";
  // s070: string = "";
  // s071: string = "";
  // s072: string = "";
  // s073: string = "";
  // s074: string = "";
  // s075: string = "";
  // s076: string = "";
  // s077: string = "";
  // s078: string = "";
  // s079: string = "";
  // s080: string = "";
  // s081: string = "";
  // s082: string = "";
  // s083: string = "";
  // s084: string = "";
  // s085: string = "";
  // s086: string = "";
  // s087: string = "";
  // s088: string = "";
  // s089: string = "";
  // s090: string = "";
  // s091: string = "";
  // s092: string = "";
  // s093: string = "";
  // s094: string = "";
  // s095: string = "";
  // s096: string = "";
  // s097: string = "";
  // s098: string = "";
  // s099: string = "";
  // i000: number = 0;
  // i001: number = 0;
  // i002: number = 0;
  // i003: number = 0;
  // i004: number = 0;
  // i005: number = 0;
  // i006: number = 0;
  // i007: number = 0;
  // i008: number = 0;
  // i009: number = 0;
  // i010: number = 0;
  // i011: number = 0;
  // i012: number = 0;
  // i013: number = 0;
  // i014: number = 0;
  // i015: number = 0;
  // i016: number = 0;
  // i017: number = 0;
  // i018: number = 0;
  // i019: number = 0;
  // i020: number = 0;
  // i021: number = 0;
  // i022: number = 0;
  // i023: number = 0;
  // i024: number = 0;
  // i025: number = 0;
  // i026: number = 0;
  // i027: number = 0;
  // i028: number = 0;
  // i029: number = 0;
  // i030: number = 0;
  // i031: number = 0;
  // i032: number = 0;
  // i033: number = 0;
  // i034: number = 0;
  // i035: number = 0;
  // i036: number = 0;
  // i037: number = 0;
  // i038: number = 0;
  // i039: number = 0;
  // i040: number = 0;
  // i041: number = 0;
  // i042: number = 0;
  // i043: number = 0;
  // i044: number = 0;
  // i045: number = 0;
  // i046: number = 0;
  // i047: number = 0;
  // i048: number = 0;
  // i049: number = 0;
  // i050: number = 0;
  // i051: number = 0;
  // i052: number = 0;
  // i053: number = 0;
  // i054: number = 0;
  // i055: number = 0;
  // i056: number = 0;
  // i057: number = 0;
  // i058: number = 0;
  // i059: number = 0;
  // i060: number = 0;
  // i061: number = 0;
  // i062: number = 0;
  // i063: number = 0;
  // i064: number = 0;
  // i065: number = 0;
  // i066: number = 0;
  // i067: number = 0;
  // i068: number = 0;
  // i069: number = 0;
  // i070: number = 0;
  // i071: number = 0;
  // i072: number = 0;
  // i073: number = 0;
  // i074: number = 0;
  // i075: number = 0;
  // i076: number = 0;
  // i077: number = 0;
  // i078: number = 0;
  // i079: number = 0;
  // i080: number = 0;
  // i081: number = 0;
  // i082: number = 0;
  // i083: number = 0;
  // i084: number = 0;
  // i085: number = 0;
  // i086: number = 0;
  // i087: number = 0;
  // i088: number = 0;
  // i089: number = 0;
  // i090: number = 0;
  // i091: number = 0;
  // i092: number = 0;
  // i093: number = 0;
  // i094: number = 0;
  // i095: number = 0;
  // i096: number = 0;
  // i097: number = 0;
  // i098: number = 0;
  // i099: number = 0;
  // b000: boolean = false;
  // b001: boolean = false;
  // b002: boolean = false;
  // b003: boolean = false;
  // b004: boolean = false;
  // b005: boolean = false;
  // b006: boolean = false;
  // b007: boolean = false;
  // b008: boolean = false;
  // b009: boolean = false;
  // b010: boolean = false;
  // b011: boolean = false;
  // b012: boolean = false;
  // b013: boolean = false;
  // b014: boolean = false;
  // b015: boolean = false;
  // b016: boolean = false;
  // b017: boolean = false;
  // b018: boolean = false;
  // b019: boolean = false;
  // b020: boolean = false;
  // b021: boolean = false;
  // b022: boolean = false;
  // b023: boolean = false;
  // b024: boolean = false;
  // b025: boolean = false;
  // b026: boolean = false;
  // b027: boolean = false;
  // b028: boolean = false;
  // b029: boolean = false;
  // b030: boolean = false;
  // r000: number = 0.0;
  // r001: number = 0.0;
  // r002: number = 0.0;
  // r003: number = 0.0;
  // r004: number = 0.0;
  // r005: number = 0.0;
  // r006: number = 0.0;
  // r007: number = 0.0;
  // r008: number = 0.0;
  // r009: number = 0.0;
  // r010: number = 0.0;
  // r011: number = 0.0;
  // r012: number = 0.0;
  // r013: number = 0.0;
  // r014: number = 0.0;
  // r015: number = 0.0;
  // r016: number = 0.0;
  // r017: number = 0.0;
  // r018: number = 0.0;
  // r019: number = 0.0;
  // r020: number = 0.0;
  // r021: number = 0.0;
  // r022: number = 0.0;
  // r023: number = 0.0;
  // r024: number = 0.0;
  // r025: number = 0.0;
  // r026: number = 0.0;
  // r027: number = 0.0;
  // r028: number = 0.0;
  // r029: number = 0.0;
  // r030: number = 0.0;
  // t000: Date = new Date(0);
  // t001: Date = new Date(0);
  // t002: Date = new Date(0);
  // t003: Date = new Date(0);
  // t004: Date = new Date(0);
  // t005: Date = new Date(0);
  // t006: Date = new Date(0);
  // t007: Date = new Date(0);
  // t008: Date = new Date(0);
  // t009: Date = new Date(0);
  // t010: Date = new Date(0);
  // t011: Date = new Date(0);
  // t012: Date = new Date(0);
  // t013: Date = new Date(0);
  // t014: Date = new Date(0);
  // t015: Date = new Date(0);
  // t016: Date = new Date(0);
  // t017: Date = new Date(0);
  // t018: Date = new Date(0);
  // t019: Date = new Date(0);
  // t020: Date = new Date(0);
  // l000: string[] = [];
  // l001: string[] = [];
  // l002: string[] = [];
  // l003: string[] = [];
  // l004: string[] = [];
  // l005: string[] = [];
  // l006: string[] = [];
  // l007: string[] = [];
  // l008: string[] = [];
  // l009: string[] = [];
  // l010: string[] = [];
  // l011: string[] = [];
  // l012: string[] = [];
  // l013: string[] = [];
  // l014: string[] = [];
  // l015: string[] = [];
  // l016: string[] = [];
  // l017: string[] = [];
  // l018: string[] = [];
  // l019: string[] = [];
  // l020: string[] = [];
  // m000: { [key: string]: any } = {};
  // m001: { [key: string]: any } = {};
  // m002: { [key: string]: any } = {};
  // m003: { [key: string]: any } = {};
  // m004: { [key: string]: any } = {};
  // m005: { [key: string]: any } = {};
  // m006: { [key: string]: any } = {};
  // m007: { [key: string]: any } = {};
  // m008: { [key: string]: any } = {};
  // m009: { [key: string]: any } = {};
  // m010: { [key: string]: any } = {};
  // m011: { [key: string]: any } = {};
  // m012: { [key: string]: any } = {};
  // m013: { [key: string]: any } = {};
  // m014: { [key: string]: any } = {};
  // m015: { [key: string]: any } = {};
  // m016: { [key: string]: any } = {};
  // m017: { [key: string]: any } = {};
  // m018: { [key: string]: any } = {};
  // m019: { [key: string]: any } = {};
  // m020: { [key: string]: any } = {};
  // c000: OtherModel = new OtherModel();
  // c001: OtherModel = new OtherModel();
  // c002: OtherModel = new OtherModel();
  // c003: OtherModel = new OtherModel();
  // c004: OtherModel = new OtherModel();
  // c005: OtherModel = new OtherModel();
  // c006: OtherModel = new OtherModel();
  // c007: OtherModel = new OtherModel();
  // c008: OtherModel = new OtherModel();
  // c009: OtherModel = new OtherModel();
  // c010: OtherModel = new OtherModel();
  // c011: OtherModel = new OtherModel();
  // c012: OtherModel = new OtherModel();
  // c013: OtherModel = new OtherModel();
  // c014: OtherModel = new OtherModel();
  // c015: OtherModel = new OtherModel();
  // c016: OtherModel = new OtherModel();
  // c017: OtherModel = new OtherModel();
  // c018: OtherModel = new OtherModel();
  // c019: OtherModel = new OtherModel();
  // c020: OtherModel = new OtherModel();
  // j000 : OtherModel[] = [];
  // j001 : OtherModel[] = [];
  // j002 : OtherModel[] = [];
  // j003 : OtherModel[] = [];
  // j004 : OtherModel[] = [];
  // j005 : OtherModel[] = [];
  // j006 : OtherModel[] = [];
  // j007 : OtherModel[] = [];
  // j008 : OtherModel[] = [];
  // j009 : OtherModel[] = [];
  // j010 : OtherModel[] = [];
  // j011 : OtherModel[] = [];
  // j012 : OtherModel[] = [];
  // j013 : OtherModel[] = [];
  // j014 : OtherModel[] = [];
  // j015 : OtherModel[] = [];
  // j016 : OtherModel[] = [];
  // j017 : OtherModel[] = [];
  // j018 : OtherModel[] = [];
  // j019 : OtherModel[] = [];
  // j020 : OtherModel[] = [];
  // e000: SomeEnum = SomeEnum.notSelected;
  // e001: SomeEnum = SomeEnum.notSelected;
  // e002: SomeEnum = SomeEnum.notSelected;
  // e003: SomeEnum = SomeEnum.notSelected;
  // e004: SomeEnum = SomeEnum.notSelected;
  // e005: SomeEnum = SomeEnum.notSelected;
  // e006: SomeEnum = SomeEnum.notSelected;
  // e007: SomeEnum = SomeEnum.notSelected;
  // e008: SomeEnum = SomeEnum.notSelected;
  // e009: SomeEnum = SomeEnum.notSelected;
  // e010: SomeEnum = SomeEnum.notSelected;
  // e011: SomeEnum = SomeEnum.notSelected;
  // e012: SomeEnum = SomeEnum.notSelected;
  // e013: SomeEnum = SomeEnum.notSelected;
  // e014: SomeEnum = SomeEnum.notSelected;
  // e015: SomeEnum = SomeEnum.notSelected;
  // e016: SomeEnum = SomeEnum.notSelected;
  // e017: SomeEnum = SomeEnum.notSelected;
  // e018: SomeEnum = SomeEnum.notSelected;
  // e019: SomeEnum = SomeEnum.notSelected;
  // e020: SomeEnum = SomeEnum.notSelected;

  docId: string = "";

  toDataString(): string {
    return btoa(
      Array.from(
        new TextEncoder().encode(
          new URLSearchParams({
            // s000: this.s000,
            // s001: this.s001,
            // s002: this.s002,
            // s003: this.s003,
            // s004: this.s004,
            // s005: this.s005,
            // s006: this.s006,
            // s007: this.s007,
            // s008: this.s008,
            // s009: this.s009,
            // s010: this.s010,
            // s011: this.s011,
            // s012: this.s012,
            // s013: this.s013,
            // s014: this.s014,
            // s015: this.s015,
            // s016: this.s016,
            // s017: this.s017,
            // s018: this.s018,
            // s019: this.s019,
            // s020: this.s020,
            // s021: this.s021,
            // s022: this.s022,
            // s023: this.s023,
            // s024: this.s024,
            // s025: this.s025,
            // s026: this.s026,
            // s027: this.s027,
            // s028: this.s028,
            // s029: this.s029,
            // s030: this.s030,
            // s031: this.s031,
            // s032: this.s032,
            // s033: this.s033,
            // s034: this.s034,
            // s035: this.s035,
            // s036: this.s036,
            // s037: this.s037,
            // s038: this.s038,
            // s039: this.s039,
            // s040: this.s040,
            // s041: this.s041,
            // s042: this.s042,
            // s043: this.s043,
            // s044: this.s044,
            // s045: this.s045,
            // s046: this.s046,
            // s047: this.s047,
            // s048: this.s048,
            // s049: this.s049,
            // s050: this.s050,
            // s051: this.s051,
            // s052: this.s052,
            // s053: this.s053,
            // s054: this.s054,
            // s055: this.s055,
            // s056: this.s056,
            // s057: this.s057,
            // s058: this.s058,
            // s059: this.s059,
            // s060: this.s060,
            // s061: this.s061,
            // s062: this.s062,
            // s063: this.s063,
            // s064: this.s064,
            // s065: this.s065,
            // s066: this.s066,
            // s067: this.s067,
            // s068: this.s068,
            // s069: this.s069,
            // s070: this.s070,
            // s071: this.s071,
            // s072: this.s072,
            // s073: this.s073,
            // s074: this.s074,
            // s075: this.s075,
            // s076: this.s076,
            // s077: this.s077,
            // s078: this.s078,
            // s079: this.s079,
            // s080: this.s080,
            // s081: this.s081,
            // s082: this.s082,
            // s083: this.s083,
            // s084: this.s084,
            // s085: this.s085,
            // s086: this.s086,
            // s087: this.s087,
            // s088: this.s088,
            // s089: this.s089,
            // s090: this.s090,
            // s091: this.s091,
            // s092: this.s092,
            // s093: this.s093,
            // s094: this.s094,
            // s095: this.s095,
            // s096: this.s096,
            // s097: this.s097,
            // s098: this.s098,
            // s099: this.s099,
            // i000: this.i000.toString(),
            // i001: this.i001.toString(),
            // i002: this.i002.toString(),
            // i003: this.i003.toString(),
            // i004: this.i004.toString(),
            // i005: this.i005.toString(),
            // i006: this.i006.toString(),
            // i007: this.i007.toString(),
            // i008: this.i008.toString(),
            // i009: this.i009.toString(),
            // i010: this.i010.toString(),
            // i011: this.i011.toString(),
            // i012: this.i012.toString(),
            // i013: this.i013.toString(),
            // i014: this.i014.toString(),
            // i015: this.i015.toString(),
            // i016: this.i016.toString(),
            // i017: this.i017.toString(),
            // i018: this.i018.toString(),
            // i019: this.i019.toString(),
            // i020: this.i020.toString(),
            // i021: this.i021.toString(),
            // i022: this.i022.toString(),
            // i023: this.i023.toString(),
            // i024: this.i024.toString(),
            // i025: this.i025.toString(),
            // i026: this.i026.toString(),
            // i027: this.i027.toString(),
            // i028: this.i028.toString(),
            // i029: this.i029.toString(),
            // i030: this.i030.toString(),
            // i031: this.i031.toString(),
            // i032: this.i032.toString(),
            // i033: this.i033.toString(),
            // i034: this.i034.toString(),
            // i035: this.i035.toString(),
            // i036: this.i036.toString(),
            // i037: this.i037.toString(),
            // i038: this.i038.toString(),
            // i039: this.i039.toString(),
            // i040: this.i040.toString(),
            // i041: this.i041.toString(),
            // i042: this.i042.toString(),
            // i043: this.i043.toString(),
            // i044: this.i044.toString(),
            // i045: this.i045.toString(),
            // i046: this.i046.toString(),
            // i047: this.i047.toString(),
            // i048: this.i048.toString(),
            // i049: this.i049.toString(),
            // i050: this.i050.toString(),
            // i051: this.i051.toString(),
            // i052: this.i052.toString(),
            // i053: this.i053.toString(),
            // i054: this.i054.toString(),
            // i055: this.i055.toString(),
            // i056: this.i056.toString(),
            // i057: this.i057.toString(),
            // i058: this.i058.toString(),
            // i059: this.i059.toString(),
            // i060: this.i060.toString(),
            // i061: this.i061.toString(),
            // i062: this.i062.toString(),
            // i063: this.i063.toString(),
            // i064: this.i064.toString(),
            // i065: this.i065.toString(),
            // i066: this.i066.toString(),
            // i067: this.i067.toString(),
            // i068: this.i068.toString(),
            // i069: this.i069.toString(),
            // i070: this.i070.toString(),
            // i071: this.i071.toString(),
            // i072: this.i072.toString(),
            // i073: this.i073.toString(),
            // i074: this.i074.toString(),
            // i075: this.i075.toString(),
            // i076: this.i076.toString(),
            // i077: this.i077.toString(),
            // i078: this.i078.toString(),
            // i079: this.i079.toString(),
            // i080: this.i080.toString(),
            // i081: this.i081.toString(),
            // i082: this.i082.toString(),
            // i083: this.i083.toString(),
            // i084: this.i084.toString(),
            // i085: this.i085.toString(),
            // i086: this.i086.toString(),
            // i087: this.i087.toString(),
            // i088: this.i088.toString(),
            // i089: this.i089.toString(),
            // i090: this.i090.toString(),
            // i091: this.i091.toString(),
            // i092: this.i092.toString(),
            // i093: this.i093.toString(),
            // i094: this.i094.toString(),
            // i095: this.i095.toString(),
            // i096: this.i096.toString(),
            // i097: this.i097.toString(),
            // i098: this.i098.toString(),
            // i099: this.i099.toString(),
            // b000: this.b000.toString(),
            // b001: this.b001.toString(),
            // b002: this.b002.toString(),
            // b003: this.b003.toString(),
            // b004: this.b004.toString(),
            // b005: this.b005.toString(),
            // b006: this.b006.toString(),
            // b007: this.b007.toString(),
            // b008: this.b008.toString(),
            // b009: this.b009.toString(),
            // b010: this.b010.toString(),
            // b011: this.b011.toString(),
            // b012: this.b012.toString(),
            // b013: this.b013.toString(),
            // b014: this.b014.toString(),
            // b015: this.b015.toString(),
            // b016: this.b016.toString(),
            // b017: this.b017.toString(),
            // b018: this.b018.toString(),
            // b019: this.b019.toString(),
            // b020: this.b020.toString(),
            // b021: this.b021.toString(),
            // b022: this.b022.toString(),
            // b023: this.b023.toString(),
            // b024: this.b024.toString(),
            // b025: this.b025.toString(),
            // b026: this.b026.toString(),
            // b027: this.b027.toString(),
            // b028: this.b028.toString(),
            // b029: this.b029.toString(),
            // b030: this.b030.toString(),
            // r000: this.r000.toString(),
            // r001: this.r001.toString(),
            // r002: this.r002.toString(),
            // r003: this.r003.toString(),
            // r004: this.r004.toString(),
            // r005: this.r005.toString(),
            // r006: this.r006.toString(),
            // r007: this.r007.toString(),
            // r008: this.r008.toString(),
            // r009: this.r009.toString(),
            // r010: this.r010.toString(),
            // r011: this.r011.toString(),
            // r012: this.r012.toString(),
            // r013: this.r013.toString(),
            // r014: this.r014.toString(),
            // r015: this.r015.toString(),
            // r016: this.r016.toString(),
            // r017: this.r017.toString(),
            // r018: this.r018.toString(),
            // r019: this.r019.toString(),
            // r020: this.r020.toString(),
            // r021: this.r021.toString(),
            // r022: this.r022.toString(),
            // r023: this.r023.toString(),
            // r024: this.r024.toString(),
            // r025: this.r025.toString(),
            // r026: this.r026.toString(),
            // r027: this.r027.toString(),
            // r028: this.r028.toString(),
            // r029: this.r029.toString(),
            // r030: this.r030.toString(),
            // t000: this.t000.getTime().toString(),
            // t001: this.t001.getTime().toString(),
            // t002: this.t002.getTime().toString(),
            // t003: this.t003.getTime().toString(),
            // t004: this.t004.getTime().toString(),
            // t005: this.t005.getTime().toString(),
            // t006: this.t006.getTime().toString(),
            // t007: this.t007.getTime().toString(),
            // t008: this.t008.getTime().toString(),
            // t009: this.t009.getTime().toString(),
            // t010: this.t010.getTime().toString(),
            // t011: this.t011.getTime().toString(),
            // t012: this.t012.getTime().toString(),
            // t013: this.t013.getTime().toString(),
            // t014: this.t014.getTime().toString(),
            // t015: this.t015.getTime().toString(),
            // t016: this.t016.getTime().toString(),
            // t017: this.t017.getTime().toString(),
            // t018: this.t018.getTime().toString(),
            // t019: this.t019.getTime().toString(),
            // t020: this.t020.getTime().toString(),
            // l000: JSON.stringify(this.l000),
            // l001: JSON.stringify(this.l001),
            // l002: JSON.stringify(this.l002),
            // l003: JSON.stringify(this.l003),
            // l004: JSON.stringify(this.l004),
            // l005: JSON.stringify(this.l005),
            // l006: JSON.stringify(this.l006),
            // l007: JSON.stringify(this.l007),
            // l008: JSON.stringify(this.l008),
            // l009: JSON.stringify(this.l009),
            // l010: JSON.stringify(this.l010),
            // l011: JSON.stringify(this.l011),
            // l012: JSON.stringify(this.l012),
            // l013: JSON.stringify(this.l013),
            // l014: JSON.stringify(this.l014),
            // l015: JSON.stringify(this.l015),
            // l016: JSON.stringify(this.l016),
            // l017: JSON.stringify(this.l017),
            // l018: JSON.stringify(this.l018),
            // l019: JSON.stringify(this.l019),
            // l020: JSON.stringify(this.l020),
            // m000: JSON.stringify(this.m000),
            // m001: JSON.stringify(this.m001),
            // m002: JSON.stringify(this.m002),
            // m003: JSON.stringify(this.m003),
            // m004: JSON.stringify(this.m004),
            // m005: JSON.stringify(this.m005),
            // m006: JSON.stringify(this.m006),
            // m007: JSON.stringify(this.m007),
            // m008: JSON.stringify(this.m008),
            // m009: JSON.stringify(this.m009),
            // m010: JSON.stringify(this.m010),
            // m011: JSON.stringify(this.m011),
            // m012: JSON.stringify(this.m012),
            // m013: JSON.stringify(this.m013),
            // m014: JSON.stringify(this.m014),
            // m015: JSON.stringify(this.m015),
            // m016: JSON.stringify(this.m016),
            // m017: JSON.stringify(this.m017),
            // m018: JSON.stringify(this.m018),
            // m019: JSON.stringify(this.m019),
            // m020: JSON.stringify(this.m020),
            // c000: this.c000.toDataString(),
            // c001: this.c001.toDataString(),
            // c002: this.c002.toDataString(),
            // c003: this.c003.toDataString(),
            // c004: this.c004.toDataString(),
            // c005: this.c005.toDataString(),
            // c006: this.c006.toDataString(),
            // c007: this.c007.toDataString(),
            // c008: this.c008.toDataString(),
            // c009: this.c009.toDataString(),
            // c010: this.c010.toDataString(),
            // c011: this.c011.toDataString(),
            // c012: this.c012.toDataString(),
            // c013: this.c013.toDataString(),
            // c014: this.c014.toDataString(),
            // c015: this.c015.toDataString(),
            // c016: this.c016.toDataString(),
            // c017: this.c017.toDataString(),
            // c018: this.c018.toDataString(),
            // c019: this.c019.toDataString(),
            // c020: this.c020.toDataString(),
            // j000: JSON.stringify(this.j000.map((model: OtherModel) => model.toDataString())),
            // j001: JSON.stringify(this.j001.map((model: OtherModel) => model.toDataString())),
            // j002: JSON.stringify(this.j002.map((model: OtherModel) => model.toDataString())),
            // j003: JSON.stringify(this.j003.map((model: OtherModel) => model.toDataString())),
            // j004: JSON.stringify(this.j004.map((model: OtherModel) => model.toDataString())),
            // j005: JSON.stringify(this.j005.map((model: OtherModel) => model.toDataString())),
            // j006: JSON.stringify(this.j006.map((model: OtherModel) => model.toDataString())),
            // j007: JSON.stringify(this.j007.map((model: OtherModel) => model.toDataString())),
            // j008: JSON.stringify(this.j008.map((model: OtherModel) => model.toDataString())),
            // j009: JSON.stringify(this.j009.map((model: OtherModel) => model.toDataString())),
            // j010: JSON.stringify(this.j010.map((model: OtherModel) => model.toDataString())),
            // j011: JSON.stringify(this.j011.map((model: OtherModel) => model.toDataString())),
            // j012: JSON.stringify(this.j012.map((model: OtherModel) => model.toDataString())),
            // j013: JSON.stringify(this.j013.map((model: OtherModel) => model.toDataString())),
            // j014: JSON.stringify(this.j014.map((model: OtherModel) => model.toDataString())),
            // j015: JSON.stringify(this.j015.map((model: OtherModel) => model.toDataString())),
            // j016: JSON.stringify(this.j016.map((model: OtherModel) => model.toDataString())),
            // j017: JSON.stringify(this.j017.map((model: OtherModel) => model.toDataString())),
            // j018: JSON.stringify(this.j018.map((model: OtherModel) => model.toDataString())),
            // j019: JSON.stringify(this.j019.map((model: OtherModel) => model.toDataString())),
            // j020: JSON.stringify(this.j020.map((model: OtherModel) => model.toDataString())),
            // e000: this.e000,
            // e001: this.e001,
            // e002: this.e002,
            // e003: this.e003,
            // e004: this.e004,
            // e005: this.e005,
            // e006: this.e006,
            // e007: this.e007,
            // e008: this.e008,
            // e009: this.e009,
            // e010: this.e010,
            // e011: this.e011,
            // e012: this.e012,
            // e013: this.e013,
            // e014: this.e014,
            // e015: this.e015,
            // e016: this.e016,
            // e017: this.e017,
            // e018: this.e018,
            // e019: this.e019,
            // e020: this.e020,
            docId: this.docId,
          }).toString()
        )
      )
        .map((byte) => String.fromCharCode(byte))
        .join("")
    );
  }

  static fromDataString(dataString: string): New {
    const queryParams = Object.fromEntries(
      new URLSearchParams(atob(dataString))
    );

    const object = new New();

    // object.s000 = queryParams["s000"] || "";
    // object.s001 = queryParams["s001"] || "";
    // object.s002 = queryParams["s002"] || "";
    // object.s003 = queryParams["s003"] || "";
    // object.s004 = queryParams["s004"] || "";
    // object.s005 = queryParams["s005"] || "";
    // object.s006 = queryParams["s006"] || "";
    // object.s007 = queryParams["s007"] || "";
    // object.s008 = queryParams["s008"] || "";
    // object.s009 = queryParams["s009"] || "";
    // object.s010 = queryParams["s010"] || "";
    // object.s011 = queryParams["s011"] || "";
    // object.s012 = queryParams["s012"] || "";
    // object.s013 = queryParams["s013"] || "";
    // object.s014 = queryParams["s014"] || "";
    // object.s015 = queryParams["s015"] || "";
    // object.s016 = queryParams["s016"] || "";
    // object.s017 = queryParams["s017"] || "";
    // object.s018 = queryParams["s018"] || "";
    // object.s019 = queryParams["s019"] || "";
    // object.s020 = queryParams["s020"] || "";
    // object.s021 = queryParams["s021"] || "";
    // object.s022 = queryParams["s022"] || "";
    // object.s023 = queryParams["s023"] || "";
    // object.s024 = queryParams["s024"] || "";
    // object.s025 = queryParams["s025"] || "";
    // object.s026 = queryParams["s026"] || "";
    // object.s027 = queryParams["s027"] || "";
    // object.s028 = queryParams["s028"] || "";
    // object.s029 = queryParams["s029"] || "";
    // object.s030 = queryParams["s030"] || "";
    // object.s031 = queryParams["s031"] || "";
    // object.s032 = queryParams["s032"] || "";
    // object.s033 = queryParams["s033"] || "";
    // object.s034 = queryParams["s034"] || "";
    // object.s035 = queryParams["s035"] || "";
    // object.s036 = queryParams["s036"] || "";
    // object.s037 = queryParams["s037"] || "";
    // object.s038 = queryParams["s038"] || "";
    // object.s039 = queryParams["s039"] || "";
    // object.s040 = queryParams["s040"] || "";
    // object.s041 = queryParams["s041"] || "";
    // object.s042 = queryParams["s042"] || "";
    // object.s043 = queryParams["s043"] || "";
    // object.s044 = queryParams["s044"] || "";
    // object.s045 = queryParams["s045"] || "";
    // object.s046 = queryParams["s046"] || "";
    // object.s047 = queryParams["s047"] || "";
    // object.s048 = queryParams["s048"] || "";
    // object.s049 = queryParams["s049"] || "";
    // object.s050 = queryParams["s050"] || "";
    // object.s051 = queryParams["s051"] || "";
    // object.s052 = queryParams["s052"] || "";
    // object.s053 = queryParams["s053"] || "";
    // object.s054 = queryParams["s054"] || "";
    // object.s055 = queryParams["s055"] || "";
    // object.s056 = queryParams["s056"] || "";
    // object.s057 = queryParams["s057"] || "";
    // object.s058 = queryParams["s058"] || "";
    // object.s059 = queryParams["s059"] || "";
    // object.s060 = queryParams["s060"] || "";
    // object.s061 = queryParams["s061"] || "";
    // object.s062 = queryParams["s062"] || "";
    // object.s063 = queryParams["s063"] || "";
    // object.s064 = queryParams["s064"] || "";
    // object.s065 = queryParams["s065"] || "";
    // object.s066 = queryParams["s066"] || "";
    // object.s067 = queryParams["s067"] || "";
    // object.s068 = queryParams["s068"] || "";
    // object.s069 = queryParams["s069"] || "";
    // object.s070 = queryParams["s070"] || "";
    // object.s071 = queryParams["s071"] || "";
    // object.s072 = queryParams["s072"] || "";
    // object.s073 = queryParams["s073"] || "";
    // object.s074 = queryParams["s074"] || "";
    // object.s075 = queryParams["s075"] || "";
    // object.s076 = queryParams["s076"] || "";
    // object.s077 = queryParams["s077"] || "";
    // object.s078 = queryParams["s078"] || "";
    // object.s079 = queryParams["s079"] || "";
    // object.s080 = queryParams["s080"] || "";
    // object.s081 = queryParams["s081"] || "";
    // object.s082 = queryParams["s082"] || "";
    // object.s083 = queryParams["s083"] || "";
    // object.s084 = queryParams["s084"] || "";
    // object.s085 = queryParams["s085"] || "";
    // object.s086 = queryParams["s086"] || "";
    // object.s087 = queryParams["s087"] || "";
    // object.s088 = queryParams["s088"] || "";
    // object.s089 = queryParams["s089"] || "";
    // object.s090 = queryParams["s090"] || "";
    // object.s091 = queryParams["s091"] || "";
    // object.s092 = queryParams["s092"] || "";
    // object.s093 = queryParams["s093"] || "";
    // object.s094 = queryParams["s094"] || "";
    // object.s095 = queryParams["s095"] || "";
    // object.s096 = queryParams["s096"] || "";
    // object.s097 = queryParams["s097"] || "";
    // object.s098 = queryParams["s098"] || "";
    // object.s099 = queryParams["s099"] || "";
    // object.i000 = parseInt(queryParams["i000"] || "0", 10);
    // object.i001 = parseInt(queryParams["i001"] || "0", 10);
    // object.i002 = parseInt(queryParams["i002"] || "0", 10);
    // object.i003 = parseInt(queryParams["i003"] || "0", 10);
    // object.i004 = parseInt(queryParams["i004"] || "0", 10);
    // object.i005 = parseInt(queryParams["i005"] || "0", 10);
    // object.i006 = parseInt(queryParams["i006"] || "0", 10);
    // object.i007 = parseInt(queryParams["i007"] || "0", 10);
    // object.i008 = parseInt(queryParams["i008"] || "0", 10);
    // object.i009 = parseInt(queryParams["i009"] || "0", 10);
    // object.i010 = parseInt(queryParams["i010"] || "0", 10);
    // object.i011 = parseInt(queryParams["i011"] || "0", 10);
    // object.i012 = parseInt(queryParams["i012"] || "0", 10);
    // object.i013 = parseInt(queryParams["i013"] || "0", 10);
    // object.i014 = parseInt(queryParams["i014"] || "0", 10);
    // object.i015 = parseInt(queryParams["i015"] || "0", 10);
    // object.i016 = parseInt(queryParams["i016"] || "0", 10);
    // object.i017 = parseInt(queryParams["i017"] || "0", 10);
    // object.i018 = parseInt(queryParams["i018"] || "0", 10);
    // object.i019 = parseInt(queryParams["i019"] || "0", 10);
    // object.i020 = parseInt(queryParams["i020"] || "0", 10);
    // object.i021 = parseInt(queryParams["i021"] || "0", 10);
    // object.i022 = parseInt(queryParams["i022"] || "0", 10);
    // object.i023 = parseInt(queryParams["i023"] || "0", 10);
    // object.i024 = parseInt(queryParams["i024"] || "0", 10);
    // object.i025 = parseInt(queryParams["i025"] || "0", 10);
    // object.i026 = parseInt(queryParams["i026"] || "0", 10);
    // object.i027 = parseInt(queryParams["i027"] || "0", 10);
    // object.i028 = parseInt(queryParams["i028"] || "0", 10);
    // object.i029 = parseInt(queryParams["i029"] || "0", 10);
    // object.i030 = parseInt(queryParams["i030"] || "0", 10);
    // object.i031 = parseInt(queryParams["i031"] || "0", 10);
    // object.i032 = parseInt(queryParams["i032"] || "0", 10);
    // object.i033 = parseInt(queryParams["i033"] || "0", 10);
    // object.i034 = parseInt(queryParams["i034"] || "0", 10);
    // object.i035 = parseInt(queryParams["i035"] || "0", 10);
    // object.i036 = parseInt(queryParams["i036"] || "0", 10);
    // object.i037 = parseInt(queryParams["i037"] || "0", 10);
    // object.i038 = parseInt(queryParams["i038"] || "0", 10);
    // object.i039 = parseInt(queryParams["i039"] || "0", 10);
    // object.i040 = parseInt(queryParams["i040"] || "0", 10);
    // object.i041 = parseInt(queryParams["i041"] || "0", 10);
    // object.i042 = parseInt(queryParams["i042"] || "0", 10);
    // object.i043 = parseInt(queryParams["i043"] || "0", 10);
    // object.i044 = parseInt(queryParams["i044"] || "0", 10);
    // object.i045 = parseInt(queryParams["i045"] || "0", 10);
    // object.i046 = parseInt(queryParams["i046"] || "0", 10);
    // object.i047 = parseInt(queryParams["i047"] || "0", 10);
    // object.i048 = parseInt(queryParams["i048"] || "0", 10);
    // object.i049 = parseInt(queryParams["i049"] || "0", 10);
    // object.i050 = parseInt(queryParams["i050"] || "0", 10);
    // object.i051 = parseInt(queryParams["i051"] || "0", 10);
    // object.i052 = parseInt(queryParams["i052"] || "0", 10);
    // object.i053 = parseInt(queryParams["i053"] || "0", 10);
    // object.i054 = parseInt(queryParams["i054"] || "0", 10);
    // object.i055 = parseInt(queryParams["i055"] || "0", 10);
    // object.i056 = parseInt(queryParams["i056"] || "0", 10);
    // object.i057 = parseInt(queryParams["i057"] || "0", 10);
    // object.i058 = parseInt(queryParams["i058"] || "0", 10);
    // object.i059 = parseInt(queryParams["i059"] || "0", 10);
    // object.i060 = parseInt(queryParams["i060"] || "0", 10);
    // object.i061 = parseInt(queryParams["i061"] || "0", 10);
    // object.i062 = parseInt(queryParams["i062"] || "0", 10);
    // object.i063 = parseInt(queryParams["i063"] || "0", 10);
    // object.i064 = parseInt(queryParams["i064"] || "0", 10);
    // object.i065 = parseInt(queryParams["i065"] || "0", 10);
    // object.i066 = parseInt(queryParams["i066"] || "0", 10);
    // object.i067 = parseInt(queryParams["i067"] || "0", 10);
    // object.i068 = parseInt(queryParams["i068"] || "0", 10);
    // object.i069 = parseInt(queryParams["i069"] || "0", 10);
    // object.i070 = parseInt(queryParams["i070"] || "0", 10);
    // object.i071 = parseInt(queryParams["i071"] || "0", 10);
    // object.i072 = parseInt(queryParams["i072"] || "0", 10);
    // object.i073 = parseInt(queryParams["i073"] || "0", 10);
    // object.i074 = parseInt(queryParams["i074"] || "0", 10);
    // object.i075 = parseInt(queryParams["i075"] || "0", 10);
    // object.i076 = parseInt(queryParams["i076"] || "0", 10);
    // object.i077 = parseInt(queryParams["i077"] || "0", 10);
    // object.i078 = parseInt(queryParams["i078"] || "0", 10);
    // object.i079 = parseInt(queryParams["i079"] || "0", 10);
    // object.i080 = parseInt(queryParams["i080"] || "0", 10);
    // object.i081 = parseInt(queryParams["i081"] || "0", 10);
    // object.i082 = parseInt(queryParams["i082"] || "0", 10);
    // object.i083 = parseInt(queryParams["i083"] || "0", 10);
    // object.i084 = parseInt(queryParams["i084"] || "0", 10);
    // object.i085 = parseInt(queryParams["i085"] || "0", 10);
    // object.i086 = parseInt(queryParams["i086"] || "0", 10);
    // object.i087 = parseInt(queryParams["i087"] || "0", 10);
    // object.i088 = parseInt(queryParams["i088"] || "0", 10);
    // object.i089 = parseInt(queryParams["i089"] || "0", 10);
    // object.i090 = parseInt(queryParams["i090"] || "0", 10);
    // object.i091 = parseInt(queryParams["i091"] || "0", 10);
    // object.i092 = parseInt(queryParams["i092"] || "0", 10);
    // object.i093 = parseInt(queryParams["i093"] || "0", 10);
    // object.i094 = parseInt(queryParams["i094"] || "0", 10);
    // object.i095 = parseInt(queryParams["i095"] || "0", 10);
    // object.i096 = parseInt(queryParams["i096"] || "0", 10);
    // object.i097 = parseInt(queryParams["i097"] || "0", 10);
    // object.i098 = parseInt(queryParams["i098"] || "0", 10);
    // object.i099 = parseInt(queryParams["i099"] || "0", 10);
    // object.b000 = queryParams["b000"] === "true";
    // object.b001 = queryParams["b001"] === "true";
    // object.b002 = queryParams["b002"] === "true";
    // object.b003 = queryParams["b003"] === "true";
    // object.b004 = queryParams["b004"] === "true";
    // object.b005 = queryParams["b005"] === "true";
    // object.b006 = queryParams["b006"] === "true";
    // object.b007 = queryParams["b007"] === "true";
    // object.b008 = queryParams["b008"] === "true";
    // object.b009 = queryParams["b009"] === "true";
    // object.b010 = queryParams["b010"] === "true";
    // object.b011 = queryParams["b011"] === "true";
    // object.b012 = queryParams["b012"] === "true";
    // object.b013 = queryParams["b013"] === "true";
    // object.b014 = queryParams["b014"] === "true";
    // object.b015 = queryParams["b015"] === "true";
    // object.b016 = queryParams["b016"] === "true";
    // object.b017 = queryParams["b017"] === "true";
    // object.b018 = queryParams["b018"] === "true";
    // object.b019 = queryParams["b019"] === "true";
    // object.b020 = queryParams["b020"] === "true";
    // object.b021 = queryParams["b021"] === "true";
    // object.b022 = queryParams["b022"] === "true";
    // object.b023 = queryParams["b023"] === "true";
    // object.b024 = queryParams["b024"] === "true";
    // object.b025 = queryParams["b025"] === "true";
    // object.b026 = queryParams["b026"] === "true";
    // object.b027 = queryParams["b027"] === "true";
    // object.b028 = queryParams["b028"] === "true";
    // object.b029 = queryParams["b029"] === "true";
    // object.b030 = queryParams["b030"] === "true";
    // object.r000 = parseFloat(queryParams["r000"] || "0");
    // object.r001 = parseFloat(queryParams["r001"] || "0");
    // object.r002 = parseFloat(queryParams["r002"] || "0");
    // object.r003 = parseFloat(queryParams["r003"] || "0");
    // object.r004 = parseFloat(queryParams["r004"] || "0");
    // object.r005 = parseFloat(queryParams["r005"] || "0");
    // object.r006 = parseFloat(queryParams["r006"] || "0");
    // object.r007 = parseFloat(queryParams["r007"] || "0");
    // object.r008 = parseFloat(queryParams["r008"] || "0");
    // object.r009 = parseFloat(queryParams["r009"] || "0");
    // object.r010 = parseFloat(queryParams["r010"] || "0");
    // object.r011 = parseFloat(queryParams["r011"] || "0");
    // object.r012 = parseFloat(queryParams["r012"] || "0");
    // object.r013 = parseFloat(queryParams["r013"] || "0");
    // object.r014 = parseFloat(queryParams["r014"] || "0");
    // object.r015 = parseFloat(queryParams["r015"] || "0");
    // object.r016 = parseFloat(queryParams["r016"] || "0");
    // object.r017 = parseFloat(queryParams["r017"] || "0");
    // object.r018 = parseFloat(queryParams["r018"] || "0");
    // object.r019 = parseFloat(queryParams["r019"] || "0");
    // object.r020 = parseFloat(queryParams["r020"] || "0");
    // object.r021 = parseFloat(queryParams["r021"] || "0");
    // object.r022 = parseFloat(queryParams["r022"] || "0");
    // object.r023 = parseFloat(queryParams["r023"] || "0");
    // object.r024 = parseFloat(queryParams["r024"] || "0");
    // object.r025 = parseFloat(queryParams["r025"] || "0");
    // object.r026 = parseFloat(queryParams["r026"] || "0");
    // object.r027 = parseFloat(queryParams["r027"] || "0");
    // object.r028 = parseFloat(queryParams["r028"] || "0");
    // object.r029 = parseFloat(queryParams["r029"] || "0");
    // object.r030 = parseFloat(queryParams["r030"] || "0");
    // object.t000 = new Date(parseInt(queryParams["t000"] || "0", 10));
    // object.t001 = new Date(parseInt(queryParams["t001"] || "0", 10));
    // object.t002 = new Date(parseInt(queryParams["t002"] || "0", 10));
    // object.t003 = new Date(parseInt(queryParams["t003"] || "0", 10));
    // object.t004 = new Date(parseInt(queryParams["t004"] || "0", 10));
    // object.t005 = new Date(parseInt(queryParams["t005"] || "0", 10));
    // object.t006 = new Date(parseInt(queryParams["t006"] || "0", 10));
    // object.t007 = new Date(parseInt(queryParams["t007"] || "0", 10));
    // object.t008 = new Date(parseInt(queryParams["t008"] || "0", 10));
    // object.t009 = new Date(parseInt(queryParams["t009"] || "0", 10));
    // object.t010 = new Date(parseInt(queryParams["t010"] || "0", 10));
    // object.t011 = new Date(parseInt(queryParams["t011"] || "0", 10));
    // object.t012 = new Date(parseInt(queryParams["t012"] || "0", 10));
    // object.t013 = new Date(parseInt(queryParams["t013"] || "0", 10));
    // object.t014 = new Date(parseInt(queryParams["t014"] || "0", 10));
    // object.t015 = new Date(parseInt(queryParams["t015"] || "0", 10));
    // object.t016 = new Date(parseInt(queryParams["t016"] || "0", 10));
    // object.t017 = new Date(parseInt(queryParams["t017"] || "0", 10));
    // object.t018 = new Date(parseInt(queryParams["t018"] || "0", 10));
    // object.t019 = new Date(parseInt(queryParams["t019"] || "0", 10));
    // object.t020 = new Date(parseInt(queryParams["t020"] || "0", 10));
    // object.l000 = JSON.parse(queryParams["l000"] || "[]");
    // object.l001 = JSON.parse(queryParams["l001"] || "[]");
    // object.l002 = JSON.parse(queryParams["l002"] || "[]");
    // object.l003 = JSON.parse(queryParams["l003"] || "[]");
    // object.l004 = JSON.parse(queryParams["l004"] || "[]");
    // object.l005 = JSON.parse(queryParams["l005"] || "[]");
    // object.l006 = JSON.parse(queryParams["l006"] || "[]");
    // object.l007 = JSON.parse(queryParams["l007"] || "[]");
    // object.l008 = JSON.parse(queryParams["l008"] || "[]");
    // object.l009 = JSON.parse(queryParams["l009"] || "[]");
    // object.l010 = JSON.parse(queryParams["l010"] || "[]");
    // object.l011 = JSON.parse(queryParams["l011"] || "[]");
    // object.l012 = JSON.parse(queryParams["l012"] || "[]");
    // object.l013 = JSON.parse(queryParams["l013"] || "[]");
    // object.l014 = JSON.parse(queryParams["l014"] || "[]");
    // object.l015 = JSON.parse(queryParams["l015"] || "[]");
    // object.l016 = JSON.parse(queryParams["l016"] || "[]");
    // object.l017 = JSON.parse(queryParams["l017"] || "[]");
    // object.l018 = JSON.parse(queryParams["l018"] || "[]");
    // object.l019 = JSON.parse(queryParams["l019"] || "[]");
    // object.l020 = JSON.parse(queryParams["l020"] || "[]");
    // object.m000 = JSON.parse(queryParams["m000"] || "{}");
    // object.m001 = JSON.parse(queryParams["m001"] || "{}");
    // object.m002 = JSON.parse(queryParams["m002"] || "{}");
    // object.m003 = JSON.parse(queryParams["m003"] || "{}");
    // object.m004 = JSON.parse(queryParams["m004"] || "{}");
    // object.m005 = JSON.parse(queryParams["m005"] || "{}");
    // object.m006 = JSON.parse(queryParams["m006"] || "{}");
    // object.m007 = JSON.parse(queryParams["m007"] || "{}");
    // object.m008 = JSON.parse(queryParams["m008"] || "{}");
    // object.m009 = JSON.parse(queryParams["m009"] || "{}");
    // object.m010 = JSON.parse(queryParams["m010"] || "{}");
    // object.m011 = JSON.parse(queryParams["m011"] || "{}");
    // object.m012 = JSON.parse(queryParams["m012"] || "{}");
    // object.m013 = JSON.parse(queryParams["m013"] || "{}");
    // object.m014 = JSON.parse(queryParams["m014"] || "{}");
    // object.m015 = JSON.parse(queryParams["m015"] || "{}");
    // object.m016 = JSON.parse(queryParams["m016"] || "{}");
    // object.m017 = JSON.parse(queryParams["m017"] || "{}");
    // object.m018 = JSON.parse(queryParams["m018"] || "{}");
    // object.m019 = JSON.parse(queryParams["m019"] || "{}");
    // object.m020 = JSON.parse(queryParams["m020"] || "{}");
    // object.c000 = OtherModel.fromDataString(queryParams["c000"] || new OtherModel().toDataString());
    // object.c001 = OtherModel.fromDataString(queryParams["c001"] || new OtherModel().toDataString());
    // object.c002 = OtherModel.fromDataString(queryParams["c002"] || new OtherModel().toDataString());
    // object.c003 = OtherModel.fromDataString(queryParams["c003"] || new OtherModel().toDataString());
    // object.c004 = OtherModel.fromDataString(queryParams["c004"] || new OtherModel().toDataString());
    // object.c005 = OtherModel.fromDataString(queryParams["c005"] || new OtherModel().toDataString());
    // object.c006 = OtherModel.fromDataString(queryParams["c006"] || new OtherModel().toDataString());
    // object.c007 = OtherModel.fromDataString(queryParams["c007"] || new OtherModel().toDataString());
    // object.c008 = OtherModel.fromDataString(queryParams["c008"] || new OtherModel().toDataString());
    // object.c009 = OtherModel.fromDataString(queryParams["c009"] || new OtherModel().toDataString());
    // object.c010 = OtherModel.fromDataString(queryParams["c010"] || new OtherModel().toDataString());
    // object.c011 = OtherModel.fromDataString(queryParams["c011"] || new OtherModel().toDataString());
    // object.c012 = OtherModel.fromDataString(queryParams["c012"] || new OtherModel().toDataString());
    // object.c013 = OtherModel.fromDataString(queryParams["c013"] || new OtherModel().toDataString());
    // object.c014 = OtherModel.fromDataString(queryParams["c014"] || new OtherModel().toDataString());
    // object.c015 = OtherModel.fromDataString(queryParams["c015"] || new OtherModel().toDataString());
    // object.c016 = OtherModel.fromDataString(queryParams["c016"] || new OtherModel().toDataString());
    // object.c017 = OtherModel.fromDataString(queryParams["c017"] || new OtherModel().toDataString());
    // object.c018 = OtherModel.fromDataString(queryParams["c018"] || new OtherModel().toDataString());
    // object.c019 = OtherModel.fromDataString(queryParams["c019"] || new OtherModel().toDataString());
    // object.c020 = OtherModel.fromDataString(queryParams["c020"] || new OtherModel().toDataString());
    // object.j000 = (JSON.parse(queryParams["j000"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j001 = (JSON.parse(queryParams["j001"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j002 = (JSON.parse(queryParams["j002"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j003 = (JSON.parse(queryParams["j003"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j004 = (JSON.parse(queryParams["j004"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j005 = (JSON.parse(queryParams["j005"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j006 = (JSON.parse(queryParams["j006"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j007 = (JSON.parse(queryParams["j007"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j008 = (JSON.parse(queryParams["j008"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j009 = (JSON.parse(queryParams["j009"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j010 = (JSON.parse(queryParams["j010"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j011 = (JSON.parse(queryParams["j011"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j012 = (JSON.parse(queryParams["j012"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j013 = (JSON.parse(queryParams["j013"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j014 = (JSON.parse(queryParams["j014"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j015 = (JSON.parse(queryParams["j015"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j016 = (JSON.parse(queryParams["j016"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j017 = (JSON.parse(queryParams["j017"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j018 = (JSON.parse(queryParams["j018"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j019 = (JSON.parse(queryParams["j019"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j020 = (JSON.parse(queryParams["j020"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.e000 = SomeEnumHelper.fromString(queryParams["e000"] || SomeEnum.notSelected);
    // object.e001 = SomeEnumHelper.fromString(queryParams["e001"] || SomeEnum.notSelected);
    // object.e002 = SomeEnumHelper.fromString(queryParams["e002"] || SomeEnum.notSelected);
    // object.e003 = SomeEnumHelper.fromString(queryParams["e003"] || SomeEnum.notSelected);
    // object.e004 = SomeEnumHelper.fromString(queryParams["e004"] || SomeEnum.notSelected);
    // object.e005 = SomeEnumHelper.fromString(queryParams["e005"] || SomeEnum.notSelected);
    // object.e006 = SomeEnumHelper.fromString(queryParams["e006"] || SomeEnum.notSelected);
    // object.e007 = SomeEnumHelper.fromString(queryParams["e007"] || SomeEnum.notSelected);
    // object.e008 = SomeEnumHelper.fromString(queryParams["e008"] || SomeEnum.notSelected);
    // object.e009 = SomeEnumHelper.fromString(queryParams["e009"] || SomeEnum.notSelected);
    // object.e010 = SomeEnumHelper.fromString(queryParams["e010"] || SomeEnum.notSelected);
    // object.e011 = SomeEnumHelper.fromString(queryParams["e011"] || SomeEnum.notSelected);
    // object.e012 = SomeEnumHelper.fromString(queryParams["e012"] || SomeEnum.notSelected);
    // object.e013 = SomeEnumHelper.fromString(queryParams["e013"] || SomeEnum.notSelected);
    // object.e014 = SomeEnumHelper.fromString(queryParams["e014"] || SomeEnum.notSelected);
    // object.e015 = SomeEnumHelper.fromString(queryParams["e015"] || SomeEnum.notSelected);
    // object.e016 = SomeEnumHelper.fromString(queryParams["e016"] || SomeEnum.notSelected);
    // object.e017 = SomeEnumHelper.fromString(queryParams["e017"] || SomeEnum.notSelected);
    // object.e018 = SomeEnumHelper.fromString(queryParams["e018"] || SomeEnum.notSelected);
    // object.e019 = SomeEnumHelper.fromString(queryParams["e019"] || SomeEnum.notSelected);
    // object.e020 = SomeEnumHelper.fromString(queryParams["e020"] || SomeEnum.notSelected);
    object.docId = queryParams["docId"] || "";

    return object;
  }

  toMap(): object {
    return {
      // s000: this.s000,
      // s001: this.s001,
      // s002: this.s002,
      // s003: this.s003,
      // s004: this.s004,
      // s005: this.s005,
      // s006: this.s006,
      // s007: this.s007,
      // s008: this.s008,
      // s009: this.s009,
      // s010: this.s010,
      // s011: this.s011,
      // s012: this.s012,
      // s013: this.s013,
      // s014: this.s014,
      // s015: this.s015,
      // s016: this.s016,
      // s017: this.s017,
      // s018: this.s018,
      // s019: this.s019,
      // s020: this.s020,
      // s021: this.s021,
      // s022: this.s022,
      // s023: this.s023,
      // s024: this.s024,
      // s025: this.s025,
      // s026: this.s026,
      // s027: this.s027,
      // s028: this.s028,
      // s029: this.s029,
      // s030: this.s030,
      // s031: this.s031,
      // s032: this.s032,
      // s033: this.s033,
      // s034: this.s034,
      // s035: this.s035,
      // s036: this.s036,
      // s037: this.s037,
      // s038: this.s038,
      // s039: this.s039,
      // s040: this.s040,
      // s041: this.s041,
      // s042: this.s042,
      // s043: this.s043,
      // s044: this.s044,
      // s045: this.s045,
      // s046: this.s046,
      // s047: this.s047,
      // s048: this.s048,
      // s049: this.s049,
      // s050: this.s050,
      // s051: this.s051,
      // s052: this.s052,
      // s053: this.s053,
      // s054: this.s054,
      // s055: this.s055,
      // s056: this.s056,
      // s057: this.s057,
      // s058: this.s058,
      // s059: this.s059,
      // s060: this.s060,
      // s061: this.s061,
      // s062: this.s062,
      // s063: this.s063,
      // s064: this.s064,
      // s065: this.s065,
      // s066: this.s066,
      // s067: this.s067,
      // s068: this.s068,
      // s069: this.s069,
      // s070: this.s070,
      // s071: this.s071,
      // s072: this.s072,
      // s073: this.s073,
      // s074: this.s074,
      // s075: this.s075,
      // s076: this.s076,
      // s077: this.s077,
      // s078: this.s078,
      // s079: this.s079,
      // s080: this.s080,
      // s081: this.s081,
      // s082: this.s082,
      // s083: this.s083,
      // s084: this.s084,
      // s085: this.s085,
      // s086: this.s086,
      // s087: this.s087,
      // s088: this.s088,
      // s089: this.s089,
      // s090: this.s090,
      // s091: this.s091,
      // s092: this.s092,
      // s093: this.s093,
      // s094: this.s094,
      // s095: this.s095,
      // s096: this.s096,
      // s097: this.s097,
      // s098: this.s098,
      // s099: this.s099,
      // i000: this.i000,
      // i001: this.i001,
      // i002: this.i002,
      // i003: this.i003,
      // i004: this.i004,
      // i005: this.i005,
      // i006: this.i006,
      // i007: this.i007,
      // i008: this.i008,
      // i009: this.i009,
      // i010: this.i010,
      // i011: this.i011,
      // i012: this.i012,
      // i013: this.i013,
      // i014: this.i014,
      // i015: this.i015,
      // i016: this.i016,
      // i017: this.i017,
      // i018: this.i018,
      // i019: this.i019,
      // i020: this.i020,
      // i021: this.i021,
      // i022: this.i022,
      // i023: this.i023,
      // i024: this.i024,
      // i025: this.i025,
      // i026: this.i026,
      // i027: this.i027,
      // i028: this.i028,
      // i029: this.i029,
      // i030: this.i030,
      // i031: this.i031,
      // i032: this.i032,
      // i033: this.i033,
      // i034: this.i034,
      // i035: this.i035,
      // i036: this.i036,
      // i037: this.i037,
      // i038: this.i038,
      // i039: this.i039,
      // i040: this.i040,
      // i041: this.i041,
      // i042: this.i042,
      // i043: this.i043,
      // i044: this.i044,
      // i045: this.i045,
      // i046: this.i046,
      // i047: this.i047,
      // i048: this.i048,
      // i049: this.i049,
      // i050: this.i050,
      // i051: this.i051,
      // i052: this.i052,
      // i053: this.i053,
      // i054: this.i054,
      // i055: this.i055,
      // i056: this.i056,
      // i057: this.i057,
      // i058: this.i058,
      // i059: this.i059,
      // i060: this.i060,
      // i061: this.i061,
      // i062: this.i062,
      // i063: this.i063,
      // i064: this.i064,
      // i065: this.i065,
      // i066: this.i066,
      // i067: this.i067,
      // i068: this.i068,
      // i069: this.i069,
      // i070: this.i070,
      // i071: this.i071,
      // i072: this.i072,
      // i073: this.i073,
      // i074: this.i074,
      // i075: this.i075,
      // i076: this.i076,
      // i077: this.i077,
      // i078: this.i078,
      // i079: this.i079,
      // i080: this.i080,
      // i081: this.i081,
      // i082: this.i082,
      // i083: this.i083,
      // i084: this.i084,
      // i085: this.i085,
      // i086: this.i086,
      // i087: this.i087,
      // i088: this.i088,
      // i089: this.i089,
      // i090: this.i090,
      // i091: this.i091,
      // i092: this.i092,
      // i093: this.i093,
      // i094: this.i094,
      // i095: this.i095,
      // i096: this.i096,
      // i097: this.i097,
      // i098: this.i098,
      // i099: this.i099,
      // b000: this.b000 ? 1 : 0,
      // b001: this.b001 ? 1 : 0,
      // b002: this.b002 ? 1 : 0,
      // b003: this.b003 ? 1 : 0,
      // b004: this.b004 ? 1 : 0,
      // b005: this.b005 ? 1 : 0,
      // b006: this.b006 ? 1 : 0,
      // b007: this.b007 ? 1 : 0,
      // b008: this.b008 ? 1 : 0,
      // b009: this.b009 ? 1 : 0,
      // b010: this.b010 ? 1 : 0,
      // b011: this.b011 ? 1 : 0,
      // b012: this.b012 ? 1 : 0,
      // b013: this.b013 ? 1 : 0,
      // b014: this.b014 ? 1 : 0,
      // b015: this.b015 ? 1 : 0,
      // b016: this.b016 ? 1 : 0,
      // b017: this.b017 ? 1 : 0,
      // b018: this.b018 ? 1 : 0,
      // b019: this.b019 ? 1 : 0,
      // b020: this.b020 ? 1 : 0,
      // b021: this.b021 ? 1 : 0,
      // b022: this.b022 ? 1 : 0,
      // b023: this.b023 ? 1 : 0,
      // b024: this.b024 ? 1 : 0,
      // b025: this.b025 ? 1 : 0,
      // b026: this.b026 ? 1 : 0,
      // b027: this.b027 ? 1 : 0,
      // b028: this.b028 ? 1 : 0,
      // b029: this.b029 ? 1 : 0,
      // b030: this.b030 ? 1 : 0,
      // r000: this.r000,
      // r001: this.r001,
      // r002: this.r002,
      // r003: this.r003,
      // r004: this.r004,
      // r005: this.r005,
      // r006: this.r006,
      // r007: this.r007,
      // r008: this.r008,
      // r009: this.r009,
      // r010: this.r010,
      // r011: this.r011,
      // r012: this.r012,
      // r013: this.r013,
      // r014: this.r014,
      // r015: this.r015,
      // r016: this.r016,
      // r017: this.r017,
      // r018: this.r018,
      // r019: this.r019,
      // r020: this.r020,
      // r021: this.r021,
      // r022: this.r022,
      // r023: this.r023,
      // r024: this.r024,
      // r025: this.r025,
      // r026: this.r026,
      // r027: this.r027,
      // r028: this.r028,
      // r029: this.r029,
      // r030: this.r030,
      // t000: this.t000.getTime(),
      // t001: this.t001.getTime(),
      // t002: this.t002.getTime(),
      // t003: this.t003.getTime(),
      // t004: this.t004.getTime(),
      // t005: this.t005.getTime(),
      // t006: this.t006.getTime(),
      // t007: this.t007.getTime(),
      // t008: this.t008.getTime(),
      // t009: this.t009.getTime(),
      // t010: this.t010.getTime(),
      // t011: this.t011.getTime(),
      // t012: this.t012.getTime(),
      // t013: this.t013.getTime(),
      // t014: this.t014.getTime(),
      // t015: this.t015.getTime(),
      // t016: this.t016.getTime(),
      // t017: this.t017.getTime(),
      // t018: this.t018.getTime(),
      // t019: this.t019.getTime(),
      // t020: this.t020.getTime(),
      // l000: JSON.stringify(this.l000),
      // l001: JSON.stringify(this.l001),
      // l002: JSON.stringify(this.l002),
      // l003: JSON.stringify(this.l003),
      // l004: JSON.stringify(this.l004),
      // l005: JSON.stringify(this.l005),
      // l006: JSON.stringify(this.l006),
      // l007: JSON.stringify(this.l007),
      // l008: JSON.stringify(this.l008),
      // l009: JSON.stringify(this.l009),
      // l010: JSON.stringify(this.l010),
      // l011: JSON.stringify(this.l011),
      // l012: JSON.stringify(this.l012),
      // l013: JSON.stringify(this.l013),
      // l014: JSON.stringify(this.l014),
      // l015: JSON.stringify(this.l015),
      // l016: JSON.stringify(this.l016),
      // l017: JSON.stringify(this.l017),
      // l018: JSON.stringify(this.l018),
      // l019: JSON.stringify(this.l019),
      // l020: JSON.stringify(this.l020),
      // m000: JSON.stringify(this.m000),
      // m001: JSON.stringify(this.m001),
      // m002: JSON.stringify(this.m002),
      // m003: JSON.stringify(this.m003),
      // m004: JSON.stringify(this.m004),
      // m005: JSON.stringify(this.m005),
      // m006: JSON.stringify(this.m006),
      // m007: JSON.stringify(this.m007),
      // m008: JSON.stringify(this.m008),
      // m009: JSON.stringify(this.m009),
      // m010: JSON.stringify(this.m010),
      // m011: JSON.stringify(this.m011),
      // m012: JSON.stringify(this.m012),
      // m013: JSON.stringify(this.m013),
      // m014: JSON.stringify(this.m014),
      // m015: JSON.stringify(this.m015),
      // m016: JSON.stringify(this.m016),
      // m017: JSON.stringify(this.m017),
      // m018: JSON.stringify(this.m018),
      // m019: JSON.stringify(this.m019),
      // m020: JSON.stringify(this.m020),
      // c000: this.c000.toDataString(),
      // c001: this.c001.toDataString(),
      // c002: this.c002.toDataString(),
      // c003: this.c003.toDataString(),
      // c004: this.c004.toDataString(),
      // c005: this.c005.toDataString(),
      // c006: this.c006.toDataString(),
      // c007: this.c007.toDataString(),
      // c008: this.c008.toDataString(),
      // c009: this.c009.toDataString(),
      // c010: this.c010.toDataString(),
      // c011: this.c011.toDataString(),
      // c012: this.c012.toDataString(),
      // c013: this.c013.toDataString(),
      // c014: this.c014.toDataString(),
      // c015: this.c015.toDataString(),
      // c016: this.c016.toDataString(),
      // c017: this.c017.toDataString(),
      // c018: this.c018.toDataString(),
      // c019: this.c019.toDataString(),
      // c020: this.c020.toDataString(),
      // j000: JSON.stringify(this.j000.map((model: OtherModel) => model.toDataString())),
      // j001: JSON.stringify(this.j001.map((model: OtherModel) => model.toDataString())),
      // j002: JSON.stringify(this.j002.map((model: OtherModel) => model.toDataString())),
      // j003: JSON.stringify(this.j003.map((model: OtherModel) => model.toDataString())),
      // j004: JSON.stringify(this.j004.map((model: OtherModel) => model.toDataString())),
      // j005: JSON.stringify(this.j005.map((model: OtherModel) => model.toDataString())),
      // j006: JSON.stringify(this.j006.map((model: OtherModel) => model.toDataString())),
      // j007: JSON.stringify(this.j007.map((model: OtherModel) => model.toDataString())),
      // j008: JSON.stringify(this.j008.map((model: OtherModel) => model.toDataString())),
      // j009: JSON.stringify(this.j009.map((model: OtherModel) => model.toDataString())),
      // j010: JSON.stringify(this.j010.map((model: OtherModel) => model.toDataString())),
      // j011: JSON.stringify(this.j011.map((model: OtherModel) => model.toDataString())),
      // j012: JSON.stringify(this.j012.map((model: OtherModel) => model.toDataString())),
      // j013: JSON.stringify(this.j013.map((model: OtherModel) => model.toDataString())),
      // j014: JSON.stringify(this.j014.map((model: OtherModel) => model.toDataString())),
      // j015: JSON.stringify(this.j015.map((model: OtherModel) => model.toDataString())),
      // j016: JSON.stringify(this.j016.map((model: OtherModel) => model.toDataString())),
      // j017: JSON.stringify(this.j017.map((model: OtherModel) => model.toDataString())),
      // j018: JSON.stringify(this.j018.map((model: OtherModel) => model.toDataString())),
      // j019: JSON.stringify(this.j019.map((model: OtherModel) => model.toDataString())),
      // j020: JSON.stringify(this.j020.map((model: OtherModel) => model.toDataString())),
      // e000: this.e000,
      // e001: this.e001,
      // e002: this.e002,
      // e003: this.e003,
      // e004: this.e004,
      // e005: this.e005,
      // e006: this.e006,
      // e007: this.e007,
      // e008: this.e008,
      // e009: this.e009,
      // e010: this.e010,
      // e011: this.e011,
      // e012: this.e012,
      // e013: this.e013,
      // e014: this.e014,
      // e015: this.e015,
      // e016: this.e016,
      // e017: this.e017,
      // e018: this.e018,
      // e019: this.e019,
      // e020: this.e020,
      docId: this.docId,
    };
  }

  static fromMap(queryParams: any): New {
    const object = new New();

    // object.s000 = queryParams.s000 || '';
    // object.s001 = queryParams.s001 || '';
    // object.s002 = queryParams.s002 || '';
    // object.s003 = queryParams.s003 || '';
    // object.s004 = queryParams.s004 || '';
    // object.s005 = queryParams.s005 || '';
    // object.s006 = queryParams.s006 || '';
    // object.s007 = queryParams.s007 || '';
    // object.s008 = queryParams.s008 || '';
    // object.s009 = queryParams.s009 || '';
    // object.s010 = queryParams.s010 || '';
    // object.s011 = queryParams.s011 || '';
    // object.s012 = queryParams.s012 || '';
    // object.s013 = queryParams.s013 || '';
    // object.s014 = queryParams.s014 || '';
    // object.s015 = queryParams.s015 || '';
    // object.s016 = queryParams.s016 || '';
    // object.s017 = queryParams.s017 || '';
    // object.s018 = queryParams.s018 || '';
    // object.s019 = queryParams.s019 || '';
    // object.s020 = queryParams.s020 || '';
    // object.s021 = queryParams.s021 || '';
    // object.s022 = queryParams.s022 || '';
    // object.s023 = queryParams.s023 || '';
    // object.s024 = queryParams.s024 || '';
    // object.s025 = queryParams.s025 || '';
    // object.s026 = queryParams.s026 || '';
    // object.s027 = queryParams.s027 || '';
    // object.s028 = queryParams.s028 || '';
    // object.s029 = queryParams.s029 || '';
    // object.s030 = queryParams.s030 || '';
    // object.s031 = queryParams.s031 || '';
    // object.s032 = queryParams.s032 || '';
    // object.s033 = queryParams.s033 || '';
    // object.s034 = queryParams.s034 || '';
    // object.s035 = queryParams.s035 || '';
    // object.s036 = queryParams.s036 || '';
    // object.s037 = queryParams.s037 || '';
    // object.s038 = queryParams.s038 || '';
    // object.s039 = queryParams.s039 || '';
    // object.s040 = queryParams.s040 || '';
    // object.s041 = queryParams.s041 || '';
    // object.s042 = queryParams.s042 || '';
    // object.s043 = queryParams.s043 || '';
    // object.s044 = queryParams.s044 || '';
    // object.s045 = queryParams.s045 || '';
    // object.s046 = queryParams.s046 || '';
    // object.s047 = queryParams.s047 || '';
    // object.s048 = queryParams.s048 || '';
    // object.s049 = queryParams.s049 || '';
    // object.s050 = queryParams.s050 || '';
    // object.s051 = queryParams.s051 || '';
    // object.s052 = queryParams.s052 || '';
    // object.s053 = queryParams.s053 || '';
    // object.s054 = queryParams.s054 || '';
    // object.s055 = queryParams.s055 || '';
    // object.s056 = queryParams.s056 || '';
    // object.s057 = queryParams.s057 || '';
    // object.s058 = queryParams.s058 || '';
    // object.s059 = queryParams.s059 || '';
    // object.s060 = queryParams.s060 || '';
    // object.s061 = queryParams.s061 || '';
    // object.s062 = queryParams.s062 || '';
    // object.s063 = queryParams.s063 || '';
    // object.s064 = queryParams.s064 || '';
    // object.s065 = queryParams.s065 || '';
    // object.s066 = queryParams.s066 || '';
    // object.s067 = queryParams.s067 || '';
    // object.s068 = queryParams.s068 || '';
    // object.s069 = queryParams.s069 || '';
    // object.s070 = queryParams.s070 || '';
    // object.s071 = queryParams.s071 || '';
    // object.s072 = queryParams.s072 || '';
    // object.s073 = queryParams.s073 || '';
    // object.s074 = queryParams.s074 || '';
    // object.s075 = queryParams.s075 || '';
    // object.s076 = queryParams.s076 || '';
    // object.s077 = queryParams.s077 || '';
    // object.s078 = queryParams.s078 || '';
    // object.s079 = queryParams.s079 || '';
    // object.s080 = queryParams.s080 || '';
    // object.s081 = queryParams.s081 || '';
    // object.s082 = queryParams.s082 || '';
    // object.s083 = queryParams.s083 || '';
    // object.s084 = queryParams.s084 || '';
    // object.s085 = queryParams.s085 || '';
    // object.s086 = queryParams.s086 || '';
    // object.s087 = queryParams.s087 || '';
    // object.s088 = queryParams.s088 || '';
    // object.s089 = queryParams.s089 || '';
    // object.s090 = queryParams.s090 || '';
    // object.s091 = queryParams.s091 || '';
    // object.s092 = queryParams.s092 || '';
    // object.s093 = queryParams.s093 || '';
    // object.s094 = queryParams.s094 || '';
    // object.s095 = queryParams.s095 || '';
    // object.s096 = queryParams.s096 || '';
    // object.s097 = queryParams.s097 || '';
    // object.s098 = queryParams.s098 || '';
    // object.s099 = queryParams.s099 || '';
    // object.i000 = Number(queryParams.i000 || 0);
    // object.i001 = Number(queryParams.i001 || 0);
    // object.i002 = Number(queryParams.i002 || 0);
    // object.i003 = Number(queryParams.i003 || 0);
    // object.i004 = Number(queryParams.i004 || 0);
    // object.i005 = Number(queryParams.i005 || 0);
    // object.i006 = Number(queryParams.i006 || 0);
    // object.i007 = Number(queryParams.i007 || 0);
    // object.i008 = Number(queryParams.i008 || 0);
    // object.i009 = Number(queryParams.i009 || 0);
    // object.i010 = Number(queryParams.i010 || 0);
    // object.i011 = Number(queryParams.i011 || 0);
    // object.i012 = Number(queryParams.i012 || 0);
    // object.i013 = Number(queryParams.i013 || 0);
    // object.i014 = Number(queryParams.i014 || 0);
    // object.i015 = Number(queryParams.i015 || 0);
    // object.i016 = Number(queryParams.i016 || 0);
    // object.i017 = Number(queryParams.i017 || 0);
    // object.i018 = Number(queryParams.i018 || 0);
    // object.i019 = Number(queryParams.i019 || 0);
    // object.i020 = Number(queryParams.i020 || 0);
    // object.i021 = Number(queryParams.i021 || 0);
    // object.i022 = Number(queryParams.i022 || 0);
    // object.i023 = Number(queryParams.i023 || 0);
    // object.i024 = Number(queryParams.i024 || 0);
    // object.i025 = Number(queryParams.i025 || 0);
    // object.i026 = Number(queryParams.i026 || 0);
    // object.i027 = Number(queryParams.i027 || 0);
    // object.i028 = Number(queryParams.i028 || 0);
    // object.i029 = Number(queryParams.i029 || 0);
    // object.i030 = Number(queryParams.i030 || 0);
    // object.i031 = Number(queryParams.i031 || 0);
    // object.i032 = Number(queryParams.i032 || 0);
    // object.i033 = Number(queryParams.i033 || 0);
    // object.i034 = Number(queryParams.i034 || 0);
    // object.i035 = Number(queryParams.i035 || 0);
    // object.i036 = Number(queryParams.i036 || 0);
    // object.i037 = Number(queryParams.i037 || 0);
    // object.i038 = Number(queryParams.i038 || 0);
    // object.i039 = Number(queryParams.i039 || 0);
    // object.i040 = Number(queryParams.i040 || 0);
    // object.i041 = Number(queryParams.i041 || 0);
    // object.i042 = Number(queryParams.i042 || 0);
    // object.i043 = Number(queryParams.i043 || 0);
    // object.i044 = Number(queryParams.i044 || 0);
    // object.i045 = Number(queryParams.i045 || 0);
    // object.i046 = Number(queryParams.i046 || 0);
    // object.i047 = Number(queryParams.i047 || 0);
    // object.i048 = Number(queryParams.i048 || 0);
    // object.i049 = Number(queryParams.i049 || 0);
    // object.i050 = Number(queryParams.i050 || 0);
    // object.i051 = Number(queryParams.i051 || 0);
    // object.i052 = Number(queryParams.i052 || 0);
    // object.i053 = Number(queryParams.i053 || 0);
    // object.i054 = Number(queryParams.i054 || 0);
    // object.i055 = Number(queryParams.i055 || 0);
    // object.i056 = Number(queryParams.i056 || 0);
    // object.i057 = Number(queryParams.i057 || 0);
    // object.i058 = Number(queryParams.i058 || 0);
    // object.i059 = Number(queryParams.i059 || 0);
    // object.i060 = Number(queryParams.i060 || 0);
    // object.i061 = Number(queryParams.i061 || 0);
    // object.i062 = Number(queryParams.i062 || 0);
    // object.i063 = Number(queryParams.i063 || 0);
    // object.i064 = Number(queryParams.i064 || 0);
    // object.i065 = Number(queryParams.i065 || 0);
    // object.i066 = Number(queryParams.i066 || 0);
    // object.i067 = Number(queryParams.i067 || 0);
    // object.i068 = Number(queryParams.i068 || 0);
    // object.i069 = Number(queryParams.i069 || 0);
    // object.i070 = Number(queryParams.i070 || 0);
    // object.i071 = Number(queryParams.i071 || 0);
    // object.i072 = Number(queryParams.i072 || 0);
    // object.i073 = Number(queryParams.i073 || 0);
    // object.i074 = Number(queryParams.i074 || 0);
    // object.i075 = Number(queryParams.i075 || 0);
    // object.i076 = Number(queryParams.i076 || 0);
    // object.i077 = Number(queryParams.i077 || 0);
    // object.i078 = Number(queryParams.i078 || 0);
    // object.i079 = Number(queryParams.i079 || 0);
    // object.i080 = Number(queryParams.i080 || 0);
    // object.i081 = Number(queryParams.i081 || 0);
    // object.i082 = Number(queryParams.i082 || 0);
    // object.i083 = Number(queryParams.i083 || 0);
    // object.i084 = Number(queryParams.i084 || 0);
    // object.i085 = Number(queryParams.i085 || 0);
    // object.i086 = Number(queryParams.i086 || 0);
    // object.i087 = Number(queryParams.i087 || 0);
    // object.i088 = Number(queryParams.i088 || 0);
    // object.i089 = Number(queryParams.i089 || 0);
    // object.i090 = Number(queryParams.i090 || 0);
    // object.i091 = Number(queryParams.i091 || 0);
    // object.i092 = Number(queryParams.i092 || 0);
    // object.i093 = Number(queryParams.i093 || 0);
    // object.i094 = Number(queryParams.i094 || 0);
    // object.i095 = Number(queryParams.i095 || 0);
    // object.i096 = Number(queryParams.i096 || 0);
    // object.i097 = Number(queryParams.i097 || 0);
    // object.i098 = Number(queryParams.i098 || 0);
    // object.i099 = Number(queryParams.i099 || 0);
    // object.b000 = queryParams.b000 === 1;
    // object.b001 = queryParams.b001 === 1;
    // object.b002 = queryParams.b002 === 1;
    // object.b003 = queryParams.b003 === 1;
    // object.b004 = queryParams.b004 === 1;
    // object.b005 = queryParams.b005 === 1;
    // object.b006 = queryParams.b006 === 1;
    // object.b007 = queryParams.b007 === 1;
    // object.b008 = queryParams.b008 === 1;
    // object.b009 = queryParams.b009 === 1;
    // object.b010 = queryParams.b010 === 1;
    // object.b011 = queryParams.b011 === 1;
    // object.b012 = queryParams.b012 === 1;
    // object.b013 = queryParams.b013 === 1;
    // object.b014 = queryParams.b014 === 1;
    // object.b015 = queryParams.b015 === 1;
    // object.b016 = queryParams.b016 === 1;
    // object.b017 = queryParams.b017 === 1;
    // object.b018 = queryParams.b018 === 1;
    // object.b019 = queryParams.b019 === 1;
    // object.b020 = queryParams.b020 === 1;
    // object.b021 = queryParams.b021 === 1;
    // object.b022 = queryParams.b022 === 1;
    // object.b023 = queryParams.b023 === 1;
    // object.b024 = queryParams.b024 === 1;
    // object.b025 = queryParams.b025 === 1;
    // object.b026 = queryParams.b026 === 1;
    // object.b027 = queryParams.b027 === 1;
    // object.b028 = queryParams.b028 === 1;
    // object.b029 = queryParams.b029 === 1;
    // object.b030 = queryParams.b030 === 1;
    // object.r000 = queryParams.r000 || 0.0;
    // object.r001 = queryParams.r001 || 0.0;
    // object.r002 = queryParams.r002 || 0.0;
    // object.r003 = queryParams.r003 || 0.0;
    // object.r004 = queryParams.r004 || 0.0;
    // object.r005 = queryParams.r005 || 0.0;
    // object.r006 = queryParams.r006 || 0.0;
    // object.r007 = queryParams.r007 || 0.0;
    // object.r008 = queryParams.r008 || 0.0;
    // object.r009 = queryParams.r009 || 0.0;
    // object.r010 = queryParams.r010 || 0.0;
    // object.r011 = queryParams.r011 || 0.0;
    // object.r012 = queryParams.r012 || 0.0;
    // object.r013 = queryParams.r013 || 0.0;
    // object.r014 = queryParams.r014 || 0.0;
    // object.r015 = queryParams.r015 || 0.0;
    // object.r016 = queryParams.r016 || 0.0;
    // object.r017 = queryParams.r017 || 0.0;
    // object.r018 = queryParams.r018 || 0.0;
    // object.r019 = queryParams.r019 || 0.0;
    // object.r020 = queryParams.r020 || 0.0;
    // object.r021 = queryParams.r021 || 0.0;
    // object.r022 = queryParams.r022 || 0.0;
    // object.r023 = queryParams.r023 || 0.0;
    // object.r024 = queryParams.r024 || 0.0;
    // object.r025 = queryParams.r025 || 0.0;
    // object.r026 = queryParams.r026 || 0.0;
    // object.r027 = queryParams.r027 || 0.0;
    // object.r028 = queryParams.r028 || 0.0;
    // object.r029 = queryParams.r029 || 0.0;
    // object.r030 = queryParams.r030 || 0.0;
    // object.t000 = new Date(queryParams.t000 || 0);
    // object.t001 = new Date(queryParams.t001 || 0);
    // object.t002 = new Date(queryParams.t002 || 0);
    // object.t003 = new Date(queryParams.t003 || 0);
    // object.t004 = new Date(queryParams.t004 || 0);
    // object.t005 = new Date(queryParams.t005 || 0);
    // object.t006 = new Date(queryParams.t006 || 0);
    // object.t007 = new Date(queryParams.t007 || 0);
    // object.t008 = new Date(queryParams.t008 || 0);
    // object.t009 = new Date(queryParams.t009 || 0);
    // object.t010 = new Date(queryParams.t010 || 0);
    // object.t011 = new Date(queryParams.t011 || 0);
    // object.t012 = new Date(queryParams.t012 || 0);
    // object.t013 = new Date(queryParams.t013 || 0);
    // object.t014 = new Date(queryParams.t014 || 0);
    // object.t015 = new Date(queryParams.t015 || 0);
    // object.t016 = new Date(queryParams.t016 || 0);
    // object.t017 = new Date(queryParams.t017 || 0);
    // object.t018 = new Date(queryParams.t018 || 0);
    // object.t019 = new Date(queryParams.t019 || 0);
    // object.t020 = new Date(queryParams.t020 || 0);
    // object.l000 = JSON.parse(queryParams.l000 || '[]');
    // object.l001 = JSON.parse(queryParams.l001 || '[]');
    // object.l002 = JSON.parse(queryParams.l002 || '[]');
    // object.l003 = JSON.parse(queryParams.l003 || '[]');
    // object.l004 = JSON.parse(queryParams.l004 || '[]');
    // object.l005 = JSON.parse(queryParams.l005 || '[]');
    // object.l006 = JSON.parse(queryParams.l006 || '[]');
    // object.l007 = JSON.parse(queryParams.l007 || '[]');
    // object.l008 = JSON.parse(queryParams.l008 || '[]');
    // object.l009 = JSON.parse(queryParams.l009 || '[]');
    // object.l010 = JSON.parse(queryParams.l010 || '[]');
    // object.l011 = JSON.parse(queryParams.l011 || '[]');
    // object.l012 = JSON.parse(queryParams.l012 || '[]');
    // object.l013 = JSON.parse(queryParams.l013 || '[]');
    // object.l014 = JSON.parse(queryParams.l014 || '[]');
    // object.l015 = JSON.parse(queryParams.l015 || '[]');
    // object.l016 = JSON.parse(queryParams.l016 || '[]');
    // object.l017 = JSON.parse(queryParams.l017 || '[]');
    // object.l018 = JSON.parse(queryParams.l018 || '[]');
    // object.l019 = JSON.parse(queryParams.l019 || '[]');
    // object.l020 = JSON.parse(queryParams.l020 || '[]');
    // object.m000 = JSON.parse(queryParams.m000 || '{}');
    // object.m001 = JSON.parse(queryParams.m001 || '{}');
    // object.m002 = JSON.parse(queryParams.m002 || '{}');
    // object.m003 = JSON.parse(queryParams.m003 || '{}');
    // object.m004 = JSON.parse(queryParams.m004 || '{}');
    // object.m005 = JSON.parse(queryParams.m005 || '{}');
    // object.m006 = JSON.parse(queryParams.m006 || '{}');
    // object.m007 = JSON.parse(queryParams.m007 || '{}');
    // object.m008 = JSON.parse(queryParams.m008 || '{}');
    // object.m009 = JSON.parse(queryParams.m009 || '{}');
    // object.m010 = JSON.parse(queryParams.m010 || '{}');
    // object.m011 = JSON.parse(queryParams.m011 || '{}');
    // object.m012 = JSON.parse(queryParams.m012 || '{}');
    // object.m013 = JSON.parse(queryParams.m013 || '{}');
    // object.m014 = JSON.parse(queryParams.m014 || '{}');
    // object.m015 = JSON.parse(queryParams.m015 || '{}');
    // object.m016 = JSON.parse(queryParams.m016 || '{}');
    // object.m017 = JSON.parse(queryParams.m017 || '{}');
    // object.m018 = JSON.parse(queryParams.m018 || '{}');
    // object.m019 = JSON.parse(queryParams.m019 || '{}');
    // object.m020 = JSON.parse(queryParams.m020 || '{}');
    // object.c000 = OtherModel.fromDataString(queryParams.c000 || new OtherModel().toDataString());
    // object.c001 = OtherModel.fromDataString(queryParams.c001 || new OtherModel().toDataString());
    // object.c002 = OtherModel.fromDataString(queryParams.c002 || new OtherModel().toDataString());
    // object.c003 = OtherModel.fromDataString(queryParams.c003 || new OtherModel().toDataString());
    // object.c004 = OtherModel.fromDataString(queryParams.c004 || new OtherModel().toDataString());
    // object.c005 = OtherModel.fromDataString(queryParams.c005 || new OtherModel().toDataString());
    // object.c006 = OtherModel.fromDataString(queryParams.c006 || new OtherModel().toDataString());
    // object.c007 = OtherModel.fromDataString(queryParams.c007 || new OtherModel().toDataString());
    // object.c008 = OtherModel.fromDataString(queryParams.c008 || new OtherModel().toDataString());
    // object.c009 = OtherModel.fromDataString(queryParams.c009 || new OtherModel().toDataString());
    // object.c010 = OtherModel.fromDataString(queryParams.c010 || new OtherModel().toDataString());
    // object.c011 = OtherModel.fromDataString(queryParams.c011 || new OtherModel().toDataString());
    // object.c012 = OtherModel.fromDataString(queryParams.c012 || new OtherModel().toDataString());
    // object.c013 = OtherModel.fromDataString(queryParams.c013 || new OtherModel().toDataString());
    // object.c014 = OtherModel.fromDataString(queryParams.c014 || new OtherModel().toDataString());
    // object.c015 = OtherModel.fromDataString(queryParams.c015 || new OtherModel().toDataString());
    // object.c016 = OtherModel.fromDataString(queryParams.c016 || new OtherModel().toDataString());
    // object.c017 = OtherModel.fromDataString(queryParams.c017 || new OtherModel().toDataString());
    // object.c018 = OtherModel.fromDataString(queryParams.c018 || new OtherModel().toDataString());
    // object.c019 = OtherModel.fromDataString(queryParams.c019 || new OtherModel().toDataString());
    // object.c020 = OtherModel.fromDataString(queryParams.c020 || new OtherModel().toDataString());
    // object.j000 = (JSON.parse(queryParams.j000 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j001 = (JSON.parse(queryParams.j001 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j002 = (JSON.parse(queryParams.j002 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j003 = (JSON.parse(queryParams.j003 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j004 = (JSON.parse(queryParams.j004 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j005 = (JSON.parse(queryParams.j005 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j006 = (JSON.parse(queryParams.j006 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j007 = (JSON.parse(queryParams.j007 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j008 = (JSON.parse(queryParams.j008 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j009 = (JSON.parse(queryParams.j009 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j010 = (JSON.parse(queryParams.j010 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j011 = (JSON.parse(queryParams.j011 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j012 = (JSON.parse(queryParams.j012 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j013 = (JSON.parse(queryParams.j013 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j014 = (JSON.parse(queryParams.j014 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j015 = (JSON.parse(queryParams.j015 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j016 = (JSON.parse(queryParams.j016 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j017 = (JSON.parse(queryParams.j017 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j018 = (JSON.parse(queryParams.j018 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j019 = (JSON.parse(queryParams.j019 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j020 = (JSON.parse(queryParams.j020 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.e000 = SomeEnumHelper.fromString(queryParams.e000 || SomeEnum.notSelected);
    // object.e001 = SomeEnumHelper.fromString(queryParams.e001 || SomeEnum.notSelected);
    // object.e002 = SomeEnumHelper.fromString(queryParams.e002 || SomeEnum.notSelected);
    // object.e003 = SomeEnumHelper.fromString(queryParams.e003 || SomeEnum.notSelected);
    // object.e004 = SomeEnumHelper.fromString(queryParams.e004 || SomeEnum.notSelected);
    // object.e005 = SomeEnumHelper.fromString(queryParams.e005 || SomeEnum.notSelected);
    // object.e006 = SomeEnumHelper.fromString(queryParams.e006 || SomeEnum.notSelected);
    // object.e007 = SomeEnumHelper.fromString(queryParams.e007 || SomeEnum.notSelected);
    // object.e008 = SomeEnumHelper.fromString(queryParams.e008 || SomeEnum.notSelected);
    // object.e009 = SomeEnumHelper.fromString(queryParams.e009 || SomeEnum.notSelected);
    // object.e010 = SomeEnumHelper.fromString(queryParams.e010 || SomeEnum.notSelected);
    // object.e011 = SomeEnumHelper.fromString(queryParams.e011 || SomeEnum.notSelected);
    // object.e012 = SomeEnumHelper.fromString(queryParams.e012 || SomeEnum.notSelected);
    // object.e013 = SomeEnumHelper.fromString(queryParams.e013 || SomeEnum.notSelected);
    // object.e014 = SomeEnumHelper.fromString(queryParams.e014 || SomeEnum.notSelected);
    // object.e015 = SomeEnumHelper.fromString(queryParams.e015 || SomeEnum.notSelected);
    // object.e016 = SomeEnumHelper.fromString(queryParams.e016 || SomeEnum.notSelected);
    // object.e017 = SomeEnumHelper.fromString(queryParams.e017 || SomeEnum.notSelected);
    // object.e018 = SomeEnumHelper.fromString(queryParams.e018 || SomeEnum.notSelected);
    // object.e019 = SomeEnumHelper.fromString(queryParams.e019 || SomeEnum.notSelected);
    // object.e020 = SomeEnumHelper.fromString(queryParams.e020 || SomeEnum.notSelected);
    object.docId = queryParams.docId;

    return object;
  }
}

export class NewPostgresql {
  static sqlDb = postgres(
    `postgres://${userName}:${password}@${hostAddress}:${portNumber}/${dbName}`
  );

  static async createIndex(columns: string[]) {
    const sql = this._createIndexSqlString(columns);
    await NewPostgresql.sqlDb.unsafe(sql).execute();
  }

  static _createIndexSqlString(columns: string[]): string {
    let indexName = `idx_${columns.join("_")}`;
    indexName = indexName.replace(/\(.*?\)/g, ""); // (~) 가 이름에 있으면 지움 주로 문자열등에서 유용하게 사용
    const tableName = "NewModel"; // Replace with your actual table name
    return `CREATE INDEX ${indexName} ON ${tableName} (${columns.join(", ")});`;
  }

  static async createTable() {
    const createTableSQL: string =
      `CREATE TABLE IF NOT EXISTS New(` +
      `docId TEXT PRIMARY KEY` +
      // `,s000 TEXT` +
      // `,s001 TEXT` +
      // `,s002 TEXT` +
      // `,s003 TEXT` +
      // `,s004 TEXT` +
      // `,s005 TEXT` +
      // `,s006 TEXT` +
      // `,s007 TEXT` +
      // `,s008 TEXT` +
      // `,s009 TEXT` +
      // `,s010 TEXT` +
      // `,s011 TEXT` +
      // `,s012 TEXT` +
      // `,s013 TEXT` +
      // `,s014 TEXT` +
      // `,s015 TEXT` +
      // `,s016 TEXT` +
      // `,s017 TEXT` +
      // `,s018 TEXT` +
      // `,s019 TEXT` +
      // `,s020 TEXT` +
      // `,s021 TEXT` +
      // `,s022 TEXT` +
      // `,s023 TEXT` +
      // `,s024 TEXT` +
      // `,s025 TEXT` +
      // `,s026 TEXT` +
      // `,s027 TEXT` +
      // `,s028 TEXT` +
      // `,s029 TEXT` +
      // `,s030 TEXT` +
      // `,s031 TEXT` +
      // `,s032 TEXT` +
      // `,s033 TEXT` +
      // `,s034 TEXT` +
      // `,s035 TEXT` +
      // `,s036 TEXT` +
      // `,s037 TEXT` +
      // `,s038 TEXT` +
      // `,s039 TEXT` +
      // `,s040 TEXT` +
      // `,s041 TEXT` +
      // `,s042 TEXT` +
      // `,s043 TEXT` +
      // `,s044 TEXT` +
      // `,s045 TEXT` +
      // `,s046 TEXT` +
      // `,s047 TEXT` +
      // `,s048 TEXT` +
      // `,s049 TEXT` +
      // `,s050 TEXT` +
      // `,s051 TEXT` +
      // `,s052 TEXT` +
      // `,s053 TEXT` +
      // `,s054 TEXT` +
      // `,s055 TEXT` +
      // `,s056 TEXT` +
      // `,s057 TEXT` +
      // `,s058 TEXT` +
      // `,s059 TEXT` +
      // `,s060 TEXT` +
      // `,s061 TEXT` +
      // `,s062 TEXT` +
      // `,s063 TEXT` +
      // `,s064 TEXT` +
      // `,s065 TEXT` +
      // `,s066 TEXT` +
      // `,s067 TEXT` +
      // `,s068 TEXT` +
      // `,s069 TEXT` +
      // `,s070 TEXT` +
      // `,s071 TEXT` +
      // `,s072 TEXT` +
      // `,s073 TEXT` +
      // `,s074 TEXT` +
      // `,s075 TEXT` +
      // `,s076 TEXT` +
      // `,s077 TEXT` +
      // `,s078 TEXT` +
      // `,s079 TEXT` +
      // `,s080 TEXT` +
      // `,s081 TEXT` +
      // `,s082 TEXT` +
      // `,s083 TEXT` +
      // `,s084 TEXT` +
      // `,s085 TEXT` +
      // `,s086 TEXT` +
      // `,s087 TEXT` +
      // `,s088 TEXT` +
      // `,s089 TEXT` +
      // `,s090 TEXT` +
      // `,s091 TEXT` +
      // `,s092 TEXT` +
      // `,s093 TEXT` +
      // `,s094 TEXT` +
      // `,s095 TEXT` +
      // `,s096 TEXT` +
      // `,s097 TEXT` +
      // `,s098 TEXT` +
      // `,s099 TEXT` +
      // `,i000 BIGINT` +
      // `,i001 BIGINT` +
      // `,i002 BIGINT` +
      // `,i003 BIGINT` +
      // `,i004 BIGINT` +
      // `,i005 BIGINT` +
      // `,i006 BIGINT` +
      // `,i007 BIGINT` +
      // `,i008 BIGINT` +
      // `,i009 BIGINT` +
      // `,i010 BIGINT` +
      // `,i011 BIGINT` +
      // `,i012 BIGINT` +
      // `,i013 BIGINT` +
      // `,i014 BIGINT` +
      // `,i015 BIGINT` +
      // `,i016 BIGINT` +
      // `,i017 BIGINT` +
      // `,i018 BIGINT` +
      // `,i019 BIGINT` +
      // `,i020 BIGINT` +
      // `,i021 BIGINT` +
      // `,i022 BIGINT` +
      // `,i023 BIGINT` +
      // `,i024 BIGINT` +
      // `,i025 BIGINT` +
      // `,i026 BIGINT` +
      // `,i027 BIGINT` +
      // `,i028 BIGINT` +
      // `,i029 BIGINT` +
      // `,i030 BIGINT` +
      // `,i031 BIGINT` +
      // `,i032 BIGINT` +
      // `,i033 BIGINT` +
      // `,i034 BIGINT` +
      // `,i035 BIGINT` +
      // `,i036 BIGINT` +
      // `,i037 BIGINT` +
      // `,i038 BIGINT` +
      // `,i039 BIGINT` +
      // `,i040 BIGINT` +
      // `,i041 BIGINT` +
      // `,i042 BIGINT` +
      // `,i043 BIGINT` +
      // `,i044 BIGINT` +
      // `,i045 BIGINT` +
      // `,i046 BIGINT` +
      // `,i047 BIGINT` +
      // `,i048 BIGINT` +
      // `,i049 BIGINT` +
      // `,i050 BIGINT` +
      // `,i051 BIGINT` +
      // `,i052 BIGINT` +
      // `,i053 BIGINT` +
      // `,i054 BIGINT` +
      // `,i055 BIGINT` +
      // `,i056 BIGINT` +
      // `,i057 BIGINT` +
      // `,i058 BIGINT` +
      // `,i059 BIGINT` +
      // `,i060 BIGINT` +
      // `,i061 BIGINT` +
      // `,i062 BIGINT` +
      // `,i063 BIGINT` +
      // `,i064 BIGINT` +
      // `,i065 BIGINT` +
      // `,i066 BIGINT` +
      // `,i067 BIGINT` +
      // `,i068 BIGINT` +
      // `,i069 BIGINT` +
      // `,i070 BIGINT` +
      // `,i071 BIGINT` +
      // `,i072 BIGINT` +
      // `,i073 BIGINT` +
      // `,i074 BIGINT` +
      // `,i075 BIGINT` +
      // `,i076 BIGINT` +
      // `,i077 BIGINT` +
      // `,i078 BIGINT` +
      // `,i079 BIGINT` +
      // `,i080 BIGINT` +
      // `,i081 BIGINT` +
      // `,i082 BIGINT` +
      // `,i083 BIGINT` +
      // `,i084 BIGINT` +
      // `,i085 BIGINT` +
      // `,i086 BIGINT` +
      // `,i087 BIGINT` +
      // `,i088 BIGINT` +
      // `,i089 BIGINT` +
      // `,i090 BIGINT` +
      // `,i091 BIGINT` +
      // `,i092 BIGINT` +
      // `,i093 BIGINT` +
      // `,i094 BIGINT` +
      // `,i095 BIGINT` +
      // `,i096 BIGINT` +
      // `,i097 BIGINT` +
      // `,i098 BIGINT` +
      // `,i099 BIGINT` +
      // `,b000 INTEGER CHECK(b000 IN (0, 1))` +
      // `,b001 INTEGER CHECK(b001 IN (0, 1))` +
      // `,b002 INTEGER CHECK(b002 IN (0, 1))` +
      // `,b003 INTEGER CHECK(b003 IN (0, 1))` +
      // `,b004 INTEGER CHECK(b004 IN (0, 1))` +
      // `,b005 INTEGER CHECK(b005 IN (0, 1))` +
      // `,b006 INTEGER CHECK(b006 IN (0, 1))` +
      // `,b007 INTEGER CHECK(b007 IN (0, 1))` +
      // `,b008 INTEGER CHECK(b008 IN (0, 1))` +
      // `,b009 INTEGER CHECK(b009 IN (0, 1))` +
      // `,b010 INTEGER CHECK(b010 IN (0, 1))` +
      // `,b011 INTEGER CHECK(b011 IN (0, 1))` +
      // `,b012 INTEGER CHECK(b012 IN (0, 1))` +
      // `,b013 INTEGER CHECK(b013 IN (0, 1))` +
      // `,b014 INTEGER CHECK(b014 IN (0, 1))` +
      // `,b015 INTEGER CHECK(b015 IN (0, 1))` +
      // `,b016 INTEGER CHECK(b016 IN (0, 1))` +
      // `,b017 INTEGER CHECK(b017 IN (0, 1))` +
      // `,b018 INTEGER CHECK(b018 IN (0, 1))` +
      // `,b019 INTEGER CHECK(b019 IN (0, 1))` +
      // `,b020 INTEGER CHECK(b020 IN (0, 1))` +
      // `,b021 INTEGER CHECK(b021 IN (0, 1))` +
      // `,b022 INTEGER CHECK(b022 IN (0, 1))` +
      // `,b023 INTEGER CHECK(b023 IN (0, 1))` +
      // `,b024 INTEGER CHECK(b024 IN (0, 1))` +
      // `,b025 INTEGER CHECK(b025 IN (0, 1))` +
      // `,b026 INTEGER CHECK(b026 IN (0, 1))` +
      // `,b027 INTEGER CHECK(b027 IN (0, 1))` +
      // `,b028 INTEGER CHECK(b028 IN (0, 1))` +
      // `,b029 INTEGER CHECK(b029 IN (0, 1))` +
      // `,b030 INTEGER CHECK(b030 IN (0, 1))` +
      // `,r000 DOUBLE PRECISION` +
      // `,r001 DOUBLE PRECISION` +
      // `,r002 DOUBLE PRECISION` +
      // `,r003 DOUBLE PRECISION` +
      // `,r004 DOUBLE PRECISION` +
      // `,r005 DOUBLE PRECISION` +
      // `,r006 DOUBLE PRECISION` +
      // `,r007 DOUBLE PRECISION` +
      // `,r008 DOUBLE PRECISION` +
      // `,r009 DOUBLE PRECISION` +
      // `,r010 DOUBLE PRECISION` +
      // `,r011 DOUBLE PRECISION` +
      // `,r012 DOUBLE PRECISION` +
      // `,r013 DOUBLE PRECISION` +
      // `,r014 DOUBLE PRECISION` +
      // `,r015 DOUBLE PRECISION` +
      // `,r016 DOUBLE PRECISION` +
      // `,r017 DOUBLE PRECISION` +
      // `,r018 DOUBLE PRECISION` +
      // `,r019 DOUBLE PRECISION` +
      // `,r020 DOUBLE PRECISION` +
      // `,r021 DOUBLE PRECISION` +
      // `,r022 DOUBLE PRECISION` +
      // `,r023 DOUBLE PRECISION` +
      // `,r024 DOUBLE PRECISION` +
      // `,r025 DOUBLE PRECISION` +
      // `,r026 DOUBLE PRECISION` +
      // `,r027 DOUBLE PRECISION` +
      // `,r028 DOUBLE PRECISION` +
      // `,r029 DOUBLE PRECISION` +
      // `,r030 DOUBLE PRECISION` +
      // `,t000 BIGINT` +
      // `,t001 BIGINT` +
      // `,t002 BIGINT` +
      // `,t003 BIGINT` +
      // `,t004 BIGINT` +
      // `,t005 BIGINT` +
      // `,t006 BIGINT` +
      // `,t007 BIGINT` +
      // `,t008 BIGINT` +
      // `,t009 BIGINT` +
      // `,t010 BIGINT` +
      // `,t011 BIGINT` +
      // `,t012 BIGINT` +
      // `,t013 BIGINT` +
      // `,t014 BIGINT` +
      // `,t015 BIGINT` +
      // `,t016 BIGINT` +
      // `,t017 BIGINT` +
      // `,t018 BIGINT` +
      // `,t019 BIGINT` +
      // `,t020 BIGINT` +
      // `,l000 TEXT` +
      // `,l001 TEXT` +
      // `,l002 TEXT` +
      // `,l003 TEXT` +
      // `,l004 TEXT` +
      // `,l005 TEXT` +
      // `,l006 TEXT` +
      // `,l007 TEXT` +
      // `,l008 TEXT` +
      // `,l009 TEXT` +
      // `,l010 TEXT` +
      // `,l011 TEXT` +
      // `,l012 TEXT` +
      // `,l013 TEXT` +
      // `,l014 TEXT` +
      // `,l015 TEXT` +
      // `,l016 TEXT` +
      // `,l017 TEXT` +
      // `,l018 TEXT` +
      // `,l019 TEXT` +
      // `,l020 TEXT` +
      // `,m000 TEXT` +
      // `,m001 TEXT` +
      // `,m002 TEXT` +
      // `,m003 TEXT` +
      // `,m004 TEXT` +
      // `,m005 TEXT` +
      // `,m006 TEXT` +
      // `,m007 TEXT` +
      // `,m008 TEXT` +
      // `,m009 TEXT` +
      // `,m010 TEXT` +
      // `,m011 TEXT` +
      // `,m012 TEXT` +
      // `,m013 TEXT` +
      // `,m014 TEXT` +
      // `,m015 TEXT` +
      // `,m016 TEXT` +
      // `,m017 TEXT` +
      // `,m018 TEXT` +
      // `,m019 TEXT` +
      // `,m020 TEXT` +
      // `,c000 TEXT` +
      // `,c001 TEXT` +
      // `,c002 TEXT` +
      // `,c003 TEXT` +
      // `,c004 TEXT` +
      // `,c005 TEXT` +
      // `,c006 TEXT` +
      // `,c007 TEXT` +
      // `,c008 TEXT` +
      // `,c009 TEXT` +
      // `,c010 TEXT` +
      // `,c011 TEXT` +
      // `,c012 TEXT` +
      // `,c013 TEXT` +
      // `,c014 TEXT` +
      // `,c015 TEXT` +
      // `,c016 TEXT` +
      // `,c017 TEXT` +
      // `,c018 TEXT` +
      // `,c019 TEXT` +
      // `,c020 TEXT` +
      // `,j000 TEXT` +
      // `,j001 TEXT` +
      // `,j002 TEXT` +
      // `,j003 TEXT` +
      // `,j004 TEXT` +
      // `,j005 TEXT` +
      // `,j006 TEXT` +
      // `,j007 TEXT` +
      // `,j008 TEXT` +
      // `,j009 TEXT` +
      // `,j010 TEXT` +
      // `,j011 TEXT` +
      // `,j012 TEXT` +
      // `,j013 TEXT` +
      // `,j014 TEXT` +
      // `,j015 TEXT` +
      // `,j016 TEXT` +
      // `,j017 TEXT` +
      // `,j018 TEXT` +
      // `,j019 TEXT` +
      // `,j020 TEXT` +
      // `,e000 TEXT` +
      // `,e001 TEXT` +
      // `,e002 TEXT` +
      // `,e003 TEXT` +
      // `,e004 TEXT` +
      // `,e005 TEXT` +
      // `,e006 TEXT` +
      // `,e007 TEXT` +
      // `,e008 TEXT` +
      // `,e009 TEXT` +
      // `,e010 TEXT` +
      // `,e011 TEXT` +
      // `,e012 TEXT` +
      // `,e013 TEXT` +
      // `,e014 TEXT` +
      // `,e015 TEXT` +
      // `,e016 TEXT` +
      // `,e017 TEXT` +
      // `,e018 TEXT` +
      // `,e019 TEXT` +
      // `,e020 TEXT` +
      `)`;

    await NewPostgresql.sqlDb.unsafe(createTableSQL).execute();
  }

  static async insert(object: New) {
    const sql =
      `insert into New (` +
      `docId` +
      // `,s000` +
      // `,s001` +
      // `,s002` +
      // `,s003` +
      // `,s004` +
      // `,s005` +
      // `,s006` +
      // `,s007` +
      // `,s008` +
      // `,s009` +
      // `,s010` +
      // `,s011` +
      // `,s012` +
      // `,s013` +
      // `,s014` +
      // `,s015` +
      // `,s016` +
      // `,s017` +
      // `,s018` +
      // `,s019` +
      // `,s020` +
      // `,s021` +
      // `,s022` +
      // `,s023` +
      // `,s024` +
      // `,s025` +
      // `,s026` +
      // `,s027` +
      // `,s028` +
      // `,s029` +
      // `,s030` +
      // `,s031` +
      // `,s032` +
      // `,s033` +
      // `,s034` +
      // `,s035` +
      // `,s036` +
      // `,s037` +
      // `,s038` +
      // `,s039` +
      // `,s040` +
      // `,s041` +
      // `,s042` +
      // `,s043` +
      // `,s044` +
      // `,s045` +
      // `,s046` +
      // `,s047` +
      // `,s048` +
      // `,s049` +
      // `,s050` +
      // `,s051` +
      // `,s052` +
      // `,s053` +
      // `,s054` +
      // `,s055` +
      // `,s056` +
      // `,s057` +
      // `,s058` +
      // `,s059` +
      // `,s060` +
      // `,s061` +
      // `,s062` +
      // `,s063` +
      // `,s064` +
      // `,s065` +
      // `,s066` +
      // `,s067` +
      // `,s068` +
      // `,s069` +
      // `,s070` +
      // `,s071` +
      // `,s072` +
      // `,s073` +
      // `,s074` +
      // `,s075` +
      // `,s076` +
      // `,s077` +
      // `,s078` +
      // `,s079` +
      // `,s080` +
      // `,s081` +
      // `,s082` +
      // `,s083` +
      // `,s084` +
      // `,s085` +
      // `,s086` +
      // `,s087` +
      // `,s088` +
      // `,s089` +
      // `,s090` +
      // `,s091` +
      // `,s092` +
      // `,s093` +
      // `,s094` +
      // `,s095` +
      // `,s096` +
      // `,s097` +
      // `,s098` +
      // `,s099` +
      // `,i000` +
      // `,i001` +
      // `,i002` +
      // `,i003` +
      // `,i004` +
      // `,i005` +
      // `,i006` +
      // `,i007` +
      // `,i008` +
      // `,i009` +
      // `,i010` +
      // `,i011` +
      // `,i012` +
      // `,i013` +
      // `,i014` +
      // `,i015` +
      // `,i016` +
      // `,i017` +
      // `,i018` +
      // `,i019` +
      // `,i020` +
      // `,i021` +
      // `,i022` +
      // `,i023` +
      // `,i024` +
      // `,i025` +
      // `,i026` +
      // `,i027` +
      // `,i028` +
      // `,i029` +
      // `,i030` +
      // `,i031` +
      // `,i032` +
      // `,i033` +
      // `,i034` +
      // `,i035` +
      // `,i036` +
      // `,i037` +
      // `,i038` +
      // `,i039` +
      // `,i040` +
      // `,i041` +
      // `,i042` +
      // `,i043` +
      // `,i044` +
      // `,i045` +
      // `,i046` +
      // `,i047` +
      // `,i048` +
      // `,i049` +
      // `,i050` +
      // `,i051` +
      // `,i052` +
      // `,i053` +
      // `,i054` +
      // `,i055` +
      // `,i056` +
      // `,i057` +
      // `,i058` +
      // `,i059` +
      // `,i060` +
      // `,i061` +
      // `,i062` +
      // `,i063` +
      // `,i064` +
      // `,i065` +
      // `,i066` +
      // `,i067` +
      // `,i068` +
      // `,i069` +
      // `,i070` +
      // `,i071` +
      // `,i072` +
      // `,i073` +
      // `,i074` +
      // `,i075` +
      // `,i076` +
      // `,i077` +
      // `,i078` +
      // `,i079` +
      // `,i080` +
      // `,i081` +
      // `,i082` +
      // `,i083` +
      // `,i084` +
      // `,i085` +
      // `,i086` +
      // `,i087` +
      // `,i088` +
      // `,i089` +
      // `,i090` +
      // `,i091` +
      // `,i092` +
      // `,i093` +
      // `,i094` +
      // `,i095` +
      // `,i096` +
      // `,i097` +
      // `,i098` +
      // `,i099` +
      // `,b000` +
      // `,b001` +
      // `,b002` +
      // `,b003` +
      // `,b004` +
      // `,b005` +
      // `,b006` +
      // `,b007` +
      // `,b008` +
      // `,b009` +
      // `,b010` +
      // `,b011` +
      // `,b012` +
      // `,b013` +
      // `,b014` +
      // `,b015` +
      // `,b016` +
      // `,b017` +
      // `,b018` +
      // `,b019` +
      // `,b020` +
      // `,b021` +
      // `,b022` +
      // `,b023` +
      // `,b024` +
      // `,b025` +
      // `,b026` +
      // `,b027` +
      // `,b028` +
      // `,b029` +
      // `,b030` +
      // `,r000` +
      // `,r001` +
      // `,r002` +
      // `,r003` +
      // `,r004` +
      // `,r005` +
      // `,r006` +
      // `,r007` +
      // `,r008` +
      // `,r009` +
      // `,r010` +
      // `,r011` +
      // `,r012` +
      // `,r013` +
      // `,r014` +
      // `,r015` +
      // `,r016` +
      // `,r017` +
      // `,r018` +
      // `,r019` +
      // `,r020` +
      // `,r021` +
      // `,r022` +
      // `,r023` +
      // `,r024` +
      // `,r025` +
      // `,r026` +
      // `,r027` +
      // `,r028` +
      // `,r029` +
      // `,r030` +
      // `,t000` +
      // `,t001` +
      // `,t002` +
      // `,t003` +
      // `,t004` +
      // `,t005` +
      // `,t006` +
      // `,t007` +
      // `,t008` +
      // `,t009` +
      // `,t010` +
      // `,t011` +
      // `,t012` +
      // `,t013` +
      // `,t014` +
      // `,t015` +
      // `,t016` +
      // `,t017` +
      // `,t018` +
      // `,t019` +
      // `,t020` +
      // `,l000` +
      // `,l001` +
      // `,l002` +
      // `,l003` +
      // `,l004` +
      // `,l005` +
      // `,l006` +
      // `,l007` +
      // `,l008` +
      // `,l009` +
      // `,l010` +
      // `,l011` +
      // `,l012` +
      // `,l013` +
      // `,l014` +
      // `,l015` +
      // `,l016` +
      // `,l017` +
      // `,l018` +
      // `,l019` +
      // `,l020` +
      // `,m000` +
      // `,m001` +
      // `,m002` +
      // `,m003` +
      // `,m004` +
      // `,m005` +
      // `,m006` +
      // `,m007` +
      // `,m008` +
      // `,m009` +
      // `,m010` +
      // `,m011` +
      // `,m012` +
      // `,m013` +
      // `,m014` +
      // `,m015` +
      // `,m016` +
      // `,m017` +
      // `,m018` +
      // `,m019` +
      // `,m020` +
      // `,c000` +
      // `,c001` +
      // `,c002` +
      // `,c003` +
      // `,c004` +
      // `,c005` +
      // `,c006` +
      // `,c007` +
      // `,c008` +
      // `,c009` +
      // `,c010` +
      // `,c011` +
      // `,c012` +
      // `,c013` +
      // `,c014` +
      // `,c015` +
      // `,c016` +
      // `,c017` +
      // `,c018` +
      // `,c019` +
      // `,c020` +
      // `,j000` +
      // `,j001` +
      // `,j002` +
      // `,j003` +
      // `,j004` +
      // `,j005` +
      // `,j006` +
      // `,j007` +
      // `,j008` +
      // `,j009` +
      // `,j010` +
      // `,j011` +
      // `,j012` +
      // `,j013` +
      // `,j014` +
      // `,j015` +
      // `,j016` +
      // `,j017` +
      // `,j018` +
      // `,j019` +
      // `,j020` +
      // `,e000` +
      // `,e001` +
      // `,e002` +
      // `,e003` +
      // `,e004` +
      // `,e005` +
      // `,e006` +
      // `,e007` +
      // `,e008` +
      // `,e009` +
      // `,e010` +
      // `,e011` +
      // `,e012` +
      // `,e013` +
      // `,e014` +
      // `,e015` +
      // `,e016` +
      // `,e017` +
      // `,e018` +
      // `,e019` +
      // `,e020` +
      `) values (` +
      `'${object.docId}'` +
      // `,'${Base64.encode(object.s000)}'` +
      // `,'${Base64.encode(object.s001)}'` +
      // `,'${Base64.encode(object.s002)}'` +
      // `,'${Base64.encode(object.s003)}'` +
      // `,'${Base64.encode(object.s004)}'` +
      // `,'${Base64.encode(object.s005)}'` +
      // `,'${Base64.encode(object.s006)}'` +
      // `,'${Base64.encode(object.s007)}'` +
      // `,'${Base64.encode(object.s008)}'` +
      // `,'${Base64.encode(object.s009)}'` +
      // `,'${Base64.encode(object.s010)}'` +
      // `,'${Base64.encode(object.s011)}'` +
      // `,'${Base64.encode(object.s012)}'` +
      // `,'${Base64.encode(object.s013)}'` +
      // `,'${Base64.encode(object.s014)}'` +
      // `,'${Base64.encode(object.s015)}'` +
      // `,'${Base64.encode(object.s016)}'` +
      // `,'${Base64.encode(object.s017)}'` +
      // `,'${Base64.encode(object.s018)}'` +
      // `,'${Base64.encode(object.s019)}'` +
      // `,'${Base64.encode(object.s020)}'` +
      // `,'${Base64.encode(object.s021)}'` +
      // `,'${Base64.encode(object.s022)}'` +
      // `,'${Base64.encode(object.s023)}'` +
      // `,'${Base64.encode(object.s024)}'` +
      // `,'${Base64.encode(object.s025)}'` +
      // `,'${Base64.encode(object.s026)}'` +
      // `,'${Base64.encode(object.s027)}'` +
      // `,'${Base64.encode(object.s028)}'` +
      // `,'${Base64.encode(object.s029)}'` +
      // `,'${Base64.encode(object.s030)}'` +
      // `,'${Base64.encode(object.s031)}'` +
      // `,'${Base64.encode(object.s032)}'` +
      // `,'${Base64.encode(object.s033)}'` +
      // `,'${Base64.encode(object.s034)}'` +
      // `,'${Base64.encode(object.s035)}'` +
      // `,'${Base64.encode(object.s036)}'` +
      // `,'${Base64.encode(object.s037)}'` +
      // `,'${Base64.encode(object.s038)}'` +
      // `,'${Base64.encode(object.s039)}'` +
      // `,'${Base64.encode(object.s040)}'` +
      // `,'${Base64.encode(object.s041)}'` +
      // `,'${Base64.encode(object.s042)}'` +
      // `,'${Base64.encode(object.s043)}'` +
      // `,'${Base64.encode(object.s044)}'` +
      // `,'${Base64.encode(object.s045)}'` +
      // `,'${Base64.encode(object.s046)}'` +
      // `,'${Base64.encode(object.s047)}'` +
      // `,'${Base64.encode(object.s048)}'` +
      // `,'${Base64.encode(object.s049)}'` +
      // `,'${Base64.encode(object.s050)}'` +
      // `,'${Base64.encode(object.s051)}'` +
      // `,'${Base64.encode(object.s052)}'` +
      // `,'${Base64.encode(object.s053)}'` +
      // `,'${Base64.encode(object.s054)}'` +
      // `,'${Base64.encode(object.s055)}'` +
      // `,'${Base64.encode(object.s056)}'` +
      // `,'${Base64.encode(object.s057)}'` +
      // `,'${Base64.encode(object.s058)}'` +
      // `,'${Base64.encode(object.s059)}'` +
      // `,'${Base64.encode(object.s060)}'` +
      // `,'${Base64.encode(object.s061)}'` +
      // `,'${Base64.encode(object.s062)}'` +
      // `,'${Base64.encode(object.s063)}'` +
      // `,'${Base64.encode(object.s064)}'` +
      // `,'${Base64.encode(object.s065)}'` +
      // `,'${Base64.encode(object.s066)}'` +
      // `,'${Base64.encode(object.s067)}'` +
      // `,'${Base64.encode(object.s068)}'` +
      // `,'${Base64.encode(object.s069)}'` +
      // `,'${Base64.encode(object.s070)}'` +
      // `,'${Base64.encode(object.s071)}'` +
      // `,'${Base64.encode(object.s072)}'` +
      // `,'${Base64.encode(object.s073)}'` +
      // `,'${Base64.encode(object.s074)}'` +
      // `,'${Base64.encode(object.s075)}'` +
      // `,'${Base64.encode(object.s076)}'` +
      // `,'${Base64.encode(object.s077)}'` +
      // `,'${Base64.encode(object.s078)}'` +
      // `,'${Base64.encode(object.s079)}'` +
      // `,'${Base64.encode(object.s080)}'` +
      // `,'${Base64.encode(object.s081)}'` +
      // `,'${Base64.encode(object.s082)}'` +
      // `,'${Base64.encode(object.s083)}'` +
      // `,'${Base64.encode(object.s084)}'` +
      // `,'${Base64.encode(object.s085)}'` +
      // `,'${Base64.encode(object.s086)}'` +
      // `,'${Base64.encode(object.s087)}'` +
      // `,'${Base64.encode(object.s088)}'` +
      // `,'${Base64.encode(object.s089)}'` +
      // `,'${Base64.encode(object.s090)}'` +
      // `,'${Base64.encode(object.s091)}'` +
      // `,'${Base64.encode(object.s092)}'` +
      // `,'${Base64.encode(object.s093)}'` +
      // `,'${Base64.encode(object.s094)}'` +
      // `,'${Base64.encode(object.s095)}'` +
      // `,'${Base64.encode(object.s096)}'` +
      // `,'${Base64.encode(object.s097)}'` +
      // `,'${Base64.encode(object.s098)}'` +
      // `,'${Base64.encode(object.s099)}'` +
      // `, ${object.i000}` +
      // `, ${object.i001}` +
      // `, ${object.i002}` +
      // `, ${object.i003}` +
      // `, ${object.i004}` +
      // `, ${object.i005}` +
      // `, ${object.i006}` +
      // `, ${object.i007}` +
      // `, ${object.i008}` +
      // `, ${object.i009}` +
      // `, ${object.i010}` +
      // `, ${object.i011}` +
      // `, ${object.i012}` +
      // `, ${object.i013}` +
      // `, ${object.i014}` +
      // `, ${object.i015}` +
      // `, ${object.i016}` +
      // `, ${object.i017}` +
      // `, ${object.i018}` +
      // `, ${object.i019}` +
      // `, ${object.i020}` +
      // `, ${object.i021}` +
      // `, ${object.i022}` +
      // `, ${object.i023}` +
      // `, ${object.i024}` +
      // `, ${object.i025}` +
      // `, ${object.i026}` +
      // `, ${object.i027}` +
      // `, ${object.i028}` +
      // `, ${object.i029}` +
      // `, ${object.i030}` +
      // `, ${object.i031}` +
      // `, ${object.i032}` +
      // `, ${object.i033}` +
      // `, ${object.i034}` +
      // `, ${object.i035}` +
      // `, ${object.i036}` +
      // `, ${object.i037}` +
      // `, ${object.i038}` +
      // `, ${object.i039}` +
      // `, ${object.i040}` +
      // `, ${object.i041}` +
      // `, ${object.i042}` +
      // `, ${object.i043}` +
      // `, ${object.i044}` +
      // `, ${object.i045}` +
      // `, ${object.i046}` +
      // `, ${object.i047}` +
      // `, ${object.i048}` +
      // `, ${object.i049}` +
      // `, ${object.i050}` +
      // `, ${object.i051}` +
      // `, ${object.i052}` +
      // `, ${object.i053}` +
      // `, ${object.i054}` +
      // `, ${object.i055}` +
      // `, ${object.i056}` +
      // `, ${object.i057}` +
      // `, ${object.i058}` +
      // `, ${object.i059}` +
      // `, ${object.i060}` +
      // `, ${object.i061}` +
      // `, ${object.i062}` +
      // `, ${object.i063}` +
      // `, ${object.i064}` +
      // `, ${object.i065}` +
      // `, ${object.i066}` +
      // `, ${object.i067}` +
      // `, ${object.i068}` +
      // `, ${object.i069}` +
      // `, ${object.i070}` +
      // `, ${object.i071}` +
      // `, ${object.i072}` +
      // `, ${object.i073}` +
      // `, ${object.i074}` +
      // `, ${object.i075}` +
      // `, ${object.i076}` +
      // `, ${object.i077}` +
      // `, ${object.i078}` +
      // `, ${object.i079}` +
      // `, ${object.i080}` +
      // `, ${object.i081}` +
      // `, ${object.i082}` +
      // `, ${object.i083}` +
      // `, ${object.i084}` +
      // `, ${object.i085}` +
      // `, ${object.i086}` +
      // `, ${object.i087}` +
      // `, ${object.i088}` +
      // `, ${object.i089}` +
      // `, ${object.i090}` +
      // `, ${object.i091}` +
      // `, ${object.i092}` +
      // `, ${object.i093}` +
      // `, ${object.i094}` +
      // `, ${object.i095}` +
      // `, ${object.i096}` +
      // `, ${object.i097}` +
      // `, ${object.i098}` +
      // `, ${object.i099}` +
      // `, ${object.b000 ? 1 : 0}` +
      // `, ${object.b001 ? 1 : 0}` +
      // `, ${object.b002 ? 1 : 0}` +
      // `, ${object.b003 ? 1 : 0}` +
      // `, ${object.b004 ? 1 : 0}` +
      // `, ${object.b005 ? 1 : 0}` +
      // `, ${object.b006 ? 1 : 0}` +
      // `, ${object.b007 ? 1 : 0}` +
      // `, ${object.b008 ? 1 : 0}` +
      // `, ${object.b009 ? 1 : 0}` +
      // `, ${object.b010 ? 1 : 0}` +
      // `, ${object.b011 ? 1 : 0}` +
      // `, ${object.b012 ? 1 : 0}` +
      // `, ${object.b013 ? 1 : 0}` +
      // `, ${object.b014 ? 1 : 0}` +
      // `, ${object.b015 ? 1 : 0}` +
      // `, ${object.b016 ? 1 : 0}` +
      // `, ${object.b017 ? 1 : 0}` +
      // `, ${object.b018 ? 1 : 0}` +
      // `, ${object.b019 ? 1 : 0}` +
      // `, ${object.b020 ? 1 : 0}` +
      // `, ${object.b021 ? 1 : 0}` +
      // `, ${object.b022 ? 1 : 0}` +
      // `, ${object.b023 ? 1 : 0}` +
      // `, ${object.b024 ? 1 : 0}` +
      // `, ${object.b025 ? 1 : 0}` +
      // `, ${object.b026 ? 1 : 0}` +
      // `, ${object.b027 ? 1 : 0}` +
      // `, ${object.b028 ? 1 : 0}` +
      // `, ${object.b029 ? 1 : 0}` +
      // `, ${object.b030 ? 1 : 0}` +
      // `, ${object.r000}` +
      // `, ${object.r001}` +
      // `, ${object.r002}` +
      // `, ${object.r003}` +
      // `, ${object.r004}` +
      // `, ${object.r005}` +
      // `, ${object.r006}` +
      // `, ${object.r007}` +
      // `, ${object.r008}` +
      // `, ${object.r009}` +
      // `, ${object.r010}` +
      // `, ${object.r011}` +
      // `, ${object.r012}` +
      // `, ${object.r013}` +
      // `, ${object.r014}` +
      // `, ${object.r015}` +
      // `, ${object.r016}` +
      // `, ${object.r017}` +
      // `, ${object.r018}` +
      // `, ${object.r019}` +
      // `, ${object.r020}` +
      // `, ${object.r021}` +
      // `, ${object.r022}` +
      // `, ${object.r023}` +
      // `, ${object.r024}` +
      // `, ${object.r025}` +
      // `, ${object.r026}` +
      // `, ${object.r027}` +
      // `, ${object.r028}` +
      // `, ${object.r029}` +
      // `, ${object.r030}` +
      // `, ${object.t000.getTime()}` +
      // `, ${object.t001.getTime()}` +
      // `, ${object.t002.getTime()}` +
      // `, ${object.t003.getTime()}` +
      // `, ${object.t004.getTime()}` +
      // `, ${object.t005.getTime()}` +
      // `, ${object.t006.getTime()}` +
      // `, ${object.t007.getTime()}` +
      // `, ${object.t008.getTime()}` +
      // `, ${object.t009.getTime()}` +
      // `, ${object.t010.getTime()}` +
      // `, ${object.t011.getTime()}` +
      // `, ${object.t012.getTime()}` +
      // `, ${object.t013.getTime()}` +
      // `, ${object.t014.getTime()}` +
      // `, ${object.t015.getTime()}` +
      // `, ${object.t016.getTime()}` +
      // `, ${object.t017.getTime()}` +
      // `, ${object.t018.getTime()}` +
      // `, ${object.t019.getTime()}` +
      // `, ${object.t020.getTime()}` +
      // `,'${Base64.encode(JSON.stringify(object.l000))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l001))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l002))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l003))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l004))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l005))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l006))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l007))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l008))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l009))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l010))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l011))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l012))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l013))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l014))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l015))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l016))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l017))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l018))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l019))}'` +
      // `,'${Base64.encode(JSON.stringify(object.l020))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m000))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m001))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m002))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m003))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m004))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m005))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m006))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m007))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m008))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m009))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m010))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m011))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m012))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m013))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m014))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m015))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m016))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m017))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m018))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m019))}'` +
      // `,'${Base64.encode(JSON.stringify(object.m020))}'` +
      // `,'${Base64.encode(object.c000.toDataString())}'` +
      // `,'${Base64.encode(object.c001.toDataString())}'` +
      // `,'${Base64.encode(object.c002.toDataString())}'` +
      // `,'${Base64.encode(object.c003.toDataString())}'` +
      // `,'${Base64.encode(object.c004.toDataString())}'` +
      // `,'${Base64.encode(object.c005.toDataString())}'` +
      // `,'${Base64.encode(object.c006.toDataString())}'` +
      // `,'${Base64.encode(object.c007.toDataString())}'` +
      // `,'${Base64.encode(object.c008.toDataString())}'` +
      // `,'${Base64.encode(object.c009.toDataString())}'` +
      // `,'${Base64.encode(object.c010.toDataString())}'` +
      // `,'${Base64.encode(object.c011.toDataString())}'` +
      // `,'${Base64.encode(object.c012.toDataString())}'` +
      // `,'${Base64.encode(object.c013.toDataString())}'` +
      // `,'${Base64.encode(object.c014.toDataString())}'` +
      // `,'${Base64.encode(object.c015.toDataString())}'` +
      // `,'${Base64.encode(object.c016.toDataString())}'` +
      // `,'${Base64.encode(object.c017.toDataString())}'` +
      // `,'${Base64.encode(object.c018.toDataString())}'` +
      // `,'${Base64.encode(object.c019.toDataString())}'` +
      // `,'${Base64.encode(object.c020.toDataString())}'` +
      // `,'${Base64.encode(JSON.stringify(object.j000.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j001.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j002.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j003.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j004.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j005.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j006.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j007.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j008.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j009.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j010.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j011.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j012.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j013.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j014.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j015.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j016.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j017.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j018.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j019.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(JSON.stringify(object.j020.map((model: OtherModel) => model.toDataString())))}'` +
      // `,'${Base64.encode(object.e000)}'` +
      // `,'${Base64.encode(object.e001)}'` +
      // `,'${Base64.encode(object.e002)}'` +
      // `,'${Base64.encode(object.e003)}'` +
      // `,'${Base64.encode(object.e004)}'` +
      // `,'${Base64.encode(object.e005)}'` +
      // `,'${Base64.encode(object.e006)}'` +
      // `,'${Base64.encode(object.e007)}'` +
      // `,'${Base64.encode(object.e008)}'` +
      // `,'${Base64.encode(object.e009)}'` +
      // `,'${Base64.encode(object.e010)}'` +
      // `,'${Base64.encode(object.e011)}'` +
      // `,'${Base64.encode(object.e012)}'` +
      // `,'${Base64.encode(object.e013)}'` +
      // `,'${Base64.encode(object.e014)}'` +
      // `,'${Base64.encode(object.e015)}'` +
      // `,'${Base64.encode(object.e016)}'` +
      // `,'${Base64.encode(object.e017)}'` +
      // `,'${Base64.encode(object.e018)}'` +
      // `,'${Base64.encode(object.e019)}'` +
      // `,'${Base64.encode(object.e020)}'` +
      `)`;

    await NewPostgresql.sqlDb.unsafe(sql).execute();
  }

  // Update 함수 전체 필드 포함
  static async update(object: New) {
    const sql =
      `update New set ` +
      `docId = '${object.docId}'` +
      // `,s000 = '${Base64.encode(object.s000)}'` +
      // `,s001 = '${Base64.encode(object.s001)}'` +
      // `,s002 = '${Base64.encode(object.s002)}'` +
      // `,s003 = '${Base64.encode(object.s003)}'` +
      // `,s004 = '${Base64.encode(object.s004)}'` +
      // `,s005 = '${Base64.encode(object.s005)}'` +
      // `,s006 = '${Base64.encode(object.s006)}'` +
      // `,s007 = '${Base64.encode(object.s007)}'` +
      // `,s008 = '${Base64.encode(object.s008)}'` +
      // `,s009 = '${Base64.encode(object.s009)}'` +
      // `,s010 = '${Base64.encode(object.s010)}'` +
      // `,s011 = '${Base64.encode(object.s011)}'` +
      // `,s012 = '${Base64.encode(object.s012)}'` +
      // `,s013 = '${Base64.encode(object.s013)}'` +
      // `,s014 = '${Base64.encode(object.s014)}'` +
      // `,s015 = '${Base64.encode(object.s015)}'` +
      // `,s016 = '${Base64.encode(object.s016)}'` +
      // `,s017 = '${Base64.encode(object.s017)}'` +
      // `,s018 = '${Base64.encode(object.s018)}'` +
      // `,s019 = '${Base64.encode(object.s019)}'` +
      // `,s020 = '${Base64.encode(object.s020)}'` +
      // `,s021 = '${Base64.encode(object.s021)}'` +
      // `,s022 = '${Base64.encode(object.s022)}'` +
      // `,s023 = '${Base64.encode(object.s023)}'` +
      // `,s024 = '${Base64.encode(object.s024)}'` +
      // `,s025 = '${Base64.encode(object.s025)}'` +
      // `,s026 = '${Base64.encode(object.s026)}'` +
      // `,s027 = '${Base64.encode(object.s027)}'` +
      // `,s028 = '${Base64.encode(object.s028)}'` +
      // `,s029 = '${Base64.encode(object.s029)}'` +
      // `,s030 = '${Base64.encode(object.s030)}'` +
      // `,s031 = '${Base64.encode(object.s031)}'` +
      // `,s032 = '${Base64.encode(object.s032)}'` +
      // `,s033 = '${Base64.encode(object.s033)}'` +
      // `,s034 = '${Base64.encode(object.s034)}'` +
      // `,s035 = '${Base64.encode(object.s035)}'` +
      // `,s036 = '${Base64.encode(object.s036)}'` +
      // `,s037 = '${Base64.encode(object.s037)}'` +
      // `,s038 = '${Base64.encode(object.s038)}'` +
      // `,s039 = '${Base64.encode(object.s039)}'` +
      // `,s040 = '${Base64.encode(object.s040)}'` +
      // `,s041 = '${Base64.encode(object.s041)}'` +
      // `,s042 = '${Base64.encode(object.s042)}'` +
      // `,s043 = '${Base64.encode(object.s043)}'` +
      // `,s044 = '${Base64.encode(object.s044)}'` +
      // `,s045 = '${Base64.encode(object.s045)}'` +
      // `,s046 = '${Base64.encode(object.s046)}'` +
      // `,s047 = '${Base64.encode(object.s047)}'` +
      // `,s048 = '${Base64.encode(object.s048)}'` +
      // `,s049 = '${Base64.encode(object.s049)}'` +
      // `,s050 = '${Base64.encode(object.s050)}'` +
      // `,s051 = '${Base64.encode(object.s051)}'` +
      // `,s052 = '${Base64.encode(object.s052)}'` +
      // `,s053 = '${Base64.encode(object.s053)}'` +
      // `,s054 = '${Base64.encode(object.s054)}'` +
      // `,s055 = '${Base64.encode(object.s055)}'` +
      // `,s056 = '${Base64.encode(object.s056)}'` +
      // `,s057 = '${Base64.encode(object.s057)}'` +
      // `,s058 = '${Base64.encode(object.s058)}'` +
      // `,s059 = '${Base64.encode(object.s059)}'` +
      // `,s060 = '${Base64.encode(object.s060)}'` +
      // `,s061 = '${Base64.encode(object.s061)}'` +
      // `,s062 = '${Base64.encode(object.s062)}'` +
      // `,s063 = '${Base64.encode(object.s063)}'` +
      // `,s064 = '${Base64.encode(object.s064)}'` +
      // `,s065 = '${Base64.encode(object.s065)}'` +
      // `,s066 = '${Base64.encode(object.s066)}'` +
      // `,s067 = '${Base64.encode(object.s067)}'` +
      // `,s068 = '${Base64.encode(object.s068)}'` +
      // `,s069 = '${Base64.encode(object.s069)}'` +
      // `,s070 = '${Base64.encode(object.s070)}'` +
      // `,s071 = '${Base64.encode(object.s071)}'` +
      // `,s072 = '${Base64.encode(object.s072)}'` +
      // `,s073 = '${Base64.encode(object.s073)}'` +
      // `,s074 = '${Base64.encode(object.s074)}'` +
      // `,s075 = '${Base64.encode(object.s075)}'` +
      // `,s076 = '${Base64.encode(object.s076)}'` +
      // `,s077 = '${Base64.encode(object.s077)}'` +
      // `,s078 = '${Base64.encode(object.s078)}'` +
      // `,s079 = '${Base64.encode(object.s079)}'` +
      // `,s080 = '${Base64.encode(object.s080)}'` +
      // `,s081 = '${Base64.encode(object.s081)}'` +
      // `,s082 = '${Base64.encode(object.s082)}'` +
      // `,s083 = '${Base64.encode(object.s083)}'` +
      // `,s084 = '${Base64.encode(object.s084)}'` +
      // `,s085 = '${Base64.encode(object.s085)}'` +
      // `,s086 = '${Base64.encode(object.s086)}'` +
      // `,s087 = '${Base64.encode(object.s087)}'` +
      // `,s088 = '${Base64.encode(object.s088)}'` +
      // `,s089 = '${Base64.encode(object.s089)}'` +
      // `,s090 = '${Base64.encode(object.s090)}'` +
      // `,s091 = '${Base64.encode(object.s091)}'` +
      // `,s092 = '${Base64.encode(object.s092)}'` +
      // `,s093 = '${Base64.encode(object.s093)}'` +
      // `,s094 = '${Base64.encode(object.s094)}'` +
      // `,s095 = '${Base64.encode(object.s095)}'` +
      // `,s096 = '${Base64.encode(object.s096)}'` +
      // `,s097 = '${Base64.encode(object.s097)}'` +
      // `,s098 = '${Base64.encode(object.s098)}'` +
      // `,s099 = '${Base64.encode(object.s099)}'` +
      //
      // `,i000 = ${object.i000}` +
      // `,i001 = ${object.i001}` +
      // `,i002 = ${object.i002}` +
      // `,i003 = ${object.i003}` +
      // `,i004 = ${object.i004}` +
      // `,i005 = ${object.i005}` +
      // `,i006 = ${object.i006}` +
      // `,i007 = ${object.i007}` +
      // `,i008 = ${object.i008}` +
      // `,i009 = ${object.i009}` +
      // `,i010 = ${object.i010}` +
      // `,i011 = ${object.i011}` +
      // `,i012 = ${object.i012}` +
      // `,i013 = ${object.i013}` +
      // `,i014 = ${object.i014}` +
      // `,i015 = ${object.i015}` +
      // `,i016 = ${object.i016}` +
      // `,i017 = ${object.i017}` +
      // `,i018 = ${object.i018}` +
      // `,i019 = ${object.i019}` +
      // `,i020 = ${object.i020}` +
      // `,i021 = ${object.i021}` +
      // `,i022 = ${object.i022}` +
      // `,i023 = ${object.i023}` +
      // `,i024 = ${object.i024}` +
      // `,i025 = ${object.i025}` +
      // `,i026 = ${object.i026}` +
      // `,i027 = ${object.i027}` +
      // `,i028 = ${object.i028}` +
      // `,i029 = ${object.i029}` +
      // `,i030 = ${object.i030}` +
      // `,i031 = ${object.i031}` +
      // `,i032 = ${object.i032}` +
      // `,i033 = ${object.i033}` +
      // `,i034 = ${object.i034}` +
      // `,i035 = ${object.i035}` +
      // `,i036 = ${object.i036}` +
      // `,i037 = ${object.i037}` +
      // `,i038 = ${object.i038}` +
      // `,i039 = ${object.i039}` +
      // `,i040 = ${object.i040}` +
      // `,i041 = ${object.i041}` +
      // `,i042 = ${object.i042}` +
      // `,i043 = ${object.i043}` +
      // `,i044 = ${object.i044}` +
      // `,i045 = ${object.i045}` +
      // `,i046 = ${object.i046}` +
      // `,i047 = ${object.i047}` +
      // `,i048 = ${object.i048}` +
      // `,i049 = ${object.i049}` +
      // `,i050 = ${object.i050}` +
      // `,i051 = ${object.i051}` +
      // `,i052 = ${object.i052}` +
      // `,i053 = ${object.i053}` +
      // `,i054 = ${object.i054}` +
      // `,i055 = ${object.i055}` +
      // `,i056 = ${object.i056}` +
      // `,i057 = ${object.i057}` +
      // `,i058 = ${object.i058}` +
      // `,i059 = ${object.i059}` +
      // `,i060 = ${object.i060}` +
      // `,i061 = ${object.i061}` +
      // `,i062 = ${object.i062}` +
      // `,i063 = ${object.i063}` +
      // `,i064 = ${object.i064}` +
      // `,i065 = ${object.i065}` +
      // `,i066 = ${object.i066}` +
      // `,i067 = ${object.i067}` +
      // `,i068 = ${object.i068}` +
      // `,i069 = ${object.i069}` +
      // `,i070 = ${object.i070}` +
      // `,i071 = ${object.i071}` +
      // `,i072 = ${object.i072}` +
      // `,i073 = ${object.i073}` +
      // `,i074 = ${object.i074}` +
      // `,i075 = ${object.i075}` +
      // `,i076 = ${object.i076}` +
      // `,i077 = ${object.i077}` +
      // `,i078 = ${object.i078}` +
      // `,i079 = ${object.i079}` +
      // `,i080 = ${object.i080}` +
      // `,i081 = ${object.i081}` +
      // `,i082 = ${object.i082}` +
      // `,i083 = ${object.i083}` +
      // `,i084 = ${object.i084}` +
      // `,i085 = ${object.i085}` +
      // `,i086 = ${object.i086}` +
      // `,i087 = ${object.i087}` +
      // `,i088 = ${object.i088}` +
      // `,i089 = ${object.i089}` +
      // `,i090 = ${object.i090}` +
      // `,i091 = ${object.i091}` +
      // `,i092 = ${object.i092}` +
      // `,i093 = ${object.i093}` +
      // `,i094 = ${object.i094}` +
      // `,i095 = ${object.i095}` +
      // `,i096 = ${object.i096}` +
      // `,i097 = ${object.i097}` +
      // `,i098 = ${object.i098}` +
      // `,i099 = ${object.i099}` +
      //
      // `,b000 = ${object.b000 ? 1 : 0}` +
      // `,b001 = ${object.b001 ? 1 : 0}` +
      // `,b002 = ${object.b002 ? 1 : 0}` +
      // `,b003 = ${object.b003 ? 1 : 0}` +
      // `,b004 = ${object.b004 ? 1 : 0}` +
      // `,b005 = ${object.b005 ? 1 : 0}` +
      // `,b006 = ${object.b006 ? 1 : 0}` +
      // `,b007 = ${object.b007 ? 1 : 0}` +
      // `,b008 = ${object.b008 ? 1 : 0}` +
      // `,b009 = ${object.b009 ? 1 : 0}` +
      // `,b010 = ${object.b010 ? 1 : 0}` +
      // `,b011 = ${object.b011 ? 1 : 0}` +
      // `,b012 = ${object.b012 ? 1 : 0}` +
      // `,b013 = ${object.b013 ? 1 : 0}` +
      // `,b014 = ${object.b014 ? 1 : 0}` +
      // `,b015 = ${object.b015 ? 1 : 0}` +
      // `,b016 = ${object.b016 ? 1 : 0}` +
      // `,b017 = ${object.b017 ? 1 : 0}` +
      // `,b018 = ${object.b018 ? 1 : 0}` +
      // `,b019 = ${object.b019 ? 1 : 0}` +
      // `,b020 = ${object.b020 ? 1 : 0}` +
      // `,b021 = ${object.b021 ? 1 : 0}` +
      // `,b022 = ${object.b022 ? 1 : 0}` +
      // `,b023 = ${object.b023 ? 1 : 0}` +
      // `,b024 = ${object.b024 ? 1 : 0}` +
      // `,b025 = ${object.b025 ? 1 : 0}` +
      // `,b026 = ${object.b026 ? 1 : 0}` +
      // `,b027 = ${object.b027 ? 1 : 0}` +
      // `,b028 = ${object.b028 ? 1 : 0}` +
      // `,b029 = ${object.b029 ? 1 : 0}` +
      // `,b030 = ${object.b030 ? 1 : 0}` +
      //
      // `,r000 = ${object.r000}` +
      // `,r001 = ${object.r001}` +
      // `,r002 = ${object.r002}` +
      // `,r003 = ${object.r003}` +
      // `,r004 = ${object.r004}` +
      // `,r005 = ${object.r005}` +
      // `,r006 = ${object.r006}` +
      // `,r007 = ${object.r007}` +
      // `,r008 = ${object.r008}` +
      // `,r009 = ${object.r009}` +
      // `,r010 = ${object.r010}` +
      // `,r011 = ${object.r011}` +
      // `,r012 = ${object.r012}` +
      // `,r013 = ${object.r013}` +
      // `,r014 = ${object.r014}` +
      // `,r015 = ${object.r015}` +
      // `,r016 = ${object.r016}` +
      // `,r017 = ${object.r017}` +
      // `,r018 = ${object.r018}` +
      // `,r019 = ${object.r019}` +
      // `,r020 = ${object.r020}` +
      // `,r021 = ${object.r021}` +
      // `,r022 = ${object.r022}` +
      // `,r023 = ${object.r023}` +
      // `,r024 = ${object.r024}` +
      // `,r025 = ${object.r025}` +
      // `,r026 = ${object.r026}` +
      // `,r027 = ${object.r027}` +
      // `,r028 = ${object.r028}` +
      // `,r029 = ${object.r029}` +
      // `,r030 = ${object.r030}` +
      //
      // `,t000 = ${object.t000.getTime()}` +
      // `,t001 = ${object.t001.getTime()}` +
      // `,t002 = ${object.t002.getTime()}` +
      // `,t003 = ${object.t003.getTime()}` +
      // `,t004 = ${object.t004.getTime()}` +
      // `,t005 = ${object.t005.getTime()}` +
      // `,t006 = ${object.t006.getTime()}` +
      // `,t007 = ${object.t007.getTime()}` +
      // `,t008 = ${object.t008.getTime()}` +
      // `,t009 = ${object.t009.getTime()}` +
      // `,t010 = ${object.t010.getTime()}` +
      // `,t011 = ${object.t011.getTime()}` +
      // `,t012 = ${object.t012.getTime()}` +
      // `,t013 = ${object.t013.getTime()}` +
      // `,t014 = ${object.t014.getTime()}` +
      // `,t015 = ${object.t015.getTime()}` +
      // `,t016 = ${object.t016.getTime()}` +
      // `,t017 = ${object.t017.getTime()}` +
      // `,t018 = ${object.t018.getTime()}` +
      // `,t019 = ${object.t019.getTime()}` +
      // `,t020 = ${object.t020.getTime()}` +
      //
      // `,l000 = '${Base64.encode(JSON.stringify(object.l000))}'` +
      // `,l001 = '${Base64.encode(JSON.stringify(object.l001))}'` +
      // `,l002 = '${Base64.encode(JSON.stringify(object.l002))}'` +
      // `,l003 = '${Base64.encode(JSON.stringify(object.l003))}'` +
      // `,l004 = '${Base64.encode(JSON.stringify(object.l004))}'` +
      // `,l005 = '${Base64.encode(JSON.stringify(object.l005))}'` +
      // `,l006 = '${Base64.encode(JSON.stringify(object.l006))}'` +
      // `,l007 = '${Base64.encode(JSON.stringify(object.l007))}'` +
      // `,l008 = '${Base64.encode(JSON.stringify(object.l008))}'` +
      // `,l009 = '${Base64.encode(JSON.stringify(object.l009))}'` +
      // `,l010 = '${Base64.encode(JSON.stringify(object.l010))}'` +
      // `,l011 = '${Base64.encode(JSON.stringify(object.l011))}'` +
      // `,l012 = '${Base64.encode(JSON.stringify(object.l012))}'` +
      // `,l013 = '${Base64.encode(JSON.stringify(object.l013))}'` +
      // `,l014 = '${Base64.encode(JSON.stringify(object.l014))}'` +
      // `,l015 = '${Base64.encode(JSON.stringify(object.l015))}'` +
      // `,l016 = '${Base64.encode(JSON.stringify(object.l016))}'` +
      // `,l017 = '${Base64.encode(JSON.stringify(object.l017))}'` +
      // `,l018 = '${Base64.encode(JSON.stringify(object.l018))}'` +
      // `,l019 = '${Base64.encode(JSON.stringify(object.l019))}'` +
      // `,l020 = '${Base64.encode(JSON.stringify(object.l020))}'` +
      //
      // `,m000 = '${Base64.encode(JSON.stringify(object.m000))}'` +
      // `,m001 = '${Base64.encode(JSON.stringify(object.m001))}'` +
      // `,m002 = '${Base64.encode(JSON.stringify(object.m002))}'` +
      // `,m003 = '${Base64.encode(JSON.stringify(object.m003))}'` +
      // `,m004 = '${Base64.encode(JSON.stringify(object.m004))}'` +
      // `,m005 = '${Base64.encode(JSON.stringify(object.m005))}'` +
      // `,m006 = '${Base64.encode(JSON.stringify(object.m006))}'` +
      // `,m007 = '${Base64.encode(JSON.stringify(object.m007))}'` +
      // `,m008 = '${Base64.encode(JSON.stringify(object.m008))}'` +
      // `,m009 = '${Base64.encode(JSON.stringify(object.m009))}'` +
      // `,m010 = '${Base64.encode(JSON.stringify(object.m010))}'` +
      // `,m011 = '${Base64.encode(JSON.stringify(object.m011))}'` +
      // `,m012 = '${Base64.encode(JSON.stringify(object.m012))}'` +
      // `,m013 = '${Base64.encode(JSON.stringify(object.m013))}'` +
      // `,m014 = '${Base64.encode(JSON.stringify(object.m014))}'` +
      // `,m015 = '${Base64.encode(JSON.stringify(object.m015))}'` +
      // `,m016 = '${Base64.encode(JSON.stringify(object.m016))}'` +
      // `,m017 = '${Base64.encode(JSON.stringify(object.m017))}'` +
      // `,m018 = '${Base64.encode(JSON.stringify(object.m018))}'` +
      // `,m019 = '${Base64.encode(JSON.stringify(object.m019))}'` +
      // `,m020 = '${Base64.encode(JSON.stringify(object.m020))}'` +
      //
      // `,c000 = '${Base64.encode(object.c000.toDataString())}'` +
      // `,c001 = '${Base64.encode(object.c001.toDataString())}'` +
      // `,c002 = '${Base64.encode(object.c002.toDataString())}'` +
      // `,c003 = '${Base64.encode(object.c003.toDataString())}'` +
      // `,c004 = '${Base64.encode(object.c004.toDataString())}'` +
      // `,c005 = '${Base64.encode(object.c005.toDataString())}'` +
      // `,c006 = '${Base64.encode(object.c006.toDataString())}'` +
      // `,c007 = '${Base64.encode(object.c007.toDataString())}'` +
      // `,c008 = '${Base64.encode(object.c008.toDataString())}'` +
      // `,c009 = '${Base64.encode(object.c009.toDataString())}'` +
      // `,c010 = '${Base64.encode(object.c010.toDataString())}'` +
      // `,c011 = '${Base64.encode(object.c011.toDataString())}'` +
      // `,c012 = '${Base64.encode(object.c012.toDataString())}'` +
      // `,c013 = '${Base64.encode(object.c013.toDataString())}'` +
      // `,c014 = '${Base64.encode(object.c014.toDataString())}'` +
      // `,c015 = '${Base64.encode(object.c015.toDataString())}'` +
      // `,c016 = '${Base64.encode(object.c016.toDataString())}'` +
      // `,c017 = '${Base64.encode(object.c017.toDataString())}'` +
      // `,c018 = '${Base64.encode(object.c018.toDataString())}'` +
      // `,c019 = '${Base64.encode(object.c019.toDataString())}'` +
      // `,c020 = '${Base64.encode(object.c020.toDataString())}'` +
      //
      // `,j000 = '${Base64.encode(JSON.stringify(object.j000.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j001 = '${Base64.encode(JSON.stringify(object.j001.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j002 = '${Base64.encode(JSON.stringify(object.j002.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j003 = '${Base64.encode(JSON.stringify(object.j003.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j004 = '${Base64.encode(JSON.stringify(object.j004.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j005 = '${Base64.encode(JSON.stringify(object.j005.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j006 = '${Base64.encode(JSON.stringify(object.j006.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j007 = '${Base64.encode(JSON.stringify(object.j007.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j008 = '${Base64.encode(JSON.stringify(object.j008.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j009 = '${Base64.encode(JSON.stringify(object.j009.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j010 = '${Base64.encode(JSON.stringify(object.j010.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j011 = '${Base64.encode(JSON.stringify(object.j011.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j012 = '${Base64.encode(JSON.stringify(object.j012.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j013 = '${Base64.encode(JSON.stringify(object.j013.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j014 = '${Base64.encode(JSON.stringify(object.j014.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j015 = '${Base64.encode(JSON.stringify(object.j015.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j016 = '${Base64.encode(JSON.stringify(object.j016.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j017 = '${Base64.encode(JSON.stringify(object.j017.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j018 = '${Base64.encode(JSON.stringify(object.j018.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j019 = '${Base64.encode(JSON.stringify(object.j019.map((model: OtherModel) => model.toDataString())))}'` +
      // `,j020 = '${Base64.encode(JSON.stringify(object.j020.map((model: OtherModel) => model.toDataString())))}'` +
      //
      // `,e000 = '${Base64.encode(object.e000)}'` +
      // `,e001 = '${Base64.encode(object.e001)}'` +
      // `,e002 = '${Base64.encode(object.e002)}'` +
      // `,e003 = '${Base64.encode(object.e003)}'` +
      // `,e004 = '${Base64.encode(object.e004)}'` +
      // `,e005 = '${Base64.encode(object.e005)}'` +
      // `,e006 = '${Base64.encode(object.e006)}'` +
      // `,e007 = '${Base64.encode(object.e007)}'` +
      // `,e008 = '${Base64.encode(object.e008)}'` +
      // `,e009 = '${Base64.encode(object.e009)}'` +
      // `,e010 = '${Base64.encode(object.e010)}'` +
      // `,e011 = '${Base64.encode(object.e011)}'` +
      // `,e012 = '${Base64.encode(object.e012)}'` +
      // `,e013 = '${Base64.encode(object.e013)}'` +
      // `,e014 = '${Base64.encode(object.e014)}'` +
      // `,e015 = '${Base64.encode(object.e015)}'` +
      // `,e016 = '${Base64.encode(object.e016)}'` +
      // `,e017 = '${Base64.encode(object.e017)}'` +
      // `,e018 = '${Base64.encode(object.e018)}'` +
      // `,e019 = '${Base64.encode(object.e019)}'` +
      // `,e020 = '${Base64.encode(object.e020)}'` +
      ` where docId = '${object.docId}'`;

    await NewPostgresql.sqlDb.unsafe(sql).execute();
  }

  static async upsert(object: New) {
    if ((await this.get(object.docId)) == null) {
      await this.insert(object);
    } else {
      await this.update(object);
    }
  }

  static async delete(docId: string) {
    const sql = `delete from New where docId = '${docId}'`;
    await NewPostgresql.sqlDb.unsafe(sql).execute();
  }

  static async get(docId: string): Promise<New | null> {
    const sql = `select * from New where DocId = '${docId}'`;

    // console.log('sql: ', sql)

    let xs = await NewPostgresql.sqlDb.unsafe(sql).execute();

    if (xs.length == 0) {
      return null;
    }
    // console.log('xs[0][docid]: ', xs[0]['DocId'.toLowerCase()])
    return NewPostgresql.fromMap(xs[0]);
  }

  static async getAll(): Promise<New[]> {
    const sql = `select * from New`;

    let xs = await NewPostgresql.sqlDb.unsafe(sql).execute();

    const result: New[] = [];

    for (let i = 0; i < xs.length; i++) {
      result.push(NewPostgresql.fromMap(xs[i]));
    }

    console.log("result: ", xs.length);

    return result;
  }

  static async getByI000(value: number): Promise<New | null> {
    const sql = `select * from New where i000 = ${value}`;
    let xs = await NewPostgresql.sqlDb.unsafe(sql).execute();
    console.log(xs.length);
    if (xs.length == 0) {
      return null;
    }
    // console.log('xs[0][docid]: ', xs[0]['DocId'.toLowerCase()])
    return NewPostgresql.fromMap(xs[0]);
  }

  static async resetTable() {
    const sql = `drop table New`;

    await NewPostgresql.sqlDb.unsafe(sql).execute();

    new NewPostgresql();

    return;
  }

  static fromMap(queryParams: any): New {
    const object = new New();

    if (queryParams.docId != null) object.docId = queryParams.docId;

    // object.s000 = Base64.decode(queryParams["s000"] || "");
    // object.s001 = Base64.decode(queryParams["s001"] || "");
    // object.s002 = Base64.decode(queryParams["s002"] || "");
    // object.s003 = Base64.decode(queryParams["s003"] || "");
    // object.s004 = Base64.decode(queryParams["s004"] || "");
    // object.s005 = Base64.decode(queryParams["s005"] || "");
    // object.s006 = Base64.decode(queryParams["s006"] || "");
    // object.s007 = Base64.decode(queryParams["s007"] || "");
    // object.s008 = Base64.decode(queryParams["s008"] || "");
    // object.s009 = Base64.decode(queryParams["s009"] || "");
    // object.s010 = Base64.decode(queryParams["s010"] || "");
    // object.s011 = Base64.decode(queryParams["s011"] || "");
    // object.s012 = Base64.decode(queryParams["s012"] || "");
    // object.s013 = Base64.decode(queryParams["s013"] || "");
    // object.s014 = Base64.decode(queryParams["s014"] || "");
    // object.s015 = Base64.decode(queryParams["s015"] || "");
    // object.s016 = Base64.decode(queryParams["s016"] || "");
    // object.s017 = Base64.decode(queryParams["s017"] || "");
    // object.s018 = Base64.decode(queryParams["s018"] || "");
    // object.s019 = Base64.decode(queryParams["s019"] || "");
    // object.s020 = Base64.decode(queryParams["s020"] || "");
    // object.s021 = Base64.decode(queryParams["s021"] || "");
    // object.s022 = Base64.decode(queryParams["s022"] || "");
    // object.s023 = Base64.decode(queryParams["s023"] || "");
    // object.s024 = Base64.decode(queryParams["s024"] || "");
    // object.s025 = Base64.decode(queryParams["s025"] || "");
    // object.s026 = Base64.decode(queryParams["s026"] || "");
    // object.s027 = Base64.decode(queryParams["s027"] || "");
    // object.s028 = Base64.decode(queryParams["s028"] || "");
    // object.s029 = Base64.decode(queryParams["s029"] || "");
    // object.s030 = Base64.decode(queryParams["s030"] || "");
    // object.s031 = Base64.decode(queryParams["s031"] || "");
    // object.s032 = Base64.decode(queryParams["s032"] || "");
    // object.s033 = Base64.decode(queryParams["s033"] || "");
    // object.s034 = Base64.decode(queryParams["s034"] || "");
    // object.s035 = Base64.decode(queryParams["s035"] || "");
    // object.s036 = Base64.decode(queryParams["s036"] || "");
    // object.s037 = Base64.decode(queryParams["s037"] || "");
    // object.s038 = Base64.decode(queryParams["s038"] || "");
    // object.s039 = Base64.decode(queryParams["s039"] || "");
    // object.s040 = Base64.decode(queryParams["s040"] || "");
    // object.s041 = Base64.decode(queryParams["s041"] || "");
    // object.s042 = Base64.decode(queryParams["s042"] || "");
    // object.s043 = Base64.decode(queryParams["s043"] || "");
    // object.s044 = Base64.decode(queryParams["s044"] || "");
    // object.s045 = Base64.decode(queryParams["s045"] || "");
    // object.s046 = Base64.decode(queryParams["s046"] || "");
    // object.s047 = Base64.decode(queryParams["s047"] || "");
    // object.s048 = Base64.decode(queryParams["s048"] || "");
    // object.s049 = Base64.decode(queryParams["s049"] || "");
    // object.s050 = Base64.decode(queryParams["s050"] || "");
    // object.s051 = Base64.decode(queryParams["s051"] || "");
    // object.s052 = Base64.decode(queryParams["s052"] || "");
    // object.s053 = Base64.decode(queryParams["s053"] || "");
    // object.s054 = Base64.decode(queryParams["s054"] || "");
    // object.s055 = Base64.decode(queryParams["s055"] || "");
    // object.s056 = Base64.decode(queryParams["s056"] || "");
    // object.s057 = Base64.decode(queryParams["s057"] || "");
    // object.s058 = Base64.decode(queryParams["s058"] || "");
    // object.s059 = Base64.decode(queryParams["s059"] || "");
    // object.s060 = Base64.decode(queryParams["s060"] || "");
    // object.s061 = Base64.decode(queryParams["s061"] || "");
    // object.s062 = Base64.decode(queryParams["s062"] || "");
    // object.s063 = Base64.decode(queryParams["s063"] || "");
    // object.s064 = Base64.decode(queryParams["s064"] || "");
    // object.s065 = Base64.decode(queryParams["s065"] || "");
    // object.s066 = Base64.decode(queryParams["s066"] || "");
    // object.s067 = Base64.decode(queryParams["s067"] || "");
    // object.s068 = Base64.decode(queryParams["s068"] || "");
    // object.s069 = Base64.decode(queryParams["s069"] || "");
    // object.s070 = Base64.decode(queryParams["s070"] || "");
    // object.s071 = Base64.decode(queryParams["s071"] || "");
    // object.s072 = Base64.decode(queryParams["s072"] || "");
    // object.s073 = Base64.decode(queryParams["s073"] || "");
    // object.s074 = Base64.decode(queryParams["s074"] || "");
    // object.s075 = Base64.decode(queryParams["s075"] || "");
    // object.s076 = Base64.decode(queryParams["s076"] || "");
    // object.s077 = Base64.decode(queryParams["s077"] || "");
    // object.s078 = Base64.decode(queryParams["s078"] || "");
    // object.s079 = Base64.decode(queryParams["s079"] || "");
    // object.s080 = Base64.decode(queryParams["s080"] || "");
    // object.s081 = Base64.decode(queryParams["s081"] || "");
    // object.s082 = Base64.decode(queryParams["s082"] || "");
    // object.s083 = Base64.decode(queryParams["s083"] || "");
    // object.s084 = Base64.decode(queryParams["s084"] || "");
    // object.s085 = Base64.decode(queryParams["s085"] || "");
    // object.s086 = Base64.decode(queryParams["s086"] || "");
    // object.s087 = Base64.decode(queryParams["s087"] || "");
    // object.s088 = Base64.decode(queryParams["s088"] || "");
    // object.s089 = Base64.decode(queryParams["s089"] || "");
    // object.s090 = Base64.decode(queryParams["s090"] || "");
    // object.s091 = Base64.decode(queryParams["s091"] || "");
    // object.s092 = Base64.decode(queryParams["s092"] || "");
    // object.s093 = Base64.decode(queryParams["s093"] || "");
    // object.s094 = Base64.decode(queryParams["s094"] || "");
    // object.s095 = Base64.decode(queryParams["s095"] || "");
    // object.s096 = Base64.decode(queryParams["s096"] || "");
    // object.s097 = Base64.decode(queryParams["s097"] || "");
    // object.s098 = Base64.decode(queryParams["s098"] || "");
    // object.s099 = Base64.decode(queryParams["s099"] || "");
    // object.i000 = Number(queryParams.i000 || 0);
    // object.i001 = Number(queryParams.i001 || 0);
    // object.i002 = Number(queryParams.i002 || 0);
    // object.i003 = Number(queryParams.i003 || 0);
    // object.i004 = Number(queryParams.i004 || 0);
    // object.i005 = Number(queryParams.i005 || 0);
    // object.i006 = Number(queryParams.i006 || 0);
    // object.i007 = Number(queryParams.i007 || 0);
    // object.i008 = Number(queryParams.i008 || 0);
    // object.i009 = Number(queryParams.i009 || 0);
    // object.i010 = Number(queryParams.i010 || 0);
    // object.i011 = Number(queryParams.i011 || 0);
    // object.i012 = Number(queryParams.i012 || 0);
    // object.i013 = Number(queryParams.i013 || 0);
    // object.i014 = Number(queryParams.i014 || 0);
    // object.i015 = Number(queryParams.i015 || 0);
    // object.i016 = Number(queryParams.i016 || 0);
    // object.i017 = Number(queryParams.i017 || 0);
    // object.i018 = Number(queryParams.i018 || 0);
    // object.i019 = Number(queryParams.i019 || 0);
    // object.i020 = Number(queryParams.i020 || 0);
    // object.i021 = Number(queryParams.i021 || 0);
    // object.i022 = Number(queryParams.i022 || 0);
    // object.i023 = Number(queryParams.i023 || 0);
    // object.i024 = Number(queryParams.i024 || 0);
    // object.i025 = Number(queryParams.i025 || 0);
    // object.i026 = Number(queryParams.i026 || 0);
    // object.i027 = Number(queryParams.i027 || 0);
    // object.i028 = Number(queryParams.i028 || 0);
    // object.i029 = Number(queryParams.i029 || 0);
    // object.i030 = Number(queryParams.i030 || 0);
    // object.i031 = Number(queryParams.i031 || 0);
    // object.i032 = Number(queryParams.i032 || 0);
    // object.i033 = Number(queryParams.i033 || 0);
    // object.i034 = Number(queryParams.i034 || 0);
    // object.i035 = Number(queryParams.i035 || 0);
    // object.i036 = Number(queryParams.i036 || 0);
    // object.i037 = Number(queryParams.i037 || 0);
    // object.i038 = Number(queryParams.i038 || 0);
    // object.i039 = Number(queryParams.i039 || 0);
    // object.i040 = Number(queryParams.i040 || 0);
    // object.i041 = Number(queryParams.i041 || 0);
    // object.i042 = Number(queryParams.i042 || 0);
    // object.i043 = Number(queryParams.i043 || 0);
    // object.i044 = Number(queryParams.i044 || 0);
    // object.i045 = Number(queryParams.i045 || 0);
    // object.i046 = Number(queryParams.i046 || 0);
    // object.i047 = Number(queryParams.i047 || 0);
    // object.i048 = Number(queryParams.i048 || 0);
    // object.i049 = Number(queryParams.i049 || 0);
    // object.i050 = Number(queryParams.i050 || 0);
    // object.i051 = Number(queryParams.i051 || 0);
    // object.i052 = Number(queryParams.i052 || 0);
    // object.i053 = Number(queryParams.i053 || 0);
    // object.i054 = Number(queryParams.i054 || 0);
    // object.i055 = Number(queryParams.i055 || 0);
    // object.i056 = Number(queryParams.i056 || 0);
    // object.i057 = Number(queryParams.i057 || 0);
    // object.i058 = Number(queryParams.i058 || 0);
    // object.i059 = Number(queryParams.i059 || 0);
    // object.i060 = Number(queryParams.i060 || 0);
    // object.i061 = Number(queryParams.i061 || 0);
    // object.i062 = Number(queryParams.i062 || 0);
    // object.i063 = Number(queryParams.i063 || 0);
    // object.i064 = Number(queryParams.i064 || 0);
    // object.i065 = Number(queryParams.i065 || 0);
    // object.i066 = Number(queryParams.i066 || 0);
    // object.i067 = Number(queryParams.i067 || 0);
    // object.i068 = Number(queryParams.i068 || 0);
    // object.i069 = Number(queryParams.i069 || 0);
    // object.i070 = Number(queryParams.i070 || 0);
    // object.i071 = Number(queryParams.i071 || 0);
    // object.i072 = Number(queryParams.i072 || 0);
    // object.i073 = Number(queryParams.i073 || 0);
    // object.i074 = Number(queryParams.i074 || 0);
    // object.i075 = Number(queryParams.i075 || 0);
    // object.i076 = Number(queryParams.i076 || 0);
    // object.i077 = Number(queryParams.i077 || 0);
    // object.i078 = Number(queryParams.i078 || 0);
    // object.i079 = Number(queryParams.i079 || 0);
    // object.i080 = Number(queryParams.i080 || 0);
    // object.i081 = Number(queryParams.i081 || 0);
    // object.i082 = Number(queryParams.i082 || 0);
    // object.i083 = Number(queryParams.i083 || 0);
    // object.i084 = Number(queryParams.i084 || 0);
    // object.i085 = Number(queryParams.i085 || 0);
    // object.i086 = Number(queryParams.i086 || 0);
    // object.i087 = Number(queryParams.i087 || 0);
    // object.i088 = Number(queryParams.i088 || 0);
    // object.i089 = Number(queryParams.i089 || 0);
    // object.i090 = Number(queryParams.i090 || 0);
    // object.i091 = Number(queryParams.i091 || 0);
    // object.i092 = Number(queryParams.i092 || 0);
    // object.i093 = Number(queryParams.i093 || 0);
    // object.i094 = Number(queryParams.i094 || 0);
    // object.i095 = Number(queryParams.i095 || 0);
    // object.i096 = Number(queryParams.i096 || 0);
    // object.i097 = Number(queryParams.i097 || 0);
    // object.i098 = Number(queryParams.i098 || 0);
    // object.i099 = Number(queryParams.i099 || 0);
    // object.b000 = queryParams.b000 === 1;
    // object.b001 = queryParams.b001 === 1;
    // object.b002 = queryParams.b002 === 1;
    // object.b003 = queryParams.b003 === 1;
    // object.b004 = queryParams.b004 === 1;
    // object.b005 = queryParams.b005 === 1;
    // object.b006 = queryParams.b006 === 1;
    // object.b007 = queryParams.b007 === 1;
    // object.b008 = queryParams.b008 === 1;
    // object.b009 = queryParams.b009 === 1;
    // object.b010 = queryParams.b010 === 1;
    // object.b011 = queryParams.b011 === 1;
    // object.b012 = queryParams.b012 === 1;
    // object.b013 = queryParams.b013 === 1;
    // object.b014 = queryParams.b014 === 1;
    // object.b015 = queryParams.b015 === 1;
    // object.b016 = queryParams.b016 === 1;
    // object.b017 = queryParams.b017 === 1;
    // object.b018 = queryParams.b018 === 1;
    // object.b019 = queryParams.b019 === 1;
    // object.b020 = queryParams.b020 === 1;
    // object.b021 = queryParams.b021 === 1;
    // object.b022 = queryParams.b022 === 1;
    // object.b023 = queryParams.b023 === 1;
    // object.b024 = queryParams.b024 === 1;
    // object.b025 = queryParams.b025 === 1;
    // object.b026 = queryParams.b026 === 1;
    // object.b027 = queryParams.b027 === 1;
    // object.b028 = queryParams.b028 === 1;
    // object.b029 = queryParams.b029 === 1;
    // object.b030 = queryParams.b030 === 1;
    // object.r000 = queryParams.r000 || 0.0;
    // object.r001 = queryParams.r001 || 0.0;
    // object.r002 = queryParams.r002 || 0.0;
    // object.r003 = queryParams.r003 || 0.0;
    // object.r004 = queryParams.r004 || 0.0;
    // object.r005 = queryParams.r005 || 0.0;
    // object.r006 = queryParams.r006 || 0.0;
    // object.r007 = queryParams.r007 || 0.0;
    // object.r008 = queryParams.r008 || 0.0;
    // object.r009 = queryParams.r009 || 0.0;
    // object.r010 = queryParams.r010 || 0.0;
    // object.r011 = queryParams.r011 || 0.0;
    // object.r012 = queryParams.r012 || 0.0;
    // object.r013 = queryParams.r013 || 0.0;
    // object.r014 = queryParams.r014 || 0.0;
    // object.r015 = queryParams.r015 || 0.0;
    // object.r016 = queryParams.r016 || 0.0;
    // object.r017 = queryParams.r017 || 0.0;
    // object.r018 = queryParams.r018 || 0.0;
    // object.r019 = queryParams.r019 || 0.0;
    // object.r020 = queryParams.r020 || 0.0;
    // object.r021 = queryParams.r021 || 0.0;
    // object.r022 = queryParams.r022 || 0.0;
    // object.r023 = queryParams.r023 || 0.0;
    // object.r024 = queryParams.r024 || 0.0;
    // object.r025 = queryParams.r025 || 0.0;
    // object.r026 = queryParams.r026 || 0.0;
    // object.r027 = queryParams.r027 || 0.0;
    // object.r028 = queryParams.r028 || 0.0;
    // object.r029 = queryParams.r029 || 0.0;
    // object.r030 = queryParams.r030 || 0.0;
    // object.t000 = new Date(queryParams.t000 || 0);
    // object.t001 = new Date(queryParams.t001 || 0);
    // object.t002 = new Date(queryParams.t002 || 0);
    // object.t003 = new Date(queryParams.t003 || 0);
    // object.t004 = new Date(queryParams.t004 || 0);
    // object.t005 = new Date(queryParams.t005 || 0);
    // object.t006 = new Date(queryParams.t006 || 0);
    // object.t007 = new Date(queryParams.t007 || 0);
    // object.t008 = new Date(queryParams.t008 || 0);
    // object.t009 = new Date(queryParams.t009 || 0);
    // object.t010 = new Date(queryParams.t010 || 0);
    // object.t011 = new Date(queryParams.t011 || 0);
    // object.t012 = new Date(queryParams.t012 || 0);
    // object.t013 = new Date(queryParams.t013 || 0);
    // object.t014 = new Date(queryParams.t014 || 0);
    // object.t015 = new Date(queryParams.t015 || 0);
    // object.t016 = new Date(queryParams.t016 || 0);
    // object.t017 = new Date(queryParams.t017 || 0);
    // object.t018 = new Date(queryParams.t018 || 0);
    // object.t019 = new Date(queryParams.t019 || 0);
    // object.t020 = new Date(queryParams.t020 || 0);
    // object.l000 = JSON.parse(queryParams.l000 ? Base64.decode(queryParams.l000) : '[]');
    // object.l001 = JSON.parse(queryParams.l001 ? Base64.decode(queryParams.l001) : '[]');
    // object.l002 = JSON.parse(queryParams.l002 ? Base64.decode(queryParams.l002) : '[]');
    // object.l003 = JSON.parse(queryParams.l003 ? Base64.decode(queryParams.l003) : '[]');
    // object.l004 = JSON.parse(queryParams.l004 ? Base64.decode(queryParams.l004) : '[]');
    // object.l005 = JSON.parse(queryParams.l005 ? Base64.decode(queryParams.l005) : '[]');
    // object.l006 = JSON.parse(queryParams.l006 ? Base64.decode(queryParams.l006) : '[]');
    // object.l007 = JSON.parse(queryParams.l007 ? Base64.decode(queryParams.l007) : '[]');
    // object.l008 = JSON.parse(queryParams.l008 ? Base64.decode(queryParams.l008) : '[]');
    // object.l009 = JSON.parse(queryParams.l009 ? Base64.decode(queryParams.l009) : '[]');
    // object.l010 = JSON.parse(queryParams.l010 ? Base64.decode(queryParams.l010) : '[]');
    // object.l011 = JSON.parse(queryParams.l011 ? Base64.decode(queryParams.l011) : '[]');
    // object.l012 = JSON.parse(queryParams.l012 ? Base64.decode(queryParams.l012) : '[]');
    // object.l013 = JSON.parse(queryParams.l013 ? Base64.decode(queryParams.l013) : '[]');
    // object.l014 = JSON.parse(queryParams.l014 ? Base64.decode(queryParams.l014) : '[]');
    // object.l015 = JSON.parse(queryParams.l015 ? Base64.decode(queryParams.l015) : '[]');
    // object.l016 = JSON.parse(queryParams.l016 ? Base64.decode(queryParams.l016) : '[]');
    // object.l017 = JSON.parse(queryParams.l017 ? Base64.decode(queryParams.l017) : '[]');
    // object.l018 = JSON.parse(queryParams.l018 ? Base64.decode(queryParams.l018) : '[]');
    // object.l019 = JSON.parse(queryParams.l019 ? Base64.decode(queryParams.l019) : '[]');
    // object.l020 = JSON.parse(queryParams.l020 ? Base64.decode(queryParams.l020) : '[]');
    //
    // object.m000 = JSON.parse(queryParams.m000 ? Base64.decode(queryParams.m000) : '{}');
    // object.m001 = JSON.parse(queryParams.m001 ? Base64.decode(queryParams.m001) : '{}');
    // object.m002 = JSON.parse(queryParams.m002 ? Base64.decode(queryParams.m002) : '{}');
    // object.m003 = JSON.parse(queryParams.m003 ? Base64.decode(queryParams.m003) : '{}');
    // object.m004 = JSON.parse(queryParams.m004 ? Base64.decode(queryParams.m004) : '{}');
    // object.m005 = JSON.parse(queryParams.m005 ? Base64.decode(queryParams.m005) : '{}');
    // object.m006 = JSON.parse(queryParams.m006 ? Base64.decode(queryParams.m006) : '{}');
    // object.m007 = JSON.parse(queryParams.m007 ? Base64.decode(queryParams.m007) : '{}');
    // object.m008 = JSON.parse(queryParams.m008 ? Base64.decode(queryParams.m008) : '{}');
    // object.m009 = JSON.parse(queryParams.m009 ? Base64.decode(queryParams.m009) : '{}');
    // object.m010 = JSON.parse(queryParams.m010 ? Base64.decode(queryParams.m010) : '{}');
    // object.m011 = JSON.parse(queryParams.m011 ? Base64.decode(queryParams.m011) : '{}');
    // object.m012 = JSON.parse(queryParams.m012 ? Base64.decode(queryParams.m012) : '{}');
    // object.m013 = JSON.parse(queryParams.m013 ? Base64.decode(queryParams.m013) : '{}');
    // object.m014 = JSON.parse(queryParams.m014 ? Base64.decode(queryParams.m014) : '{}');
    // object.m015 = JSON.parse(queryParams.m015 ? Base64.decode(queryParams.m015) : '{}');
    // object.m016 = JSON.parse(queryParams.m016 ? Base64.decode(queryParams.m016) : '{}');
    // object.m017 = JSON.parse(queryParams.m017 ? Base64.decode(queryParams.m017) : '{}');
    // object.m018 = JSON.parse(queryParams.m018 ? Base64.decode(queryParams.m018) : '{}');
    // object.m019 = JSON.parse(queryParams.m019 ? Base64.decode(queryParams.m019) : '{}');
    // object.m020 = JSON.parse(queryParams.m020 ? Base64.decode(queryParams.m020) : '{}');
    // object.c000 = OtherModel.fromDataString(Base64.decode(queryParams.c000) || new OtherModel().toDataString());
    // object.c001 = OtherModel.fromDataString(Base64.decode(queryParams.c001) || new OtherModel().toDataString());
    // object.c002 = OtherModel.fromDataString(Base64.decode(queryParams.c002) || new OtherModel().toDataString());
    // object.c003 = OtherModel.fromDataString(Base64.decode(queryParams.c003) || new OtherModel().toDataString());
    // object.c004 = OtherModel.fromDataString(Base64.decode(queryParams.c004) || new OtherModel().toDataString());
    // object.c005 = OtherModel.fromDataString(Base64.decode(queryParams.c005) || new OtherModel().toDataString());
    // object.c006 = OtherModel.fromDataString(Base64.decode(queryParams.c006) || new OtherModel().toDataString());
    // object.c007 = OtherModel.fromDataString(Base64.decode(queryParams.c007) || new OtherModel().toDataString());
    // object.c008 = OtherModel.fromDataString(Base64.decode(queryParams.c008) || new OtherModel().toDataString());
    // object.c009 = OtherModel.fromDataString(Base64.decode(queryParams.c009) || new OtherModel().toDataString());
    // object.c010 = OtherModel.fromDataString(Base64.decode(queryParams.c010) || new OtherModel().toDataString());
    // object.c011 = OtherModel.fromDataString(Base64.decode(queryParams.c011) || new OtherModel().toDataString());
    // object.c012 = OtherModel.fromDataString(Base64.decode(queryParams.c012) || new OtherModel().toDataString());
    // object.c013 = OtherModel.fromDataString(Base64.decode(queryParams.c013) || new OtherModel().toDataString());
    // object.c014 = OtherModel.fromDataString(Base64.decode(queryParams.c014) || new OtherModel().toDataString());
    // object.c015 = OtherModel.fromDataString(Base64.decode(queryParams.c015) || new OtherModel().toDataString());
    // object.c016 = OtherModel.fromDataString(Base64.decode(queryParams.c016) || new OtherModel().toDataString());
    // object.c017 = OtherModel.fromDataString(Base64.decode(queryParams.c017) || new OtherModel().toDataString());
    // object.c018 = OtherModel.fromDataString(Base64.decode(queryParams.c018) || new OtherModel().toDataString());
    // object.c019 = OtherModel.fromDataString(Base64.decode(queryParams.c019) || new OtherModel().toDataString());
    // object.c020 = OtherModel.fromDataString(Base64.decode(queryParams.c020) || new OtherModel().toDataString());
    //
    // object.j000 = (JSON.parse(queryParams.j000 ? Base64.decode(queryParams.j000) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j001 = (JSON.parse(queryParams.j001 ? Base64.decode(queryParams.j001) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j002 = (JSON.parse(queryParams.j002 ? Base64.decode(queryParams.j002) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j003 = (JSON.parse(queryParams.j003 ? Base64.decode(queryParams.j003) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j004 = (JSON.parse(queryParams.j004 ? Base64.decode(queryParams.j004) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j005 = (JSON.parse(queryParams.j005 ? Base64.decode(queryParams.j005) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j006 = (JSON.parse(queryParams.j006 ? Base64.decode(queryParams.j006) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j007 = (JSON.parse(queryParams.j007 ? Base64.decode(queryParams.j007) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j008 = (JSON.parse(queryParams.j008 ? Base64.decode(queryParams.j008) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j009 = (JSON.parse(queryParams.j009 ? Base64.decode(queryParams.j009) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j010 = (JSON.parse(queryParams.j010 ? Base64.decode(queryParams.j010) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j011 = (JSON.parse(queryParams.j011 ? Base64.decode(queryParams.j011) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j012 = (JSON.parse(queryParams.j012 ? Base64.decode(queryParams.j012) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j013 = (JSON.parse(queryParams.j013 ? Base64.decode(queryParams.j013) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j014 = (JSON.parse(queryParams.j014 ? Base64.decode(queryParams.j014) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j015 = (JSON.parse(queryParams.j015 ? Base64.decode(queryParams.j015) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j016 = (JSON.parse(queryParams.j016 ? Base64.decode(queryParams.j016) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j017 = (JSON.parse(queryParams.j017 ? Base64.decode(queryParams.j017) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j018 = (JSON.parse(queryParams.j018 ? Base64.decode(queryParams.j018) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j019 = (JSON.parse(queryParams.j019 ? Base64.decode(queryParams.j019) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.j020 = (JSON.parse(queryParams.j020 ? Base64.decode(queryParams.j020) : '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    //
    // object.e000 = SomeEnumHelper.fromString(queryParams.e000 ? Base64.decode(queryParams.e000) : SomeEnum.notSelected);
    // object.e001 = SomeEnumHelper.fromString(queryParams.e001 ? Base64.decode(queryParams.e001) : SomeEnum.notSelected);
    // object.e002 = SomeEnumHelper.fromString(queryParams.e002 ? Base64.decode(queryParams.e002) : SomeEnum.notSelected);
    // object.e003 = SomeEnumHelper.fromString(queryParams.e003 ? Base64.decode(queryParams.e003) : SomeEnum.notSelected);
    // object.e004 = SomeEnumHelper.fromString(queryParams.e004 ? Base64.decode(queryParams.e004) : SomeEnum.notSelected);
    // object.e005 = SomeEnumHelper.fromString(queryParams.e005 ? Base64.decode(queryParams.e005) : SomeEnum.notSelected);
    // object.e006 = SomeEnumHelper.fromString(queryParams.e006 ? Base64.decode(queryParams.e006) : SomeEnum.notSelected);
    // object.e007 = SomeEnumHelper.fromString(queryParams.e007 ? Base64.decode(queryParams.e007) : SomeEnum.notSelected);
    // object.e008 = SomeEnumHelper.fromString(queryParams.e008 ? Base64.decode(queryParams.e008) : SomeEnum.notSelected);
    // object.e009 = SomeEnumHelper.fromString(queryParams.e009 ? Base64.decode(queryParams.e009) : SomeEnum.notSelected);
    // object.e010 = SomeEnumHelper.fromString(queryParams.e010 ? Base64.decode(queryParams.e010) : SomeEnum.notSelected);
    // object.e011 = SomeEnumHelper.fromString(queryParams.e011 ? Base64.decode(queryParams.e011) : SomeEnum.notSelected);
    // object.e012 = SomeEnumHelper.fromString(queryParams.e012 ? Base64.decode(queryParams.e012) : SomeEnum.notSelected);
    // object.e013 = SomeEnumHelper.fromString(queryParams.e013 ? Base64.decode(queryParams.e013) : SomeEnum.notSelected);
    // object.e014 = SomeEnumHelper.fromString(queryParams.e014 ? Base64.decode(queryParams.e014) : SomeEnum.notSelected);
    // object.e015 = SomeEnumHelper.fromString(queryParams.e015 ? Base64.decode(queryParams.e015) : SomeEnum.notSelected);
    // object.e016 = SomeEnumHelper.fromString(queryParams.e016 ? Base64.decode(queryParams.e016) : SomeEnum.notSelected);
    // object.e017 = SomeEnumHelper.fromString(queryParams.e017 ? Base64.decode(queryParams.e017) : SomeEnum.notSelected);
    // object.e018 = SomeEnumHelper.fromString(queryParams.e018 ? Base64.decode(queryParams.e018) : SomeEnum.notSelected);
    // object.e019 = SomeEnumHelper.fromString(queryParams.e019 ? Base64.decode(queryParams.e019) : SomeEnum.notSelected);
    // object.e020 = SomeEnumHelper.fromString(queryParams.e020 ? Base64.decode(queryParams.e020) : SomeEnum.notSelected);

    object.docId = queryParams.docId;

    return object;
  }
}

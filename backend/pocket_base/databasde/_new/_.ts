import {LegoUtil} from "../../../../util";
import * as fs from "fs";


import dotenv from "dotenv";
import path from "path";
import FormData from "form-data";
import axios, {AxiosResponse} from "axios";

const PocketBase = require('pocketbase').default;
// PocketBase 클라이언트 초기화
const pb = new PocketBase('https://june.pockethost.io/'); // PocketBase 서버 주소 설정

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
    fileName: string = "";

    docId: string = "";

    toDataString(): string {
        return btoa(Array.from(new TextEncoder().encode(new URLSearchParams({
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
            fileName: this.fileName,
            docId: this.docId,
        }).toString())).map(byte => String.fromCharCode(byte)).join(""));
    }

    static fromDataString(dataString: string): New {
        const queryParams = Object.fromEntries(new URLSearchParams(atob(dataString)));

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
        object.fileName = queryParams["fileName"] || "";
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
            fileName: this.fileName,
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
        object.fileName = queryParams.fileName || '';
        object.docId = queryParams.docId;

        return object;
    }
}

export class NewPocketBaseCollection {


    static _ready = false;

    static async getDb() {
        if (NewPocketBaseCollection._ready) return;
        dotenv.config();
        // 어드민 로그인 (아이디와 비밀번호 설정 필요)
        await pb.admins.authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL, process.env.POCKETBASE_ADMIN_PASSWORD);
        NewPocketBaseCollection._ready = true;

    }

    static async createTable() {
        await NewPocketBaseCollection.getDb();
        const collectionData = {
            name: "New",
            type: "base",
            schema: [
                {name: 'docId', type: 'text', required: true, unique: true},
                // {name: 's000', type: 'chat', required: false},
                // {name: 's001', type: 'chat', required: false},
                // {name: 's002', type: 'chat', required: false},
                // {name: 's003', type: 'chat', required: false},
                // {name: 's004', type: 'chat', required: false},
                // {name: 's005', type: 'chat', required: false},
                // {name: 's006', type: 'chat', required: false},
                // {name: 's007', type: 'chat', required: false},
                // {name: 's008', type: 'chat', required: false},
                // {name: 's009', type: 'chat', required: false},
                // {name: 's010', type: 'chat', required: false},
                // {name: 's011', type: 'chat', required: false},
                // {name: 's012', type: 'chat', required: false},
                // {name: 's013', type: 'chat', required: false},
                // {name: 's014', type: 'chat', required: false},
                // {name: 's015', type: 'chat', required: false},
                // {name: 's016', type: 'chat', required: false},
                // {name: 's017', type: 'chat', required: false},
                // {name: 's018', type: 'chat', required: false},
                // {name: 's019', type: 'chat', required: false},
                // {name: 's020', type: 'chat', required: false},
                // {name: 's021', type: 'chat', required: false},
                // {name: 's022', type: 'chat', required: false},
                // {name: 's023', type: 'chat', required: false},
                // {name: 's024', type: 'chat', required: false},
                // {name: 's025', type: 'chat', required: false},
                // {name: 's026', type: 'chat', required: false},
                // {name: 's027', type: 'chat', required: false},
                // {name: 's028', type: 'chat', required: false},
                // {name: 's029', type: 'chat', required: false},
                // {name: 's030', type: 'chat', required: false},
                // {name: 's031', type: 'chat', required: false},
                // {name: 's032', type: 'chat', required: false},
                // {name: 's033', type: 'chat', required: false},
                // {name: 's034', type: 'chat', required: false},
                // {name: 's035', type: 'chat', required: false},
                // {name: 's036', type: 'chat', required: false},
                // {name: 's037', type: 'chat', required: false},
                // {name: 's038', type: 'chat', required: false},
                // {name: 's039', type: 'chat', required: false},
                // {name: 's040', type: 'chat', required: false},
                // {name: 's041', type: 'chat', required: false},
                // {name: 's042', type: 'chat', required: false},
                // {name: 's043', type: 'chat', required: false},
                // {name: 's044', type: 'chat', required: false},
                // {name: 's045', type: 'chat', required: false},
                // {name: 's046', type: 'chat', required: false},
                // {name: 's047', type: 'chat', required: false},
                // {name: 's048', type: 'chat', required: false},
                // {name: 's049', type: 'chat', required: false},
                // {name: 's050', type: 'chat', required: false},
                // {name: 's051', type: 'chat', required: false},
                // {name: 's052', type: 'chat', required: false},
                // {name: 's053', type: 'chat', required: false},
                // {name: 's054', type: 'chat', required: false},
                // {name: 's055', type: 'chat', required: false},
                // {name: 's056', type: 'chat', required: false},
                // {name: 's057', type: 'chat', required: false},
                // {name: 's058', type: 'chat', required: false},
                // {name: 's059', type: 'chat', required: false},
                // {name: 's060', type: 'chat', required: false},
                // {name: 's061', type: 'chat', required: false},
                // {name: 's062', type: 'chat', required: false},
                // {name: 's063', type: 'chat', required: false},
                // {name: 's064', type: 'chat', required: false},
                // {name: 's065', type: 'chat', required: false},
                // {name: 's066', type: 'chat', required: false},
                // {name: 's067', type: 'chat', required: false},
                // {name: 's068', type: 'chat', required: false},
                // {name: 's069', type: 'chat', required: false},
                // {name: 's070', type: 'chat', required: false},
                // {name: 's071', type: 'chat', required: false},
                // {name: 's072', type: 'chat', required: false},
                // {name: 's073', type: 'chat', required: false},
                // {name: 's074', type: 'chat', required: false},
                // {name: 's075', type: 'chat', required: false},
                // {name: 's076', type: 'chat', required: false},
                // {name: 's077', type: 'chat', required: false},
                // {name: 's078', type: 'chat', required: false},
                // {name: 's079', type: 'chat', required: false},
                // {name: 's080', type: 'chat', required: false},
                // {name: 's081', type: 'chat', required: false},
                // {name: 's082', type: 'chat', required: false},
                // {name: 's083', type: 'chat', required: false},
                // {name: 's084', type: 'chat', required: false},
                // {name: 's085', type: 'chat', required: false},
                // {name: 's086', type: 'chat', required: false},
                // {name: 's087', type: 'chat', required: false},
                // {name: 's088', type: 'chat', required: false},
                // {name: 's089', type: 'chat', required: false},
                // {name: 's090', type: 'chat', required: false},
                // {name: 's091', type: 'chat', required: false},
                // {name: 's092', type: 'chat', required: false},
                // {name: 's093', type: 'chat', required: false},
                // {name: 's094', type: 'chat', required: false},
                // {name: 's095', type: 'chat', required: false},
                // {name: 's096', type: 'chat', required: false},
                // {name: 's097', type: 'chat', required: false},
                // {name: 's098', type: 'chat', required: false},
                // {name: 's099', type: 'chat', required: false},
                // {name: 'i000', type: 'number', required: false},
                // {name: 'i001', type: 'number', required: false},
                // {name: 'i002', type: 'number', required: false},
                // {name: 'i003', type: 'number', required: false},
                // {name: 'i004', type: 'number', required: false},
                // {name: 'i005', type: 'number', required: false},
                // {name: 'i006', type: 'number', required: false},
                // {name: 'i007', type: 'number', required: false},
                // {name: 'i008', type: 'number', required: false},
                // {name: 'i009', type: 'number', required: false},
                // {name: 'i010', type: 'number', required: false},
                // {name: 'i011', type: 'number', required: false},
                // {name: 'i012', type: 'number', required: false},
                // {name: 'i013', type: 'number', required: false},
                // {name: 'i014', type: 'number', required: false},
                // {name: 'i015', type: 'number', required: false},
                // {name: 'i016', type: 'number', required: false},
                // {name: 'i017', type: 'number', required: false},
                // {name: 'i018', type: 'number', required: false},
                // {name: 'i019', type: 'number', required: false},
                // {name: 'i020', type: 'number', required: false},
                // {name: 'i021', type: 'number', required: false},
                // {name: 'i022', type: 'number', required: false},
                // {name: 'i023', type: 'number', required: false},
                // {name: 'i024', type: 'number', required: false},
                // {name: 'i025', type: 'number', required: false},
                // {name: 'i026', type: 'number', required: false},
                // {name: 'i027', type: 'number', required: false},
                // {name: 'i028', type: 'number', required: false},
                // {name: 'i029', type: 'number', required: false},
                // {name: 'i030', type: 'number', required: false},
                // {name: 'i031', type: 'number', required: false},
                // {name: 'i032', type: 'number', required: false},
                // {name: 'i033', type: 'number', required: false},
                // {name: 'i034', type: 'number', required: false},
                // {name: 'i035', type: 'number', required: false},
                // {name: 'i036', type: 'number', required: false},
                // {name: 'i037', type: 'number', required: false},
                // {name: 'i038', type: 'number', required: false},
                // {name: 'i039', type: 'number', required: false},
                // {name: 'i040', type: 'number', required: false},
                // {name: 'i041', type: 'number', required: false},
                // {name: 'i042', type: 'number', required: false},
                // {name: 'i043', type: 'number', required: false},
                // {name: 'i044', type: 'number', required: false},
                // {name: 'i045', type: 'number', required: false},
                // {name: 'i046', type: 'number', required: false},
                // {name: 'i047', type: 'number', required: false},
                // {name: 'i048', type: 'number', required: false},
                // {name: 'i049', type: 'number', required: false},
                // {name: 'i050', type: 'number', required: false},
                // {name: 'i051', type: 'number', required: false},
                // {name: 'i052', type: 'number', required: false},
                // {name: 'i053', type: 'number', required: false},
                // {name: 'i054', type: 'number', required: false},
                // {name: 'i055', type: 'number', required: false},
                // {name: 'i056', type: 'number', required: false},
                // {name: 'i057', type: 'number', required: false},
                // {name: 'i058', type: 'number', required: false},
                // {name: 'i059', type: 'number', required: false},
                // {name: 'i060', type: 'number', required: false},
                // {name: 'i061', type: 'number', required: false},
                // {name: 'i062', type: 'number', required: false},
                // {name: 'i063', type: 'number', required: false},
                // {name: 'i064', type: 'number', required: false},
                // {name: 'i065', type: 'number', required: false},
                // {name: 'i066', type: 'number', required: false},
                // {name: 'i067', type: 'number', required: false},
                // {name: 'i068', type: 'number', required: false},
                // {name: 'i069', type: 'number', required: false},
                // {name: 'i070', type: 'number', required: false},
                // {name: 'i071', type: 'number', required: false},
                // {name: 'i072', type: 'number', required: false},
                // {name: 'i073', type: 'number', required: false},
                // {name: 'i074', type: 'number', required: false},
                // {name: 'i075', type: 'number', required: false},
                // {name: 'i076', type: 'number', required: false},
                // {name: 'i077', type: 'number', required: false},
                // {name: 'i078', type: 'number', required: false},
                // {name: 'i079', type: 'number', required: false},
                // {name: 'i080', type: 'number', required: false},
                // {name: 'i081', type: 'number', required: false},
                // {name: 'i082', type: 'number', required: false},
                // {name: 'i083', type: 'number', required: false},
                // {name: 'i084', type: 'number', required: false},
                // {name: 'i085', type: 'number', required: false},
                // {name: 'i086', type: 'number', required: false},
                // {name: 'i087', type: 'number', required: false},
                // {name: 'i088', type: 'number', required: false},
                // {name: 'i089', type: 'number', required: false},
                // {name: 'i090', type: 'number', required: false},
                // {name: 'i091', type: 'number', required: false},
                // {name: 'i092', type: 'number', required: false},
                // {name: 'i093', type: 'number', required: false},
                // {name: 'i094', type: 'number', required: false},
                // {name: 'i095', type: 'number', required: false},
                // {name: 'i096', type: 'number', required: false},
                // {name: 'i097', type: 'number', required: false},
                // {name: 'i098', type: 'number', required: false},
                // {name: 'i099', type: 'number', required: false},
                // {name: 'b000', type: 'bool', required: false},
                // {name: 'b001', type: 'bool', required: false},
                // {name: 'b002', type: 'bool', required: false},
                // {name: 'b003', type: 'bool', required: false},
                // {name: 'b004', type: 'bool', required: false},
                // {name: 'b005', type: 'bool', required: false},
                // {name: 'b006', type: 'bool', required: false},
                // {name: 'b007', type: 'bool', required: false},
                // {name: 'b008', type: 'bool', required: false},
                // {name: 'b009', type: 'bool', required: false},
                // {name: 'b010', type: 'bool', required: false},
                // {name: 'b011', type: 'bool', required: false},
                // {name: 'b012', type: 'bool', required: false},
                // {name: 'b013', type: 'bool', required: false},
                // {name: 'b014', type: 'bool', required: false},
                // {name: 'b015', type: 'bool', required: false},
                // {name: 'b016', type: 'bool', required: false},
                // {name: 'b017', type: 'bool', required: false},
                // {name: 'b018', type: 'bool', required: false},
                // {name: 'b019', type: 'bool', required: false},
                // {name: 'b020', type: 'bool', required: false},
                // {name: 'b021', type: 'bool', required: false},
                // {name: 'b022', type: 'bool', required: false},
                // {name: 'b023', type: 'bool', required: false},
                // {name: 'b024', type: 'bool', required: false},
                // {name: 'b025', type: 'bool', required: false},
                // {name: 'b026', type: 'bool', required: false},
                // {name: 'b027', type: 'bool', required: false},
                // {name: 'b028', type: 'bool', required: false},
                // {name: 'b029', type: 'bool', required: false},
                // {name: 'b030', type: 'bool', required: false},
                // {name: 'r000', type: 'number', required: false},
                // {name: 'r001', type: 'number', required: false},
                // {name: 'r002', type: 'number', required: false},
                // {name: 'r003', type: 'number', required: false},
                // {name: 'r004', type: 'number', required: false},
                // {name: 'r005', type: 'number', required: false},
                // {name: 'r006', type: 'number', required: false},
                // {name: 'r007', type: 'number', required: false},
                // {name: 'r008', type: 'number', required: false},
                // {name: 'r009', type: 'number', required: false},
                // {name: 'r010', type: 'number', required: false},
                // {name: 'r011', type: 'number', required: false},
                // {name: 'r012', type: 'number', required: false},
                // {name: 'r013', type: 'number', required: false},
                // {name: 'r014', type: 'number', required: false},
                // {name: 'r015', type: 'number', required: false},
                // {name: 'r016', type: 'number', required: false},
                // {name: 'r017', type: 'number', required: false},
                // {name: 'r018', type: 'number', required: false},
                // {name: 'r019', type: 'number', required: false},
                // {name: 'r020', type: 'number', required: false},
                // {name: 'r021', type: 'number', required: false},
                // {name: 'r022', type: 'number', required: false},
                // {name: 'r023', type: 'number', required: false},
                // {name: 'r024', type: 'number', required: false},
                // {name: 'r025', type: 'number', required: false},
                // {name: 'r026', type: 'number', required: false},
                // {name: 'r027', type: 'number', required: false},
                // {name: 'r028', type: 'number', required: false},
                // {name: 'r029', type: 'number', required: false},
                // {name: 'r030', type: 'number', required: false},
                // {name: 't000', type: 'number', required: false},
                // {name: 't001', type: 'number', required: false},
                // {name: 't002', type: 'number', required: false},
                // {name: 't003', type: 'number', required: false},
                // {name: 't004', type: 'number', required: false},
                // {name: 't005', type: 'number', required: false},
                // {name: 't006', type: 'number', required: false},
                // {name: 't007', type: 'number', required: false},
                // {name: 't008', type: 'number', required: false},
                // {name: 't009', type: 'number', required: false},
                // {name: 't010', type: 'number', required: false},
                // {name: 't011', type: 'number', required: false},
                // {name: 't012', type: 'number', required: false},
                // {name: 't013', type: 'number', required: false},
                // {name: 't014', type: 'number', required: false},
                // {name: 't015', type: 'number', required: false},
                // {name: 't016', type: 'number', required: false},
                // {name: 't017', type: 'number', required: false},
                // {name: 't018', type: 'number', required: false},
                // {name: 't019', type: 'number', required: false},
                // {name: 't020', type: 'number', required: false},
                // {name: 'l000', type: 'chat', required: false},
                // {name: 'l001', type: 'chat', required: false},
                // {name: 'l002', type: 'chat', required: false},
                // {name: 'l003', type: 'chat', required: false},
                // {name: 'l004', type: 'chat', required: false},
                // {name: 'l005', type: 'chat', required: false},
                // {name: 'l006', type: 'chat', required: false},
                // {name: 'l007', type: 'chat', required: false},
                // {name: 'l008', type: 'chat', required: false},
                // {name: 'l009', type: 'chat', required: false},
                // {name: 'l010', type: 'chat', required: false},
                // {name: 'l011', type: 'chat', required: false},
                // {name: 'l012', type: 'chat', required: false},
                // {name: 'l013', type: 'chat', required: false},
                // {name: 'l014', type: 'chat', required: false},
                // {name: 'l015', type: 'chat', required: false},
                // {name: 'l016', type: 'chat', required: false},
                // {name: 'l017', type: 'chat', required: false},
                // {name: 'l018', type: 'chat', required: false},
                // {name: 'l019', type: 'chat', required: false},
                // {name: 'l020', type: 'chat', required: false},
                // {name: 'm000', type: 'chat', required: false},
                // {name: 'm001', type: 'chat', required: false},
                // {name: 'm002', type: 'chat', required: false},
                // {name: 'm003', type: 'chat', required: false},
                // {name: 'm004', type: 'chat', required: false},
                // {name: 'm005', type: 'chat', required: false},
                // {name: 'm006', type: 'chat', required: false},
                // {name: 'm007', type: 'chat', required: false},
                // {name: 'm008', type: 'chat', required: false},
                // {name: 'm009', type: 'chat', required: false},
                // {name: 'm010', type: 'chat', required: false},
                // {name: 'm011', type: 'chat', required: false},
                // {name: 'm012', type: 'chat', required: false},
                // {name: 'm013', type: 'chat', required: false},
                // {name: 'm014', type: 'chat', required: false},
                // {name: 'm015', type: 'chat', required: false},
                // {name: 'm016', type: 'chat', required: false},
                // {name: 'm017', type: 'chat', required: false},
                // {name: 'm018', type: 'chat', required: false},
                // {name: 'm019', type: 'chat', required: false},
                // {name: 'm020', type: 'chat', required: false},
                // {name: 'c000', type: 'chat', required: false},
                // {name: 'c001', type: 'chat', required: false},
                // {name: 'c002', type: 'chat', required: false},
                // {name: 'c003', type: 'chat', required: false},
                // {name: 'c004', type: 'chat', required: false},
                // {name: 'c005', type: 'chat', required: false},
                // {name: 'c006', type: 'chat', required: false},
                // {name: 'c007', type: 'chat', required: false},
                // {name: 'c008', type: 'chat', required: false},
                // {name: 'c009', type: 'chat', required: false},
                // {name: 'c010', type: 'chat', required: false},
                // {name: 'c011', type: 'chat', required: false},
                // {name: 'c012', type: 'chat', required: false},
                // {name: 'c013', type: 'chat', required: false},
                // {name: 'c014', type: 'chat', required: false},
                // {name: 'c015', type: 'chat', required: false},
                // {name: 'c016', type: 'chat', required: false},
                // {name: 'c017', type: 'chat', required: false},
                // {name: 'c018', type: 'chat', required: false},
                // {name: 'c019', type: 'chat', required: false},
                // {name: 'c020', type: 'chat', required: false},
                // {name: 'j000', type: 'chat', required: false},
                // {name: 'j001', type: 'chat', required: false},
                // {name: 'j002', type: 'chat', required: false},
                // {name: 'j003', type: 'chat', required: false},
                // {name: 'j004', type: 'chat', required: false},
                // {name: 'j005', type: 'chat', required: false},
                // {name: 'j006', type: 'chat', required: false},
                // {name: 'j007', type: 'chat', required: false},
                // {name: 'j008', type: 'chat', required: false},
                // {name: 'j009', type: 'chat', required: false},
                // {name: 'j010', type: 'chat', required: false},
                // {name: 'j011', type: 'chat', required: false},
                // {name: 'j012', type: 'chat', required: false},
                // {name: 'j013', type: 'chat', required: false},
                // {name: 'j014', type: 'chat', required: false},
                // {name: 'j015', type: 'chat', required: false},
                // {name: 'j016', type: 'chat', required: false},
                // {name: 'j017', type: 'chat', required: false},
                // {name: 'j018', type: 'chat', required: false},
                // {name: 'j019', type: 'chat', required: false},
                // {name: 'j020', type: 'chat', required: false},
                // {name: 'e000', type: 'chat', required: false},
                // {name: 'e001', type: 'chat', required: false},
                // {name: 'e002', type: 'chat', required: false},
                // {name: 'e003', type: 'chat', required: false},
                // {name: 'e004', type: 'chat', required: false},
                // {name: 'e005', type: 'chat', required: false},
                // {name: 'e006', type: 'chat', required: false},
                // {name: 'e007', type: 'chat', required: false},
                // {name: 'e008', type: 'chat', required: false},
                // {name: 'e009', type: 'chat', required: false},
                // {name: 'e010', type: 'chat', required: false},
                // {name: 'e011', type: 'chat', required: false},
                // {name: 'e012', type: 'chat', required: false},
                // {name: 'e013', type: 'chat', required: false},
                // {name: 'e014', type: 'chat', required: false},
                // {name: 'e015', type: 'chat', required: false},
                // {name: 'e016', type: 'chat', required: false},
                // {name: 'e017', type: 'chat', required: false},
                // {name: 'e018', type: 'chat', required: false},
                // {name: 'e019', type: 'chat', required: false},
                // {name: 'e020', type: 'chat', required: false},
                {
                    name: 'fileName', type: 'file', required: false, options: {
                        maxSelect: 1, // 파일 개수 제한을 1개로 설정
                        maxSize: 1048576000, // 파일 크기를 1000MB로 제한
                    }
                },
            ],
            indexes: [],  // 인덱스 설정
        }

        try {
            // 컬렉션 생성 요청
            const collection = await pb.collections.create(collectionData);
            console.log('컬렉션 생성 완료:', collection);
        } catch (error) {
            console.error('컬렉션 생성 실패:', error);
        }


    }

    static async insert(object: New): Promise<string> {

        await NewPocketBaseCollection.getDb();

        const recordData = {
            docId: object.docId,
            // s000: object.s000,
            // s001: object.s001,
            // s002: object.s002,
            // s003: object.s003,
            // s004: object.s004,
            // s005: object.s005,
            // s006: object.s006,
            // s007: object.s007,
            // s008: object.s008,
            // s009: object.s009,
            // s010: object.s010,
            // s011: object.s011,
            // s012: object.s012,
            // s013: object.s013,
            // s014: object.s014,
            // s015: object.s015,
            // s016: object.s016,
            // s017: object.s017,
            // s018: object.s018,
            // s019: object.s019,
            // s020: object.s020,
            // s021: object.s021,
            // s022: object.s022,
            // s023: object.s023,
            // s024: object.s024,
            // s025: object.s025,
            // s026: object.s026,
            // s027: object.s027,
            // s028: object.s028,
            // s029: object.s029,
            // s030: object.s030,
            // s031: object.s031,
            // s032: object.s032,
            // s033: object.s033,
            // s034: object.s034,
            // s035: object.s035,
            // s036: object.s036,
            // s037: object.s037,
            // s038: object.s038,
            // s039: object.s039,
            // s040: object.s040,
            // s041: object.s041,
            // s042: object.s042,
            // s043: object.s043,
            // s044: object.s044,
            // s045: object.s045,
            // s046: object.s046,
            // s047: object.s047,
            // s048: object.s048,
            // s049: object.s049,
            // s050: object.s050,
            // s051: object.s051,
            // s052: object.s052,
            // s053: object.s053,
            // s054: object.s054,
            // s055: object.s055,
            // s056: object.s056,
            // s057: object.s057,
            // s058: object.s058,
            // s059: object.s059,
            // s060: object.s060,
            // s061: object.s061,
            // s062: object.s062,
            // s063: object.s063,
            // s064: object.s064,
            // s065: object.s065,
            // s066: object.s066,
            // s067: object.s067,
            // s068: object.s068,
            // s069: object.s069,
            // s070: object.s070,
            // s071: object.s071,
            // s072: object.s072,
            // s073: object.s073,
            // s074: object.s074,
            // s075: object.s075,
            // s076: object.s076,
            // s077: object.s077,
            // s078: object.s078,
            // s079: object.s079,
            // s080: object.s080,
            // s081: object.s081,
            // s082: object.s082,
            // s083: object.s083,
            // s084: object.s084,
            // s085: object.s085,
            // s086: object.s086,
            // s087: object.s087,
            // s088: object.s088,
            // s089: object.s089,
            // s090: object.s090,
            // s091: object.s091,
            // s092: object.s092,
            // s093: object.s093,
            // s094: object.s094,
            // s095: object.s095,
            // s096: object.s096,
            // s097: object.s097,
            // s098: object.s098,
            // s099: object.s099,
            // i000: object.i000,
            // i001: object.i001,
            // i002: object.i002,
            // i003: object.i003,
            // i004: object.i004,
            // i005: object.i005,
            // i006: object.i006,
            // i007: object.i007,
            // i008: object.i008,
            // i009: object.i009,
            // i010: object.i010,
            // i011: object.i011,
            // i012: object.i012,
            // i013: object.i013,
            // i014: object.i014,
            // i015: object.i015,
            // i016: object.i016,
            // i017: object.i017,
            // i018: object.i018,
            // i019: object.i019,
            // i020: object.i020,
            // i021: object.i021,
            // i022: object.i022,
            // i023: object.i023,
            // i024: object.i024,
            // i025: object.i025,
            // i026: object.i026,
            // i027: object.i027,
            // i028: object.i028,
            // i029: object.i029,
            // i030: object.i030,
            // i031: object.i031,
            // i032: object.i032,
            // i033: object.i033,
            // i034: object.i034,
            // i035: object.i035,
            // i036: object.i036,
            // i037: object.i037,
            // i038: object.i038,
            // i039: object.i039,
            // i040: object.i040,
            // i041: object.i041,
            // i042: object.i042,
            // i043: object.i043,
            // i044: object.i044,
            // i045: object.i045,
            // i046: object.i046,
            // i047: object.i047,
            // i048: object.i048,
            // i049: object.i049,
            // i050: object.i050,
            // i051: object.i051,
            // i052: object.i052,
            // i053: object.i053,
            // i054: object.i054,
            // i055: object.i055,
            // i056: object.i056,
            // i057: object.i057,
            // i058: object.i058,
            // i059: object.i059,
            // i060: object.i060,
            // i061: object.i061,
            // i062: object.i062,
            // i063: object.i063,
            // i064: object.i064,
            // i065: object.i065,
            // i066: object.i066,
            // i067: object.i067,
            // i068: object.i068,
            // i069: object.i069,
            // i070: object.i070,
            // i071: object.i071,
            // i072: object.i072,
            // i073: object.i073,
            // i074: object.i074,
            // i075: object.i075,
            // i076: object.i076,
            // i077: object.i077,
            // i078: object.i078,
            // i079: object.i079,
            // i080: object.i080,
            // i081: object.i081,
            // i082: object.i082,
            // i083: object.i083,
            // i084: object.i084,
            // i085: object.i085,
            // i086: object.i086,
            // i087: object.i087,
            // i088: object.i088,
            // i089: object.i089,
            // i090: object.i090,
            // i091: object.i091,
            // i092: object.i092,
            // i093: object.i093,
            // i094: object.i094,
            // i095: object.i095,
            // i096: object.i096,
            // i097: object.i097,
            // i098: object.i098,
            // i099: object.i099,
            // b000: object.b000,
            // b001: object.b001,
            // b002: object.b002,
            // b003: object.b003,
            // b004: object.b004,
            // b005: object.b005,
            // b006: object.b006,
            // b007: object.b007,
            // b008: object.b008,
            // b009: object.b009,
            // b010: object.b010,
            // b011: object.b011,
            // b012: object.b012,
            // b013: object.b013,
            // b014: object.b014,
            // b015: object.b015,
            // b016: object.b016,
            // b017: object.b017,
            // b018: object.b018,
            // b019: object.b019,
            // b020: object.b020,
            // b021: object.b021,
            // b022: object.b022,
            // b023: object.b023,
            // b024: object.b024,
            // b025: object.b025,
            // b026: object.b026,
            // b027: object.b027,
            // b028: object.b028,
            // b029: object.b029,
            // b030: object.b030,
            // r000: object.r000,
            // r001: object.r001,
            // r002: object.r002,
            // r003: object.r003,
            // r004: object.r004,
            // r005: object.r005,
            // r006: object.r006,
            // r007: object.r007,
            // r008: object.r008,
            // r009: object.r009,
            // r010: object.r010,
            // r011: object.r011,
            // r012: object.r012,
            // r013: object.r013,
            // r014: object.r014,
            // r015: object.r015,
            // r016: object.r016,
            // r017: object.r017,
            // r018: object.r018,
            // r019: object.r019,
            // r020: object.r020,
            // r021: object.r021,
            // r022: object.r022,
            // r023: object.r023,
            // r024: object.r024,
            // r025: object.r025,
            // r026: object.r026,
            // r027: object.r027,
            // r028: object.r028,
            // r029: object.r029,
            // r030: object.r030,
            // t000: object.t000.getTime(),
            // t001: object.t001.getTime(),
            // t002: object.t002.getTime(),
            // t003: object.t003.getTime(),
            // t004: object.t004.getTime(),
            // t005: object.t005.getTime(),
            // t006: object.t006.getTime(),
            // t007: object.t007.getTime(),
            // t008: object.t008.getTime(),
            // t009: object.t009.getTime(),
            // t010: object.t010.getTime(),
            // t011: object.t011.getTime(),
            // t012: object.t012.getTime(),
            // t013: object.t013.getTime(),
            // t014: object.t014.getTime(),
            // t015: object.t015.getTime(),
            // t016: object.t016.getTime(),
            // t017: object.t017.getTime(),
            // t018: object.t018.getTime(),
            // t019: object.t019.getTime(),
            // t020: object.t020.getTime(),
            // t021: object.t021.getTime(),
            // t022: object.t022.getTime(),
            // t023: object.t023.getTime(),
            // t024: object.t024.getTime(),
            // t025: object.t025.getTime(),
            // t026: object.t026.getTime(),
            // t027: object.t027.getTime(),
            // t028: object.t028.getTime(),
            // t029: object.t029.getTime(),
            // t030: object.t030.getTime(),
            // l000: JSON.stringify(object.l000),
            // l001: JSON.stringify(object.l001),
            // l002: JSON.stringify(object.l002),
            // l003: JSON.stringify(object.l003),
            // l004: JSON.stringify(object.l004),
            // l005: JSON.stringify(object.l005),
            // l006: JSON.stringify(object.l006),
            // l007: JSON.stringify(object.l007),
            // l008: JSON.stringify(object.l008),
            // l009: JSON.stringify(object.l009),
            // l010: JSON.stringify(object.l010),
            // l011: JSON.stringify(object.l011),
            // l012: JSON.stringify(object.l012),
            // l013: JSON.stringify(object.l013),
            // l014: JSON.stringify(object.l014),
            // l015: JSON.stringify(object.l015),
            // l016: JSON.stringify(object.l016),
            // l017: JSON.stringify(object.l017),
            // l018: JSON.stringify(object.l018),
            // l019: JSON.stringify(object.l019),
            // l020: JSON.stringify(object.l020),
            // m000: JSON.stringify(object.m000),
            // m001: JSON.stringify(object.m001),
            // m002: JSON.stringify(object.m002),
            // m003: JSON.stringify(object.m003),
            // m004: JSON.stringify(object.m004),
            // m005: JSON.stringify(object.m005),
            // m006: JSON.stringify(object.m006),
            // m007: JSON.stringify(object.m007),
            // m008: JSON.stringify(object.m008),
            // m009: JSON.stringify(object.m009),
            // m010: JSON.stringify(object.m010),
            // m011: JSON.stringify(object.m011),
            // m012: JSON.stringify(object.m012),
            // m013: JSON.stringify(object.m013),
            // m014: JSON.stringify(object.m014),
            // m015: JSON.stringify(object.m015),
            // m016: JSON.stringify(object.m016),
            // m017: JSON.stringify(object.m017),
            // m018: JSON.stringify(object.m018),
            // m019: JSON.stringify(object.m019),
            // m020: JSON.stringify(object.m020),
            // c000: object.c000.toDataString(),
            // c001: object.c001.toDataString(),
            // c002: object.c002.toDataString(),
            // c003: object.c003.toDataString(),
            // c004: object.c004.toDataString(),
            // c005: object.c005.toDataString(),
            // c006: object.c006.toDataString(),
            // c007: object.c007.toDataString(),
            // c008: object.c008.toDataString(),
            // c009: object.c009.toDataString(),
            // c010: object.c010.toDataString(),
            // c011: object.c011.toDataString(),
            // c012: object.c012.toDataString(),
            // c013: object.c013.toDataString(),
            // c014: object.c014.toDataString(),
            // c015: object.c015.toDataString(),
            // c016: object.c016.toDataString(),
            // c017: object.c017.toDataString(),
            // c018: object.c018.toDataString(),
            // c019: object.c019.toDataString(),
            // c020: object.c020.toDataString(),
            // j000: JSON.stringify(object.j000.map((model: OtherModel) => model.toDataString())),
            // j001: JSON.stringify(object.j001.map((model: OtherModel) => model.toDataString())),
            // j002: JSON.stringify(object.j002.map((model: OtherModel) => model.toDataString())),
            // j003: JSON.stringify(object.j003.map((model: OtherModel) => model.toDataString())),
            // j004: JSON.stringify(object.j004.map((model: OtherModel) => model.toDataString())),
            // j005: JSON.stringify(object.j005.map((model: OtherModel) => model.toDataString())),
            // j006: JSON.stringify(object.j006.map((model: OtherModel) => model.toDataString())),
            // j007: JSON.stringify(object.j007.map((model: OtherModel) => model.toDataString())),
            // j008: JSON.stringify(object.j008.map((model: OtherModel) => model.toDataString())),
            // j009: JSON.stringify(object.j009.map((model: OtherModel) => model.toDataString())),
            // j010: JSON.stringify(object.j010.map((model: OtherModel) => model.toDataString())),
            // j011: JSON.stringify(object.j011.map((model: OtherModel) => model.toDataString())),
            // j012: JSON.stringify(object.j012.map((model: OtherModel) => model.toDataString())),
            // j013: JSON.stringify(object.j013.map((model: OtherModel) => model.toDataString())),
            // j014: JSON.stringify(object.j014.map((model: OtherModel) => model.toDataString())),
            // j015: JSON.stringify(object.j015.map((model: OtherModel) => model.toDataString())),
            // j016: JSON.stringify(object.j016.map((model: OtherModel) => model.toDataString())),
            // j017: JSON.stringify(object.j017.map((model: OtherModel) => model.toDataString())),
            // j018: JSON.stringify(object.j018.map((model: OtherModel) => model.toDataString())),
            // j019: JSON.stringify(object.j019.map((model: OtherModel) => model.toDataString())),
            // j020: JSON.stringify(object.j020.map((model: OtherModel) => model.toDataString())),
            // e000: object.e000,
            // e001: object.e001,
            // e002: object.e002,
            // e003: object.e003,
            // e004: object.e004,
            // e005: object.e005,
            // e006: object.e006,
            // e007: object.e007,
            // e008: object.e008,
            // e009: object.e009,
            // e010: object.e010,
            // e011: object.e011,
            // e012: object.e012,
            // e013: object.e013,
            // e014: object.e014,
            // e015: object.e015,
            // e016: object.e016,
            // e017: object.e017,
            // e018: object.e018,
            // e019: object.e019,
            // e020: object.e020,
            fileName: object.fileName,
        }

        // 레코드 삽입 요청
        const record = await pb.collection('New').create(recordData);
        console.log('레코드 삽입 완료:', record);

        return record.id;
    }

    static async upsert(object: New): Promise<string | null> {

        await NewPocketBaseCollection.getDb();

        const rawObj = await this.getRow(object.docId);

        if (rawObj == null) {
            return await this.insert(object);
        } else {
            const updatedData = {
                docId: object.docId,
                // s000: object.s000,
                // s001: object.s001,
                // s002: object.s002,
                // s003: object.s003,
                // s004: object.s004,
                // s005: object.s005,
                // s006: object.s006,
                // s007: object.s007,
                // s008: object.s008,
                // s009: object.s009,
                // s010: object.s010,
                // s011: object.s011,
                // s012: object.s012,
                // s013: object.s013,
                // s014: object.s014,
                // s015: object.s015,
                // s016: object.s016,
                // s017: object.s017,
                // s018: object.s018,
                // s019: object.s019,
                // s020: object.s020,
                // s021: object.s021,
                // s022: object.s022,
                // s023: object.s023,
                // s024: object.s024,
                // s025: object.s025,
                // s026: object.s026,
                // s027: object.s027,
                // s028: object.s028,
                // s029: object.s029,
                // s030: object.s030,
                // s031: object.s031,
                // s032: object.s032,
                // s033: object.s033,
                // s034: object.s034,
                // s035: object.s035,
                // s036: object.s036,
                // s037: object.s037,
                // s038: object.s038,
                // s039: object.s039,
                // s040: object.s040,
                // s041: object.s041,
                // s042: object.s042,
                // s043: object.s043,
                // s044: object.s044,
                // s045: object.s045,
                // s046: object.s046,
                // s047: object.s047,
                // s048: object.s048,
                // s049: object.s049,
                // s050: object.s050,
                // s051: object.s051,
                // s052: object.s052,
                // s053: object.s053,
                // s054: object.s054,
                // s055: object.s055,
                // s056: object.s056,
                // s057: object.s057,
                // s058: object.s058,
                // s059: object.s059,
                // s060: object.s060,
                // s061: object.s061,
                // s062: object.s062,
                // s063: object.s063,
                // s064: object.s064,
                // s065: object.s065,
                // s066: object.s066,
                // s067: object.s067,
                // s068: object.s068,
                // s069: object.s069,
                // s070: object.s070,
                // s071: object.s071,
                // s072: object.s072,
                // s073: object.s073,
                // s074: object.s074,
                // s075: object.s075,
                // s076: object.s076,
                // s077: object.s077,
                // s078: object.s078,
                // s079: object.s079,
                // s080: object.s080,
                // s081: object.s081,
                // s082: object.s082,
                // s083: object.s083,
                // s084: object.s084,
                // s085: object.s085,
                // s086: object.s086,
                // s087: object.s087,
                // s088: object.s088,
                // s089: object.s089,
                // s090: object.s090,
                // s091: object.s091,
                // s092: object.s092,
                // s093: object.s093,
                // s094: object.s094,
                // s095: object.s095,
                // s096: object.s096,
                // s097: object.s097,
                // s098: object.s098,
                // s099: object.s099,
                // i000: object.i000,
                // i001: object.i001,
                // i002: object.i002,
                // i003: object.i003,
                // i004: object.i004,
                // i005: object.i005,
                // i006: object.i006,
                // i007: object.i007,
                // i008: object.i008,
                // i009: object.i009,
                // i010: object.i010,
                // i011: object.i011,
                // i012: object.i012,
                // i013: object.i013,
                // i014: object.i014,
                // i015: object.i015,
                // i016: object.i016,
                // i017: object.i017,
                // i018: object.i018,
                // i019: object.i019,
                // i020: object.i020,
                // i021: object.i021,
                // i022: object.i022,
                // i023: object.i023,
                // i024: object.i024,
                // i025: object.i025,
                // i026: object.i026,
                // i027: object.i027,
                // i028: object.i028,
                // i029: object.i029,
                // i030: object.i030,
                // i031: object.i031,
                // i032: object.i032,
                // i033: object.i033,
                // i034: object.i034,
                // i035: object.i035,
                // i036: object.i036,
                // i037: object.i037,
                // i038: object.i038,
                // i039: object.i039,
                // i040: object.i040,
                // i041: object.i041,
                // i042: object.i042,
                // i043: object.i043,
                // i044: object.i044,
                // i045: object.i045,
                // i046: object.i046,
                // i047: object.i047,
                // i048: object.i048,
                // i049: object.i049,
                // i050: object.i050,
                // i051: object.i051,
                // i052: object.i052,
                // i053: object.i053,
                // i054: object.i054,
                // i055: object.i055,
                // i056: object.i056,
                // i057: object.i057,
                // i058: object.i058,
                // i059: object.i059,
                // i060: object.i060,
                // i061: object.i061,
                // i062: object.i062,
                // i063: object.i063,
                // i064: object.i064,
                // i065: object.i065,
                // i066: object.i066,
                // i067: object.i067,
                // i068: object.i068,
                // i069: object.i069,
                // i070: object.i070,
                // i071: object.i071,
                // i072: object.i072,
                // i073: object.i073,
                // i074: object.i074,
                // i075: object.i075,
                // i076: object.i076,
                // i077: object.i077,
                // i078: object.i078,
                // i079: object.i079,
                // i080: object.i080,
                // i081: object.i081,
                // i082: object.i082,
                // i083: object.i083,
                // i084: object.i084,
                // i085: object.i085,
                // i086: object.i086,
                // i087: object.i087,
                // i088: object.i088,
                // i089: object.i089,
                // i090: object.i090,
                // i091: object.i091,
                // i092: object.i092,
                // i093: object.i093,
                // i094: object.i094,
                // i095: object.i095,
                // i096: object.i096,
                // i097: object.i097,
                // i098: object.i098,
                // i099: object.i099,
                // b000: object.b000,
                // b001: object.b001,
                // b002: object.b002,
                // b003: object.b003,
                // b004: object.b004,
                // b005: object.b005,
                // b006: object.b006,
                // b007: object.b007,
                // b008: object.b008,
                // b009: object.b009,
                // b010: object.b010,
                // b011: object.b011,
                // b012: object.b012,
                // b013: object.b013,
                // b014: object.b014,
                // b015: object.b015,
                // b016: object.b016,
                // b017: object.b017,
                // b018: object.b018,
                // b019: object.b019,
                // b020: object.b020,
                // b021: object.b021,
                // b022: object.b022,
                // b023: object.b023,
                // b024: object.b024,
                // b025: object.b025,
                // b026: object.b026,
                // b027: object.b027,
                // b028: object.b028,
                // b029: object.b029,
                // b030: object.b030,
                // r000: object.r000,
                // r001: object.r001,
                // r002: object.r002,
                // r003: object.r003,
                // r004: object.r004,
                // r005: object.r005,
                // r006: object.r006,
                // r007: object.r007,
                // r008: object.r008,
                // r009: object.r009,
                // r010: object.r010,
                // r011: object.r011,
                // r012: object.r012,
                // r013: object.r013,
                // r014: object.r014,
                // r015: object.r015,
                // r016: object.r016,
                // r017: object.r017,
                // r018: object.r018,
                // r019: object.r019,
                // r020: object.r020,
                // r021: object.r021,
                // r022: object.r022,
                // r023: object.r023,
                // r024: object.r024,
                // r025: object.r025,
                // r026: object.r026,
                // r027: object.r027,
                // r028: object.r028,
                // r029: object.r029,
                // r030: object.r030,
                // t000: object.t000.getTime(),
                // t001: object.t001.getTime(),
                // t002: object.t002.getTime(),
                // t003: object.t003.getTime(),
                // t004: object.t004.getTime(),
                // t005: object.t005.getTime(),
                // t006: object.t006.getTime(),
                // t007: object.t007.getTime(),
                // t008: object.t008.getTime(),
                // t009: object.t009.getTime(),
                // t010: object.t010.getTime(),
                // t011: object.t011.getTime(),
                // t012: object.t012.getTime(),
                // t013: object.t013.getTime(),
                // t014: object.t014.getTime(),
                // t015: object.t015.getTime(),
                // t016: object.t016.getTime(),
                // t017: object.t017.getTime(),
                // t018: object.t018.getTime(),
                // t019: object.t019.getTime(),
                // t020: object.t020.getTime(),
                // t021: object.t021.getTime(),
                // t022: object.t022.getTime(),
                // t023: object.t023.getTime(),
                // t024: object.t024.getTime(),
                // t025: object.t025.getTime(),
                // t026: object.t026.getTime(),
                // t027: object.t027.getTime(),
                // t028: object.t028.getTime(),
                // t029: object.t029.getTime(),
                // t030: object.t030.getTime(),
                // l000: JSON.stringify(object.l000),
                // l001: JSON.stringify(object.l001),
                // l002: JSON.stringify(object.l002),
                // l003: JSON.stringify(object.l003),
                // l004: JSON.stringify(object.l004),
                // l005: JSON.stringify(object.l005),
                // l006: JSON.stringify(object.l006),
                // l007: JSON.stringify(object.l007),
                // l008: JSON.stringify(object.l008),
                // l009: JSON.stringify(object.l009),
                // l010: JSON.stringify(object.l010),
                // l011: JSON.stringify(object.l011),
                // l012: JSON.stringify(object.l012),
                // l013: JSON.stringify(object.l013),
                // l014: JSON.stringify(object.l014),
                // l015: JSON.stringify(object.l015),
                // l016: JSON.stringify(object.l016),
                // l017: JSON.stringify(object.l017),
                // l018: JSON.stringify(object.l018),
                // l019: JSON.stringify(object.l019),
                // l020: JSON.stringify(object.l020),
                // m000: JSON.stringify(object.m000),
                // m001: JSON.stringify(object.m001),
                // m002: JSON.stringify(object.m002),
                // m003: JSON.stringify(object.m003),
                // m004: JSON.stringify(object.m004),
                // m005: JSON.stringify(object.m005),
                // m006: JSON.stringify(object.m006),
                // m007: JSON.stringify(object.m007),
                // m008: JSON.stringify(object.m008),
                // m009: JSON.stringify(object.m009),
                // m010: JSON.stringify(object.m010),
                // m011: JSON.stringify(object.m011),
                // m012: JSON.stringify(object.m012),
                // m013: JSON.stringify(object.m013),
                // m014: JSON.stringify(object.m014),
                // m015: JSON.stringify(object.m015),
                // m016: JSON.stringify(object.m016),
                // m017: JSON.stringify(object.m017),
                // m018: JSON.stringify(object.m018),
                // m019: JSON.stringify(object.m019),
                // m020: JSON.stringify(object.m020),
                // c000: object.c000.toDataString(),
                // c001: object.c001.toDataString(),
                // c002: object.c002.toDataString(),
                // c003: object.c003.toDataString(),
                // c004: object.c004.toDataString(),
                // c005: object.c005.toDataString(),
                // c006: object.c006.toDataString(),
                // c007: object.c007.toDataString(),
                // c008: object.c008.toDataString(),
                // c009: object.c009.toDataString(),
                // c010: object.c010.toDataString(),
                // c011: object.c011.toDataString(),
                // c012: object.c012.toDataString(),
                // c013: object.c013.toDataString(),
                // c014: object.c014.toDataString(),
                // c015: object.c015.toDataString(),
                // c016: object.c016.toDataString(),
                // c017: object.c017.toDataString(),
                // c018: object.c018.toDataString(),
                // c019: object.c019.toDataString(),
                // c020: object.c020.toDataString(),
                // j000: JSON.stringify(object.j000.map((model: OtherModel) => model.toDataString())),
                // j001: JSON.stringify(object.j001.map((model: OtherModel) => model.toDataString())),
                // j002: JSON.stringify(object.j002.map((model: OtherModel) => model.toDataString())),
                // j003: JSON.stringify(object.j003.map((model: OtherModel) => model.toDataString())),
                // j004: JSON.stringify(object.j004.map((model: OtherModel) => model.toDataString())),
                // j005: JSON.stringify(object.j005.map((model: OtherModel) => model.toDataString())),
                // j006: JSON.stringify(object.j006.map((model: OtherModel) => model.toDataString())),
                // j007: JSON.stringify(object.j007.map((model: OtherModel) => model.toDataString())),
                // j008: JSON.stringify(object.j008.map((model: OtherModel) => model.toDataString())),
                // j009: JSON.stringify(object.j009.map((model: OtherModel) => model.toDataString())),
                // j010: JSON.stringify(object.j010.map((model: OtherModel) => model.toDataString())),
                // j011: JSON.stringify(object.j011.map((model: OtherModel) => model.toDataString())),
                // j012: JSON.stringify(object.j012.map((model: OtherModel) => model.toDataString())),
                // j013: JSON.stringify(object.j013.map((model: OtherModel) => model.toDataString())),
                // j014: JSON.stringify(object.j014.map((model: OtherModel) => model.toDataString())),
                // j015: JSON.stringify(object.j015.map((model: OtherModel) => model.toDataString())),
                // j016: JSON.stringify(object.j016.map((model: OtherModel) => model.toDataString())),
                // j017: JSON.stringify(object.j017.map((model: OtherModel) => model.toDataString())),
                // j018: JSON.stringify(object.j018.map((model: OtherModel) => model.toDataString())),
                // j019: JSON.stringify(object.j019.map((model: OtherModel) => model.toDataString())),
                // j020: JSON.stringify(object.j020.map((model: OtherModel) => model.toDataString())),
                // e000: object.e000,
                // e001: object.e001,
                // e002: object.e002,
                // e003: object.e003,
                // e004: object.e004,
                // e005: object.e005,
                // e006: object.e006,
                // e007: object.e007,
                // e008: object.e008,
                // e009: object.e009,
                // e010: object.e010,
                // e011: object.e011,
                // e012: object.e012,
                // e013: object.e013,
                // e014: object.e014,
                // e015: object.e015,
                // e016: object.e016,
                // e017: object.e017,
                // e018: object.e018,
                // e019: object.e019,
                // e020: object.e020,
                fileName: object.fileName,

            }

            try {
                const updatedRecord = await pb.collection('New').update(rawObj.id, updatedData);
                return updatedRecord.id;
            } catch (e) {
                console.log('failed to upsert', e);
                return null;
            }
        }
    }

    static async delete(docId: string) {

        await NewPocketBaseCollection.getDb();

        const rawObj = await this.getRow(docId);

        if (rawObj != null) {
            await pb.collection('New').delete(rawObj.id);
        } else {
            console.log('failed to delete because object is not found');
        }
    }

    static async get(docId: string): Promise<New | null> {

        await NewPocketBaseCollection.getDb();

        try {
            const xs = await pb.collection('New').getFirstListItem(`docId="${docId}"`);

            return New.fromMap(xs);


        } catch (e) {
            // console.log(e);
            return null;
        }
    }

    static async getRow(docId: string): Promise<any> {

        await NewPocketBaseCollection.getDb();

        try {
            return await pb.collection('New').getFirstListItem(`docId="${docId}"`);

        } catch (e) {
            // console.log(e);
            return null;
        }
    }

    static async getAll(): Promise<New[]> {

        await NewPocketBaseCollection.getDb();

        try {
            let page = 1;
            const perPage = 100; // 한 번에 가져올 레코드 수
            let allRecords: any[] = [];
            let hasMore = true;

            while (hasMore) {
                // 각 페이지별 레코드 리스트 가져오기
                const resultList = await pb.collection('New').getList({page: page, perPage: perPage});
                // 레코드를 allRecords 배열에 추가
                allRecords = allRecords.concat(resultList.items);

                // 더 이상 레코드가 없으면 종료
                if (resultList.items.length < perPage) {
                    hasMore = false;
                }

                // 다음 페이지로 이동
                page += 1;

            }

            const result: New[] = [];

            for (let i = 0; i < allRecords.length; i++) {
                result.push(New.fromMap(allRecords[i]));
            }

            return result;

        } catch (e) {
            console.log(e);
            return [];
        }

    }

    static async getByI000(value: number): Promise<New | null> {

        await NewPocketBaseCollection.getDb();

        try {
            const xs = await pb.collection('New').getFirstListItem(`i000=${value}`);

            return New.fromMap(xs);

        } catch (e) {
            return null;
        }


    }

    static async deleteAll() {
        await NewPocketBaseCollection.getDb();

        let page = 1;
        const perPage = 100; // 한 번에 가져올 레코드 수
        let allRecords: any[] = [];
        let hasMore = true;

        while (hasMore) {
            // 각 페이지별 레코드 리스트 가져오기
            const resultList = await pb.collection('New').getList({page: page, perPage: perPage});
            // 레코드를 allRecords 배열에 추가
            allRecords = allRecords.concat(resultList.items);

            // 더 이상 레코드가 없으면 종료
            if (resultList.items.length < perPage) {
                hasMore = false;
            }

            // 다음 페이지로 이동
            page += 1;

        }

        for (let i = 0; i < allRecords.length; i++) {
            await pb.collection('New').delete(allRecords[i].id);
        }

        console.log('All records are deleted');
    }

    static async resetTable() {

        await NewPocketBaseCollection.getDb();

        // 모든 컬렉션 목록 가져오기
        const collections: any[] = await pb.collections.getFullList(); // 컬렉션 목록의 타입을 any로 설정

        // 이름으로 컬렉션 찾기
        const collectionToDelete = collections.find((collection: any) => collection.name === 'New');

        if (collectionToDelete) {
            // 컬렉션 삭제 요청
            await pb.collections.delete(collectionToDelete.id);
            console.log('컬렉션 삭제 완료:', 'New');
        } else {
            console.log('컬렉션을 찾을 수 없습니다:', 'New');
        }

        await NewPocketBaseCollection.createTable();


    }


    static async upsertFile(object: New, filePath: string) {
        // 먼저 해당하는 파일이 있는지 확인후, 있을경우 업데이트 없을경우 삽입

        await NewPocketBaseCollection.getDb();

        const obj = await this.getRow(object.docId);

        try {

            if (obj == null) {
                // 이런경우 아직 디비에도 없는 경우, 먼저 디비에 삽입
                let id = await this.insert(object);


                // FormData 객체 생성
                const formData = new FormData();
                formData.append('fileName', fs.createReadStream(filePath), {
                    filename: path.basename(filePath),
                });
                // Axios를 사용하여 업로드 요청 수행
                const uploadResponse: AxiosResponse<any> = await axios.patch(`${pb.baseUrl}/api/collections/New/records/${id}`, formData, {
                    headers: {
                        ...formData.getHeaders(),
                        Authorization: `Bearer ${pb.authStore.token}`, // 인증 토큰 헤더에 추가
                    },
                });

                console.log('Buffer 업로드 완료:', uploadResponse.data);

                return uploadResponse.data;
            } else {
                // 이경우는 디비에 있는 셈, 업로드만 하면 됨
                const formData = new FormData();
                formData.append('fileName', fs.createReadStream(filePath), {
                    filename: path.basename(filePath),
                });
                // Axios를 사용하여 업로드 요청 수행
                const uploadResponse: AxiosResponse<any> = await axios.patch(`${pb.baseUrl}/api/collections/New/records/${obj.id}`, formData, {
                    headers: {
                        ...formData.getHeaders(),
                        Authorization: `Bearer ${pb.authStore.token}`, // 인증 토큰 헤더에 추가
                    },
                });

                console.log('Buffer 업로드 완료:', uploadResponse.data);

                return uploadResponse.data;

            }

        } catch (e) {
            console.log('failed to upsert', e);
            return null;
        }


    }

    static async downloadFile(object: New, filePath: string): Promise<boolean> {
        // 먼저 해당하는 파일이 서버에 있는지 확인후, 있을경우 다운로드 없을경우 실패

        await NewPocketBaseCollection.getDb();

        const obj = await this.getRow(object.docId);

        if (obj == null) {
            console.log('object is not found');
            return false;
        } else {
            try {
                // Axios를 사용하여 다운로드 요청 수행
                const downloadResponse: AxiosResponse<any> = await axios.get(`${pb.baseUrl}/api/files/${obj.collectionId}/${obj.id}/${obj.fileName}`, {
                    responseType: 'stream',
                    headers: {
                        Authorization: `Bearer ${pb.authStore.token}`, // 인증 토큰 헤더에 추가
                    },
                });

                // 파일 스트림 생성
                const fileStream = fs.createWriteStream(filePath);
                // 다운로드한 파일 스트림을 파일로 저장
                downloadResponse.data.pipe(fileStream);

                return true;
            } catch (e) {
                console.log('failed to download', e);
                return false;
            }
        }
    }

    static async getDownloadUrl(object: New | null): Promise<string | null> {
        if(object == null) {
            console.log('object is null');
            return null;
        }

        await NewPocketBaseCollection.getDb();

        const obj = await this.getRow(object.docId);

        if (obj == null) {
            console.log('object is not found');
            return null;
        } else {
            // 해당 레코드에서 파일이름을 가져옴
            const fileName = obj.fileName;
            // 파일 다운로드 URL 생성
            const downloadUrl = `${pb.baseUrl}/api/files/${obj.collectionId}/${obj.id}/${fileName}`;
            console.log('다운로드 URL:', downloadUrl);

            return downloadUrl;
        }
    }
}
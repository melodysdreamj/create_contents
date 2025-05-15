import { LegoUtil } from "../../../util";

const cloudFlareWorkersKV = require("@melodysdreamj/cloudflare-workers-kv");

export class New {
  constructor() {
    this.docId = LegoUtil.randomString(10);
  }

  // s000: string = "";
  // i000: number = 0;
  // b000: boolean = false;
  // r000: number = 0.0;
  // t000: Date = new Date(0);
  // l000: string[] = [];
  // m000: { [key: string]: any } = {};
  // c000: OtherModel = new OtherModel();
  // j000 : OtherModel[] = [];
  // e000: SomeEnum = SomeEnum.notSelected;

  docId: string = "";

  toDataString(): string {
    return btoa(
      Array.from(
        new TextEncoder().encode(
          new URLSearchParams({
            // s000: this.s000,
            // i000: this.i000.toString(),
            // b000: this.b000.toString(),
            // r000: this.r000.toString(),
            // t000: this.t000.getTime().toString(),
            // l000: JSON.stringify(this.l000),
            // m000: JSON.stringify(this.m000),
            // c000: this.c000.toDataString(),
            // j000: JSON.stringify(this.j000.map((model: OtherModel) => model.toDataString())),
            // e000: this.e000,
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
    // object.i000 = parseInt(queryParams["i000"] || "0", 10);
    // object.b000 = queryParams["b000"] === "true";
    // object.r000 = parseFloat(queryParams["r000"] || "0");
    // object.t000 = new Date(parseInt(queryParams["t000"] || "0", 10));
    // object.l000 = JSON.parse(queryParams["l000"] || "[]");
    // object.m000 = JSON.parse(queryParams["m000"] || "{}");
    // object.c000 = OtherModel.fromDataString(queryParams["c000"] || new OtherModel().toDataString());
    // object.j000 = (JSON.parse(queryParams["j000"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.e000 = SomeEnumHelper.fromString(queryParams["e000"] || SomeEnum.notSelected);
    object.docId = queryParams["docId"] || "";

    return object;
  }

  toMap(): object {
    return {
      // s000: this.s000,
      // i000: this.i000,
      // b000: this.b000 ? 1 : 0,
      // r000: this.r000,
      // t000: this.t000.getTime(),
      // l000: JSON.stringify(this.l000),
      // m000: JSON.stringify(this.m000),
      // c000: this.c000.toDataString(),
      // j000: JSON.stringify(this.j000.map((model: OtherModel) => model.toDataString())),
      // e000: this.e000,
      docId: this.docId,
    };
  }

  static fromMap(queryParams: any): New {
    const object = new New();

    // object.s000 = queryParams.s000 || '';
    // object.i000 = Number(queryParams.i000 || 0);
    // object.b000 = queryParams.b000 === 1;
    // object.r000 = queryParams.r000 || 0.0;
    // object.t000 = new Date(queryParams.t000 || 0);
    // object.l000 = JSON.parse(queryParams.l000 || '[]');
    // object.m000 = JSON.parse(queryParams.m000 || '{}');
    // object.c000 = OtherModel.fromDataString(queryParams.c000 || new OtherModel().toDataString());
    // object.j000 = (JSON.parse(queryParams.j000 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.e000 = SomeEnumHelper.fromString(queryParams.e000 || SomeEnum.notSelected);
    object.docId = queryParams.docId;

    return object;
  }
}

export class NewWorkerKV {
  static store = cloudFlareWorkersKV({
    accountId: process.env.CLOUD_FLARE_ACCOUNT_ID,
    key: process.env.CLOUD_FLARE_API_KEY,
    namespaceId: process.env.CLOUD_FLARE_NAMESPACE_ID,
    // email: 'melodydreamj@gmail.com',
  });

  static async upsert(object: New): Promise<void> {
    await NewWorkerKV.store.set(object.docId, object.toDataString());
  }

  static async get(docId: string): Promise<New | null> {
    try {
      const result = await NewWorkerKV.store.get(docId);
      return New.fromDataString(result);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  static async delete(docId: string): Promise<void> {
    await NewWorkerKV.store.delete(docId);
  }
}

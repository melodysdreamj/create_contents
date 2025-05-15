import { LegoUtil } from "../../../util";
export class Talk {
  constructor() {
    this.docId = LegoUtil.randomString(10);
  }
  conversationFrom: string = "";
  value: string = "";
  translatedValue: string = "";
  docId: string = "";
  toDataString(): string {
    return btoa(
      Array.from(
        new TextEncoder().encode(
          new URLSearchParams({
            conversationFrom: this.conversationFrom,
            value: this.value,
            translatedValue: this.translatedValue,
            docId: this.docId,
          }).toString()
        )
      )
        .map((byte) => String.fromCharCode(byte))
        .join("")
    );
  }
  static fromDataString(dataString: string): Talk {
    const queryParams = Object.fromEntries(
      new URLSearchParams(atob(dataString))
    );
    const object = new Talk();
    object.conversationFrom = queryParams["conversationFrom"] || "";
    object.value = queryParams["value"] || "";
    object.translatedValue = queryParams["translatedValue"] || "";
    object.docId = queryParams["docId"] || "";
    return object;
  }
  toMap(): object {
    return {
      conversationFrom: this.conversationFrom,
      value: this.value,
      translatedValue: this.translatedValue,
      docId: this.docId,
    };
  }
  static fromMap(queryParams: any): Talk {
    const object = new Talk();
    object.conversationFrom = queryParams.conversationFrom || "";
    object.value = queryParams.value || "";
    object.translatedValue = queryParams.translatedValue || "";
    object.docId = queryParams.docId;
    return object;
  }
}

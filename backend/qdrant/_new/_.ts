import { pipeline, cos_sim } from '@huggingface/transformers';
import { QdrantClient } from '@qdrant/js-client-rest';
import { v4 as uuidv4 } from 'uuid';


const password = "my-super-secret-key"; 
const hostAddress = "http://localhost:6333";
const vectorSize = 1024;
const distance = 'Cosine';

const connectionDetails = {
    url: hostAddress,
    apiKey: password,
}

export class New {
    constructor() {
      this.docId = uuidv4();
    }
  
    text: string = "";
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
              text: this.text,
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

    object.text = queryParams["text"] || "";
    // object.s000 = queryParams["s000"] || "";
    // object.i000 = parseInt(queryParams["i000"] || "0", 10);
    // object.b000 = parseInt(queryParams["b000"]) === 1;
    // object.r000 = parseFloat(queryParams["r000"] || "0");
    // object.t000 = new Date(parseInt(queryParams["t000"] || "0", 10));
    // object.m000 = JSON.parse(queryParams["m000"] || "{}");
    // object.c000 = OtherModel.fromDataString(queryParams["c000"] || new OtherModel().toDataString());
    // object.j000 = (JSON.parse(queryParams["j000"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.e000 = SomeEnumHelper.fromString(queryParams["e000"] || SomeEnum.notSelected);
    object.docId = queryParams["docId"] || "";

    return object;
  }

  toMap(): any {
    return {
      text: this.text,
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

    object.text = queryParams.text || "";
    // object.s000 = queryParams.s000 || '';
    // object.i000 = Number(queryParams.i000 || 0);
    // object.b000 = queryParams.b000 === 1;
    // object.r000 = queryParams.r000 || 0.0;
    // object.t000 = new Date(parseInt(queryParams.t000) || 0);
    // object.l000 = JSON.parse(queryParams.l000 || '[]');
    // object.m000 = JSON.parse(queryParams.m000 || '{}');
    // object.c000 = OtherModel.fromDataString(queryParams.c000 || new OtherModel().toDataString());
    // object.j000 = (JSON.parse(queryParams.j000 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.e000 = SomeEnumHelper.fromString(queryParams.e000 || SomeEnum.notSelected);
    object.docId = queryParams.docId;

    return object;
  }
}

export class NewQdrant {
    private static client = new QdrantClient(connectionDetails);
    private static extractor : any = null;

    // Collection 생성 (BAAI/bge-m3에 최적화)
    static async _createCollection() {
        try {
            const collectionName = "New";
            const result = await NewQdrant.client.collectionExists(collectionName);

            if (!result.exists) {
                await NewQdrant.client.createCollection(collectionName, {
                    vectors: {
                        size: vectorSize,        // BAAI/bge-m3: 1024차원
                        distance: distance,         // Inner Product - 정규화된 벡터에 더 적합
                    }
                });
                console.log(`✅ Collection "${collectionName}" was created.`);
            } else {
                console.log(`ℹ️ Collection "${collectionName}" already exists. Skipping creation.`);
            }
        } catch (error) {
            console.error(`❌ An error occurred while checking or creating the collection:`, error);
            throw error;
        }
    }

    static async upsert(object: New) {
        try {
            await NewQdrant._ready();
            const vectors = await NewQdrant._embedTexts([object.text]);
            const vector = vectors[0];
            await NewQdrant.client.upsert("New", {
                points: [{
                    id: object.docId,
                    vector: vector,
                    payload: object.toMap()
                }]
            });
        } catch (error) {
            console.error(`❌ An error occurred during upsert for docId: ${object.docId}`, error);
            throw error;
        }
    }

    // 배치 처리용 upsert
    static async upsertMany(objects: New[]) {
        try {
            await NewQdrant._ready();
            const texts = objects.map(obj => obj.text);
            const vectors = await NewQdrant._embedTexts(texts);
            
            const points = objects.map((obj, index) => ({
                id: obj.docId,
                vector: vectors[index],
                payload: obj.toMap()
            }));

            await NewQdrant.client.upsert("New", {
                points: points
            });
        } catch (error) {
            console.error(`❌ An error occurred during bulk upsert of ${objects.length} objects.`, error);
            throw error;
        }
    }

    static async delete(docId: string) {
        try {
            await NewQdrant._ready();
            await NewQdrant.client.delete("New", {
                points: [docId]
            });
        } catch (error) {
            console.error(`❌ An error occurred while deleting docId: ${docId}`, error);
            throw error;
        }
    }

    static async get(docId: string): Promise<New | null> {
        try {
            await NewQdrant._ready();
            const result = await NewQdrant.client.retrieve("New", {
                ids: [docId]
            });
            
            // 결과가 없으면 null 반환
            if (!result || result.length === 0) {
                return null;
            }
            
            const point = result[0];
            if (!point.payload) {
                console.warn(`⚠️ 포인트 ${docId}에 payload가 없습니다.`);
                return null;
            }
            
            // payload를 바로 New 객체로 변환 (이미 docId 포함)
            const newObject = New.fromMap(point.payload);
            console.log(`✅ 포인트 ${docId}를 New 객체로 변환했습니다.`);
            return newObject;
            
        } catch (error) {
            console.error(`❌ 포인트 ${docId} 조회 중 오류:`, error);
            throw error;
        }
    }

    // 모든 포인트 조회 (페이지네이션으로 전체 데이터)
    static async getAll(): Promise<New[]> {
        try {
            await NewQdrant._ready();
            const allObjects: New[] = [];
            let offset: string | number | undefined = undefined;
            let totalRetrieved = 0;
            const BATCH_SIZE = 1000; // 내부적으로 사용할 배치 크기
            
            do {
                const result = await NewQdrant.client.scroll("New", {
                    limit: BATCH_SIZE,
                    offset: offset,
                    with_payload: true,
                    with_vector: false
                });
                
                console.log(`🔄 ${result.points?.length || 0}개의 포인트를 조회했습니다. (누적: ${totalRetrieved}개)`);
                
                // 현재 배치의 포인트들을 New 객체로 변환
                if (result.points) {
                    for (const point of result.points) {
                        try {
                            if (point.payload) {
                                // payload를 바로 New 객체로 변환 (이미 docId 포함)
                                const newObject = New.fromMap(point.payload);
                                allObjects.push(newObject);
                                totalRetrieved++;
                            }
                        } catch (convertError) {
                            console.warn(`⚠️ 포인트 ${point.id} 변환 실패:`, convertError);
                            // 변환 실패한 포인트는 건너뛰기
                        }
                    }
                }
                
                // 다음 페이지 오프셋 설정
                const nextOffset = result.next_page_offset;
                offset = (typeof nextOffset === 'string' || typeof nextOffset === 'number') 
                    ? nextOffset 
                    : undefined;
                
            } while (offset !== null && offset !== undefined);
            
            console.log(`✅ 전체 ${totalRetrieved}개의 New 객체를 조회했습니다.`);
            return allObjects;
        } catch (error) {
            console.error(`❌ 전체 포인트 조회 중 오류:`, error);
            throw error;
        }
    }

    static async search(query: string, limit: number = 3): Promise<New[]> {
        try {
            await NewQdrant._ready();
            // 쿼리 텍스트를 임베딩으로 변환
            const vectors = await NewQdrant._embedTexts([query]);
            const queryVector = vectors[0];
            
            // Qdrant에서 유사도 검색
            const searchResults = await NewQdrant.client.search("New", {
                vector: queryVector,
                limit: limit,
                with_payload: true,
                with_vector: false
            });
            
            console.log(`🔍 "${query}"에 대한 ${searchResults.length}개의 검색 결과를 찾았습니다.`);
            
            // 검색 결과를 New 객체로 변환
            const objects: New[] = [];
            for (const result of searchResults) {
                try {
                    if (result.payload) {
                        // payload를 바로 New 객체로 변환 (이미 docId 포함)
                        const newObject = New.fromMap(result.payload);
                        objects.push(newObject);
                    }
                } catch (convertError) {
                    console.warn(`⚠️ 검색 결과 ${result.id} 변환 실패:`, convertError);
                    // 변환 실패한 결과는 건너뛰기
                }
            }
            
            console.log(`✅ ${objects.length}개의 New 객체로 변환되었습니다.`);
            return objects;
        } catch (error) {
            console.error(`❌ 검색 중 오류:`, error);
            throw error;
        }
    }

    static async reset() {
        await NewQdrant.client.deleteCollection("New");
        NewQdrant._isReady = false;
    }


    // 텍스트 임베딩 (단일/배치 모두 지원)
    static async _embedTexts(texts: string[]): Promise<number[][]> {

        if (NewQdrant.extractor === null) {
            console.log("🔄 BGE-M3 모델 초기화 중...");
            NewQdrant.extractor = await pipeline('feature-extraction', 'Xenova/bge-m3');
        }
        console.log(`🔄 ${texts.length}개의 텍스트를 임베딩하는 중...`);
          
        // BGE-M3로 임베딩 생성 (CLS pooling과 정규화 적용)
        const embeddings = await NewQdrant.extractor(texts, { 
          pooling: 'cls', 
          normalize: true 
        });
        
        // JavaScript 배열로 변환
        const embeddingsList = embeddings.tolist();
        
        console.log(`✅ ${texts.length}개의 임베딩이 생성되었습니다.`);
        return embeddingsList;
    }

    private static _isReady = false;
    static async _ready() {
        if (NewQdrant._isReady) return;
        await NewQdrant._createCollection(); 
        NewQdrant._isReady = true;
    }
}
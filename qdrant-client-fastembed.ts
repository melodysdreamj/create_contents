import { pipeline, cos_sim } from '@huggingface/transformers';
import { QdrantClient } from '@qdrant/js-client-rest';
import { v4 as uuidv4 } from 'uuid';

// 타입 정의
interface DocumentWithMetadata {
  id: string;
  text: string;
  category: string;
  author: string;
  tags: string[];
}

interface SearchResult {
  id: string;
  score: number;
  text: string;
  metadata: any;
}

class QdrantBGEM3Client {
  private client: QdrantClient;
  private extractor: any = null;
  private collectionName: string = 'documents';
  
  constructor(url: string = 'http://localhost:6333', apiKey: string = 'my-super-secret-key') {
    this.client = new QdrantClient({
      url: url,
      apiKey: apiKey,
    });
  }
  
  async initialize(): Promise<void> {
    console.log('🚀 BAAI/bge-m3 모델을 초기화하는 중...');
    
    // Xenova/bge-m3 모델로 feature-extraction 파이프라인 생성
    this.extractor = await pipeline('feature-extraction', 'Xenova/bge-m3');
    
    console.log('✅ BAAI/bge-m3 모델이 성공적으로 초기화되었습니다!');
  }
  
  async createCollection(): Promise<void> {
    try {
      console.log('📚 컬렉션을 생성하는 중...');
      
      await this.client.createCollection(this.collectionName, {
        vectors: {
          size: 1024, // BGE-M3의 임베딩 차원
          distance: 'Cosine'
        }
      });
      
      console.log('✅ 컬렉션이 성공적으로 생성되었습니다.');
         } catch (error: any) {
       if (error.message?.includes('already exists') || error.status === 409 || error.statusText === 'Conflict') {
         console.log('ℹ️  컬렉션이 이미 존재합니다.');
       } else {
         console.error('❌ 컬렉션 생성 중 오류:', error);
         throw error;
       }
     }
  }
  
  async embedTexts(texts: string[]): Promise<number[][]> {
    if (!this.extractor) {
      throw new Error('모델이 초기화되지 않았습니다. initialize()를 먼저 호출해주세요.');
    }
    
    console.log(`🔄 ${texts.length}개의 텍스트를 임베딩하는 중...`);
    
    // BGE-M3로 임베딩 생성 (CLS pooling과 정규화 적용)
    const embeddings = await this.extractor(texts, { 
      pooling: 'cls', 
      normalize: true 
    });
    
    // JavaScript 배열로 변환
    const embeddingsList = embeddings.tolist();
    
    console.log(`✅ ${texts.length}개의 임베딩이 생성되었습니다.`);
    return embeddingsList;
  }
  
  async addDocuments(documents: DocumentWithMetadata[]): Promise<string[]> {
    try {
      console.log(`📝 ${documents.length}개의 문서를 추가하는 중...`);
      
      // 텍스트만 추출하여 임베딩 생성
      const texts = documents.map(doc => doc.text);
      const embeddings = await this.embedTexts(texts);
      
      // Qdrant 포인트 형식으로 변환
      const points = documents.map((doc, index) => ({
        id: doc.id,
        vector: embeddings[index],
        payload: {
          text: doc.text,
          category: doc.category,
          author: doc.author,
          tags: doc.tags
        }
      }));
      
      // Qdrant에 업로드
      await this.client.upsert(this.collectionName, {
        wait: true,
        points: points
      });
      
      console.log(`✅ ${documents.length}개의 문서가 성공적으로 추가되었습니다.`);
      return documents.map(doc => doc.id);
    } catch (error) {
      console.error('❌ 문서 추가 중 오류:', error);
      throw error;
    }
  }
  
  async searchDocuments(queryText: string, limit: number = 3): Promise<SearchResult[]> {
    try {
      console.log(`🔍 "${queryText}"에 대한 검색 중...`);
      
      // 쿼리 텍스트를 임베딩으로 변환
      const queryEmbeddings = await this.embedTexts([queryText]);
      const queryVector = queryEmbeddings[0];
      
      // Qdrant에서 유사도 검색
      const searchResults = await this.client.search(this.collectionName, {
        vector: queryVector,
        limit: limit,
        with_payload: true
      });
      
      // 결과 형식 변환
      const results: SearchResult[] = searchResults.map(result => ({
        id: result.id as string,
        score: result.score,
        text: result.payload?.text as string,
        metadata: {
          category: result.payload?.category,
          author: result.payload?.author,
          tags: result.payload?.tags
        }
      }));
      
      console.log(`✅ ${results.length}개의 검색 결과를 찾았습니다.`);
      return results;
    } catch (error) {
      console.error('❌ 검색 중 오류:', error);
      throw error;
    }
  }
  
  async getCollectionInfo(): Promise<any> {
         try {
       const info = await this.client.getCollection(this.collectionName);
       console.log('\n📊 컬렉션 정보:');
       console.log('='.repeat(30));
       console.log(`이름: ${this.collectionName}`);
       console.log(`포인트 수: ${info.points_count}`);
       console.log(`벡터 차원: ${info.config?.params?.vectors?.size || '알 수 없음'}`);
       console.log(`거리 메트릭: ${info.config?.params?.vectors?.distance || '알 수 없음'}`);
       return info;
     } catch (error) {
       console.error('❌ 컬렉션 정보 조회 중 오류:', error);
       throw error;
     }
  }
}

function printSearchResults(results: SearchResult[], title: string): void {
  console.log(`\n${title}`);
  console.log('='.repeat(50));
  
  if (results.length === 0) {
    console.log('검색 결과가 없습니다.');
    return;
  }
  
  results.forEach((result, index) => {
    console.log(`${index + 1}. 점수: ${result.score.toFixed(4)}`);
    console.log(`   ID: ${result.id}`);
    console.log(`   텍스트: ${result.text}`);
    console.log(`   카테고리: ${result.metadata.category}`);
    console.log(`   작성자: ${result.metadata.author}`);
    console.log(`   태그: ${result.metadata.tags?.join(', ')}`);
    console.log('-'.repeat(30));
  });
}

async function main(): Promise<void> {
  try {
    console.log('Qdrant + BAAI/bge-m3 TypeScript 임베딩 검색 예제 시작');
    console.log('='.repeat(70));
    console.log('🎯 Xenova/bge-m3를 사용한 실제 BAAI/bge-m3 임베딩');
    console.log('');
    
    // 클라이언트 생성 및 초기화
    const client = new QdrantBGEM3Client();
    await client.initialize();
    
    // 컬렉션 생성
    await client.createCollection();
    
    // 샘플 문서들
    const documents: DocumentWithMetadata[] = [
      {
        id: uuidv4(),
        text: '인공지능은 미래 기술의 핵심이며 다양한 산업에서 혁신을 이끌고 있습니다.',
        category: 'technology',
        author: 'AI연구소',
        tags: ['AI', '혁신', '미래기술']
      },
      {
        id: uuidv4(),
        text: '머신러닝과 딥러닝은 인공지능의 중요한 분야로 빠르게 발전하고 있습니다.',
        category: 'technology',
        author: 'ML전문가',
        tags: ['ML', '딥러닝', '발전']
      },
      {
        id: uuidv4(),
        text: '자연어 처리 기술은 언어 모델의 발전으로 획기적인 성과를 보이고 있습니다.',
        category: 'nlp',
        author: 'NLP연구원',
        tags: ['NLP', '언어모델', '성과']
      },
      {
        id: uuidv4(),
        text: '벡터 데이터베이스는 AI 애플리케이션에서 유사도 검색의 핵심 요소입니다.',
        category: 'database',
        author: 'DB전문가',
        tags: ['벡터DB', '검색', '핵심요소']
      },
      {
        id: uuidv4(),
        text: '한국의 전통 음식인 김치는 발효 과정을 통해 다양한 영양소를 제공합니다.',
        category: 'culture',
        author: '문화연구자',
        tags: ['음식', '전통', '영양소']
      },
      {
        id: uuidv4(),
        text: '블록체인 기술은 탈중앙화된 시스템을 통해 신뢰성을 확보합니다.',
        category: 'technology',
        author: '블록체인연구자',
        tags: ['블록체인', '탈중앙화', '신뢰성']
      }
    ];
    
    // 문서들 추가
    const ids = await client.addDocuments(documents);
    console.log(`📊 추가된 문서 ID들: ${ids.length}개`);
    
    // 컬렉션 정보 확인
    await client.getCollectionInfo();
    
    // 다양한 검색 예제들
    const searchQueries = [
      '딥러닝과 머신러닝 기술에 대해 알려주세요',
      '한국 전통 문화와 음식',
      '데이터베이스와 벡터 검색',
      '블록체인 기술의 특징'
    ];
    
    for (const query of searchQueries) {
      const results = await client.searchDocuments(query, 3);
      printSearchResults(results, `"${query}" 검색 결과`);
    }
    
    console.log('\n🎉 예제가 성공적으로 완료되었습니다!');
    console.log('💡 TypeScript에서 실제 BAAI/bge-m3 모델을 사용한 고품질 임베딩 검색입니다.');
    console.log('🔧 Xenova/bge-m3는 원본 BAAI/bge-m3의 ONNX 변환 버전입니다.');
    console.log('📝 이 방법으로 TypeScript에서도 최신 임베딩 모델을 활용할 수 있습니다!');
    
  } catch (error) {
    console.error('❌ 예제 실행 중 오류 발생:', error);
    process.exit(1);
  }
}

// 필요한 패키지 설치 안내
console.log('💡 이 예제를 실행하기 전에 다음 패키지들을 설치해주세요:');
console.log('npm install @huggingface/transformers @qdrant/js-client-rest uuid');
console.log('npm install --save-dev @types/uuid');
console.log('');

// 메인 함수 실행
if (require.main === module) {
  main();
}

export { QdrantBGEM3Client };
export type { DocumentWithMetadata, SearchResult }; 
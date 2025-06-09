import { QdrantClient } from '@qdrant/js-client-rest';
import { v4 as uuidv4 } from 'uuid';

// Qdrant 클라이언트 설정
const client = new QdrantClient({
  url: 'http://localhost:6333',
  apiKey: 'my-super-secret-key', // Docker 실행 시 설정한 API 키
});

// 간단한 임베딩 함수 (실제 프로덕션에서는 BAAI/bge-m3 같은 모델 사용)
function createEmbedding(text: string): number[] {
  // 텍스트를 1024차원 벡터로 변환하는 간단한 방법
  const vector = new Array(1024).fill(0);
  
  // 텍스트의 각 문자를 벡터 요소로 변환
  for (let i = 0; i < text.length && i < 512; i++) {
    const charCode = text.charCodeAt(i);
    vector[i] = (charCode % 256) / 255.0; // 0-1 범위로 정규화
    vector[i + 512] = Math.sin(charCode * 0.01); // 추가 특성
  }
  
  // 벡터 정규화 (단위벡터로 만들기)
  const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return vector.map(val => val / (norm || 1));
}

// 컬렉션(테이블) 생성
async function createCollection() {
  try {
    console.log('컬렉션을 생성하는 중...');
    
    const collectionName = 'documents';
    
    // 기존 컬렉션이 있는지 확인
    try {
      await client.getCollection(collectionName);
      console.log('컬렉션이 이미 존재합니다.');
      return;
    } catch (error) {
      // 컬렉션이 없으면 새로 생성
    }
    
    await client.createCollection(collectionName, {
      vectors: {
        size: 1024, // 벡터 차원
        distance: 'Cosine', // 코사인 유사도 사용
      },
    });
    
    console.log('컬렉션이 성공적으로 생성되었습니다.');
  } catch (error) {
    console.error('컬렉션 생성 중 오류:', error);
    throw error;
  }
}

// 데이터 삽입
async function insertData() {
  try {
    console.log('데이터를 삽입하는 중...');
    
    const collectionName = 'documents';
    
    // 샘플 문서들
    const documents = [
      {
        id: uuidv4(),
        text: '인공지능은 미래 기술의 핵심입니다.',
        metadata: { category: 'technology', author: 'AI연구소' }
      },
      {
        id: uuidv4(),
        text: '머신러닝과 딥러닝은 AI의 중요한 분야입니다.',
        metadata: { category: 'technology', author: 'ML전문가' }
      },
      {
        id: uuidv4(),
        text: '자연어 처리 기술이 급속도로 발전하고 있습니다.',
        metadata: { category: 'nlp', author: 'NLP연구원' }
      },
      {
        id: uuidv4(),
        text: '벡터 데이터베이스는 AI 애플리케이션의 필수 요소입니다.',
        metadata: { category: 'database', author: 'DB전문가' }
      },
      {
        id: uuidv4(),
        text: '한국의 전통 음식인 김치는 세계적으로 유명합니다.',
        metadata: { category: 'culture', author: '문화연구자' }
      },
    ];
    
    // 각 문서를 임베딩하고 포인트 생성
    const points = documents.map(doc => {
      console.log(`"${doc.text}" 임베딩 중...`);
      return {
        id: doc.id,
        vector: createEmbedding(doc.text),
        payload: {
          text: doc.text,
          ...doc.metadata
        }
      };
    });
    
    // 배치로 데이터 삽입
    await client.upsert(collectionName, {
      wait: true,
      points: points
    });
    
    console.log(`${points.length}개의 문서가 성공적으로 삽입되었습니다.`);
    
    // 삽입된 데이터 ID 출력
    points.forEach((point, index) => {
      console.log(`문서 ${index + 1}: ID = ${point.id}`);
    });
    
  } catch (error) {
    console.error('데이터 삽입 중 오류:', error);
    throw error;
  }
}

// 유사도 검색
async function searchSimilar(queryText: string, limit: number = 3) {
  try {
    console.log(`\n"${queryText}"에 대한 유사 문서를 검색하는 중...`);
    
    const collectionName = 'documents';
    
    // 쿼리 텍스트를 벡터로 변환
    const queryVector = createEmbedding(queryText);
    
    // 유사도 검색
    const searchResult = await client.search(collectionName, {
      vector: queryVector,
      limit: limit,
      with_payload: true,
    });
    
    console.log(`\n검색 결과 (상위 ${limit}개):`);
    console.log('='.repeat(50));
    
    searchResult.forEach((result, index) => {
      console.log(`${index + 1}. 점수: ${result.score?.toFixed(4)}`);
      console.log(`   ID: ${result.id}`);
      console.log(`   텍스트: ${result.payload?.text}`);
      console.log(`   카테고리: ${result.payload?.category}`);
      console.log(`   작성자: ${result.payload?.author}`);
      console.log('-'.repeat(30));
    });
    
    return searchResult;
  } catch (error) {
    console.error('검색 중 오류:', error);
    throw error;
  }
}

// 필터링 검색
async function searchWithFilter(queryText: string, category: string) {
  try {
    console.log(`\n"${queryText}"에 대한 "${category}" 카테고리 문서 검색 중...`);
    
    const collectionName = 'documents';
    const queryVector = createEmbedding(queryText);
    
    const searchResult = await client.search(collectionName, {
      vector: queryVector,
      limit: 5,
      filter: {
        must: [
          {
            key: 'category',
            match: { value: category }
          }
        ]
      },
      with_payload: true,
    });
    
    console.log(`\n필터링된 검색 결과:`);
    console.log('='.repeat(50));
    
    if (searchResult.length === 0) {
      console.log('조건에 맞는 문서가 없습니다.');
    } else {
      searchResult.forEach((result, index) => {
        console.log(`${index + 1}. 점수: ${result.score?.toFixed(4)}`);
        console.log(`   텍스트: ${result.payload?.text}`);
        console.log(`   작성자: ${result.payload?.author}`);
        console.log('-'.repeat(30));
      });
    }
    
    return searchResult;
  } catch (error) {
    console.error('필터링 검색 중 오류:', error);
    throw error;
  }
}

// 특정 ID로 문서 조회
async function getDocument(documentId: string) {
  try {
    const collectionName = 'documents';
    
    const result = await client.retrieve(collectionName, {
      ids: [documentId],
      with_payload: true,
      with_vector: false
    });
    
    if (result.length > 0) {
      console.log('\n문서 조회 결과:');
      console.log(`ID: ${result[0].id}`);
      console.log(`텍스트: ${result[0].payload?.text}`);
      console.log(`카테고리: ${result[0].payload?.category}`);
      console.log(`작성자: ${result[0].payload?.author}`);
    } else {
      console.log('문서를 찾을 수 없습니다.');
    }
    
    return result;
  } catch (error) {
    console.error('문서 조회 중 오류:', error);
    throw error;
  }
}

// 컬렉션 정보 조회
async function getCollectionInfo() {
  try {
    const collectionName = 'documents';
    const info = await client.getCollection(collectionName);
    
    console.log('\n컬렉션 정보:');
    console.log('='.repeat(30));
    console.log(`이름: ${collectionName}`);
    console.log(`포인트 수: ${info.points_count}`);
    console.log(`벡터 크기: ${info.config?.params?.vectors?.size}`);
    console.log(`거리 측정: ${info.config?.params?.vectors?.distance}`);
    
    return info;
  } catch (error) {
    console.error('컬렉션 정보 조회 중 오류:', error);
    throw error;
  }
}

// 새 문서 추가 함수
async function addDocument(text: string, category: string, author: string) {
  try {
    const collectionName = 'documents';
    const documentId = uuidv4();
    
    console.log(`새 문서 추가: "${text}"`);
    
    const point = {
      id: documentId,
      vector: createEmbedding(text),
      payload: {
        text: text,
        category: category,
        author: author
      }
    };
    
    await client.upsert(collectionName, {
      wait: true,
      points: [point]
    });
    
    console.log(`문서가 성공적으로 추가되었습니다. ID: ${documentId}`);
    return documentId;
  } catch (error) {
    console.error('문서 추가 중 오류:', error);
    throw error;
  }
}

// 메인 함수
async function main() {
  try {
    console.log('Qdrant 벡터 데이터베이스 예제 시작');
    console.log('='.repeat(50));
    
    // 1. 컬렉션 생성
    await createCollection();
    
    // 2. 데이터 삽입
    await insertData();
    
    // 3. 컬렉션 정보 확인
    await getCollectionInfo();
    
    // 4. 유사도 검색 예제들
    await searchSimilar('딥러닝 기술은 어떤가요?');
    await searchSimilar('데이터베이스 관련 정보');
    await searchSimilar('한국 음식 문화');
    
    // 5. 필터링 검색 예제
    await searchWithFilter('기술', 'technology');
    await searchWithFilter('문화', 'culture');
    
    // 6. 새 문서 추가 예제
    const newDocId = await addDocument(
      '블록체인 기술은 탈중앙화된 시스템을 구현합니다.',
      'technology',
      '블록체인연구자'
    );
    
    // 7. 추가된 문서 조회
    await getDocument(newDocId);
    
    // 8. 업데이트된 컬렉션 정보 확인
    await getCollectionInfo();
    
    console.log('\n예제가 성공적으로 완료되었습니다!');
    
  } catch (error) {
    console.error('예제 실행 중 오류 발생:', error);
  }
}

// 프로그램 실행
if (require.main === module) {
  main();
}

export { 
  createCollection, 
  insertData, 
  searchSimilar, 
  searchWithFilter, 
  getCollectionInfo,
  addDocument,
  getDocument,
  createEmbedding
}; 
# Qdrant + BAAI/bge-m3 TypeScript 벡터 검색 시스템 완전 설치 가이드

## 🎯 개요
TypeScript에서 실제 BAAI/bge-m3 임베딩 모델을 사용하여 Qdrant 벡터 데이터베이스로 고품질 의미 검색 시스템을 구축하는 방법입니다.

## 📋 필수 준비사항

### 1. 시스템 요구사항
- macOS, Windows, 또는 Linux
- 최소 8GB RAM (16GB 권장)
- 인터넷 연결

## 🚀 1단계: Docker 설치

### macOS
```bash
# Homebrew가 없다면 먼저 설치
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Docker 설치
brew install --cask docker

# Docker 앱을 실행하고 시스템 트레이에서 Docker가 실행 중인지 확인
```

### Windows
1. [Docker Desktop for Windows](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe) 다운로드
2. 설치 파일 실행 후 안내에 따라 설치
3. Docker Desktop 실행

### Linux (Ubuntu/Debian)
```bash
# Docker 설치
sudo apt update
sudo apt install -y docker.io docker-compose

# Docker 서비스 시작
sudo systemctl start docker
sudo systemctl enable docker

# 현재 사용자를 docker 그룹에 추가
sudo usermod -aG docker $USER

# 로그아웃 후 다시 로그인하거나 다음 명령어 실행
newgrp docker
```

### Docker 설치 확인
```bash
docker --version
docker run hello-world
```

## 🗄️ 2단계: Qdrant 도커 서버 실행

```bash
# Qdrant 도커 이미지 다운로드
docker pull qdrant/qdrant

# Qdrant 서버 실행 (백그라운드에서 실행)
docker run -d \
  -p 6333:6333 \
  -p 6334:6334 \
  -v $(pwd)/qdrant_storage:/qdrant/storage \
  -e QDRANT__SERVICE__API_KEY="my-super-secret-key" \
  --name qdrant-server \
  qdrant/qdrant:latest

# 실행 상태 확인
docker ps

# Qdrant 웹 UI 접속 확인
# 브라우저에서 http://localhost:6333 접속
```

## 💻 3단계: Node.js 및 npm 설치

### macOS
```bash
# Homebrew로 Node.js 설치
brew install node

# 또는 공식 사이트에서 다운로드
# https://nodejs.org/
```

### Windows
1. [Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전 다운로드
2. 설치 파일 실행 후 안내에 따라 설치

### Linux
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# 또는 snap 사용
sudo snap install node --classic
```

### Node.js 설치 확인
```bash
node --version
npm --version
```

## 📁 4단계: 프로젝트 설정

```bash
# 프로젝트 디렉토리 생성
mkdir qdrant-typescript-demo
cd qdrant-typescript-demo

# package.json 생성
npm init -y

# TypeScript 설정
npm install -g tsx  # 전역 설치 (선택사항)
```

## 📦 5단계: 필요한 라이브러리 설치

```bash
# 핵심 라이브러리 설치
npm install @huggingface/transformers @qdrant/js-client-rest uuid

# TypeScript 타입 정의 설치
npm install --save-dev @types/uuid

# 추가 유틸리티 (선택사항)
npm install --save-dev @types/node typescript
```

### package.json 확인
설치 후 package.json이 다음과 같이 되어야 합니다:
```json
{
  "dependencies": {
    "@huggingface/transformers": "^3.x.x",
    "@qdrant/js-client-rest": "^1.x.x",
    "uuid": "^10.x.x"
  },
  "devDependencies": {
    "@types/uuid": "^10.x.x"
  }
}
```

## 📄 6단계: TypeScript 코드 파일 생성

현재 디렉토리에 `qdrant-client-fastembed.ts` 파일을 생성하고 다음 코드를 복사합니다:

```typescript
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

// 메인 함수 실행
if (require.main === module) {
  main();
}

export { QdrantBGEM3Client };
export type { DocumentWithMetadata, SearchResult };
```

## ▶️ 7단계: 실행하기

### 실행 전 체크리스트
1. ✅ Docker가 실행 중인가?
   ```bash
   docker ps | grep qdrant-server
   ```

2. ✅ Qdrant 서버 접속 확인
   ```bash
   curl http://localhost:6333
   # 또는 브라우저에서 http://localhost:6333 접속
   ```

### 실행 명령어
```bash
# tsx 사용 (권장)
npx tsx qdrant-client-fastembed.ts

# 또는 Node.js로 직접 실행 (TypeScript 컴파일 필요)
npx tsc qdrant-client-fastembed.ts --target es2020 --module commonjs --lib es2020
node qdrant-client-fastembed.js
```

## 🎯 실행 결과 예시

성공적으로 실행되면 다음과 같은 출력이 나타납니다:

```
Qdrant + BAAI/bge-m3 TypeScript 임베딩 검색 예제 시작
======================================================================
🎯 Xenova/bge-m3를 사용한 실제 BAAI/bge-m3 임베딩

🚀 BAAI/bge-m3 모델을 초기화하는 중...
✅ BAAI/bge-m3 모델이 성공적으로 초기화되었습니다!
📚 컬렉션을 생성하는 중...
✅ 컬렉션이 성공적으로 생성되었습니다.

📝 6개의 문서를 추가하는 중...
🔄 6개의 텍스트를 임베딩하는 중...
✅ 6개의 임베딩이 생성되었습니다.
✅ 6개의 문서가 성공적으로 추가되었습니다.

📊 컬렉션 정보:
==============================
이름: documents
포인트 수: 6
벡터 차원: 1024
거리 메트릭: Cosine

"딥러닝과 머신러닝 기술에 대해 알려주세요" 검색 결과
==================================================
1. 점수: 0.6784
   텍스트: 머신러닝과 딥러닝은 인공지능의 중요한 분야로 빠르게 발전하고 있습니다.
   카테고리: technology
   작성자: ML전문가
   ...

🎉 예제가 성공적으로 완료되었습니다!
```

## 🔧 문제 해결

### 자주 발생하는 오류와 해결책

#### 1. Docker 관련 오류
```bash
# Docker가 실행되지 않는 경우
docker info

# Docker 서비스 재시작 (Linux/macOS)
sudo systemctl restart docker

# Docker Desktop 재시작 (Windows/macOS)
# 애플리케이션을 종료하고 다시 시작
```

#### 2. Qdrant 연결 오류
```bash
# Qdrant 컨테이너 상태 확인
docker ps -a | grep qdrant

# Qdrant 로그 확인
docker logs qdrant-server

# Qdrant 재시작
docker restart qdrant-server
```

#### 3. 메모리 부족 오류
```bash
# Docker 메모리 제한 늘리기
docker update --memory=8g qdrant-server

# 또는 더 작은 배치 사이즈로 실행
# 코드에서 texts 배열을 더 작게 나누어 처리
```

#### 4. 네트워크 오류
```bash
# 포트 사용 확인
lsof -i :6333

# 방화벽 설정 확인 (Linux)
sudo ufw allow 6333
```

## 🚀 다음 단계

이제 기본 시스템이 구축되었으니, 다음과 같은 확장을 해볼 수 있습니다:

1. **웹 API 서버 구축** (Express.js + FastAPI)
2. **프론트엔드 연동** (React, Vue.js)
3. **대용량 문서 처리** (PDF, 텍스트 파일 업로드)
4. **필터링 및 고급 검색** 기능
5. **실시간 검색** 인터페이스

## 📚 참고 자료

- [Qdrant 공식 문서](https://qdrant.tech/documentation/)
- [BAAI/bge-m3 모델 페이지](https://huggingface.co/BAAI/bge-m3)
- [Xenova/bge-m3 (ONNX 버전)](https://huggingface.co/Xenova/bge-m3)
- [Hugging Face Transformers.js](https://huggingface.co/docs/transformers.js/)

---

💡 **이 가이드를 따라하시면 TypeScript에서 최신 BAAI/bge-m3 임베딩 모델을 사용한 완전한 벡터 검색 시스템을 구축할 수 있습니다!** 
# Qdrant + BAAI/bge-m3 TypeScript 예제

Docker로 실행한 Qdrant에서 BAAI/bge-m3 모델을 사용하여 벡터 검색을 수행하는 TypeScript 예제입니다.

## 🚀 빠른 시작

### 1. Qdrant 서버 실행

```bash
# 기본 Qdrant 실행
docker volume create qdrant_data
docker run -d \
  -p 6333:6333 \
  -p 6334:6334 \
  -v qdrant_data:/qdrant/storage \
  -e QDRANT__SERVICE__API_KEY="my-super-secret-key" \
  --name qdrant-server \
  qdrant/qdrant:latest
```

### 2. 패키지 설치

```bash
npm install @qdrant/js-client-rest uuid @types/uuid axios
```

### 3. 예제 실행

```bash
# 간단한 예제 (즉시 실행 가능)
npx tsx qdrant-simple-example.ts

# 실제 BAAI/bge-m3 모델 사용 (FastEmbed 필요)
npx tsx qdrant-bge-real.ts
```

## 📁 파일 구조

- **`qdrant-simple-example.ts`** - 간단한 벡터 생성을 사용한 즉시 실행 가능한 예제
- **`qdrant-bge-real.ts`** - 실제 BAAI/bge-m3 모델을 사용하는 완전한 예제
- **`qdrant-bge-example.md`** - BAAI/bge-m3 상세 사용법 가이드

## 🎯 주요 기능

### ✅ 완전한 벡터 데이터베이스 작업
- 컬렉션 생성 (테이블 생성)
- 문서 삽입 (UUID 자동 생성)
- 유사도 검색
- 필터링 검색
- 배치 처리

### 🔍 검색 예제
```typescript
// 기본 검색
const results = await client.search('딥러닝 기술', 3);

// 필터링 검색
const techResults = await client.searchWithFilter('혁신', 'technology');
```

## 🚨 BAAI/bge-m3 사용 시 주의사항

`qdrant-bge-real.ts`를 사용하려면 FastEmbed가 활성화된 Qdrant가 필요합니다:

```bash
# FastEmbed 활성화된 Qdrant 재시작
docker stop qdrant-server && docker rm qdrant-server
docker run -d \
  -p 6333:6333 \
  -p 6334:6334 \
  -v qdrant_data:/qdrant/storage \
  -e QDRANT__SERVICE__API_KEY="my-super-secret-key" \
  -e QDRANT__SERVICE__ENABLE_FASTEMBED=true \
  --name qdrant-server \
  qdrant/qdrant:latest
```

## 💡 권장 사항

1. **개발/테스트**: `qdrant-simple-example.ts` 사용
2. **프로덕션**: `qdrant-bge-real.ts` + FastEmbed 사용
3. **상세 가이드**: `qdrant-bge-example.md` 참조

## 🔧 문제 해결

- **연결 오류**: Qdrant 서버가 실행 중인지 확인
- **FastEmbed 오류**: 환경변수 `QDRANT__SERVICE__ENABLE_FASTEMBED=true` 확인
- **메모리 부족**: BAAI/bge-m3는 상당한 메모리를 사용합니다 
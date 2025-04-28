import { Check, CheckPostgresql } from "./_";
import { Sub } from "./sub";
import { TestEnumTest } from "./test_enum";

async function main() {
  console.log("[시작] main 함수 실행 시작");

  console.log("[정보] Check 객체 생성 및 초기화 시작");
  let check = new Check();
  check.docId = "example";
  check.s000 = "banana";
  check.i000 = 123;
  check.b000 = true;
  check.r000 = 3.14;
  check.l000 = ["apple", "banana", "cherry"];

  console.log("[정보] Sub 객체(c000) 생성 및 할당");
  let sub = new Sub();
  sub.s000 = "apple";
  check.c000 = sub;

  console.log("[정보] m000 맵 데이터 할당");
  check.m000 = {
    apple: "red",
    banana: "yellow",
    cherry: "red0",
    age: 20,
    sex: false,
    height: 170.5,
    weight: 60.5,
  };

  console.log("[정보] Sub 객체 배열(j000) 생성 및 할당");
  let sub1 = new Sub();
  sub1.s000 = "banana";
  sub1.l000 = ["apple", "banana", "cherry"];
  let sub2 = new Sub();
  sub2.s000 = "cherry";
  let sub3 = new Sub();
  sub3.s000 = "apple";
  check.j000 = [sub1, sub2, sub3];

  console.log("[정보] e000 Enum 값 할당");
  check.e000 = TestEnumTest.p001;

  console.log("[정보] upsert 전 Check 객체 상태:", check.toMap());

  try {
    console.log("[시작] CheckPostgresql.upsert 호출");
    await CheckPostgresql.upsert(check);
    console.log("[성공] CheckPostgresql.upsert 완료");
  } catch (error) {
    console.error("[오류] CheckPostgresql.upsert 중 오류 발생:", error);
    throw error; // 오류를 다시 던져서 main 함수 catch 블록에서 처리하도록 함
  }

  let check2: Check | null = null;
  try {
    console.log("[시작] CheckPostgresql.get 호출 (docId: example)");
    check2 = await CheckPostgresql.get("example");
    console.log("[성공] CheckPostgresql.get 완료");
  } catch (error) {
    console.error("[오류] CheckPostgresql.get 중 오류 발생:", error);
    throw error; // 오류를 다시 던져서 main 함수 catch 블록에서 처리하도록 함
  }

  if (check2) {
    console.log("[정보] get 후 Check 객체 상태:", check2.toMap());
    console.log("[정보] get 결과 c000:", check2.c000.toMap());
    console.log("[정보] get 결과 j000[0]:", check2.j000[0].toMap());
    console.log("[정보] get 결과 m000:", check2.m000);
    console.log("[정보] get 결과 m000['weight']:", check2.m000["weight"]);
  } else {
    console.log("[정보] CheckPostgresql.get 결과가 null입니다.");
  }

  console.log("[종료] main 함수 실행 완료");
}

main().catch((err) => {
  console.error("[치명적 오류] main 함수 실행 중 예외 발생:", err);
  process.exit(1);
});

export {};

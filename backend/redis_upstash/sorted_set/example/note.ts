import {ExampleRedisSortedSet} from "./_";

async function main() {
    console.log("start");

// Sorted Set에 값 추가
    await ExampleRedisSortedSet.add("leaderboard", "user1", 100);
    await ExampleRedisSortedSet.add("leaderboard", "user2", 150);
    await ExampleRedisSortedSet.add("leaderboard", "user3", 200);

// 점수 순으로 범위 내의 사용자 가져오기 (오름차순)
    const topUsers = await ExampleRedisSortedSet.getRange("leaderboard", 0, -1);
    console.log(topUsers); // ["user1", "user2", "user3"]

// 특정 사용자 순위 조회 (오름차순)
    const user1Rank = await ExampleRedisSortedSet.getRank("leaderboard", "user1");
    console.log(user1Rank); // 0

// 특정 사용자 순위 조회 (내림차순)
    const user1RankDesc = await ExampleRedisSortedSet.getRankDesc("leaderboard", "user1");
    console.log(user1RankDesc); // 2

// 특정 사용자 점수 조회
    const user1Score = await ExampleRedisSortedSet.getScore("leaderboard", "user1");
    console.log(user1Score); // 100

// 특정 점수 범위의 사용자 조회
    const midRangeUsers = await ExampleRedisSortedSet.getRangeByScore("leaderboard", 100, 150);
    console.log(midRangeUsers); // ["user1", "user2"]

// Sorted Set 삭제
    await ExampleRedisSortedSet.delete("leaderboard");



}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};

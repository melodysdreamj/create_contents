import { ExampleRedisGeo } from "./_";  // ExampleRedisGeo 클래스를 가져옴

async function main() {
    console.log("start");

    // 위치 데이터 저장 (위도, 경도, 멤버 이름)
    await ExampleRedisGeo.upsert("locations", 126.9780, 37.5665, "Seoul");
    await ExampleRedisGeo.upsert("locations", -74.0060, 40.7128, "NewYork");
    await ExampleRedisGeo.upsert("locations", 139.6917, 35.6895, "Tokyo");

    console.log("Data inserted.");

    // 가까운 위치 검색 (서울을 기준으로 반경 10,000 km 내에서 가까운 100개의 위치)
    const nearbyLocations = await ExampleRedisGeo.getNearby("locations", 126.9780, 37.5665, 10000, 100);
    console.log("Nearby locations from Seoul:");
    console.log(nearbyLocations);

    // 서울과 뉴욕 사이의 거리 계산
    const distance = await ExampleRedisGeo.getDistance("locations", "Seoul", "NewYork");
    console.log(`Distance between Seoul and New York: ${distance ? distance : 'unknown'} km`);

    // 특정 멤버(위치)의 좌표 가져오기
    const seoulCoordinates = await ExampleRedisGeo.getCoordinates("locations", "Seoul");
    console.log("Coordinates of Seoul:", seoulCoordinates);

    // 특정 멤버의 Geohash 값 가져오기
    const seoulGeohash = await ExampleRedisGeo.getGeoHash("locations", "Seoul");
    console.log("Geohash of Seoul:", seoulGeohash);

    // 멤버 삭제 (뉴욕 삭제)
    await ExampleRedisGeo.deleteMember("locations", "NewYork");
    console.log("New York has been removed.");

    // 다시 가까운 위치 검색 (서울 기준)
    const updatedNearbyLocations = await ExampleRedisGeo.getNearby("locations", 126.9780, 37.5665, 10000, 100);
    console.log("Updated nearby locations from Seoul:");
    console.log(updatedNearbyLocations);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};

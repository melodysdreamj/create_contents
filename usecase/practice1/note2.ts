/*
오픈AI 에서 사과(apple)의 정의, 역사, 요리들 쓰게하기
flux모델로 사과(apple)의 사진을 생성하고, 가져와서 저장하는 코드 -> 포켓베이스(서버)

 */
import {generateTextLlama31_70b} from "../../backend/aimlapi/chat/lllama_31_70b/_";
import {generateFluxDevImageSaveImage} from "../../backend/aimlapi/image/flux_dev/_";
import {Fruit, FruitPocketBaseCollection} from "../../backend/pocket_base/database/fruit/_";

async function main() {
    console.log("start");

    let fruit20 = ['apple','banana','orange','grape','strawberry','watermelon','kiwi','peach','pear','mango','pomegranate','blueberry','cherry','coconut','fig','lemon','lime','plum','pineapple','raspberry'];

    for (let i = 0; i < fruit20.length; i++) {
        await getFruitInfo(fruit20[i]);
    }




}

async function getFruitInfo(name:string) {
    // 사과의 정의를 가져오기
    var appleDefinition = await generateTextLlama31_70b(`${name}의 정의에 대해서 2문단정도로 알려줘`, 'You are an AI assistant who knows everything.');
    console.log(appleDefinition);

    var appleHistory = await generateTextLlama31_70b(`${name}의 역사에 대해서 2문단정도로 알려줘`, 'You are an AI assistant who knows everything.');
    console.log(appleHistory);

    var appleCooking = await generateTextLlama31_70b(`${name} 요리에 대해서 2문단정도로 알려줘`, 'You are an AI assistant who knows everything.');
    console.log(appleCooking);

    var appleImagePath = await generateFluxDevImageSaveImage(name,'/flux/dev') ?? '';
    console.log("Saved image file: ", appleImagePath);

    var fruitObj = new Fruit();
    fruitObj.docId = name;
    fruitObj.definition = appleDefinition ?? '';
    fruitObj.history = appleHistory ?? '';
    fruitObj.food= appleCooking ?? '';

    await FruitPocketBaseCollection.upsert(fruitObj);

    await FruitPocketBaseCollection.upsertFile(fruitObj, appleImagePath);

    fruitObj = await FruitPocketBaseCollection.get(fruitObj.docId) ?? new Fruit();

    fruitObj.imageUrl = await FruitPocketBaseCollection.getDownloadUrl(fruitObj) ?? '';
    await FruitPocketBaseCollection.upsert(fruitObj);
}


main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};

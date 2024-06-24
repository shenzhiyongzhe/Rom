const { game_config, } = require("./RomConfig.js");
const { ReadImg, Sleep, RandomPress, GoBack, OpenMenu, PressBackpack, NumberRecognition, SaveShot } = require("./Utils.js");
const { Daily } = require("./Daily.js");
const { AbilityPointsFlow, MissionAwardFlow } = require("./Common.js");

const WorldMap = {
    "06": "림스트", //林斯特
    "07": "카타콤 B1", //地下墓穴B1"
    "08": "불의 평원", //火之平原 불의 평원
    "09": "세바 오아시스", //塞巴绿洲
    "10": "악어 숲", //鳄鱼森林
    "11": "린포트", //林波特
    "12": "안개 계곡", //迷雾之谷    
    "13": "고대 미궁 B2", //远古迷宫B213. 
    "14": "카렌 화산", //凯伦火山 카렌 화산
    "15": "카타콤 B2", //地下墓穴B2
    "16": "드베르그", //迪贝格   
    "17": "크레모 호수", //克雷默湖
    "18": "레인베이", //雷恩湾
    "19": "아카마 소금 사막", //阿卡玛盐漠
    "20": "고대 미궁 B3", //远古迷宫B3
    "21": "얼음 항구", //寒冰港口  
    "22": "카타콤 B3", //地下墓穴B3
    "23": "세바 폐허", //塞巴废墟
    "24": "사막 동굴 B1", //沙漠洞穴B1
    "25": "드베르그 B1", //迪贝格B1    
    "26": "끝없는 정글", //无尽森林
    "27": "에스켈", //埃斯克尔
    "28": "리베르 유적지", //利贝尔遗迹
    "29": "지하 신전", //地下神殿 지하 신전 지하 신전
    "30": "드베르그 B2", //迪贝格B2
};


const instancePos = [
    [42, 202, 173, 325],
    [283, 167, 185, 368],
    [538, 167, 179, 377],
    [783, 169, 182, 361],
    [1038, 168, 176, 365],
];
const instanceLevel = [
    [396, 225, 493, 38],
    [396, 289, 490, 38],
    [393, 353, 496, 38]
];
const instanceImg = {
    finish: ReadImg("instance_finish"),
    haltMode: ReadImg("haltMode"),
    grocery: ReadImg("grocery"),
    auto: ReadImg("instance_auto"),
    auto_gray: ReadImg("instance_auto_gray")

};
let instanceQueue = [];
let curInstanceType = "normal";

const GetInstanceQueue = function ()
{
    try
    {
        instanceQueue = [];
        console.log("get instance queue:" + game_config.ui.instanceQueue);
        game_config.ui.instanceQueue.forEach((item) => { if (item.type == "special") instanceQueue.push(item); });
        game_config.ui.instanceQueue.forEach((item) => { if (item.type == "normal") instanceQueue.push(item); });
        game_config.ui.instanceQueue.forEach((item) => 
        {
            if (item.type == "wild")
            {
                let obj = JSON.parse(JSON.stringify(item));
                obj.index = obj.index + 6;
                instanceQueue.push(obj);
            }
        });
    } catch (error)
    {
        alert("出现错误~", error);
        java.lang.System.exit(0);
    }


};
const AutoBattleCheck = function (shot)
{
    shot = shot || captureScreen();

    const hasAutoBattle = images.findImage(shot, instanceImg.auto, { region: [1132, 513, 98, 101] });
    if (hasAutoBattle) return;
    const hasAutoGray = images.findImage(shot, instanceImg.auto_gray, { region: [1132, 513, 98, 101] });
    if (hasAutoGray == null) return;

    RandomPress([1161, 549, 35, 29]);
    log("instance click Auto battle icon");

};

// const isNeedEnterInstance = function () { };
const InstanceCheck = function ()
{
    const shot = captureScreen();
    AutoBattleCheck(shot);
    // InstanceExceptionCheck(shot);
};
const NoMoneyEnterInstanceCheck = (level) =>
{
    const levelArr = [
        [697, 226, 92, 39],
        [693, 289, 105, 42],
        [700, 356, 90, 37],
    ];
    let money = NumberRecognition("amount", [628, 5, 110, 30]);
    let enterFare = NumberRecognition("amount", levelArr[level]);
    if (money < enterFare)
    {
        SaveShot();
        log("No money to enter instance " + money);
        alert("No money to enter instance " + money);
    }
    return money;
};
function EnterInstanceZones()
{
    const menuIcon = ReadImg("menu_icon");
    const hasMenuIcon = images.findImage(captureScreen(), menuIcon, { region: [1213, 4, 51, 53] });
    menuIcon.recycle();
    if (!hasMenuIcon) return;
    Sleep(3000, 5000);
    Daily();
    Sleep();
    GetInstanceQueue();
    OpenMenu();
    Sleep(3000, 5000);
    RandomPress([958, 286, 27, 34]); //instance icon
    Sleep(3000, 6000);

    for (let i = 0; i < instanceQueue.length; i++)
    {
        if (instanceQueue[i].type == "special")
        {
            RandomPress([176, 92, 57, 39]); //special zone page
            Sleep();
            curInstanceType = "special";
        }
        else if (instanceQueue[i].type == "normal")
        {
            RandomPress([45, 101, 82, 25]); //normal zone page
            Sleep();
            curInstanceType = "normal";
        }
        else if (instanceQueue[i].type == "wild")
        {
            RandomPress([1188, 20, 83, 28]);
            HangUpWild(instanceQueue[i].index);
            break;
        }
        let hasEntered = images.findImage(captureScreen(), instanceImg.finish, { region: [168 + parseInt(instanceQueue[i].index) * 250, 540, 93, 40] });
        if (hasEntered) continue;

        RandomPress(instancePos[instanceQueue[i].index]);
        Sleep(2000, 4000);
        NoMoneyEnterInstanceCheck(instanceQueue[i].level);
        switch (instanceQueue[i].level)
        {
            case 0:
                RandomPress(instanceLevel[0]);
                break;
            case 1:
                RandomPress(instanceLevel[1]);
                break;
            case 2:
                RandomPress(instanceLevel[2]);
                break;
            default:
                RandomPress(instanceLevel[0]);
                break;
        }
        Sleep();
        const isInThisZone = images.findMultiColors(captureScreen(), "#4c4c4c", [[3, 7, "#4a4a4a"], [14, 4, "#96866d"], [30, 0, "#4c4c4c"], [26, 9, "#4a4a4a"]],
            { region: [857, 124, 69, 52] });
        if (isInThisZone)
        {
            RandomPress([876, 140, 34, 14]);
            RandomPress([1178, 20, 90, 35]);
            Sleep();
            break;
        }
        Sleep(2000, 4000);
        RandomPress([680, 469, 142, 24]); // confirm
        console.log("Entering instance " + instanceQueue[i].type + " " + instanceQueue[i].index + " level " + instanceQueue[i].level);
        Sleep(5000, 20000);
        break;
    }

    Sleep(8000, 20000);
    AutoBattleCheck();
    AbilityPointsFlow();
    RandomPress([19, 449, 25, 14]);
}
const UseRandomTransformScroll = function ()
{
    const quickItem_randomTransformScroll = ReadImg("quickItem_randomTransformScroll");
    const hasQuickItem = images.findImage(captureScreen(), quickItem_randomTransformScroll, { region: [719, 625, 66, 73] });
    if (hasQuickItem == null)
    {
        const randomTransformScroll = ReadImg("randomTransformScroll");
        PressBackpack();
        Sleep(3000, 5000);
        RandomPress([1241, 285, 26, 32]); //props page
        const hasScroll = images.findImage(captureScreen(), randomTransformScroll, { region: [892, 82, 333, 433] });
        randomTransformScroll.recycle();

        if (hasScroll == null) return;
        RandomPress([hasScroll.x, hasScroll.y, 25, 25]);
        RandomPress([731, 641, 37, 36]); // add to quick item
        RandomPress([hasScroll.x, hasScroll.y, 25, 25]); // use scroll
        PressBackpack(); // close backpack
    }
    else
    {
        RandomPress([731, 641, 37, 36]);
    }
    quickItem_randomTransformScroll.recycle();
};
const GoOutOfCity = function ()
{
    const groceryIcon = ReadImg("grocery");
    for (let i = 0; i < 20; i++)
    {
        let hasCity = images.findImage(captureScreen(), groceryIcon, { region: [53, 249, 85, 76] });
        if (hasCity)
        {
            UseRandomTransformScroll();
        }
        else break;
        Sleep();
    }
    AutoBattleCheck();
    Sleep();
    groceryIcon.recycle();
};
function HangUpWild(number)
{
    number = number.toString().padStart(2, "0");
    const CollectedCheck = function (shot)
    {
        const needCollected = images.findMultiColors(shot, "#d2a858", [[-4, 4, "#d0ac57"], [-4, 11, "#cba653"], [3, 10, "#c5a24f"]], { region: [958, 78, 54, 64] });
        if (needCollected == null) RandomPress([977, 100, 20, 21]);
    };
    const mapName = WorldMap[number];
    const hasMap = images.findMultiColors(captureScreen(), "#baa378", [[0, 11, "#a28858"], [20, -1, "#bba477"], [21, 4, "#8b7347"], [23, 16, "#3c311c"]],
        { region: [179, 176, 48, 48] });
    if (hasMap == null) return;

    RandomPress([84, 121, 89, 80]);
    Sleep(5000, 7000);
    const map_numberImg = ReadImg(`map/${number}`);
    let hasMapNumber = images.findImage(captureScreen(), map_numberImg, { region: [85, 136, 105, 567] });
    if (hasMapNumber == null)
    {
        RandomPress([26, 228, 19, 21]); //collection page
        Sleep();
        hasMapNumber = images.findImage(captureScreen(), map_numberImg, { region: [85, 136, 105, 567] });
        if (hasMapNumber == null)
        {
            RandomPress([21, 167, 24, 28]);
            RandomPress([77, 91, 206, 13]);
            setText(mapName);
            RandomPress([1166, 641, 74, 35]); //keyboard confirm
            RandomPress([89, 136, 242, 31]); //select
            hasMapNumber = images.findImage(captureScreen(), map_numberImg, { region: [85, 136, 105, 567] });
            // RandomPress([hasMapNumber.x + 10, hasMapNumber.y, 45, 15]);
            CollectedCheck(captureScreen());
        }
        else
        {
            RandomPress([hasMapNumber.x + 10, hasMapNumber.y, 45, 15]);
        }
        RandomPress([967, 654, 201, 32]); //立即前往
        RandomPress([678, 469, 143, 23]); //confrim

        Sleep(8000, 16000);
        RandomPress([1163, 552, 29, 28]); //auto battle
        log("go to the wild: " + mapName);
    }
    else
    {
        RandomPress([hasMapNumber.x + 10, hasMapNumber.y, 45, 15]);
        const mapShot = captureScreen();
        const hasAlreadyInThere = images.findMultiColors(mapShot, "#1d221b", [[45, 1, "#65502f"], [60, 3, "#6c5733"], [137, 5, "#777a76"], [176, 6, "#191e16"], [196, 6, "#1c2119"]],
            { region: [930, 637, 282, 67] });
        if (hasAlreadyInThere)
        {
            RandomPress([1164, 24, 106, 23]); //press back
        }
        else
        {
            CollectedCheck(mapShot);
            RandomPress([967, 654, 201, 32]); //立即前往
            RandomPress([678, 469, 143, 23]); //confirm
            Sleep(8000, 16000);
            RandomPress([1163, 552, 29, 28]); //auto battle
            log("go to the wild: " + mapName);
        }

    }
    map_numberImg.recycle();
}

function testMap(number)
{
    number = number.toString().padStart(2, "0");
    const mapName = WorldMap[number];
    // RandomPress([77, 91, 206, 13]);
    // setText(mapName);
    // RandomPress([1166, 641, 74, 35]); //keyboard confirm
    // RandomPress([89, 136, 242, 31]); //select
    log(mapName);
}
// log(NumberRecognition("amount", [634, 3, 101, 33]));
module.exports = { AutoBattleCheck, EnterInstanceZones };
// AutoBattleCheck();

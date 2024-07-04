const { ReadImg, RandomPress, Sleep, FindMultiColors, GetNumber, SaveShot, GoBack, OpenMenu, IsHaltMode, ExitHaltMode } = require("./Utils");
const { ReturnHome, OpenBackpack, CloseBackpack } = require("./BackPack");
const { Daily } = require("./Daily");
const { AbilityPointsFlow } = require("./Common");
const { GreenBtn, DeepGreenBtn } = require("./Color");
const { GroceryFlow } = require("./Death");



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

const GetInstanceQueue = function ()
{
    let instanceQueue = [];
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
    return instanceQueue;
};
const AutoBattleCheck = (shot) =>
{
    shot = shot || captureScreen();

    const autoBattle = ReadImg("icon/autoBattle");
    const autoBattle_gray = ReadImg("icon/autoBattle_gray");
    const hasAuto = images.findImage(shot, autoBattle, { region: [1132, 513, 98, 101] });
    const hasAuto_gray = images.findImage(shot, autoBattle_gray, { region: [1132, 513, 98, 101] });

    if (!hasAuto && hasAuto_gray)
    {
        RandomPress([1161, 549, 35, 29]);
        console.log("auto battle");
    }
};
const NoMoneyEnterInstanceCheck = (level) =>
{
    const levelArr = [
        [697, 226, 92, 39],
        [693, 289, 105, 42],
        [700, 356, 90, 37],
    ];
    let money = GetNumber("amount", [628, 5, 110, 30]);
    let enterFare = GetNumber("amount", levelArr[level]);
    if (money < enterFare)
    {
        SaveShot();
        log("No money to enter instance " + money);
        alert("No money to enter instance " + money);
    }
    return money;
};

const EnemyNumberCheck = () =>
{
    console.log("EnemyNumberCheck...");
    let enemyNumber = 0;
    const EnemyColor = [

        ["#d5ceb8", [[5, 0, "#c5b895"], [4, 4, "#a3956e"], [5, 9, "#a09564"], [-3, 6, "#49402b"], [0, 12, "#6c6040"], [2, 14, "#7c6e3d"]]],
        ["#cabea3", [[4, 0, "#bcad85"], [4, 4, "#ac9e74"], [-1, 4, "#6a5c41"], [2, 7, "#a59964"]]],
        ["#dfdbcd", [[5, 4, "#b6a880"], [5, 4, "#b6a880"], [3, 7, "#b2a681"], [3, 12, "#5b5235"]]],
        ["#c8bea0", [[3, 0, "#c4b591"], [4, 3, "#a0926c"], [-1, 4, "#b9ae8f"], [3, 9, "#9f935e"]]],
        ["#dcd6c7", [[6, 0, "#cabb99"], [2, 3, "#bcae8a"], [3, 10, "#aea46b"]]],
        ["#cfc5aa", [[2, -1, "#cbbe9f"], [7, 0, "#b6a785"], [2, 6, "#a1946d"]]],
        ["#d3cbb3", [[2, 0, "#c5b997"], [4, 1, "#bcad87"], [3, 4, "#b1a47e"], [3, 9, "#948958"]]],
        ["#d1c8af", [[1, 0, "#cdc2a6"], [5, 1, "#bdae87"], [1, 7, "#b0a67e"], [1, 9, "#aa9d67"]]],
        ["#d3cab2", [[3, 0, "#c4b692"], [7, 0, "#b7a886"], [3, 4, "#afa27b"], [2, 7, "#9c9062"]]]
    ];
    const shot = captureScreen();
    for (let i = 0; i < 5; i++)
    {
        for (let j = 0; j < 2; j++)
        {
            let hasEnemy = FindMultiColors(EnemyColor, [924 + j * 160, 69 + i * 53, 51, 62]);
            if (hasEnemy)
            {
                enemyNumber++;
            }
        }
    }
    console.log("enemyNumber: " + enemyNumber);
    return enemyNumber;
};
const UseRandomTransformScroll = () =>
{
    const quickItem_randomTransformScroll = ReadImg("quickItem/scroll_transformRandomly");
    const randomTransformScroll = ReadImg("backpack/scroll/transformRandomly");
    const hasQuickItem = images.findImage(captureScreen(), quickItem_randomTransformScroll, { region: [724, 634, 47, 50] });
    if (hasQuickItem == null)
    {

        OpenBackpack("props");
        const hasScroll = images.findImage(captureScreen(), randomTransformScroll, { region: [892, 82, 333, 433] });

        if (hasScroll == null)
        {
            ReturnHome();
            GroceryFlow();
            return;
        }
        RandomPress([hasScroll.x, hasScroll.y, 25, 25]);
        RandomPress([731, 641, 37, 36]); // add to quick item
        RandomPress([hasScroll.x, hasScroll.y, 25, 25]); // use scroll
        CloseBackpack();
    }
    else
    {
        RandomPress([731, 641, 37, 36]);
    }
    quickItem_randomTransformScroll.recycle();
    randomTransformScroll.recycle();
};
const CrowedCheck = () =>
{
    for (let i = 0; i < 5; i++)
    {
        Sleep();
        RandomPress([1120, 507, 29, 29]);
        let number = EnemyNumberCheck();
        if (number < 6)
        {
            Sleep();
            UseRandomTransformScroll();
        }
        else break;
    }
};
/**
 * 
 * @param {*} number the map index
 * @returns 
 */
const GoWild = (number) =>
{
    console.log("GoWild: " + number);
    number = number.toString().padStart(2, "0");
    const CollectedCheck = (shot) =>
    {
        const needCollected = images.findMultiColors(shot, "#d2a858", [[-4, 4, "#d0ac57"], [-4, 11, "#cba653"], [3, 10, "#c5a24f"]], { region: [958, 78, 54, 64] });
        if (!needCollected) RandomPress([977, 100, 20, 21]);
    };
    const NoNeedTransformCheck = () => FindMultiColors(DeepGreenBtn, [943, 641, 243, 60]);
    const AlreadThereCheck = (img) =>
    {
        const positionIcon = [
            ["#a54d0c", [[-1, 1, "#db9864"], [-3, 2, "#e8ac7f"], [-2, 5, "#a84500"], [-1, 7, "#ba4900"], [0, 9, "#832501"], [1, 4, "#a74800"]]]
        ];
        const shot = captureScreen();
        const theIcon = FindMultiColors(positionIcon, [76, 119, 90, 579]);
        if (theIcon)
        {
            const isThere = images.findImage(shot, img, { region: [theIcon.x, theIcon.y - 10, 60, 40] });
            if (isThere)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        return false;
    };
    const NoMoneyGoWildCheck = () =>
    {
        const curMoney = GetNumber("amount", [730, 345, 112, 40]);
        const transformCost = GetNumber("amount", [943, 641, 243, 60]);
        if (curMoney < transformCost)
        {
            console.log("no money to go wild");
            SaveShot();
            alert("金币不足", "no money to go wild");
        }
    };
    const mapName = WorldMap[number];

    RandomPress([84, 121, 89, 80]); //map icon
    Sleep(5000, 7000);

    const map_numberImg = ReadImg(`map/${number}`);

    const isThere = AlreadThereCheck(map_numberImg);
    if (isThere)
    {
        console.log("already there");
        GoBack();
    }
    else
    {
        let hasMapNumber = images.findImage(captureScreen(), map_numberImg, { region: [61, 123, 149, 568] });
        if (hasMapNumber)
        {
            RandomPress([hasMapNumber.x + 10, hasMapNumber.y, 45, 15]);
            CollectedCheck(captureScreen());
            let noNeedTransfrom = NoNeedTransformCheck();
            if (!noNeedTransfrom)
            {
                RandomPress([967, 654, 201, 32]); //立即前往
                Sleep();
                NoMoneyGoWildCheck();
                RandomPress([678, 469, 143, 23]); //confirm
                Sleep(8000, 16000);
            }
            else
            {
                GoBack();
            }
        }
        else
        {
            RandomPress([26, 228, 19, 21]); //collection page
            Sleep();
            hasMapNumber = images.findImage(captureScreen(), map_numberImg, { region: [61, 123, 149, 568] });
            if (hasMapNumber == null)
            {
                RandomPress([21, 167, 24, 28]); //back to first page
                RandomPress([77, 91, 206, 13]); //input 
                setText(mapName);
                Sleep();
                RandomPress([1166, 641, 74, 35]); //keyboard confirm
                Sleep();
                RandomPress([89, 136, 242, 31]); //select
                CollectedCheck(captureScreen());
            }
            else
            {
                RandomPress([hasMapNumber.x + 10, hasMapNumber.y, 45, 15]);
            }

            const noNeedTransfrom_collectionPage = NoNeedTransformCheck();
            if (!noNeedTransfrom_collectionPage)
            {
                RandomPress([967, 654, 201, 32]); //立即前往
                NoMoneyGoWildCheck();
                RandomPress([678, 469, 143, 23]); //confrim
                Sleep(8000, 16000);
            }
            else
            {
                GoBack();
            }
            log("go to the wild: " + number + mapName);
        }
    }
    map_numberImg.recycle();
};
const EnterInstanceZones = () =>
{
    console.log("enter instance zones...");
    const isHaltMode = IsHaltMode();
    if (isHaltMode)
    {
        ExitHaltMode();
    }
    Daily();
    Sleep();
    const instanceQueue = GetInstanceQueue();

    // no special and normal instance check
    const specialQueue = instanceQueue.filter(x => x.type === "special" || x.type === "normal");
    const wildQueue = instanceQueue.filter(x => x.type === "wild");
    if (specialQueue.length === 0 && wildQueue.length > 0)
    {
        for (let i = 0; i < wildQueue.length; i++)
        {
            let instance = wildQueue[i];
            if (instance.type === "wild")
            {
                GoWild(instance.index);
                break;
            }
        };

    }
    else if (specialQueue.length == 0 && wildQueue.length === 0)
    {
        alert("No instance to enter!");
    }
    else
    {
        OpenMenu();
        Sleep(3000, 5000);
        RandomPress([958, 286, 27, 34]); //instance icon
        Sleep(3000, 6000);

        const instanceFinish = ReadImg('icon/instance_finish');
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
                GoWild(instanceQueue[i].index);
                break;
            }

            let hasEntered = images.findImage(captureScreen(), instanceFinish, { region: [168 + parseInt(instanceQueue[i].index) * 250, 540, 93, 40] });

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
            RandomPress([680, 469, 142, 24]); // confirm check if there has confirm
            console.log("Entering instance " + instanceQueue[i].type + " " + instanceQueue[i].index + " level " + instanceQueue[i].level);
            Sleep(5000, 20000);
            break;
        }
        instanceFinish.recycle();
    }
    Sleep(8000, 20000);
    CrowedCheck();
    AutoBattleCheck();
    AbilityPointsFlow();
};

module.exports = {
    AutoBattleCheck,
    EnterInstanceZones
};

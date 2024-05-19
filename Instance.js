const { game_config, ReadImg, Sleep, RandomPress, GoBack, PressMenu } = require("./Global.js");
const { DecomposeProps } = require("./BackPack.js");
// const { Daily } = require("./Daily.js");

const WorldMap = {
    "06": "test map", //林斯特
    "07": "11 ", //地下墓穴B1"
    "08": "", //火之平原
    "09": "", //塞巴绿洲
    "10": "", //鳄鱼森林
    "11": "", //林波特
    "12": "", //迷雾之谷    
    "13": "", //远古迷宫B2
    "14": "", //凯伦火山
    "15": "", //地下墓穴B2
    "16": "", //迪贝格   
    "17": "", //克雷默湖
    "18": "", //雷恩湾
    "19": "", //阿卡玛盐漠
    "20": "", //远古迷宫B3
    "21": "", //寒冰港口  
    "22": "", //地下墓穴B3
    "23": "", //塞巴废墟
    "24": "", //沙漠洞穴B1
    "25": "", //迪贝格B1    
    "26": "", //无尽森林
    "27": "", //埃斯克尔
    "28": "", //利贝尔遗迹
    "29": "", //地下神殿
    "30": "", //迪贝格B2
};

const HangUp = function (number)
{
    const mapName = WorldMap[number];
    log("HangUp on " + mapName);
    //判断是否已经在该地图
    //
};
HangUp("07");
const instancePos = [
    [36, 156, 174, 483],
    [292, 156, 167, 477],
    [530, 151, 187, 481],
    [780, 155, 185, 486],
    [1032, 156, 179, 479],
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
    instanceQueue = [];
    game_config.ui.instanceQueue.forEach((item) => { if (item.type == "special") instanceQueue.push(item); });
    game_config.ui.instanceQueue.forEach((item) => { if (item.type == "normal") instanceQueue.push(item); });

};

const ExitHaltMode = function ()
{
    const hasEnterHaltMode = images.findImage(shot, instanceImg.haltMode, { region: [529, 415, 226, 78] });
    if (hasEnterHaltMode)
    {
        console.log(`Entering Halt Mode! type:${curInstanceType} Sleeping......`);
        if (curInstanceType == "special")
        {
            Sleep(600000, 1800000);
        }
        else if (curInstanceType == "normal")
        {
            Sleep(3600000, 18000000);
        }
        // Sleep(3000, 6000); //test time
        const hasExitHaltMode = images.findImage(captureScreen(), instanceImg.haltMode, { region: [529, 415, 226, 78] });
        if (hasExitHaltMode == null) return;
        const x1 = 630 + random(-20, 20);
        const y1 = 200 + random(-10, 10);
        const x2 = x1 + random(-10, 10);
        const y2 = 400 + random(-20, 100);
        gesture(1000, [x1, y1], [x2, y2]);
        log("Exiting Halt Mode");
        Sleep(10000, 20000);
        Sleep();
        return true;
    }
    return false;
};
const AutoBattleCheck = function ()
{
    const shot = captureScreen();
    const hasAutoBattle = images.findImage(shot, instanceImg.auto, { region: [1132, 513, 98, 101] });
    if (hasAutoBattle) return;
    const hasAutoGray = images.findImage(shot, instanceImg.auto_gray, { region: [1132, 513, 98, 101] });
    if (hasAutoGray == null) return;

    RandomPress([1161, 549, 35, 29]);
    log("instance click Auto battle icon");

};
const OutInstanceCheck = function (shot)
{
    const outInstance = images.findImage(shot, instanceImg.grocery, { region: [48, 252, 104, 73] });
    if (outInstance)
    {
        log("Out of instance");
        EnterInstanceZones();
    }
};
const InstanceExceptionCheck = function (shot)
{
    const errorPopup = images.findMultiColors(shot, "#393939", [[52, 6, "#c5c5c3"], [68, 15, "#aaaaa8"], [97, 9, "#2f2f2f"]], { region: [433, 594, 200, 62] });
    if (errorPopup)
    {
        console.log("Instance Exception popup");
        RandomPress([461, 614, 148, 24]);
    }
};
const InstanceCheck = function (shot)
{
    HaltModeCheck(shot);
    OutInstanceCheck(shot);
    AutoBattleCheck(shot);
    InstanceExceptionCheck(shot);
};
function EnterInstanceZones()
{
    Sleep();
    GetInstanceQueue();
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
        let hasEntered = images.findImage(captureScreen(), instanceImg.finish, { region: [168 + parseInt(instanceQueue[i].index) * 250, 540, 93, 40] });
        if (hasEntered) continue;

        RandomPress(instancePos[instanceQueue[i].index]);
        switch (instanceQueue[i].level)
        {
            case "firstLevel":
                RandomPress(instanceLevel[0]);
                break;
            case "secondLevel":
                RandomPress(instanceLevel[1]);
                break;
            case "thirdLevel":
                RandomPress(instanceLevel[2]);
                break;
            default:
                RandomPress(instanceLevel[0]);
                break;
        }
        Sleep();
        RandomPress([680, 469, 142, 24]); // confirm
        console.log("Entering instance " + instanceQueue[i].type + " " + instanceQueue[i].index + " level " + instanceQueue[i].level);
        Sleep(5000, 20000);
        RandomPress([1165, 552, 26, 24]); // auto battle
        break;
    }

    Sleep();
    Daily();

}

// module.exports = { InstanceCheck };
// EnterInstanceZones();
// AutoBattleCheck(captureScreen());
// log(images.matchTemplate(captureScreen(), instanceImg.auto_gray, { region: [1132, 513, 98, 101] }));
// HaltModeCheck(captureScreen());
const { WearEquipment, StrengthenPlayerEquipment } = require("./Backpack.js");
const { BlueSquare } = require("./CONST.js");
const { game_config, RWFile } = require("./RomConfig.js");
const { ReadImg, Sleep, RandomPress, GoBack, NumberRecognition, GetColorInMultiple } = require("./Utils.js");

const BeginnerImg = {
    skip: ReadImg("mainStory_skip"),
    goldenSkip: ReadImg("goldenSkip"),
    profession: ReadImg("beginner_profession"),
    animate_skip: ReadImg("beginner_animateSkip"),
    close: ReadImg("beginner_close"),
};
const BeginnerPos = {
    skip: [1160, 3, 115, 59],
    goldenSkip: [1158, 675, 86, 22],
    profession: [583, 205, 133, 373],
    animate_skip: [1182, 32, 70, 22],
    continue: [1104, 651, 139, 27],
    nameInput: [497, 331, 297, 15],
    keyboard_confirm: [1168, 643, 65, 27],
    create_confirm: [574, 435, 131, 26],
    startGame: [1105, 658, 132, 20]
};

const BeginnerCheckPos = {
    skip: [1151, 7, 81, 63],
    goldenSkip: [1142, 661, 114, 50],
    profession: [576, 402, 138, 127],
    animate_skip: [1150, 8, 104, 70],
    close: [786, 209, 86, 70]
};

const CharDiction = ['a', "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
    "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
    "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const SetResolution = function ()
{
    RandomPress([1128, 586, 41, 38]);
    Sleep(3000, 6000);
    RandomPress([289, 97, 83, 26]);
    Sleep(3000, 6000);
    RandomPress([23, 209, 197, 38]);
    Sleep();
    RandomPress([1103, 205, 99, 22]);
    Sleep(3000, 6000);
    GoBack();
};

const ChooseGameServer = function ()
{
    RandomPress([403, 603, 124, 24]);
    Sleep(3000, 10000);
    const cantInServer = ReadImg("beginner_cantInServer");
    const shot = captureScreen();
    const availableServers = [];
    for (let i = 0; i < 4; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let hasServer = images.findImage(shot, cantInServer, { region: [250 + j * 204, 240 + i * 73, 80, 50] });
            if (hasServer == null)
            {
                availableServers.push([i, j]);
            }
        }
    }
    const randomServer = availableServers[Math.floor(random() * availableServers.length)];
    RandomPress([150 + randomServer[1] * 204, 230 + randomServer[0] * 73, 165, 40]);
    RandomPress([1009, 563, 137, 26]);
    const hasCancel = images.findMultiColors(captureScreen(), "#394135", [[19, 0, "#3b4436"], [107, 1, "#363e31"], [132, 0, "#353c30"], [122, 13, "#323a2e"], [5, 11, "#2b3428"]],
        { region: [980, 544, 192, 68] });
    if (hasCancel) RandomPress([1009, 563, 137, 26]);
    log("Choose game server: " + randomServer[0] + " " + randomServer[1]);
    cantInServer.recycle();
};
function GenerateRandomName()
{
    let name = [];
    for (let i = 0; i < 12; i++)
    {
        name.push(CharDiction[Math.floor(random() * CharDiction.length)]);
    }
    return name.join("");
}
function CreateCharacter()
{
    let hasCharacterOption;
    for (let i = 0; i < 40; i++)
    {
        Sleep();
        hasCharacterOption = images.findImage(captureScreen(), BeginnerImg.profession, { region: BeginnerCheckPos.profession });

        if (hasCharacterOption != null) break;
    }

    if (hasCharacterOption == null) return false;

    RandomPress(BeginnerPos.profession);
    Sleep(2000, 3000);
    //two option skip or continue
    if (random() > 0.4)
    {
        for (let i = 0; i < 20; i++)
        {
            const hasSkip = images.findImage(captureScreen(), BeginnerImg.animate_skip, { region: BeginnerCheckPos.animate_skip });
            if (hasSkip)
            {
                Sleep(300, 600);
                RandomPress(BeginnerPos.animate_skip);
                Sleep(3000, 5000);
                break;
            }
            Sleep(200, 400);
        }
    }
    else
    {
        Sleep(10000, 12000);
    }
    RandomPress(BeginnerPos.continue);
    Sleep(2500, 4000);
    for (let i = 0; i < 5; i++)
    {
        RandomPress(BeginnerPos.nameInput);
        Sleep();
        setText(GenerateRandomName());
        Sleep();
        RandomPress(BeginnerPos.keyboard_confirm);
        Sleep();
        RandomPress(BeginnerPos.create_confirm);
        Sleep();
        let shot = captureScreen();
        let confirmTip = ReadImg("mainStory_confirm");
        if (images.findImage(shot, BeginnerImg.close, { region: BeginnerCheckPos.close }) == null) break;
        else if (images.findImage(shot, confirmTip, { region: [594, 419, 93, 76] }))
        {
            log("昵称包含敏感词汇，需要重新输入");
            RandomPress([574, 442, 137, 27]);
            confirmTip.recycle();
        }

    }
    log("Character created!");
    return true;
}


const ClickSkip = (shot) =>
{
    let skipBtn = images.findImage(shot, BeginnerImg.skip, { region: BeginnerCheckPos.skip });
    let goldenSkipBtn = images.findImage(shot, BeginnerImg.goldenSkip, { region: BeginnerCheckPos.goldenSkip });
    if (skipBtn)
    {
        RandomPress(BeginnerPos.skip);
        log("Press Skip!");
        return true;
    }
    else if (goldenSkipBtn)
    {
        RandomPress(BeginnerPos.goldenSkip);
        log("Press Golden Skip!");
        return true;
    }
    else return false;
};

const PassTutorial = function ()
{
    for (let i = 0; i < 12; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            let shot = captureScreen();
            let hasSkip = ClickSkip(shot);
            if (hasSkip) break;
            Sleep(3000, 5000);
        }
        Sleep(5000, 8000);
    };
};

function BeginnerFlow(isRandomServer)
{

    SetResolution();
    Sleep(3000, 5000);
    isRandomServer && ChooseGameServer();
    Sleep(10000, 20000);
    RandomPress([234, 121, 788, 450]);
    Sleep(10000, 20000);
    CreateCharacter();
    Sleep(10000, 20000);
    RandomPress(BeginnerPos.startGame);
    Sleep(20000, 30000);
    PassTutorial();
}
const GetPlayerEquipmentColor = (shot, region) =>
{
    const colorList = {
        "purple": [
            ["#2d2135", [[6, -9, "#2f213b"], [20, -21, "#551f6d"], [23, -26, "#481e60"], [29, -22, "#60247a"], [39, -11, "#4a2260"], [44, -2, "#482359"], [49, -1, "#48225b"]]],
            ["#2b2233", [[6, -6, "#2f213a"], [15, -12, "#431e52"], [20, -19, "#521e69"], [27, -23, "#5d237a"], [30, -22, "#5d2378"], [47, -6, "#48225b"], [49, -3, "#48205e"]]]
        ],
        "blue": [
            ["#202b35", [[13, -12, "#1e3946"], [25, -25, "#1e4a60"], [29, -25, "#24586f"], [34, -23, "#256079"], [49, -3, "#204a5d"], [42, 1, "#23424f"], [27, -27, "#235168"]]],
            ["#1f2c35", [[11, -10, "#1e3340"], [22, -22, "#1c445a"], [24, -23, "#1b475e"], [26, -26, "#1d4960"], [30, -24, "#23566c"], [32, -21, "#235e76"], [54, 1, "#21465d"]]],
            ["#1f2b34", [[12, -11, "#1e3442"], [19, -18, "#1b4a5f"], [26, -23, "#225c74"], [27, -26, "#215269"], [34, -20, "#225c72"], [45, -8, "#21495d"], [52, 0, "#234458"]]],
            ["#202d37", [[10, -9, "#1b3d4d"], [17, -17, "#1c5068"], [21, -24, "#1d485d"], [26, -19, "#20576e"], [15, -11, "#1b475c"], [23, -19, "#215971"], [50, 2, "#21455b"]]],
            ["#212c35", [[8, -10, "#1f313d"], [20, -20, "#1a4e65"], [25, -25, "#215468"], [31, -19, "#255b71"], [47, -3, "#21495c"], [51, 2, "#224356"], [30, -20, "#235a70"]]],
            ["#1f2a34", [[8, -8, "#1f2e3c"], [26, -26, "#22526a"], [28, -27, "#1f4d64"], [40, -14, "#215066"], [48, -4, "#23475a"], [51, 1, "#214053"], [41, -3, "#234555"]]],
            ["#202d36", [[22, -25, "#1d485d"], [24, -25, "#1f4c63"], [27, -24, "#23566c"], [47, -3, "#234c63"], [49, -1, "#204a5f"], [51, 1, "#22485f"], [23, -25, "#1d4960"]]],
            ["#1f2c35", [[22, -20, "#1a5066"], [25, -24, "#1e4b62"], [28, -27, "#1f4e65"], [32, -22, "#235e76"], [52, -2, "#20495f"], [55, 0, "#234961"], [50, 3, "#253f4f"]]]
        ],
        "green": [
            ["#223221", [[17, -16, "#2d441f"], [28, -28, "#375621"], [44, -12, "#395325"], [55, 0, "#355025"], [28, 24, "#2d2f2e"], [31, -23, "#4f6326"], [38, -19, "#486128"]]],
            ["#233322", [[12, -12, "#263b21"], [23, -23, "#314c20"], [27, -27, "#355320"], [33, -23, "#4f6327"], [49, -7, "#365521"], [55, -1, "#365225"], [51, 5, "#2f4527"]]],
            ["#223321", [[6, -6, "#233921"], [17, -16, "#2f4720"], [28, -27, "#365521"], [37, -20, "#4b6227"], [46, -8, "#385324"], [55, 0, "#365326"], [42, 13, "#3b3e2b"]]],
            ["#223321", [[13, -14, "#263d21"], [28, -26, "#3d5a25"], [37, -17, "#405a24"], [42, -15, "#425a24"], [55, 0, "#355225"], [39, 17, "#33362c"], [28, -19, "#3e5720"]]],
            ["#243322", [[20, -22, "#304a20"], [27, -29, "#375621"], [34, -22, "#4a6226"], [54, -2, "#375426"], [48, 6, "#2e4027"], [27, -24, "#4b6023"], [31, -23, "#4d6125"]]],
            ["#233321", [[6, -6, "#233a21"], [12, -13, "#263b21"], [24, -25, "#335020"], [28, -26, "#425d26"], [46, -9, "#385423"], [55, 0, "#355224"], [48, 7, "#2e3f28"]]],
            ["#243323", [[13, -14, "#2b3f24"], [19, -20, "#374e20"], [26, -25, "#3e5921"], [40, -14, "#415924"], [47, -6, "#365524"], [51, -1, "#355026"], [50, 4, "#304727"]]],
            ["#243323", [[6, -7, "#233922"], [20, -21, "#3c521e"], [24, -25, "#395520"], [30, -21, "#465e24"], [45, -6, "#375024"], [50, -1, "#355025"], [47, 3, "#304626"]]],
            ["#253422", [[4, -5, "#223920"], [21, -21, "#3a531f"], [25, -25, "#395720"], [28, -22, "#4f6326"], [40, -9, "#395326"], [46, -3, "#365026"], [50, 1, "#354e26"]]]
        ],
        "white": [
            ["#2b2b2b", [[7, -7, "#2f3030"], [25, -26, "#414343"], [22, -22, "#424444"], [28, -22, "#4d4e4e"], [35, -18, "#484949"], [43, -10, "#414242"], [52, 0, "#3e3f3f"]]],
            ["#2b2b2b", [[10, -12, "#363737"], [17, -17, "#424343"], [21, -24, "#464646"], [25, -23, "#505050"], [21, -19, "#414242"], [45, -3, "#404141"], [45, 3, "#383939"]]],
            ["#2a2b2b", [[5, -5, "#2e2f2f"], [24, -23, "#454646"], [26, -28, "#424343"], [28, -24, "#4e4f4f"], [33, -22, "#4c4d4d"], [49, -2, "#3f4141"], [49, 2, "#393939"]]]
        ]
    };
    for (let key in colorList)
    {
        for (let i = 0; i < colorList[key].length; i++)
        {
            let color = images.findMultiColors(shot, colorList[key][i][0], colorList[key][i][1], { region });
            if (color)
            {
                return key;
            }
        }
    }
    return "null";
};
const GetAllEquipmentColor = () =>
{
    Sleep();
    RandomPress([24, 21, 46, 41]);
    Sleep(2000, 4000);
    const shot = captureScreen();
    const equipmentColor = [];
    const regionList = [[399, 126, 73, 55], [449, 161, 72, 61], [400, 199, 73, 63], [448, 242, 72, 71], [399, 278, 71, 67], [450, 320, 68, 58], [400, 358, 72, 63], [452, 395, 65, 56], [400, 432, 72, 60]];
    for (let i = 0; i < 9; i++)
    {

        let color = GetPlayerEquipmentColor(shot, regionList[i]);
        equipmentColor.push(color);
    }
    const player = game_config.player;
    const playEquipment = player.equipment;

    playEquipment.weapon = { color: equipmentColor[0], level: 0 };
    playEquipment.helmet = { color: equipmentColor[1], level: 0 };
    playEquipment.underwear = { color: equipmentColor[2], level: 0 };
    playEquipment.chestplate = { color: equipmentColor[3], level: 0 };
    playEquipment.plate = { color: equipmentColor[4], level: 0 };
    playEquipment.brachialArmor = { color: equipmentColor[5], level: 0 };
    playEquipment.pants = { color: equipmentColor[6], level: 0 };
    playEquipment.boots = { color: equipmentColor[7], level: 0 };
    playEquipment.glyph = { color: equipmentColor[8], level: 0 };
    RandomPress([24, 21, 46, 41]);
    RWFile("player", player);
    return equipmentColor;
};
const GetSquareColor = function (shot, colorArr, region)
{
    const color = GetColorInMultiple(shot, colorArr, region);
    return color;
};
const BuyBestBlueEquipment = (shot) =>
{
    let hadBuyBlueEquipment = false;
    const equimentList = [];
    for (let i = 0; i < 7; i++)
    {
        let color = GetSquareColor(shot, BlueSquare, [188, 170 + i * 65, 63, 61]);
        if (color)
        {
            let price = NumberRecognition("amount", [1105, 181 + i * 65, 86, 37]);
            if (price < 20)
            {
                RandomPress([195, 178 + i * 65, 43, 42]);
                let power = NumberRecognition("equipmentPower", [539, 210, 55, 37]);
                let price_performance_ratio = power / price;
                equimentList.push({ position: color, ratio: price_performance_ratio });
                Sleep();
            }

        }
    }
    equimentList.sort((a, b) => b.ratio - a.ratio);
    RandomPress([761, 123, 30, 15]); //close the detail popup 
    RandomPress([equimentList[0].position.x + 70, equimentList[0].position.y, 830, 40]); //enter the sale page
    Sleep(3000, 5000);
    let theBlueEquipmentPrice = NumberRecognition("amount", [1106, 177, 90, 41]);
    if (theBlueEquipmentPrice < 20)
    {
        RandomPress([267, 181, 893, 35]);
        Sleep(3000, 5000);
        RandomPress([265, 181, 616, 34]);
        Sleep(3000, 5000);
        const theFinalDealPrice = NumberRecognition("amount", [1082, 551, 88, 36]);
        console.log("购买蓝装，性价比指数：" + equimentList[0].ratio + "最终购买价格为：" + theFinalDealPrice);
        RandomPress([1014, 633, 127, 25]); // buy btn 
        Sleep(8000, 12000);
        RandomPress([579, 454, 126, 22]);
        hadBuyBlueEquipment = true;
    }

    return hadBuyBlueEquipment;
};
const BuyBlueEquipment = function ()
{
    console.log("开始执行购买蓝装操作");
    let needWearEquipment = false;
    const equipmentColor = GetAllEquipmentColor();
    Sleep();
    const hasAllBlue = equipmentColor.filter((color) => color == "blue");
    if (hasAllBlue.length == 8)
    {
        return true;
    }
    //进入任务页，识别当前钻石数量
    RandomPress([1157, 20, 26, 31]);
    Sleep(4000, 7000);
    const totalDiamod = NumberRecognition("amount", [468, 3, 84, 30]);
    if (totalDiamod < 20)
    {
        console.log("钻石不足，暂时不买");
        GoBack();
        return;
    }
    GoBack();
    Sleep(2000, 4000);
    RandomPress([1025, 16, 26, 31]); //进入交易所
    Sleep(4000, 7000);

    const needBuyColor = [null, "white", "green"];
    let buyBlueEquipmentType = "";
    let index = 0;
    //判断武器是否为蓝色，不是则优先购买武器
    if (needBuyColor.includes(equipmentColor[0]))
    {
        needWearEquipment = BuyBestBlueEquipment(captureScreen());
        buyBlueEquipmentType = "weapon";
    }
    else
    {
        RandomPress([18, 268, 144, 35]); // defence page
        for (let i = 1; i < 8; i++)
        {
            if (needBuyColor.includes(equipmentColor[i]))
            {
                RandomPress([189, 147 + i * 47, 135, 26]);
                Sleep();
                needWearEquipment = BuyBestBlueEquipment(captureScreen());
                buyBlueEquipmentType = "armor";
                index = i;
                break;
            }
        }

    }

    if (needWearEquipment)
    {
        WearEquipment();
        if (buyBlueEquipmentType == "weapon")
            StrengthenEquipment("weapon");
        else
            StrengthenEquipment("armor");
        console.log("装备购买成功,已完成穿戴: 类型" + buyBlueEquipmentType + "位置：" + index);

    }
    console.log("购买蓝装操作结束");
};

module.exports = { BuyBlueEquipment };
// const GetPlayerCombatEffectiveness = function ()
// {

// };
// log(GetSquareColor(captureScreen(), [189, 170, 61, 62]));

// BuyBlueEquipment();
// log(GetAllEquipmentColor());
// log(NumberRecognition("amount", [1146, 183, 44, 30]));
// log(GetPlayerEquipmentColor(captureScreen(), [398, 358, 75, 54]));
// module.exports = { BeginnerFlow };
// log(NumberRecognition("equipmentPower", [539, 211, 46, 35]))


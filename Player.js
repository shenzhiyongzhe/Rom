const { ReadImg, Sleep, RandomPress, GoBack, GetNumber, FindMultiColors, FindGreenBtn, FindCheckMark,FindTipPoint } = require("./Utils.js");
const { WearEquipment } = require("./BackPack.js");
const { BlueSquare } = require("./Color.js");

const { EnterInstanceZones } = require("./Instance.js");

const { game_config, RWFile } = require("./RomConfig.js");
const { CheckDelegate } = require("./Daily.js");


function GenerateRandomName()
{
    const CharDiction = ['a', "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
        "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
        "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ];

    let name = [];
    for (let i = 0; i < 12; i++)
    {
        name.push(CharDiction[Math.floor(random() * CharDiction.length)]);
    }
    return name.join("");
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
    const color = FindMultiColors(colorArr, region);
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
            let price = GetNumber("amount", [1105, 181 + i * 65, 86, 37]);
            if (price < 20)
            {
                RandomPress([195, 178 + i * 65, 43, 42]);
                let power = GetNumber("equipmentPower", [539, 210, 55, 37]);
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
    let theBlueEquipmentPrice = GetNumber("amount", [1106, 177, 90, 41]);
    if (theBlueEquipmentPrice < 20)
    {
        RandomPress([267, 181, 893, 35]);
        Sleep(3000, 5000);
        RandomPress([265, 181, 616, 34]);
        Sleep(3000, 5000);
        const theFinalDealPrice = GetNumber("amount", [1082, 551, 88, 36]);
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
    const totalDiamod = GetNumber("amount", [468, 3, 84, 30]);
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
const PickUpExpOrEquipment = () =>
{
    console.log("Start Flow: PickUpExpAndEquipment...");
    const CanPickExpOrEquipment = () =>
    {
        const crucifixIconList = [
            ["#c3ab97", [[3, 0, "#e1cbbf"], [16, 0, "#ccb597"], [10, -10, "#ab8354"], [10, -3, "#bd926b"], [10, 6, "#9b8063"], [10, 15, "#a87d55"], [10, 18, "#a27c53"]]],
            ["#af8b6b", [[7, 0, "#ddcebb"], [18, 0, "#d2b595"], [11, -11, "#ae8861"], [11, -7, "#ba9b7e"], [12, 6, "#6b5033"], [11, 11, "#aa8a64"], [11, 16, "#a6805b"]]]
        ];
        return FindMultiColors(crucifixIconList, [883, 8, 42, 53]);
    };
    const canPickup = CanPickExpOrEquipment();
    if (!canPickup)
    {
        console.log("End Flow: 没有十字架图标，没有装备或经验可拾取");
    };

    const expColorList = [
        ["#e7e7ce", [[0, 3, "#ecead4"], [0, 12, "#857c6a"], [18, 9, "#cfcfb2"], [26, 8, "#f1ecd4"], [35, 9, "#d2d0b9"], [44, 7, "#232323"], [127, 3, "#232323"]]]
    ];
    const coinColorList = [
        ["#232323", [[10, -2, "#e9d887"], [14, -2, "#eadf9e"], [18, -2, "#7f5927"], [18, 3, "#d7c384"], [14, 3, "#ddc77d"], [14, 4, "#bea863"], [13, 13, "#232323"]]]
    ];
    Sleep(3000, 5000);
    RandomPress([894, 20, 21, 31]);
    Sleep(3000, 5000);

    let shot = captureScreen();
    for (let i = 0; i < 5; i++)
    {
        let isExp = FindMultiColors(expColorList, [76, 135 + i * 83, 192, 68]);
        if (isExp)
        {
            RandomPress([178, 139 + i * 83, 190, 55]);
        }
        else break;
    }

    const hasCheckMark = FindCheckMark([94, 509, 55, 54]);
    if (!hasCheckMark)
    {
        RandomPress([110, 526, 52, 18]);
    }
    if (FindGreenBtn([81, 579, 234, 54]))
    {
        RandomPress([104, 595, 192, 22]); //confirm
        Sleep(2000, 4000);
    }

    if (FindGreenBtn([656, 458, 171, 58]))
    {
        RandomPress([674, 474, 133, 23]); // popup confirm
    }
    else
    {
        RandomPress([475, 474, 130, 26]);  //cancel
    }
    Sleep();

    //equipment 
    const hasLostEquipment = FindTipPoint([42, 220, 25, 30]);
    if (hasLostEquipment)
    {
        RandomPress([24, 238, 30, 46]); // equip page
        for (let j = 0; j < 5; j++)
        {
            let isEquip = FindMultiColors(coinColorList, [138, 144 + j * 83, 48, 57]);
            if (isEquip)
            {
                RandomPress([178, 139 + j * 83, 190, 55]);
            }
        }
        const hasEquipCheckMark = FindCheckMark([94, 509, 55, 54]);
        if (!hasEquipCheckMark)
        {
            RandomPress([110, 526, 52, 18]);
        }
        if (FindGreenBtn([81, 579, 234, 54]))
        {
            RandomPress([104, 595, 192, 22]); //select confirm btn
            Sleep(2000, 4000);
        }

        if (FindGreenBtn([656, 458, 171, 58]))
        {
            RandomPress([674, 474, 133, 23]); // popup confirm
        }
        else
        {
            RandomPress([475, 474, 130, 26]);  //cancel
        }
    }

    RandomPress([350, 69, 34, 15]);
    Sleep();
    console.log("End Flow: 拾取经验装备结束");
};
const ModeFlow = () =>
{
    const mode = game_config.ui.gameMode;
    if (mode == "mainStory")
    {
        console.log("mainStory flow");
    }
    else if (mode == "instance")
    {
        EnterInstanceZones();
    }
    else if (mode == "delegate")
    {
        CheckDelegate();
    }
};

module.exports = { BuyBlueEquipment, ModeFlow, PickUpExpOrEquipment };




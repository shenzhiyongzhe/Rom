const { game_config, ReadImg, Sleep, RandomPress, GoBack, PressBlank, RWFile, } = require("./Global.js");
const { NumberRecognition } = require("./utils.js");
const BackPackImg = {
    E: ReadImg("E"),
    confirm: ReadImg("backPack_confirm"),
    icon: ReadImg("backPack"),
    propIcon: ReadImg("backPack_propIcon"),
    equipmentVanish: ReadImg("backPack_equipmentVanish"),
    blank: ReadImg("backPack_blank")
};
/**
 * 
 * @param {*} page "equipment" or "props"
 * @returns 
 */
const OpenBackpack = function (page)
{
    let openSuccess = false;
    log("open backpack");
    Sleep();
    const menuIcon = ReadImg("menu_icon");
    const isBackPack = findImage(captureScreen(), menuIcon, { region: [1211, 2, 58, 57] });
    menuIcon.recycle();
    if (isBackPack == null)
    {
        openSuccess = false;
        return openSuccess;
    }

    RandomPress([1091, 21, 29, 28]);
    Sleep(3000, 4000);
    if (page == "equipment")
    {
        RandomPress([1237, 207, 19, 29]);
    }
    else if (page == "props")
    {
        RandomPress([1235, 285, 28, 28]);
    }
    Sleep();
    openSuccess = true;
    return openSuccess;
};

const IsEquiped = function (shot, region)
{
    const E_colorArr = [
        ["#aeada1", [[0, 3, "#b8b8a9"], [0, 7, "#b7b7a8"], [10, 2, "#bdbcb0"], [10, 5, "#bebdb0"]]],
        ["#aaa99c", [[0, 2, "#b8b8a9"], [0, 6, "#b7b7a8"], [10, 2, "#bdbbae"], [10, 4, "#bebbae"]]],
        ["#b3b2a4", [[0, 4, "#b5b5a8"], [0, 6, "#babaab"], [10, 1, "#bdb9aa"], [10, 3, "#bdbaaa"]]],
        ["#bdbdae", [[0, 3, "#bbbbb2"], [0, 5, "#bfbfae"], [10, 0, "#bcb7a8"], [10, 2, "#bcb8a9"]]],

    ];
    for (let i = 0; i < E_colorArr.length; i++)
    {
        let hasE = images.findMultiColors(shot, E_colorArr[i][0], E_colorArr[i][1], { region: region });
        if (hasE) return true;
    }
    return false;
};
const GetWeaponColor = function (shot, region)
{
    const ColorObj = {
        "purple": [
            ["#31213c", [[4, 0, "#3d244b"], [27, 20, "#59326b"], [27, 26, "#4f2861"]]],
        ],
        "blue": [
            ["#1c465c", [[14, 15, "#265e75"], [14, 20, "#20576e"], [15, 23, "#1f566d"], [15, 32, "#204b60"]]],
            ["#235e75", [[0, 3, "#2d6278"], [0, 9, "#215971"], [0, 19, "#204e64"], [-15, -14, "#1c4257"]]],
            ["#1c3b4e", [[15, 15, "#246078"], [15, 18, "#296077"], [15, 22, "#235b72"], [15, 27, "#22546a"]]],
            ["#1e2f3b", [[7, 0, "#1d3441"], [12, 0, "#1b4255"], [33, 18, "#225870"], [33, 30, "#214c60"]]]
        ],
        "green": [
            ["#233b20", [[6, 0, "#273d21"], [15, 0, "#2d4520"], [32, 21, "#435b25"], [32, 31, "#3a5526"]]],
            ["#223a20", [[9, 0, "#283e21"], [19, 1, "#374d20"], [33, 20, "#425a26"], [33, 38, "#365421"]]],
            ["#273d21", [[13, 2, "#30481f"], [25, 18, "#4b642b"], [25, 24, "#475c23"], [25, 33, "#3a5425"]]],
            ["#293f21", [[10, 3, "#374e20"], [24, 16, "#4b6226"], [24, 26, "#465b23"], [24, 35, "#385423"]]],
            ["#233a21", [[8, 0, "#253b21"], [11, 0, "#283e21"], [18, 0, "#2e451f"], [36, 16, "#4a6228"]]],
            ["#4a6226", [[0, 4, "#455e26"], [1, 9, "#485d24"], [-1, 13, "#3d5422"], [0, 18, "#395426"]]]
        ],
        "white": [
            ["#2e2f2f", [[13, 0, "#3c3c3c"], [27, 14, "#4e4f4f"], [26, 21, "#494a4a"], [29, 45, "#434444"]]],
            ["#303131", [[7, -1, "#393a3a"], [27, 13, "#4e4f4f"], [27, 19, "#484949"], [27, 36, "#414242"]]],
            ["#2e3030", [[7, 0, "#2f3030"], [19, 0, "#3c3e3e"], [32, 14, "#4d4e4e"], [33, 22, "#484949"]]],
            ["#343535", [[8, 0, "#3c3e3e"], [22, 13, "#4c4e4e"], [22, 19, "#474848"], [22, 24, "#484949"]]]
        ]
    };
    for (let key in ColorObj)
    {
        for (let color in ColorObj[key])
        {
            let hasColor = images.findMultiColors(shot, ColorObj[key][color][0], ColorObj[key][color][1], { region: region });
            if (hasColor) return key;
        }
    }
    return "unknown color";
};
// log(IsEquiped(captureScreen(), [1178, 99, 33, 27]));
// log(GetWeaponColor(captureScreen(), [879, 116, 95, 90]));
/**
 * 
 * @param {*} shot 
 * @param {*} region 
 * @returns 
 */
const BlankCheck = function (shot, region)
{
    const isBlank = images.findMultiColors(shot, "#191919", [[25, 1, "#1e1e1f"], [51, 2, "#1e1f1f"], [51, 23, "#1f1f20"], [50, 48, "#1b1c1d"], [26, 49, "#181819"],
    [2, 49, "#181919"], [-1, 26, "#19191a"], [14, 14, "#1b1b1b"], [36, 16, "#1f1f1f"], [24, 31, "#1b1b1d"]], { region: region });
    if (isBlank) return true;
    return false;
};
const WearEquipment = function (needOpen, needClose)
{
    const IsQualityBetter = function ()
    {
        Sleep();
        const shot = captureScreen();
        let curEquipColor = null;
        let equipColor = null;
        let isWhite = images.findMultiColors(shot, "#2a2b2b", [[23, -2, "#2e2f2f"], [56, 26, "#494a4a"], [57, 46, "#414242"]], { region: [51, 55, 114, 109] });
        let isGreen = images.findMultiColors(shot, "#233222", [[21, 0, "#233c20"], [61, 31, "#425a23"], [60, 59, "#385527"]], { region: [51, 55, 114, 109] });
        let isBlue = images.findMultiColors(shot, "#1e2b34", [[29, 0, "#1d3442"], [59, 20, "#295e75"], [58, 35, "#214d62"]], { region: [51, 55, 114, 109] });
        if (isWhite) curEquipColor = "white";
        else if (isGreen) curEquipColor = "green";
        else if (isBlue) curEquipColor = "blue";

        isWhite = images.findMultiColors(shot, "#2a2b2b", [[23, -2, "#2e2f2f"], [56, 26, "#494a4a"], [57, 46, "#414242"]], { region: [566, 59, 95, 97] });
        isGreen = images.findMultiColors(shot, "#233222", [[21, 0, "#233c20"], [61, 31, "#425a23"], [60, 59, "#385527"]], { region: [566, 59, 95, 97] });
        isBlue = images.findMultiColors(shot, "#1e2b34", [[29, 0, "#1d3442"], [59, 20, "#295e75"], [58, 35, "#214d62"]], { region: [566, 59, 95, 97] });
        if (isWhite) equipColor = "white";
        else if (isGreen) equipColor = "green";
        else if (isBlue) equipColor = "blue";


        if (curEquipColor == null || equipColor == null) return false;
        else if (curEquipColor == "white" && equipColor == "green") return true;
        else if (curEquipColor == "white" && equipColor == "blue") return true;
        else if (curEquipColor == "green" && equipColor == "blue") return true;
        else return false;
        // return [curEquipColor, equipColor];
    };
    log("开始穿戴装备");
    needOpen = needOpen || true;
    needClose = needClose || true;
    needOpen && OpenBackpack("equipment");

    let shot = captureScreen();
    const isfewEquip = BlankCheck(shot, [1145, 253, 64, 67]);
    if (!isfewEquip)
    {
        RandomPress([1076, 508, 21, 22]);
        Sleep();
        RandomPress([1041, 422, 97, 18]);
        Sleep();
        shot = captureScreen();
    }

    const plus = ReadImg("plus");
    const E = ReadImg("E");
    out: for (let i = 0; i < 5; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let isEquip = images.findImage(shot, E, { region: [920 + j * 65, 110 + i * 65, 40, 40], threshold: 0.8, });
            let isBlank = BlankCheck(shot, [890 + j * 65, 125 + i * 65, 50, 50]);
            if (isBlank)
            {
                Sleep();
                break out;
            }
            if (isEquip) continue;
            if (i > 2)
            {
                let isWhite = images.findMultiColors(shot, "#2a2b2b", [[10, 0, "#2e2f2f"], [20, 0, "#2e2f2f"], [30, 0, "#383838"]],
                    { region: [870 + j * 65, 120 + i * 65, 80, 20] });
                if (isWhite) continue;
            }

            RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
            Sleep();
            let equipmentItem_shot = captureScreen();
            let isQualityBetter_result = IsQualityBetter();
            let isBetter = images.findImage(equipmentItem_shot, plus, { region: [747, 154, 128, 70], });
            let newEquip = images.findMultiColors(equipmentItem_shot,
                "#262626", [[19, 3, "#252626"], [4, 18, "#242526"], [31, 18, "#242526"],],
                { region: [176, 192, 60, 132] }
            );
            if (isQualityBetter_result == true || isBetter || newEquip == null)
            {
                RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
                Sleep();
            }
        }
        Sleep();
    }
    plus.recycle();
    E.recycle();
    needClose && OpenBackpack();
    Sleep();
    log("穿戴装备完成");
};
// WearEquipment();

const OpenEquipmentBox = function ()
{
    log("打开装备箱");
    OpenBackpack("props");
    const equipmentImg = ReadImg("props/treasureBox_white_nomal_equipment_tied");
    const hasEquipmentBox = images.findImage(captureScreen(), equipmentImg, { region: [885, 111, 327, 341] });
    if (hasEquipmentBox)
    {
        RandomPress([hasEquipmentBox.x, hasEquipmentBox.y, 40, 30]);
        RandomPress([hasEquipmentBox.x, hasEquipmentBox.y, 40, 30]);
        const hasPopup = images.findMultiColors(captureScreen(), "#3c4538", [[0, 11, "#2b3327"], [80, -1, "#383f33"], [78, 12, "#333a2e"], [92, 10, "#2f362b"]],
            { region: [646, 502, 120, 49] });
        if (hasPopup)
        {
            RandomPress([655, 509, 99, 30]);
        }
        RandomPress([327, 400, 921, 198]); //blank
        for (let i = 0; i < 5; i++)
        {
            Sleep();
            let hasNextPage = images.findMultiColors(captureScreen(), "#695837", [[9, 0, "#665535"], [17, 0, "#4a3f26"], [25, 0, "#5f4f33"], [34, 2, "#73603c"], [45, 2, "#705f3b"]],
                { region: [595, 163, 89, 44] });
            if (hasNextPage)
            {
                RandomPress([327, 400, 921, 198]); //blank
            }
            else break;
        }
    }
    Sleep();

    OpenBackpack();
    equipmentImg.recycle();
    log("装备箱打开完成");
};
// OpenEquipmentBox();
// ------------------------------strenghten weapon----------------------------------

// log(GetWeaponColor(captureScreen(), [884, 105, 61, 60]));
const IsLeadToVanish = function ()
{
    const isVanish = images.findImage(images.captureScreen(), BackPackImg.equipmentVanish, { region: [75, 616, 340, 76], threshold: 0.8 });
    if (isVanish != null) return true;
    else return false;
};
/**
 * 
 * @param {*} type "weapon" or "armor"
 */
const getScroll = function (type)
{
    let scroll;
    if (type == "weapon") scroll = ReadImg("props/strengthenScroll_weapon_tied");
    else if (type == "armor") scroll = ReadImg("props/strengthenScroll_armor_tied");
    const shot = captureScreen();
    for (let i = 0; i < 5; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let hasScroll = images.findImage(shot, scroll, { region: [885 + j * 65, 125 + i * 65, 60, 60] });
            if (hasScroll)
            {
                RandomPress([hasScroll.x - 5, hasScroll.y, 35, 30]);
                Sleep();
                let isNormalScroll = images.findMultiColors(captureScreen(), "#282829", [[2, -3, "#8d8d7f"], [5, -3, "#a2a28e"],
                [4, 10, "#a5a594"], [16, -7, "#85857e"], [16, -2, "#9e9e88"], [16, 5, "#8e8e7c"], [16, 10, "#8d8d79"],
                [12, 17, "#97977f"], [20, 17, "#64644d"], [28, -2, "#77776f"], [25, 10, "#aaaa9f"], [30, 10, "#898a75"]], { region: [639, 452, 47, 43] });
                if (!isNormalScroll)
                {
                    scroll.recycle();
                    return hasScroll;
                };
            }
        }
    }
    scroll.recycle();
    return false;
};
const StrengthenItem = function ()
{
    const shot = captureScreen();

    const level_10 = ReadImg("strengthenedLevel_10");

    out: for (let i = 0; i < 5; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let isBlank = BlankCheck(shot, [882 + j * 65, 104 + i * 65, 60, 60]);
            if (isBlank == true)
            {
                log("强化完毕，退出 isBlank" + isBlank);
                break out;
            }
            let weaponColor = GetWeaponColor(shot, [882 + j * 65, 104 + i * 65, 60, 60]);
            if (weaponColor == "purple" || weaponColor == "blue" || weaponColor == "green")
            {
                RandomPress([895 + j * 65, 115 + i * 65, 35, 35]);
                let isVanish = IsLeadToVanish();
                if (isVanish)
                {
                    // let player = game_config.player;
                    // player.equipment.weapon.level = 7;
                    // player.equipment.weapon.color = weaponColor;
                    console.log("强化完毕，退出 isVanish" + isVanish);
                    continue;
                }
                else
                {
                    let canStrengthen_shot = captureScreen();
                    let canStrengthen = images.findMultiColors(canStrengthen_shot, "#3f4739", [[12, 0, "#3e4638"], [32, -2, "#394234"],
                    [-1, 14, "#343b2f"], [18, 14, "#30382b"], [32, 15, "#2e3429"]], { region: [903, 650, 132, 69], threshold: 12 });
                    let isUseOut = images.findMultiColors(canStrengthen_shot, "#191a1a", [[26, -1, "#1b1d1d"], [59, -1, "#1f1f20"],
                    [61, 24, "#1f1f20"], [61, 54, "#1d1d1e"], [31, 59, "#171718"], [1, 59, "#191919"], [-2, 28, "#191919"], [26, 13, "#2e2f2c"],
                    [41, 18, "#40403b"], [27, 26, "#2d2e29"], [17, 35, "#3d3d3a"], [32, 44, "#393a37"]], { region: [350, 206, 74, 76] });
                    if (isUseOut) break out;
                    if (canStrengthen)
                    {
                        RandomPress([937, 674, 277, 28]);
                    }
                }
            }
            else if (weaponColor == "white")
            {
                let isEquip = images.findMultiColors(shot, "#b0afa3", [[7, 0, "#484132"], [3, 5, "#291f09"], [8, 5, "#b1b0a0"], [3, 8, "#3b3222"], [9, 8, "#8c8172"],
                [0, 8, "#b8b8a8"]], { region: [925 + j * 65, 106 + i * 65, 20, 18] });
                if (isEquip) continue;
                RandomPress([895 + j * 65, 115 + i * 65, 35, 35]);
                let isUpToLevel_10 = images.findImage(captureScreen(), level_10, { region: [263, 140, 50, 36] });
                if (isUpToLevel_10) continue;
                for (let n = 0; n < 4; n++)
                {
                    let strenghten_shot = captureScreen();
                    isUpToLevel_10 = images.findImage(strenghten_shot, level_10, { region: [263, 140, 50, 36] });
                    if (isUpToLevel_10) break;
                    let hasFailed = images.findMultiColors(strenghten_shot, "#1d1d1f", [[13, 1, "#202020"], [29, 0, "#1e1e1f"], [29, 20, "#202021"],
                    [28, 43, "#1e1f20"], [-7, 53, "#1a1a1b"], [-31, 54, "#19191b"], [-35, 32, "#19191b"]], { region: [85, 203, 78, 81] });
                    if (hasFailed) break;
                    let isUseOut_2 = images.findMultiColors(strenghten_shot, "#191a1a", [[26, -1, "#1b1d1d"], [59, -1, "#1f1f20"],
                    [61, 24, "#1f1f20"], [61, 54, "#1d1d1e"], [31, 59, "#171718"], [1, 59, "#191919"], [-2, 28, "#191919"], [26, 13, "#2e2f2c"],
                    [41, 18, "#40403b"], [27, 26, "#2d2e29"], [17, 35, "#3d3d3a"], [32, 44, "#393a37"]], { region: [350, 206, 74, 76] });
                    if (isUseOut_2) break out;
                    RandomPress([933, 672, 284, 28]);
                    Sleep(3000, 5000);
                    RandomPress([933, 672, 284, 28]);
                    Sleep(2000, 3000);
                    RandomPress([230, 157, 740, 428]);
                    Sleep(2000, 3000);
                }
            }
        }

    }
    level_10.recycle();
};
/**
 * 
 * @param {*} type "weapon or armor" 
 */
const StrengthenEquipment = function (type)
{
    log("开始强化装备");
    OpenBackpack("props");
    //search tied scroll
    const scroll_tied = getScroll(type);
    Sleep();
    if (scroll_tied)
    {
        RandomPress([scroll_tied.x - 5, scroll_tied.y, 35, 30]);
        Sleep(3000, 5000);
        if (type == "weapon") RandomPress([1225, 199, 29, 33]); // weapon page
        else if (type == "armor") RandomPress([1228, 283, 26, 28]); // armor page
        RandomPress([1027, 497, 65, 13]); // not binding
        StrengthenItem();
    }
    Sleep();
    GoBack();// backpack
    Sleep();
};
// StrengthenEquipment("armor");
// log(GetWeaponColor(captureScreen(), [882 + 1 * 65, 104 + 0 * 65, 60, 60]));
// log(GetWeaponColor(captureScreen(), [945, 104, 63, 62]));


// log(images.matchTemplate(captureScreen(), ReadImg("props/strengthenScroll_armor_tied"), { region: [884, 96, 343, 417] }));
// log(BlankCheck(captureScreen(), [1141, 104, 67, 63]));
const DecomposeProps = function ()
{
    const popupCheck = function ()
    {
        Sleep(2000, 3000);
        const hasPopup = images.findMultiColors(captureScreen(), "#363636", [[2, 19, "#303030"], [41, 6, "#262728"],
        [69, 13, "#262627"], [116, 4, "#394235"], [123, 20, "#2b3326"]], { region: [521, 426, 245, 77] });
        if (hasPopup)
        {
            RandomPress([577, 376, 20, 16]);
            let setting = game_config.setting;
            setting.decompose = true;
            RWFile("setting", setting);
            RandomPress([702, 455, 125, 24]);
        }
    };
    OpenBackpack("equipment");
    RandomPress([1009, 511, 23, 20]); //decompose
    Sleep();
    RandomPress([922, 512, 53, 16]); //normal
    for (let i = 0; i < 3; i++)
    {
        RandomPress([1120, 508, 122, 22]); //decompose
        let continueDecompose = images.findMultiColors(captureScreen(), "#363636", [[16, 0, "#343434"], [11, 8, "#333334"], [55, 6, "#262828"], [83, 3, "#262626"],
        [121, 1, "#3e4638"], [128, 6, "#373e32"], [120, 18, "#2f372b"]], { region: [480, 538, 378, 70] });
        if (continueDecompose == null) break;
        RandomPress([696, 563, 127, 23]); //popup confirm
        Sleep();
        let isNoMoney = images.findMultiColors(captureScreen(), "#383838", [[-1, 21, "#29292a"], [88, 0, "#333333"], [112, 21, "#2e2e2e"]], { region: [429, 537, 183, 71] });
        if (isNoMoney)
        {
            RandomPress([455, 565, 132, 20]);
            break;
        }
        else
        {
            RandomPress([323, 95, 522, 217]);
        }
    }
    Sleep();
    //分解绿装
    // RandomPress([1018, 512, 50, 15]); //green equipment;
    const shot = captureScreen();
    for (let i = 0; i < 2; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            for (let k = 0; k < 15; k++)
            {

                let ornament_img = ReadImg(`ornaments/${(k + 1).toString().padStart(2, "0")}`);
                let is_ornament = images.findImage(shot, ornament_img, { region: [876 + j * 65, 118 + i * 65, 78, 76], threshold: 0.8 });
                ornament_img.recycle();
                if (is_ornament != null) break;
                let isBlue = images.findMultiColors(shot, "#1c475b", [[5, 1, "#1d4b63"], [5, 5, "#215167"], [5, 13, "#256079"], [5, 19, "#2a5f76"]],
                    { region: [876 + j * 65, 118 + i * 65, 78, 76] });
                if (isBlue) break;
                if (k == 14)
                {
                    RandomPress([896 + j * 65, 136 + i * 65, 44, 40]);
                }
            }
            let isEquiped = images.findMultiColors(shot, "#5e5d55", [[0, 5, "#606059"], [3, 4, "#0e0901"], [9, 4, "#636158"], [9, 1, "#605f57"]],
                { region: [916 + j * 65, 118 + i * 65, 37, 40] });
            if (isEquiped) break;
        }
    }
    RandomPress([1120, 508, 122, 22]); //decompose
    RandomPress([696, 563, 127, 23]); //popup confirm
    if (game_config.setting.decompose == undefined || game_config.setting.decompose == false) popupCheck();
    Sleep();
    let isNoMoney = images.findMultiColors(captureScreen(), "#383838", [[-1, 21, "#29292a"], [88, 0, "#333333"], [112, 21, "#2e2e2e"]], { region: [429, 537, 183, 71] });
    if (isNoMoney)
    {
        RandomPress([455, 565, 132, 20]);
    }
    else
    {
        RandomPress([323, 95, 522, 217]);
    }
    OpenBackpack();
};

const ReturnHome = function ()
{
    const quickItem_returnHome = ReadImg("quickItem_returnHome");
    const hasQuickReturnHome = images.findImage(captureScreen(), quickItem_returnHome, { region: [647, 624, 71, 68] });
    if (hasQuickReturnHome)
    {
        RandomPress([670, 642, 30, 35]);
        Sleep(10000, 15000);
    }
    else
    {
        RandomPress(BackPackPos.icon);
        Sleep(3000, 4000);

        RandomPress(BackPackPos.props);
        Sleep();

        const returnHomeIcon = ReadImg("return_home");
        const hasReturnHome = images.findImage(captureScreen(), returnHomeIcon, { region: [883, 104, 344, 401] });
        returnHomeIcon.recycle();

        if (hasReturnHome)
        {
            RandomPress([hasReturnHome.x - 10, hasReturnHome.y - 6, 30, 30]);
            RandomPress([670, 642, 30, 35]); //添加到快捷栏
            RandomPress([hasReturnHome.x - 10, hasReturnHome.y - 6, 30, 30]);
            Sleep(10000, 15000);
        }
        else
        {
            // alert("待优化", "没有回城卷轴回城");
            RandomPress([955, 19, 35, 30]); // 商城
            Sleep(3000, 5000);
            RandomPress([296, 98, 72, 28]); //第三页 普通页
            RandomPress([17, 211, 173, 37]); // 消耗品分页
            RandomPress([529, 164, 227, 236]); //return home scroll
            RandomPress([686, 578, 151, 24]);
            GoBack();
            ReturnHome();
        }
    }
    quickItem_returnHome.recycle();
    log("return home to purchase potion");
};
// DecomposeProps();
// log(images.matchTemplate(captureScreen(), ReadImg("E"), { region: [883, 105, 374, 435], threshold: 0.8 }));

const StoreEquipment = function ()
{
    Sleep();
    let success = false;
    const groceryIcon = ReadImg("grocery");
    const hasGrocery = images.findImage(captureScreen(), groceryIcon, { region: [52, 251, 113, 74] });
    if (hasGrocery == null) return;
    RandomPress([84, 323, 97, 26]);
    for (let i = 0; i < 10; i++)
    {
        Sleep(3000, 5000);
        let hasEnterStore = images.findMultiColors(captureScreen(), "#3e4638", [[19, 1, "#363e33"], [-1, 16, "#2f372b"], [149, 4, "#363e30"], [146, 29, "#2f362b"]], { region: [10, 640, 194, 65] });
        if (hasEnterStore) break;
    }
    //将非绑定白色装备放入背包
    Sleep(3000, 5000);
    RandomPress([1237, 207, 25, 29]);
    Sleep();
    RandomPress([896, 615, 87, 13]);
    let backpackShot = captureScreen();
    let count = 0;
    for (let times = 0; times < 3; times++)
    {
        out: for (let i = 2; i < 6; i++) 
        {
            for (let j = 0; j < 5; j++)
            {
                let isWhite = images.findMultiColors(backpackShot, "#2c2d2d", [[14, 0, "#2e2e2e"], [43, 0, "#3e3f3f"], [46, 8, "#505050"], [46, 35, "#434444"]],
                    { region: [885 + j * 65, 125 + i * 65, 60, 60] });
                let isGreen = images.findMultiColors(backpackShot, "#243921", [[17, 0, "#2d4820"], [29, 0, "#355320"], [30, 17, "#4a6227"], [30, 40, "#365522"]],
                    { region: [885 + j * 65, 125 + i * 65, 60, 60] });
                if (isGreen) continue;
                if (isWhite)
                {
                    log(isWhite);
                    let x1 = 899 + j * 65 + random() * 40;
                    let y1 = 140 + i * 65 + random() * 33;
                    press(x1, y1, random() * 256 + 10);
                    count++;
                    Sleep(2500, 3500);
                    let canSell = images.findMultiColors(captureScreen(), "#9e9e88", [[0, 7, "#8e8e7c"], [-3, 9, "#282829"], [4, 12, "#282929"], [11, 12, "#9d9d91"], [-11, 12, "#a0a08f"]],
                        { region: [647, 453, 38, 43] });
                    if (!canSell)
                    {
                        let x2 = 899 + j * 65 + random() * 40;
                        let y2 = 140 + i * 65 + random() * 33;
                        for (let n = 0; n < 100; n++)
                        {
                            if (Math.abs(x1 - x2) < 8 || Math.abs(y1 - y2) < 8)
                            {
                                x2 = 899 + j * 65 + random() * 40;
                                y2 = 140 + i * 65 + random() * 33;
                            }
                        }
                        press(x2, y2, random() * 256 + 10);
                        Sleep(2000, 3000);
                        count--;
                    }
                }
                if (count == 20) break out;
            }
        }
        if (count == 0)
        {
            console.log("no more item to put into store");
            break;
        };
        RandomPress([1098, 657, 156, 34]); // put into store;
        Sleep();

        success = true;

        const maxShot = captureScreen();
        backpackShot = maxShot;
        const isMax_1 = images.findMultiColors(maxShot, "#878785", [[-3, 2, "#a8a6a6"], [-3, 4, "#b2b2b2"], [1, 6, "#969694"], [-1, 10, "#9d9d9b"], [-4, 9, "#959592"]],
            { region: [317, 660, 19, 24] });
        const isMax_2 = images.findMultiColors(maxShot, "#8e8c87", [[-3, 0, "#aeada8"], [-3, 2, "#a8a7a5"], [-3, 4, "#b1afad"], [-1, 4, "#9e9b98"], [1, 4, "#96948f"],
        [1, 7, "#918e87"], [1, 8, "#98958f"], [-1, 10, "#9f9c97"], [-4, 9, "#94918b"]],
            { region: [316, 660, 24, 25] });
        const isMax_3 = images.findMultiColors(maxShot, "#9d9c98", [[-2, 0, "#a09d99"], [-4, 0, "#9f9c99"], [-4, 1, "#b2b1af"], [-1, 5, "#a4a3a2"], [0, 8, "#989693"],
        [-2, 11, "#969594"], [-5, 11, "#8f8d8a"], [4, 5, "#a09e9b"], [4, 6, "#9a9998"], [10, 6, "#9e9d9c"], [10, 5, "#9f9e9d"], [7, 11, "#999999"], [7, 0, "#a8a8a7"]],
            { region: [316, 660, 24, 25] }); // map 21
        if (isMax_1 || isMax_2 || isMax_3)
        {
            let setting = game_config.setting;
            setting.storeMax = true;
            RWFile("setting", setting);
            console.log("store is max capacity");
            break;
        }

        count = 0;
    }
    GoBack();
};

// -----------------------------------sell backpack items---------------------------------------------
const DecomposeGreenSuit = function ()
{
    let deCount = 0;
    //分解绿装
    const reservedList = [];
    for (let i = 0; i < 15; i++)
    {
        reservedList.push(ReadImg(`reservedList/${(i + 1).toString().padStart(2, "0")}`));
    }
    const shot = captureScreen();
    for (let i = 0; i < 4; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let itemColor = GetWeaponColor(shot, [885 + j * 65, 125 + i * 65, 60, 60]);
            if (itemColor != "green") continue;
            for (let k = 0; k < reservedList.length; k++)
            {
                let needReserved = images.findImage(shot, reservedList[k], { region: [885 + j * 65, 125 + i * 65, 60, 60] });
                if (!needReserved)
                {
                    RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
                    deCount++;
                }
                break;
            }
        }
    }
    reservedList.forEach(item => item.recycle());

    if (deCount > 0)
    {
        Sleep();
        RandomPress([1119, 506, 126, 24]); //decompose 
        Sleep();
        RandomPress([696, 561, 132, 24]); // confirm
        Sleep();
        RandomPress([204, 431, 880, 163]); // blank 
        return true;
    }
    else return false;
};
const DecomposeAllGreenSuit = function ()
{
    let decomposeSuccess = false;
    const hadOpen = OpenBackpack("equipment");
    if (hadOpen == false)
    {
        return decomposeSuccess = false;;
    }
    RandomPress([1005, 506, 33, 28]); //decompose btn;   
    decomposeSuccess = DecomposeGreenSuit();
    if (decomposeSuccess)
    {
        console.log("decompose green suit success");
        DecomposeGreenSuit();
    }
    Sleep();
    RandomPress([1243, 68, 31, 16]); //close decompose window;
    return decomposeSuccess;
};

const SortEquipment = function ()
{
    Sleep();
    RandomPress([1075, 509, 22, 22]);
    RandomPress([1041, 423, 90, 21]);
    Sleep();
};
// log(DecomposeAllGreenSuit());
const ViewPrice = function ()
{
    let amount, price = 0;

    amount = NumberRecognition("amount", [929, 177, 98, 40]);
    if (amount > 200)
    {
        return [amount, 10];
    }
    RandomPress([277, 181, 958, 31]); // item detail
    Sleep(2000, 4000);
    const level_10 = ReadImg("flag/trade_goods_level_10");
    const hasLevel10 = images.findImage(captureScreen(), level_10, { region: [232, 171, 103, 472] });
    if (hasLevel10)
    {
        amount = NumberRecognition("amount", [905, hasLevel10.y, 145, 30]);
        price = NumberRecognition("amount", [1075, hasLevel10.y, 125, 30]);
    }
    GoBack();
    Sleep();
    return [amount, price];
};
// ViewPrice(4, 0);
// log(ViewPrice(3, 2));
const GetAllEquipmentPrice = function ()
{
    const priceList = [];
    const shot = captureScreen();
    let lastClip = ReadImg("menu_icon");
    for (let i = 2; i < 5; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let curClip = images.findImage(shot, lastClip, { region: [885 + j * 65, 125 + i * 65, 60, 60] });
            if (curClip == null)
            {
                lastClip = images.clip(shot, 895 + j * 65, 135 + i * 65, 40, 40);
            }
            else continue;
            let equipmentColor = GetWeaponColor(shot, [885 + j * 65, 125 + i * 65, 60, 60]);
            log("equipment color: " + equipmentColor);
            if (equipmentColor == "white")
            {
                RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
                Sleep();
                let canSell = images.findMultiColors(captureScreen(), "#9e9e88", [[0, 7, "#8e8e7c"], [-3, 9, "#282829"], [4, 12, "#282929"], [11, 12, "#9d9d91"], [-11, 12, "#a0a08f"]],
                    { region: [647, 453, 38, 43] });
                if (canSell)
                {
                    RandomPress([654, 460, 24, 26]); // enter trade market;
                    Sleep(3000, 5000);
                    let [amount, price] = ViewPrice();
                    let item = { row: i, col: j, amount: amount, price: price };
                    priceList.push(item);
                    Sleep();
                    OpenBackpack("equipment");
                }
            }
        }
    }
    return priceList;
};
log(GetAllEquipmentPrice());

// strengthen equipment
const StrengthenTheEquipment = function (arr)
{
    let strengthenSuccess = false;

};
const PutOnSale = function ()
{
    let hadSold = false;
    console.log("start put on sale");
    // DecomposeAllGreenSuit();
    // Sleep();
    // SortEquipment();
    const priceList = GetAllEquipmentPrice();
    log(priceList);

};
// PutOnSale();
// module.exports = {
//     OpenEquipmentBox,
//     WearEquipment,
//     StrengthenEquipment,
//     DecomposeProps,
//     ReturnHome,
//     StoreEquipment,
//     BlankCheck,
//     PutOnSale
// };

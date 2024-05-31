const { game_config, ReadImg, Sleep, RandomPress, GoBack, PressBlank, RWFile, } = require("./Global.js");

const BackPackImg = {
    E: ReadImg("E"),
    confirm: ReadImg("backPack_confirm"),
    icon: ReadImg("backPack"),
    propIcon: ReadImg("backPack_propIcon"),
    equipmentVanish: ReadImg("backPack_equipmentVanish"),
    blank: ReadImg("backPack_blank")
};
const BackPackPos = {
    icon: [1090, 20, 25, 15],
    close: [1240, 70, 23, 10],
    equipment: [1237, 210, 10, 20], //背包装备
    equipmentSort: [1073, 507, 23, 23], //背包装备排序
    sortByLevel: [1030, 420, 100, 15], //背包装备按等级排序

    props: [1230, 286, 31, 30], //背包道具
    props_scroll_weaponPage: [1228, 205, 21, 24],
    props_scroll_defencePage: [1228, 286, 21, 22],

    strengthenBtn: [931, 660, 286, 37],

    pageBack: [1181, 23, 69, 22]
};
const BackPackCheckPos = {
    icon: [1064, 1, 79, 71],
    equipment_vanish: [117, 627, 276, 56],

};
/*@description：穿戴背包中的装备
 */
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
function WearEquipment(needOpen, needClose)
{
    log("开始穿戴装备");
    needOpen = needOpen || true;
    needClose = needClose || true;
    if (needOpen == true)
    {
        const isBackPack = findImage(captureScreen(), BackPackImg.icon, { region: BackPackCheckPos.icon });
        if (isBackPack == null) return;

        RandomPress(BackPackPos.icon);
        Sleep(3000, 4000);
    }

    RandomPress([1238, 211, 25, 25]);
    const isfewEquip = images.findImage(captureScreen(), BackPackImg.blank, { region: [1137, 254, 85, 70] });
    if (isfewEquip == null)
    {
        RandomPress(BackPackPos.equipmentSort);
        Sleep();
        RandomPress(BackPackPos.sortByLevel);
        Sleep();
    }

    let shot = captureScreen();

    const plus = ReadImg("plus");
    for (let i = 0; i < 5; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let isEquip = images.findImage(shot, BackPackImg.E, { region: [920 + j * 65, 110 + i * 65, 40, 40], threshold: 0.8, });
            let isBlank = images.findImage(shot, BackPackImg.blank, { region: [890 + j * 65, 125 + i * 65, 50, 50] });
            if (isBlank)
            {
                RandomPress(BackPackPos.close);
                Sleep();
                return;
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
    if (needClose)
    {

        RandomPress(BackPackPos.close);
    }
    Sleep();
}



function WearSlabStone(type)
{
    RandomPress([1225, 20, 26, 24]);
    if (type == "suit")
    {
        RandomPress([961, 125, 22, 44]);
    }
    else if (type == "guardian")
    {
        RandomPress([1029, 116, 20, 53]);
    }
    Sleep(5000, 6000);
    const ifFirstWear = images.findMultiColors(captureScreen(), "#394235", [[2, 14, "#2c3428"], [1, 27, "#2b3427"], [100, 0, "#394235"], [100, 24, "#31392d"]], { region: [992, 476, 203, 88] });
    if (ifFirstWear)
    {
        RandomPress([1043, 512, 117, 27]);
        return;
    }
    else
    {
        RandomPress([224, 575, 68, 105]);
        RandomPress([1043, 512, 117, 27]);
    }
    const suitCollectionTipPoint = images.findMultiColors(captureScreen(), "#c7321f", [[3, 0, "#cb2f20"], [-1, 3, "#ca2a19"], [2, 3, "#bb2316"]], { region: [356, 75, 60, 48] });
    if (suitCollectionTipPoint)
    {
        RandomPress([306, 102, 62, 19]);
        RandomPress([1175, 12, 98, 33]);
    }
}
// WearSlabStone("guardian");
function GetWeaponColor(shot, [x, y, w, h])
{
    const isPurple = images.findMultiColors(shot, "#31213c", [[4, 0, "#3d244b"], [27, 20, "#59326b"], [27, 26, "#4f2861"]], { region: [x, y, w, h] });
    const isBlue = images.findMultiColors(shot, "#1c3340", [[11, 0, "#1d3c4f"], [26, 28, "#214f65"], [26, 35, "#204b61"]], { region: [x, y, w, h] });
    const isGreen = images.findMultiColors(shot, "#4b6329", [[0, 6, "#445b25"], [0, 9, "#465a22"], [0, 15, "#3a5325"]], { region: [x, y, w, h] });
    if (isPurple) return "purple";
    else if (isBlue) return "blue";
    else if (isGreen) return "green";
    else return false;
};
function IsLeadToVanish()
{
    const isVanish = images.findImage(images.captureScreen(), BackPackImg.equipmentVanish, { region: BackPackCheckPos.equipment_vanish, threshold: 0.8 });
    if (isVanish != null) return true;
    else return false;
};
function OpenTreasureBox()
{
    Sleep();
    const shot = captureScreen();
    const hasConfirm_small = images.findMultiColors(shot, "#fefefd", [[7, 7, "#f9f9f5"], [13, 87, "#3a4336"], [12, 104, "#343b2f"]], { region: [695, 374, 82, 182] });
    const hasConfirm_big = images.findMultiColors(shot, "#3b3b3b", [[-3, 18, "#313131"], [25, 11, "#303032"], [440, 0, "#384034"], [450, 21, "#30372b"]],
        { region: [370, 511, 561, 76] });
    if (hasConfirm_small)
    {
        RandomPress([664, 512, 86, 25]);
        PressBlank();
        return;
    }
    if (hasConfirm_big)
    {
        RandomPress([782, 454, 41, 26]);
        RandomPress([703, 539, 157, 22]);
        PressBlank();
        return;
    }
    else
    {
        PressBlank();
        return;
    }
}
function UseStrengthenScroll(scrollType)
{
    if (scrollType.indexOf("weapon") != -1)
    {
        RandomPress(BackPackPos.props_scroll_weaponPage);
        const weaponStrengthen_shot = captureScreen();
        for (let i = 0; i < 5; i++)
        {
            let weaponColor = GetWeaponColor(weaponStrengthen_shot, [870 + i * 65, 100, 80, 65]);
            let isBlank = images.findImage(weaponStrengthen_shot, BackPackImg.blank, { region: [870 + i * 65, 100, 70, 70] });
            if (isBlank)
            {
                log("强化完毕，退出");
                RandomPress(BackPackPos.pageBack);
                return false;
            }
            if (weaponColor == "blue" || weaponColor == "green")
            {
                log("need strengthen:" + " " + weaponColor);
                RandomPress([895 + i * 65, 115, 35, 35]);
                let isVanish = IsLeadToVanish();
                if (isVanish)
                {
                    game_config.player.equipment.weapon.level = 7;
                    game_config.player.equipment.weapon.color = weaponColor;
                    log("weapon is strengthened to 7,lead to vanish;" + game_config.player.equipment.weapon.level);
                    continue;
                }
                else
                {
                    let canStrengthen = images.findMultiColors(captureScreen(),
                        "#3f4739", [[12, 0, "#3e4638"], [32, -2, "#394234"], [-1, 14, "#343b2f"], [18, 14, "#30382b"], [32, 15, "#2e3429"]],
                        { region: [903, 650, 132, 69], threshold: 12 });
                    if (canStrengthen)
                    {
                        RandomPress(BackPackPos.strengthenBtn);

                    }
                }
            }
            if (i == 4)
            {
                RandomPress(BackPackPos.pageBack);
            }

        }
    }
    else if (scrollType.indexOf("defence") != -1)
    {
        RandomPress(BackPackPos.props_scroll_defencePage);
        Sleep();
        const defenceStrengthen_shot = captureScreen();
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 5; j++)
            {
                let defenceColor = GetWeaponColor(defenceStrengthen_shot, [870 + j * 65, 100 + i * 65, 80, 65]);
                if (defenceColor == "blue" || defenceColor == "green")
                {
                    log("need strengthen:" + " " + defenceColor);
                    RandomPress([895 + j * 65, 115 + i * 65, 35, 35]);
                    Sleep();
                    let isVanish = IsLeadToVanish();
                    if (isVanish)
                    {
                        log("lead to vanish");
                        continue;
                    }
                    else
                    {
                        let canStrengthen = images.findMultiColors(captureScreen(),
                            "#3f4739", [[12, 0, "#3e4638"], [32, -2, "#394234"], [-1, 14, "#343b2f"], [18, 14, "#30382b"], [32, 15, "#2e3429"]],
                            { region: [903, 650, 132, 69], threshold: 12 });
                        if (canStrengthen)
                        {
                            RandomPress(BackPackPos.strengthenBtn);
                            Sleep();
                        }
                    }
                }
                let isBlank = images.findImage(defenceStrengthen_shot, BackPackImg.blank, { region: [870 + j * 65, 100 + i * 65, 70, 70] });
                if (isBlank)
                {
                    log("强化完毕，退出" + (i + 1) + " " + (j + 1));
                    RandomPress(BackPackPos.pageBack);
                    Sleep();
                    return true;
                }
                Sleep();
            }
        }
    }
}

function OpenSlabstone()
{
    let hasConfirm_small = findImage(captureScreen(), BackPackImg.confirm, { region: BackPackCheckPos.props_confirm_small, threshold: 0.8 });

    if (hasConfirm_small)
    {
        RandomPress(BackPackPos.props_confirm_small);
        Sleep();
    }
    RandomPress([548, 635, 185, 33]);
    Sleep(6000, 8000);
    RandomPress([548, 635, 185, 33]);
    Sleep();
    return true;
}
/**
 * @description使用背包道具
 */
function UseProps(needOpen, needClose)
{
    const props = {
        treasureBox_white_nomal_equipment_tied: ReadImg("props/treasureBox_white_nomal_equipment_tied"),
        treasureBox_goldenRandom: ReadImg("props/treasureBox_goldenRandom"),
        treasureBox_white_nomal_potion_tied: ReadImg("props/treasureBox_white_nomal_potion_tied"),
        treasureBox_white_normal_optionalFood_tied: ReadImg("props/treasureBox_white_normal_optionalFood_tied"),
        treasureBox_green_highLevel_equipment_mark: ReadImg("props/treasureBox_green_highLevel_equipment_mark"),

        //scroll;
        strengthenScroll_weapon_tied: ReadImg("props/strengthenScroll_weapon_tied"),
        strengthenScroll_weapon_mark: ReadImg("props/strengthenScroll_weapon_mark"),
        strengthenScroll_defence: ReadImg("props/strengthenScroll_defence"),
        strengthenScroll_defence_tied: ReadImg("props/strengthenScroll_defence_tied"),
        // slabstone;
        slabstone_white_normal_guardian: ReadImg("props/slabstone_white_normal_guardian"),
        slabstone_white_normal_suit: ReadImg("props/slabstone_white_normal_suit"),
        slabstone_green_highLevel_guardian: ReadImg("props/slabstone_green_highLevel_guardian"),
        slabstone_green_highQuality_guardian: ReadImg("props/slabstone_green_highQuality_guardian"),
        slabstone_green_highLevel_suit: ReadImg("props/slabstone_green_highLevel_suit"),
        slabstone_green_highQuality_suit: ReadImg("props/slabstone_green_highQuality_suit"),
        slabstone_gray_middleLevel_suit: ReadImg("props/slabstone_gray_middleLevel_suit"),
        slabstone_gray_middleLevel_monster: ReadImg("props/slabstone_gray_middleLevel_monster"),
    };
    needOpen = needOpen || true;
    needClose = needClose || true;
    let hasOpenSlabstone = false;
    if (needOpen)
    {
        const isBackPack = findImage(captureScreen(), BackPackImg.icon, { region: BackPackCheckPos.icon });
        if (isBackPack == null) return;

        RandomPress(BackPackPos.icon);
        Sleep(3000, 4000);
    }

    RandomPress(BackPackPos.props);
    Sleep();

    let shot = captureScreen();
    let type;

    itemLoop: for (let i = 0; i < 6; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            Sleep(500, 1000);
            shot = captureScreen();
            for (let key in props)
            {
                let prop = props[key];
                let propType = images.findImage(shot, prop, { region: [870 + j * 65, 120 + i * 65, 70, 70] });
                if (propType)
                {
                    type = key;
                    break;
                }
                else
                {
                    type = null;
                }
            }
            type && log((i + 1) + " " + (j + 1) + " " + type);
            if (type == "treasureBox_white_nomal_equipment_tied"
                || type == "treasureBox_goldenRandom"
                || type == "treasureBox_white_nomal_potion_tied"
                || type == "treasureBox_white_normal_optionalFood_tied"
                || type == "treasureBox_green_highLevel_equipment_mark")
            {
                log("open treasureBox");
                RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
                Sleep();
                RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
                Sleep();
                OpenTreasureBox();
                Sleep();
                shot = captureScreen();
            }
            else if (type == "strengthenScroll_weapon_tied"
                || type == "strengthenScroll_weapon_mark"
                || type == "strengthenScroll_defence_tied"
                || type == "strengthenScroll_defence")
            {
                if (type.indexOf("weapon") != -1 && game_config.player.equipment.weapon.level == 7) continue;
                RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
                Sleep();
                RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
                Sleep(3000, 4000);
                UseStrengthenScroll(type);
                Sleep(2000, 3000);
                RandomPress([1093, 23, 23, 30]); //backpack icon
                RandomPress([1238, 291, 23, 21]); //props page
                Sleep();
                shot = captureScreen();
            }

            else if (type == "slabstone_white_normal_guardian"
                || type == "slabstone_white_normal_suit"
                || type == "slabstone_green_highLevel_guardian"
                || type == "slabstone_green_highQuality_guardian"
                || type == "slabstone_green_highLevel_suit"
                || type == "slabstone_green_highQuality_suit"
                || type == "slabstone_gray_middleLevel_suit"
                || type == "slabstone_gray_middleLevel_monster")
            {
                log("use slabstone" + type);
                RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
                Sleep();
                RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
                Sleep(6000, 8000);
                OpenSlabstone();
                Sleep();
                shot = captureScreen();
                hasOpenSlabstone = type;
            }
            let isBlank = images.findImage(shot, BackPackImg.blank, { region: [870 + j * 65, 115 + i * 65, 80, 80] });
            if (isBlank)
            {
                log("blank :" + (i + 1) + " " + (j + 1));
                RandomPress(BackPackPos.close);
                Sleep();
                break itemLoop;
            };
        }
    }
    if (hasOpenSlabstone == false) return;
    else if (hasOpenSlabstone.indexOf("suit"))
    {
        WearSlabStone("suit");
    }
    else if (hasOpenSlabstone.indexOf("guardian"))
    {
        WearSlabStone("guardian");
    }
}
//分解道具
function DecomposeProps()
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
    const isBackPack = findImage(captureScreen(), BackPackImg.icon, { region: BackPackCheckPos.icon });
    if (isBackPack == null) return;

    RandomPress(BackPackPos.icon);
    Sleep(3000, 5000);

    RandomPress(BackPackPos.equipment);
    RandomPress([1009, 511, 23, 20]);
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
    RandomPress([1018, 512, 50, 15]); //green equipment;
    Sleep();
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
    RandomPress(BackPackPos.icon);
};

function ReturnHome()
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
}
function StoreEquipment()
{
    Sleep();
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

        const maxShot = captureScreen();
        backpackShot = maxShot;
        const isMax_1 = images.findMultiColors(maxShot, "#878785", [[-3, 2, "#a8a6a6"], [-3, 4, "#b2b2b2"], [1, 6, "#969694"], [-1, 10, "#9d9d9b"], [-4, 9, "#959592"]],
            { region: [317, 660, 19, 24] });
        const isMax_2 = images.findMultiColors(maxShot, "#8e8c87", [[-3, 0, "#aeada8"], [-3, 2, "#a8a7a5"], [-3, 4, "#b1afad"], [-1, 4, "#9e9b98"], [1, 4, "#96948f"],
        [1, 7, "#918e87"], [1, 8, "#98958f"], [-1, 10, "#9f9c97"], [-4, 9, "#94918b"]],
            { region: [316, 660, 24, 25] });
        if (isMax_1 || isMax_2)
        {
            let setting = game_config.setting;
            setting.storeMax = true;
            RWFile("setting", setting);
            break;
        }

        count = 0;
    }
    GoBack();
}

function OpenEquipmentBox()
{
    const equipmentImg = ReadImg("props/treasureBox_white_nomal_equipment_tied");
    RandomPress(BackPackPos.icon);// backpack
    Sleep(3000, 4000);
    RandomPress(BackPackPos.props);
    Sleep();
    const hasEquipmentBox = images.findImage(captureScreen(), equipmentImg, { region: [885, 111, 327, 341] });
    if (hasEquipmentBox)
    {
        // RandomPress([hasEquipmentBox.x, hasEquipmentBox.y, 10])
        log(hasEquipmentBox);
    }
    Sleep();

    RandomPress(BackPackPos.icon);// backpack
}
const StrengthenWeapon = function ()
{
    RandomPress(BackPackPos.icon);// backpack
    Sleep(3000, 4000);
    RandomPress(BackPackPos.props);
    Sleep();
    const weaponScroll_mark = ReadImg("props/strengthenScroll_weapon_mark");
    const weaponScroll_tie = ReadImg("props/strengthenScroll_weapon_tied");
    const shot = captureScreen();
    const hasMark = images.findImage(shot, weaponScroll_mark, { region: [885, 111, 327, 341] });
    const hasTie = images.findImage(shot, weaponScroll_tie, { region: [885, 111, 327, 341] });
    if (hasMark || hasTie)
    {
        log(hasMark, hasTie);
        if (hasMark)
        {
            RandomPress([hasMark.x - 5, hasMark.y, 35, 30]);
            RandomPress([hasMark.x - 5, hasMark.y, 35, 30]);
        }
        else    
        {
            RandomPress([hasTie.x - 5, hasTie.y, 35, 30]);
            RandomPress([hasTie.x - 5, hasTie.y, 35, 30]);
        }
        Sleep(3000, 5000);
        RandomPress(BackPackPos.props_scroll_weaponPage);
        const weaponStrengthen_shot = captureScreen();
        for (let i = 0; i < 5; i++)
        {
            let weaponColor = GetWeaponColor(weaponStrengthen_shot, [870 + i * 65, 100, 80, 65]);
            let isBlank = images.findImage(weaponStrengthen_shot, BackPackImg.blank, { region: [870 + i * 65, 100, 70, 70] });
            if (isBlank)
            {
                log("强化完毕，退出");
                RandomPress(BackPackPos.pageBack);
                return false;
            }
            if (weaponColor == "blue" || weaponColor == "green")
            {
                log("need strengthen:" + " " + weaponColor);
                RandomPress([895 + i * 65, 115, 35, 35]);
                let isVanish = IsLeadToVanish();
                if (isVanish)
                {
                    game_config.player.equipment.weapon.level = 7;
                    game_config.player.equipment.weapon.color = weaponColor;
                    log("weapon is strengthened to 7,lead to vanish;" + game_config.player.equipment.weapon.level);
                    continue;
                }
                else
                {
                    let canStrengthen = images.findMultiColors(captureScreen(),
                        "#3f4739", [[12, 0, "#3e4638"], [32, -2, "#394234"], [-1, 14, "#343b2f"], [18, 14, "#30382b"], [32, 15, "#2e3429"]],
                        { region: [903, 650, 132, 69], threshold: 12 });
                    if (canStrengthen)
                    {
                        RandomPress(BackPackPos.strengthenBtn);

                    }
                }
            }
            if (i == 4)
            {
                RandomPress(BackPackPos.pageBack);
            }

        }
    }
    Sleep();
    RandomPress(BackPackPos.icon);// backpack
};
// StrengthenWeapon();
function StrengthenEquipment()
{
    StrenghtenWeapon();
    StrengthenArmor();
}
// log(images.findMultiColors(captureScreen(), "#878785", [[-3, 2, "#a8a6a6"], [-3, 4, "#b2b2b2"], [1, 6, "#969694"], [-1, 10, "#9d9d9b"], [-4, 9, "#959592"]],
//     { region: [317, 660, 19, 24] }));
// log(images.findMultiColors(captureScreen(), "#8e8c87", [[-3, 0, "#aeada8"], [-3, 2, "#a8a7a5"], [-3, 4, "#b1afad"], [-1, 4, "#9e9b98"], [1, 4, "#96948f"],
// [1, 7, "#918e87"], [1, 8, "#98958f"], [-1, 10, "#9f9c97"], [-4, 9, "#94918b"]],
//     { region: [316, 660, 24, 25] }));
// StoreEquipment();
// module.exports = {
//     WearEquipment,
//     UseProps,
//     DecomposeProps,
//     ReturnHome,
//     StoreEquipment
// };
// UseProps();
// OpenTreasureBox();
// WearSlabStone("guardian");
// WearEquipment();
// DecomposeProps();
// log(game_config.setting);
// for (let i = 0; i < 3; i++)
// {
//     let u = UseProps();
//     log(u);

// }
// OpenTreasureBox();
// let isWhite = images.findImage(captureScreen(), BackPackImg.blank,
//     // { region: [870 + 3 * 65, 115 + 2 * 65, 80, 80], threshold: 0.8, });
//     { region: [870 + 1 * 65, 100, 70, 70] }
// );
// log(isWhite);
// ReturnHome();
// DecomposeProps();
// ReturnHome();
// const shot = captureScreen();
// const region = [881, 313, 72, 78];
// log("isGreen:" + images.findMultiColors(shot, "#233322", [[25, -1, "#273d21"], [53, -1, "#37551f"], [54, 27, "#394922"], [52, 53, "#355525"], [23, 53, "#32362b"]],
//     { region: region }));
// log("isWhite:" + images.findMultiColors(shot, "#2a2a2a", [[52, 0, "#414242"], [52, 49, "#434444"], [2, 49, "#2e2f2f"], [53, 26, "#474848"]],
//     { region: region }));
// log(images.findImage(captureScreen(), ReadImg("E"), { region: [1049, 251, 36, 29] }));

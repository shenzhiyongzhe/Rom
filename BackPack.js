const { game_config, ReadImg, Sleep, RandomPress, GoBack, PressBlank, } = require("./Global.js");

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
    for (let i = 0; i < 6; i++)
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

    for (let i = 0; i < 6; i++)
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
                };
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
    const isBackPack = findImage(captureScreen(), BackPackImg.icon, { region: BackPackCheckPos.icon });
    if (isBackPack == null) return;

    RandomPress(BackPackPos.icon);
    Sleep(3000, 5000);

    RandomPress([1009, 511, 23, 20]);
    Sleep();
    RandomPress([922, 512, 53, 16]); //normal
    RandomPress([1120, 508, 122, 22]); //decompose
    RandomPress([696, 563, 127, 23]); //popup confirm
    Sleep();
    const isNoMoney = images.findMultiColors(captureScreen(), "#383838", [[-1, 21, "#29292a"], [88, 0, "#333333"], [112, 21, "#2e2e2e"]], { region: [429, 537, 183, 71] });
    if (isNoMoney)
    {
        RandomPress([455, 565, 132, 20]);
        RandomPress(BackPackPos.icon);

    }
    else
    {
        RandomPress([387, 213, 478, 268]);
        RandomPress(BackPackPos.icon);
    }

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
        }
    }
    quickItem_returnHome.recycle();
    log("return home to purchase potion");

}
module.exports = {
    WearEquipment,
    UseProps,
    DecomposeProps,
    ReturnHome
};
// UseProps();
// OpenTreasureBox();
// WearSlabStone("guardian");
// WearEquipment();
// DecomposeProps();
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

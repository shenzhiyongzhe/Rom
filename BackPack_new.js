const {
    posRef,
    Player,
    ReadImg,
    Sleep,
    RandomPress,
    GoBack,

} = require("./Global.js");

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

    decompose: [1006, 505, 30, 29], //背包分解按钮
    decompose_normal: [921, 510, 63, 18], // 选择普通分解
    decompose_btn: [1111, 505, 136, 25],
    decompose_confirm: [687, 560, 147, 28],

    props: [1230, 286, 31, 30], //背包道具
    props_confirm_small: [659, 511, 90, 28],
    props_confirm_big: [704, 533, 158, 28],
    props_scroll_weaponPage: [1228, 205, 21, 24],
    props_scroll_defencePage: [1228, 286, 21, 22],

    strengthenBtn: [931, 660, 286, 37],

    pageBack: [1181, 23, 69, 22]
};
const BackPackCheckPos = {
    icon: [1064, 1, 79, 71],
    props_confirm_small: [662, 498, 84, 55],
    props_confirm_big: [746, 517, 74, 67],
    equipment_vanish: [117, 627, 276, 56],

};
/*@description：穿戴背包中的装备
 */
function WearEquipment()
{
    const isBackPack = findImage(captureScreen(), BackPackImg.icon, { region: BackPackCheckPos.icon });
    if (isBackPack == null) return;

    RandomPress(BackPackPos.icon);
    Sleep(2500, 3000);

    RandomPress(BackPackPos.equipment);
    Sleep();
    RandomPress(BackPackPos.equipmentSort);
    Sleep();
    RandomPress(BackPackPos.sortByLevel);
    Sleep();
    const shot = captureScreen();

    const plus = ReadImg("plus");
    for (let i = 0; i < 6; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let isEquip = images.findImage(shot, BackPackImg.E, { region: [920 + j * 65, 110 + i * 65, 40, 40], threshold: 0.8, });
            let isBlank = images.findMultiColors(shot, "#1b1b1b", [[15, 0, "#1e1e1f"], [33, 0, "#1f1f21"], [5, 12, "#1c1c1e"],
            [17, 9, "#1e1e1f"], [33, 9, "#1f2020"],], { region: [890 + j * 65, 125 + i * 65, 50, 50] });

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
            let isBetter = images.findImage(equipmentItem_shot, plus, { region: [747, 154, 128, 70], });
            let newEquip = images.findMultiColors(equipmentItem_shot,
                "#262626", [[19, 3, "#252626"], [4, 18, "#242526"], [31, 18, "#242526"],],
                { region: [176, 192, 60, 132] }
            );
            if (isBetter || newEquip == null)
            {
                RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
                Sleep();
            }

        }
        Sleep();

    }
    plus.recycle();
    RandomPress(BackPackPos.close);
    Sleep();
}

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
function RecognizeProps(shot, [x, y, w, h])
{
    for (let key in props)
    {
        let prop = props[key];
        let propType = images.findImage(shot, prop, { region: [x, y, w, h], threshold: 0.8 });
        if (propType) return key;
    }
};

function GetWeaponColor(shot, [x, y, w, h])
{
    const isBlue = images.findMultiColors(shot, "#1c3340", [[11, 0, "#1d3c4f"], [26, 28, "#214f65"], [26, 35, "#204b61"]], { region: [x, y, w, h], threshold: 16 });
    const isGreen = images.findMultiColors(shot, "#4b6329", [[0, 6, "#445b25"], [0, 9, "#465a22"], [0, 15, "#3a5325"]],
        { region: [x, y, w, h], threshold: 16 });
    const isEquiped = images.findImage(shot, BackPackImg.E, { region: [x, y, w, h], threshold: 0.7 });
    if (isEquiped == null) return false;
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
    const treasureBox_shot = captureScreen();
    let hasConfirm_small = findImage(treasureBox_shot, BackPackImg.confirm, { region: BackPackCheckPos.props_confirm_small, threshold: 0.8 });

    if (hasConfirm_small)
    {
        RandomPress(BackPackPos.props_confirm_small);
        Sleep();
        RandomPress(posRef.blank);
        Sleep();
        return;
    }
    let hasConfirm_big = findImage(treasureBox_shot, BackPackImg.confirm, { region: BackPackCheckPos.props_confirm_big, threshold: 0.8 });
    if (hasConfirm_big)
    {
        RandomPress(BackPackPos.props_confirm_big);
        Sleep();
        RandomPress(posRef.blank);
        Sleep();
        return;
    }
}
function UseStrengthenScroll(scrollType)
{
    if (scrollType.indexOf("weapon") != -1)
    {
        RandomPress(BackPackPos.props_scroll_weaponPage);
        Sleep();
        const weaponStrengthen_shot = captureScreen();
        for (let i = 0; i < 5; i++)
        {
            let weaponColor = GetWeaponColor(weaponStrengthen_shot, [870 + i * 65, 100, 80, 65]);
            let isBlank = images.findImage(weaponStrengthen_shot, BackPackImg.blank, { region: [870 + i * 65, 100, 70, 70] });
            if (isBlank)
            {
                log("强化完毕，退出");
                RandomPress(BackPackPos.pageBack);
                Sleep();
                return;
            }
            if (weaponColor == "blue" || weaponColor == "green")
            {
                log("need strengthen:" + " " + weaponColor);
                RandomPress([895 + i * 65, 115 + i * 65, 35, 35]);
                Sleep();
                let isVanish = IsLeadToVanish();
                if (isVanish)
                {
                    log("weapon is strengthened to 7,lead to vanish");
                    Player.equipment.weapon.level = 7;
                    Player.equipment.weapon.color = weaponColor;
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

                Sleep();
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
                    return;
                }
                Sleep();
            }
        }
    }
}
// UseStrengthenScroll("strengthenScroll_weapon_tied");
// UseStrengthenScroll("strengthenScroll_defence");
// let color = GetWeaponColor(captureScreen(), [1073, 98, 75, 75]);
// log(color);
// let canStrengthen = images.findMultiColors(captureScreen(),
//     "#3f4739", [[12, 0, "#3e4638"], [32, -2, "#394234"], [-1, 14, "#343b2f"], [18, 14, "#30382b"], [32, 15, "#2e3429"]],
//     { region: [903, 650, 132, 69], threshold: 12 });

// log(canStrengthen);
function UseSlabstone()
{ }
/**
 * @description使用背包道具
 */
function UseProps()
{
    const isBackPack = findImage(captureScreen(), BackPackImg.icon, { region: BackPackCheckPos.icon });
    if (isBackPack == null) return;

    RandomPress(BackPackPos.icon);
    Sleep(2500, 3000);

    RandomPress(BackPackPos.props);
    Sleep();

    let shot = captureScreen();

    for (let i = 0; i < 6; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            Sleep(500, 1000);
            shot = captureScreen();
            //判断是否在背包界面，如果不在，就退出
            if (images.findImage(shot, BackPackImg.propIcon, { region: [1214, 268, 62, 69], threshold: 0.8 }) == null) return;

            let type = RecognizeProps(shot, [870 + j * 65, 120 + i * 65, 70, 70]);
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
            }
            else if (type == "strengthenScroll_weapon_tied"
                || type == "strengthenScroll_weapon_mark"
                || type == "strengthenScroll_defence_tied"
                || type == "strengthenScroll_defence")
            {
                if (Player.equipment.weapon.level == 7) continue;
                log("use strengthenScroll");
                RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
                Sleep();
                RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
                Sleep(3000, 4000);
                UseStrengthenScroll(type);
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
                log("use slabstone");
            }
            else
            {
                log("unknown props");
            }
            let isBlank = images.findImage(shot, BackPackImg.blank, { region: [870 + j * 65, 115 + i * 65, 80, 80] });
            if (isBlank)
            {
                log("blank :" + (i + 1) + " " + (j + 1));
                RandomPress(BackPackPos.close);
                Sleep();
                return;
            };
        }
    }
}
//分解道具
function DecomposeProps()
{
    const isBackPack = findImage(captureScreen(), BackPackImg.icon, { region: BackPackCheckPos.icon });
    if (isBackPack == null) return;

    RandomPress(BackPackPos.icon);
    Sleep(2500, 3000);

    const decompositionIcon = ReadImg("backPack_decompose");
    const isDecompose = images.findImage(captureScreen(), decompositionIcon, { region: [991, 495, 62, 52], });

    if (isDecompose == null) return;

    RandomPress(BackPackPos.decompose);
    Sleep(2000, 2500);
    RandomPress(BackPackPos.decompose_normal);
    Sleep();
    RandomPress(BackPackPos.decompose_btn);
    Sleep();

    RandomPress(BackPackPos.decompose_confirm);
    Sleep(2000, 3000);
    RandomPress(posRef.blank);
    Sleep();
    RandomPress(BackPackPos.close);
    Sleep();
    RandomPress(BackPackPos.close);

    decompositionIcon.recycle();
};
// WearEquipment();
// DecomposeProps();
UseProps();
// OpenTreasureBox();
// let isWhite = images.findImage(captureScreen(), BackPackImg.blank,
//     // { region: [870 + 3 * 65, 115 + 2 * 65, 80, 80], threshold: 0.8, });
//     { region: [870 + 1 * 65, 100, 70, 70] }
// );
// log(isWhite);


const {
    imgRef,
    posRef,
    Player,
    ReadImg,
    Sleep,
    RandomPress,
    GoBack,

} = require("./Global.js");

const E = ReadImg("E");
const backPack_confirmBtn = ReadImg("backPack_confirmBtn");
const backPackIcon = ReadImg("backPack");
const propIcon = ReadImg("backPack_propIcon");
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

    vanishWarningTxt: [124, 628, 233, 51],
    strengthenBtn: [931, 660, 286, 37],

    pageBack: [1171, 18, 103, 30]
};

const backPack = [1090, 20, 25, 15];


const backPack_props = [1230, 286, 31, 30]; //背包道具
const vanishWarningTxt = [124, 628, 233, 51];

const strengthenBtn = [931, 660, 286, 37];

//背包 循环遍历所有装备
const ItemLoop = function ()
{
    const shot = captureScreen();

    const plus = ReadImg("plus");

    for (let i = 0; i < 6; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let isEquip = images.findImage(shot, E, { region: [927 + j * 65, 122 + i * 65, 40, 40], threshold: 0.7, });
            let isBlank = images.findMultiColors(shot, "#1b1b1b", [[15, 0, "#1e1e1f"], [33, 0, "#1f1f21"], [5, 12, "#1c1c1e"],
            [17, 9, "#1e1e1f"], [33, 9, "#1f2020"],], { region: [890 + j * 65, 125 + i * 65, 50, 50] });
            if (isEquip == null && isBlank == null)
            {
                let x = 890 + j * 65 + random(5, 45);
                let y = 130 + i * 65 + random(5, 40);
                press(x, y, random(200, 400));
                Sleep(600, 1200);

                let isPlus = images.findImage(captureScreen(), plus, { region: [747, 154, 128, 70], });
                if (isPlus != null)
                {
                    Sleep(600, 1200);
                    press(x, y, random(200, 400));
                }
                let isWear = images.findMultiColors(
                    images.captureScreen(),
                    "#262626",
                    [[19, 3, "#252626"], [4, 18, "#242526"], [31, 18, "#242526"],],
                    { region: [176, 192, 60, 132] }
                );
                if (isWear == null)
                {
                    press(x, y, random(200, 400));
                    Sleep(600, 1200);
                }
            }
        }
    }
    Sleep(500, 1000);
    plus.recycle();
};
const BackPack_EquipmentFlow = function ()
{
    RandomPress(BackPackPos.equipment);
    Sleep();
    RandomPress(BackPackPos.equipmentSort);
    Sleep();
    RandomPress(BackPackPos.sortByLevel);
    Sleep();
    //循环遍历所有装备
    ItemLoop();
    Sleep();
    RandomPress(BackPackPos.close);

};
//分解道具
const DecomposeProps = function ()
{
    const decompositionIcon = ReadImg("backPack_decompose");
    const isBackPack = findImage(captureScreen(), backPackIcon, { region: [1072, 7, 68, 59], });
    if (isBackPack == null) return;
    RandomPress(BackPackPos.icon);
    Sleep(1500, 2500);
    const isDecompose = images.findImage(captureScreen(), decompositionIcon, { region: [991, 495, 62, 52], });

    if (isDecompose == null) return;

    RandomPress(BackPackPos.decompose);
    Sleep(2000, 2500);
    RandomPress(BackPackPos.decompose_normal);
    Sleep();
    RandomPress(BackPackPos.decompose_btn);
    Sleep();
    const isDecomposeConfirm = images.findImage(captureScreen(), backPack_confirmBtn, { region: [667, 539, 191, 73], threshold: 0.8, });
    for (let i = 0; i < 3; i++)
    {
        Sleep(1000, 2000);
        isDecomposeConfirm = images.findImage(captureScreen(), backPack_confirmBtn, { region: [709, 488, 67, 58], threshold: 0.8, });
        if (isDecomposeConfirm) break;
    }
    if (isDecomposeConfirm == null)
    {
        RandomPress(BackPackPos.close);
        Sleep();
        RandomPress(BackPackPos.close);
    }
    else
    {
        RandomPress(BackPackPos.decompose_confirm);
        Sleep(2000, 3000);
        RandomPress(posRef.blank);
        Sleep();
        RandomPress(BackPackPos.close);
        Sleep();
        RandomPress(BackPackPos.close);
    }

    decompositionIcon.recycle();
};


////////////////////
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
const RecognizeProps = function (shot, [x, y, w, h])
{
    for (let key in props)
    {
        let prop = props[key];
        let propType = images.findImage(shot, prop, { region: [x, y, w, h], threshold: 0.8 });
        if (propType) return key;
    }
};

const IsNeedToStrengthen = function (shot, [x, y, w, h])
{
    const isBlue = images.findMultiColors(shot, "#1c3340", [[11, 0, "#1d3c4f"], [26, 28, "#214f65"], [26, 35, "#204b61"]], { region: [x, y, w, h], threshold: 20 });
    const isGreen = images.findMultiColors(shot, "#4b6329", [[0, 6, "#445b25"], [0, 9, "#465a22"], [0, 15, "#3a5325"]],
        { region: [x, y, w, h], threshold: 20 });
    const isEquiped = images.findImage(shot, E, { region: [x, y, w, h], threshold: 0.7 });
    if (isEquiped == null) return false;
    else if (isBlue) return "blue";
    else if (isGreen) return "green";

    else return false;
};
const IsLeadToVanish = function ()
{
    const vanishWarning = ReadImg("backPack_equipmentVanish");
    const isVanish = images.findImage(images.captureScreen(), vanishWarning, { region: vanishWarningTxt, threshold: 0.95 });
    if (isVanish != null) return true;
    else return false;
};

const BackPack_BoxFlow = function ()
{

    const isBackPack = findImage(captureScreen(), backPackIcon, { region: [1072, 7, 68, 59], });
    if (isBackPack == null) return;

    RandomPress(BackPackPos.icon);
    Sleep();

    const isProp = images.findImage(images.captureScreen(), propIcon, { region: [1214, 268, 62, 69], });

    if (isProp == null) return;

    RandomPress(BackPackPos.props);
    Sleep(1000, 1500);
    for (let i = 0; i < 6; i++)
    {
        let shot = images.captureScreen();
        for (let j = 0; j < 5; j++)
        {
            Sleep(100, 200);
            if (images.findImage(images.captureScreen(), propIcon, { region: [1214, 268, 62, 69], threshold: 0.8 }) == null) return;
            let x = 890 + j * 65;
            let y = 130 + i * 65;
            let w = 50;
            let h = 50;
            let isBlank = images.findMultiColors(shot, "#1b1b1b", [[17, 1, "#1d1d1e"], [40, 1, "#1e1f1f"],
            [-4, 13, "#191a1b"], [16, 13, "#1e1f20"], [36, 15, "#1f2021"],], { region: [x, y, w, h] }
            );
            if (isBlank == null)
            {
                let type = RecognizeProps(shot, [x, y, w, h]);
                type && log(type);
                if (type == "treasureBox_white_nomal_equipment_tied"
                    || type == "treasureBox_goldenRandom"
                    || type == "treasureBox_white_nomal_potion_tied"
                    || type == "treasureBox_white_normal_optionalFood_tied"
                    || type == "treasureBox_green_highLevel_equipment_mark")
                {
                    RandomPress([x, y, w - 10, h - 10]);
                    Sleep(1200, 2000);
                    RandomPress([x, y, w - 10, h - 10]);
                    Sleep(1000, 1500);
                    let isConfirm = findImage(captureScreen(), backPack_confirmBtn, { region: [587, 436, 308, 157] });
                    if (isConfirm)
                    {
                        press(isConfirm.x + random(-20, 50), isConfirm.y + random(-5, 10), random(20, 300));
                        Sleep(1000, 1500);
                        RandomPress(posRef.blank);
                        Sleep(600, 1200);
                    }
                    else
                    {
                        Sleep(1000, 1500);
                        RandomPress(posRef.blank);
                    }
                    shot = captureScreen();
                }
                else if (type == "strengthenScroll_weapon_tied"
                    || type == "strengthenScroll_weapon_mark"
                    || type == "strengthenScroll_defence_tied"
                    || type == "strengthenScroll_defence")
                {
                    RandomPress([x, y, w - 10, h - 10]); // 点击使用
                    Sleep();
                    RandomPress([x, y, w - 10, h - 10]); //跳转到强化界面
                    Sleep(2000, 3000);
                    let equipment_shot = captureScreen();

                    for (let i = 0; i < 6; i++)
                    {
                        for (let j = 0; j < 5; j++)
                        {
                            Sleep(100, 200);
                            if (images.findImage(images.captureScreen(), propIcon, { region: [1214, 268, 62, 69], threshold: 0.8 }) == null) return;
                            let isNeedStr = IsNeedToStrengthen(equipment_shot, [885 + j * 65, 105 + i * 65, 60, 60]);
                            if (isNeedStr == "blue" || isNeedStr == "green")
                            {
                                RandomPress([890 + j * 65, 110 + i * 65, 40, 45]);
                                Sleep();
                                let isVanish = IsLeadToVanish();
                                let canStrengthen = images.findMultiColors(captureScreen(), "#3e4638", [[4, 25, "#2b3227"],
                                [103, 1, "#363d32"], [102, 28, "#2e362a"], [241, 12, "#353c30"]],
                                    { region: [893, 639, 368, 75], threshold: 12 });
                                if (isVanish == false && canStrengthen != null)
                                {
                                    RandomPress(BackPackPos.strengthenBtn);
                                    Sleep();
                                    RandomPress(BackPackPos.pageBack);
                                    return;
                                    // RandomPress(BackPackPos.pageBack);
                                    // Sleep();
                                    // RandomPress(BackPackPos.icon);
                                    // Sleep();
                                    // RandomPress(BackPackPos.props);
                                    // equipment_shot = captureScreen();
                                }

                            }

                            if (i == 5 && j == 4)
                            {
                                GoBack();
                                Sleep();
                                return;
                            }

                        }
                    }

                }
            }
            else return;
            Sleep(100, 200);
        }
    }
};

const BackPackFlow = function ()
{
    BackPack_BoxFlow();
    Sleep(2000, 3000);
    BackPack_EquipmentFlow();
};

// requestScreenCapture(true);
// BackPack_EquipmentFlow();
// BackPack_BoxFlow();
// BackPackFlow();
//背包第一行位置：[887,133,59,57],[951,128,59,58],[1019,130,58,55],[1082,130,62,55],[1149,132,58,55]
// 2 3 [1019,197,56,53]  ; 2 4 [1083,198,60,52]
// Flow();
// DecomposeProps();

// log(IsNeedToStrengthen(captureScreen(), [948, 102, 63, 64]));

// let mat = images.matchTemplate(shot, props.strengthenScroll_weapon_tied, { max: 10 });
// let type = findImage(captureScreen(), props.slabstone_white_normal_suit, { region: [893, 123, 321, 231], threshold: 0.7 });
// type && log(type);

// const arr = images.matchTemplate(captureScreen(), props.treasureBox_potion, { max: 10 });
// log(arr);
// log(RecognizeProps(captureScreen(), [1083, 198, 60, 52]));
// log(IsNeedToStrengthen(captureScreen(), [944, 104, 63, 61]));
// for (let key in props)
// {
//     log(key + " : " + props[key]);
// }

module.exports = { BackPackFlow, DecomposeProps, BackPack_EquipmentFlow };






const {
    imgRef,
    posRef,
    Player,
    ReadImg,
    Sleep,
    RandomClick,
    RandomPress,
    GoBack,

} = require("./Global.js");

const E = ReadImg("E");
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
            let isBlank = images.findMultiColors(shot, "#1b1b1b", [[15, 0, "#1e1e1f"], [33, 0, "#1f1f21"], [5, 12, "#1c1c1e"], [17, 9, "#1e1e1f"], [33, 9, "#1f2020"],],
                { region: [890 + j * 65, 125 + i * 65, 50, 50] });
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
    const backPackIcon = ReadImg("backPack");
    const backPack = findImage(captureScreen(), backPackIcon, { region: [1072, 7, 68, 59], });
    if (backPack)
    {
        RandomPress(posRef.backPack);
        Sleep(1500, 2500);
        RandomPress(posRef.equipment, random(100, 300));
        Sleep(600, 1200);
        RandomPress(posRef.equipmentSort, random(200, 400));
        Sleep(300, 600);
        RandomClick(posRef.sortByLevel);
        Sleep(400, 1400);
        //循环遍历所有装备
        ItemLoop();
        Sleep();
        DecomposeProps();
    }
    backPackIcon.recycle();
};
//分解道具
const DecomposeProps = function ()
{
    const decompositionIcon = ReadImg("backPack_decompose");
    const isDecompose = images.findImage(captureScreen(), decompositionIcon, { region: [991, 495, 62, 52], });

    if (isDecompose == null) return;

    RandomPress(posRef.backPack_decompose);
    Sleep(2000, 2500);
    RandomPress(posRef.backPack_decompose_normal);
    Sleep();
    RandomPress(posRef.backPack_decompose_btn);
    Sleep(300, 500);
    const isDecomposeConfirm = images.findImage(captureScreen(), imgRef.confirm, { region: [325, 195, 680, 421], threshold: 0.8, });
    for (let i = 0; i < 3; i++)
    {
        Sleep(1000, 2000);
        isDecomposeConfirm = images.findImage(captureScreen(), imgRef.confirm, { region: [709, 488, 67, 58], threshold: 0.8, });
        if (isDecomposeConfirm) break;
    }
    if (isDecomposeConfirm == null)
    {
        RandomPress(posRef.backPackClose);
    }
    else
    {
        RandomPress(posRef.backPack_decompose_confirm);
        Sleep(2000, 3000);
        RandomPress(posRef.blank);
        Sleep();
        RandomPress(posRef.backPackClose);
    }

    decompositionIcon.recycle();
};


////////////////////
const props = {
    treasureBox_nomal: ReadImg("props/treasureBox_normal"),
    treasureBox_goldenRandom: ReadImg("props/treasureBox_goldenRandom"),
    treasureBox_potion: ReadImg("props/treasureBox_potion"),
    treasureBox_optionalFood: ReadImg("props/treasureBox_optionalFood"),
    strengthenScroll_weapon: ReadImg("props/strengthenScroll_weapon"),
    strengthenScroll_defence: ReadImg("props/strengthenScroll_defence"),
    strengthenScroll_defence_tied: ReadImg("props/strengthenScroll_defence_tied"),
};
const RecognizeProps = function (shot, [x, y, w, h])
{
    for (let key in props)
    {
        let prop = props[key];
        let propType = images.findImage(shot, prop, { region: [x, y, w, h] });
        if (propType) return key;
    }
};

const IsNeedToStrengthen = function (shot, [x, y, w, h])
{
    const isBlue = images.findMultiColors(shot, "#1c3340", [[11, 0, "#1d3c4f"], [26, 28, "#214f65"], [26, 35, "#204b61"]], { region: [x, y, w, h] });
    const isGreen = images.findMultiColors(shot, "#233b21", [[18, 2, "#344a20"], [34, 18, "#4c642b"], [34, 29, "#3e5624"], [33, 50, "#365325"]], { region: [x, y, w, h] });
    const isEquiped = images.findImage(shot, E, { region: [x, y, w, h] });
    if (isEquiped == null) return false;
    else if (isBlue) return "blue";
    else if (isGreen) return "green";

    else return false;
};
const IsLeadToVanish = function ()
{
    const vanishWarning = ReadImg("backPack_equipmentVanish");
    const isVanish = images.findImage(images.captureScreen(), vanishWarning, { region: vanishWarningTxt, threshold: 0.95 });
    if (isVanish == null) return true;
    else return false;
};

const BackPack_BoxFlow = function ()
{
    const propIcon = ReadImg("backPack_propIcon");
    const isProp = images.findImage(images.captureScreen(), propIcon, { region: [1214, 268, 62, 69], });

    if (isProp == null) return;

    RandomPress(posRef.backPack_props, random(100, 300));
    Sleep(1000, 1500);
    let shot = images.captureScreen();
    for (let i = 0; i < 6; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let x = 890 + j * 65;
            let y = 130 + i * 65;
            let w = 50;
            let h = 50;
            let isBlank = images.findMultiColors(shot, "#1b1b1b", [[17, 1, "#1d1d1e"], [40, 1, "#1e1f1f"], [-4, 13, "#191a1b"], [16, 13, "#1e1f20"], [36, 15, "#1f2021"],], { region: [x, y, w, h] }
            );
            if (isBlank == null)
            {
                let type = RecognizeProps(shot, [x, y, w, h]);
                log(type);
                if (type == "treasureBox_nomal" || type == "treasureBox_goldenRandom" || type == "treasureBox_potion" || type == "treasureBox_optionalFood")
                {
                    RandomPress([x, y, w - 10, h - 10]);
                    Sleep(1200, 2000);
                    RandomPress([x, y, w - 10, h - 10]);
                    Sleep(1000, 1500);
                    let isConfirm = findImage(captureScreen(), imgRef.confirm, { region: [486, 379, 397, 229] });
                    if (isConfirm)
                    {
                        press(isConfirm.x + random(-20, 50), isConfirm.y + random(-5, 10), random(100, 300));
                        Sleep(1000, 1500);
                        RandomPress(posRef.blank);
                        Sleep(600, 1200);
                    }
                    else
                    {
                        Sleep(1000, 1500);
                        RandomPress(posRef.blank);
                    }
                }
                else if (type == "strengthenScroll_weapon" || type == "strengthenScroll_defence")
                {
                    // 点击使用
                    RandomPress([x, y, w - 10, h - 10]);
                    Sleep();
                    RandomPress([x, y, w - 10, h - 10]); //跳转到强化界面
                    Sleep(2000, 3000);
                    let equipment_shot = captureScreen();
                    for (let i = 0; i < 6; i++)
                    {
                        for (let j = 0; j < 5; j++)
                        {
                            let isNeedStr = IsNeedToStrengthen(equipment_shot, [885 + j * 65, 105 + i * 65, 55, 55]);
                            if (isNeedStr == "blue" || isNeedStr == "green")
                            {
                                RandomPress([890 + j * 65, 110 + i * 65, 40, 45]);
                                Sleep();
                                let isVanish = IsLeadToVanish();
                                if (isVanish)
                                {
                                    RandomPress(strengthenBtn);
                                    Sleep();
                                    GoBack();
                                    return;
                                }
                            }
                        }
                    }

                }
            }
            else
            {
                RandomPress(posRef.backPackClose, random(100, 300));
                propIcon.recycle();
                return;
            }
            Sleep(100, 200);
        }
    }
};

const Flow = function ()
{
    BackPack_EquipmentFlow();
    Sleep(2000, 3000);
    BackPack_BoxFlow();
};

// Flow();
// BackPack_BoxFlow();
let shot = images.captureScreen();
// for (let i = 0; i < 6; i++)
// {
//     for (let j = 0; j < 5; j++)
//     {
//         let x = 885 + j * 65;
//         let y = 120 + i * 65;
//         let w = 70;
//         let h = 70;
//         let isBlank = images.findMultiColors(shot, "#1b1b1b", [[17, 1, "#1d1d1e"], [40, 1, "#1e1f1f"], [-4, 13, "#191a1b"], [16, 13, "#1e1f20"], [36, 15, "#1f2021"],], { region: [x, y, w, h] }
//         );
//         if (isBlank == null)
//         {
//             let type = RecognizeProps(shot, [889, 325, 60, 61]);
//             type && log(type);
//         }

//     }
// }
let mat = images.matchTemplate(shot, props.strengthenScroll_defence, { max: 10 });
// let type = findImage(shot, props.strengthenScroll_defence, { region: [893, 123, 321, 231], threshold: 0.7 });
// type && log(type);
log(mat);
// const arr = images.matchTemplate(captureScreen(), E, { max: 10 });
// log(arr);

// log(IsNeedToStrengthen(captureScreen(), [1079, 104, 63, 64]));

// module.exports = Flow;
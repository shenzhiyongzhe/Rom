const {
    imgRef,
    posRef,
    Player,
    ReadImg,
    Sleep,
    RandomClick,
    RandomPress,

} = require("./Global.js");


//背包 循环遍历所有装备
const ItemLoop = function ()
{
    const shot = captureScreen();
    const E = ReadImg("E");
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
    E.recycle();
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
        RandomPress(posRef.backPackClose, random(100, 300));
    }
    backPackIcon.recycle();
};
//分解道具
const DecomposeProps = function ()
{
    const decompositionIcon = ReadImg("backPack_decompose");
    const isDecompose = images.findImage(captureScreen(), decompositionIcon, {
        region: [991, 495, 62, 52],
    });

    if (isDecompose)
    {
        RandomPress(posRef.backPack_decompose);
        Sleep(2000, 2500);
        RandomPress(posRef.backPack_decompose_normal);
        Sleep();
        RandomPress(posRef.backPack_decompose_btn);
        const isDecomposeConfirm = images.findImage(
            captureScreen(),
            imgRef.confirm,
            {
                region: [325, 195, 680, 421],
                threshold: 0.8,
            }
        );
        for (let i = 0; i < 3; i++)
        {
            Sleep(1000, 2000);
            isDecomposeConfirm = images.findImage(
                captureScreen(),
                imgRef.confirm,
                {
                    region: [709, 488, 67, 58],
                    threshold: 0.8,
                }
            );
            if (isDecomposeConfirm) break;
        }
        RandomPress(posRef.backPack_decompose_confirm);
        Sleep(2000, 3000);
        RandomPress(posRef.blank);
        Sleep();
        RandomPress(posRef.backPackClose);
    }
    decompositionIcon.recycle();
};

//判断是否是宝箱
const IsTreasureBox = function ()
{
    const img = ReadImg("CN_treasureBox");
    let isBox = images.findImage(images.captureScreen(), img, {
        region: [626, 66, 237, 55],
        threshold: 0.65,
    });
    return isBox;
};

//判断是否是强化卷轴
const IsStrengthenScroll = function ()
{
    const weaponScroll = ReadImg("backPack_props_weaponStrengthen");
    const defenceScroll = ReadImg("backPack_props_defenceStrengthen");
    const isWeapon = images.findImage(images.captureScreen(), weaponScroll, {
        region: [580, 71, 82, 84],
    });
    const isDefence = images.findImage(images.captureScreen(), defenceScroll, {
        region: [580, 71, 82, 84],
    });
    weaponScroll.recycle();
    defenceScroll.recycle();
    if (isWeapon) return "weapon";
    if (isDefence) return "defence";
    return false;
};

//寻找蓝装并且未强化的装备
const FindBlueEquip = function ([x, y, w, h])
{
    const plus = ReadImg("backPack_props_plus");
    const isPlus = images.findImage(images.captureScreen(), plus, { region: [x, y, w, h], });
    return isPlus;
};

const RecognizeProps = function (shot, [x, y, w, h])
{
    const props = {
        treatureBox_nomal: ReadImg("props/treasureBox_normal"),
        treatureBox_goldenRandom: ReadImg("props/treasureBox_goldenRandom"),
        treatureBox_potion: ReadImg("props/treasureBox_potion"),
        treatureBox_optionalFood: ReadImg("props/treasureBox_optionalFood"),
        strengthenScroll_weapon: ReadImg("props/strengthenScroll_weapon"),
        strengthenScroll_defence: ReadImg("props/strengthenScroll_defence"),
    };
    for (let key in props)
    {
        const prop = props[key];
        const propType = images.findImage(shot, prop, { region: [x, y, w, h] });
        if (propType) return key;
        else return false;
    }
    // log("props" + props.treatureBox_nomal);
};
const BackPack_BoxFlow = function ()
{
    RandomClick(posRef.backPack);
    Sleep(1500, 2500);
    const propIcon = ReadImg("backPack_propIcon");
    const isProp = images.findImage(images.captureScreen(), propIcon, {
        region: [1214, 268, 62, 69],
    });
    if (isProp)
    {
        RandomPress(posRef.backPack_props, random(100, 300));
        Sleep(1000, 1500);
        const shot = images.captureScreen();
        for (let i = 0; i < 6; i++)
        {
            for (let j = 0; j < 5; j++)
            {
                let x = 895 + j * 65;
                let y = 135 + i * 65;
                let w = 40;
                let h = 35;
                let isBlank = images.findMultiColors(
                    shot,
                    "#1b1b1b",
                    [
                        [17, 1, "#1d1d1e"],
                        [40, 1, "#1e1f1f"],
                        [-4, 13, "#191a1b"],
                        [16, 13, "#1e1f20"],
                        [36, 15, "#1f2021"],
                    ],
                    { region: [890 + j * 65, 125 + i * 65, 50, 50] }
                );
                if (isBlank == null)
                {
                    RandomPress([x, y, w, h]);
                    Sleep(600, 1200);
                    let box = IsTreasureBox(); //判断是否是宝箱
                    let scroll = IsStrengthenScroll(); //判断是否是强化卷轴
                    if (box)
                    {
                        //点击使用
                        RandomPress([x, y, w, h]);
                        Sleep(1200, 2000);
                        let isConfirm = findImage(
                            captureScreen(),
                            imgRef.confirm,
                            { region: [536, 406, 462, 158] }
                        );
                        if (isConfirm)
                        {
                            press(
                                isConfirm.x + random(-20, 50),
                                isConfirm.y + random(-5, 10),
                                random(100, 300)
                            );
                            Sleep(1000, 1500);
                            RandomPress(posRef.blank);
                            Sleep(600, 1200);
                        }
                    }
                    // else if (scroll == "defence")
                    // {

                    //     //点击使用
                    //     RandomPress([x, y, w, h]);
                    //     Sleep(1200, 2000);
                    //     RandomPress([1224, 282, 26, 28]);
                    //     Sleep(2000, 3000);
                    //     let isPlus = FindBlueEquip([x + 20, y + 10, 20, 20]);
                    //     if (isPlus == null)
                    //     {
                    //         RandomPress([x - 8, y - 25, w, h]);
                    //         Sleep();
                    //         RandomPress([942, 662, 272, 33]); //点击强化按钮
                    //         Sleep();
                    //         RandomPress([1170, 21, 85, 30]);
                    //         break;
                    //     }


                    // }
                } else break;
            }
        }
    }
    else RandomPress(posRef.backPackClose);
    propIcon.recycle();
};

const Flow = function ()
{
    // BackPack_EquipmentFlow();
    // Sleep(2000, 3000);
    BackPack_BoxFlow();
};

log(RecognizeProps(images.captureScreen(), [863, 73, 368, 325]));
// log(ReadImg("props/treasureBox_normal"));

// module.exports = Flow;
const { ReadImg, Sleep, RandomPress, GoBack, GetNumber, FindTipPoint, ConvertTradeTime, NoMoneyAlert, FindMultiColors, RandomHollow,
    FindGreenBtn, OpenMenu, OpenBackpack, CloseBackpack, WaitUntilPageBack, FindCheckMark, FindGrayBtn,
    HasMenu } = require("./Utils.js");
const { EmptyGrid, WhiteSquare, GreenSquare, BlueSquare, PurpleSquare, Equipped, GreenBtn } = require("./Color.js");
const { PropsCollectionFlow } = require("./Common");
const { game_config } = require("./RomConfig.js");


const EmptyCheck = (region) => FindMultiColors(EmptyGrid, region);

const EquippedCheck = (region) => FindMultiColors(Equipped, region);


// -------------------------------tool ---------------------------
const CanSell = () =>
{
    const sellColorList = [
        ["#29292a", [[4, 0, "#90907a"], [8, 0, "#272828"], [4, 1, "#90907a"], [4, 4, "#90907a"], [4, 7, "#8e8e79"]]]
    ];
    return FindMultiColors(sellColorList, [647, 455, 38, 37]);
};
const IsLocked = (region) =>
{
    const lockColorList = [
        ["#a49260", [[4, -2, "#a49563"], [8, -1, "#a49260"], [8, 2, "#a49360"], [7, 5, "#a49360"], [1, 5, "#a39362"]]],
        ["#a39261", [[5, -1, "#a49563"], [8, 1, "#a49360"], [8, 4, "#a49360"], [5, 6, "#a1905f"], [1, 4, "#a69262"]]]
    ];
    return FindMultiColors(lockColorList, region);
};
const LockCanSellEquipment = () =>
{
    OpenBackpack("equipment");
    SortEquipment();
    out: for (let i = 0; i < 5; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let isEquip = EquippedCheck([930 + j * 65, 126 + i * 65, 18, 22]);
            if (isEquip) continue;

            let color = GetWeaponColor([886 + j * 65, 126 + i * 65, 60, 60]);
            if (color != "green") continue;
            else if (color == "white") break;

            let isEmpty = EmptyCheck([886 + j * 65, 126 + i * 65, 60, 60]);
            if (isEmpty) break out;

            let isLocked = IsLocked([887 + j * 65, 162 + i * 65, 20, 26]);
            if (isLocked) continue;

            RandomPress([897 + j * 65, 140 + i * 65, 40, 37]);
            let canSell = CanSell();
            if (canSell)
            {
                RandomPress([583, 131, 10, 7]);
            }
        }
    }
    RandomPress([841, 69, 30, 15]);
    DecomposeAll();
};

// -------------------------------open box slab-----------------------------
const HasNextPageCheck = () =>
{
    for (let i = 0; i < 5; i++)
    {
        Sleep();
        let hasNextPage = images.findMultiColors(captureScreen(), "#695837", [[9, 0, "#665535"], [17, 0, "#4a3f26"], [25, 0, "#5f4f33"], [34, 2, "#73603c"], [45, 2, "#705f3b"]],
            { region: [595, 163, 89, 44] });
        if (hasNextPage)
        {
            RandomHollow([321, 309, 569, 77]);
        }
        else break;
    }
};
const OpenEquipmentBox = () =>
{
    log("打开装备箱");
    OpenBackpack("props");

    let hadOpened = false;
    const equipmentImg = ReadImg("backpack/props/equipmentBox/normalBox");
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
        HasNextPageCheck();
        hadOpened = true;
    }
    Sleep();
    equipmentImg.recycle();
    log("装备箱打开完成");
    return hadOpened;
};
const OpenAllEquipmentBox = () =>
{
    for (let i = 0; i < 5; i++)
    {
        Sleep();
        let hasOpened = OpenEquipmentBox();
        if (!hasOpened) break;
        Sleep();
        WearEquipment();
        Sleep();
        PropsCollectionFlow();
        Sleep();
        DecomposeAll();
    };
};

const OpenSlab = () =>
{
    console.log("----------------open slab----------------");
    OpenBackpack("props");
    const slabList = [];
    for (let i = 0; i < 30; i++)
    {
        let img = ReadImg(`backpack/props/slab/${i}`);
        if (!img) break;
        slabList.push(img);
    }
    const shot = captureScreen();

    for (let i = 0; i < slabList.length; i++)
    {
        let hasSlab = images.findImage(shot, slabList[i], { region: [882, 122, 333, 333] });
        if (hasSlab)
        {
            RandomPress([hasSlab.x - 10, hasSlab.y, 40, 30]);
            Sleep();
            RandomPress([hasSlab.x - 10, hasSlab.y, 40, 30]);
            WaitUntilPageBack();
            Sleep();
            if (FindGreenBtn([641, 500, 125, 50]))
            {
                RandomPress([663, 515, 86, 23]);
            }
            Sleep(8000, 12000);
            for (let i = 0; i < 3; i++)
            {
                if (FindGreenBtn([526, 624, 226, 56]))
                {
                    RandomPress([545, 634, 191, 34]);
                    Sleep(3000, 5000);
                }
            }
            break;
        }
    }
    GoBack();
    slabList.forEach(slab => slab.recycle());

    console.log("open slab flow end;");
};
const OpenNoOptionBox = () =>
{
    console.log("open no option box ----------------");
    let hasOpened = false;
    OpenBackpack("props");
    const noOptionBoxList = [];
    for (let i = 0; i < 10; i++)
    {
        let img = ReadImg(`backpack/props/box/${i}`);
        if (!img) break;
        noOptionBoxList.push(img);
    }
    const shot = captureScreen();
    for (let i = 0; i < noOptionBoxList.length; i++)
    {
        let hasBox = images.findImage(shot, noOptionBoxList[i], { region: [883, 121, 329, 334] });
        if (hasBox)
        {
            RandomPress([hasBox.x - 5, hasBox.y - 5, 30, 30]);
            Sleep();
            RandomPress([hasBox.x - 5, hasBox.y - 5, 30, 30]);
            Sleep();
            const hasPopup = FindMultiColors(GreenBtn, [642, 497, 122, 54]);
            if (hasPopup)
            {
                RandomPress([662, 512, 89, 26]);
            }
            Sleep();
            HasNextPageCheck();
            hasOpened = true;
            break;
        }
    }
    noOptionBoxList.forEach(box => box.recycle());
    console.log("open box finished : has opened: " + hasOpened);
    return hasOpened;
};

const GetSlabColor = (region) =>
{
    const SlabColorList = {
        "white": [
            ["#515150", [[2, -14, "#4a4a48"], [55, -40, "#646f74"], [58, -40, "#c4c6c5"], [56, -38, "#1e2425"], [57, -38, "#79807f"], [44, -5, "#2f2f2f"], [57, -37, "#737d7b"]]],
            ["#444442", [[-5, 14, "#434343"], [3, 9, "#565655"], [54, -27, "#4a555c"], [56, -28, "#c9cfcf"], [57, -26, "#808280"], [56, -25, "#737d7b"], [12, -19, "#494946"]]],
            ["#474747", [[16, -18, "#4f4f4f"], [45, -16, "#292929"], [57, -33, "#68777c"], [59, -33, "#75808b"], [62, -33, "#cbcbcb"], [59, -35, "#758286"], [59, -31, "#1e2325"]]],
            ["#353535", [[15, -8, "#565656"], [36, -16, "#4b4b4b"], [58, -26, "#333b3f"], [61, -26, "#7b7b7c"], [64, -26, "#696d6d"], [61, -28, "#afb9ba"], [61, -25, "#5f6565"]]]
        ],
        "green": [
            ["#2f4c2b", [[-6, 5, "#243a20"], [-8, 19, "#2a4526"], [53, -27, "#19590f"], [57, -27, "#8ed188"], [55, -30, "#4ea03c"], [54, -25, "#033301"], [57, -25, "#469f39"]]],
            ["#273f24", [[-1, 8, "#2b4326"], [-5, 18, "#263d23"], [59, -34, "#9fe68d"], [57, -31, "#1c5a18"], [59, -31, "#a1c99a"], [60, -31, "#8ed188"], [59, -28, "#2a8922"]]],
            ["#2f4b2a", [[-5, 8, "#2c4728"], [-7, 20, "#304c2c"], [53, -28, "#1e5c0b"], [56, -28, "#5f8e4e"], [58, -28, "#81c47c"], [56, -30, "#399130"], [56, -26, "#073106"]]],
            ["#1a2918", [[1, 16, "#294025"], [-4, 24, "#21341f"], [56, -23, "#1e6b1c"], [58, -23, "#8dc783"], [59, -23, "#7dc276"], [55, -21, "#0a3a04"], [58, -20, "#34892c"]]],
            ["#273d24", [[13, -16, "#365532"], [34, -21, "#2d4628"], [53, -30, "#104109"], [55, -30, "#1f501b"], [59, -30, "#438837"], [55, -33, "#419634"], [56, -28, "#2c8c26"]]],
            ["#2e4a2b", [[14, -14, "#41683c"], [40, -27, "#294226"], [56, -35, "#2c6c21"], [59, -35, "#509145"], [62, -35, "#8adb88"], [60, -37, "#86da79"], [59, -32, "#053205"]]],
        ],
        "blue": [
            ["#173543", [[-7, 9, "#132934"], [-7, 22, "#152f3c"], [52, -26, "#13408e"], [54, -26, "#607ca7"], [56, -26, "#80b3d6"], [54, -28, "#266dbc"], [54, -24, "#072058"]]],
            ["#183646", [[10, -6, "#163644"], [23, -4, "#1d475d"], [46, -12, "#1b5abb"], [50, -12, "#addaed"], [48, -13, "#306bc0"], [47, -9, "#012463"], [49, -9, "#2d77bf"]]],
            ["#112e3c", [[-3, 13, "#1a4054"], [-5, 22, "#183c4e"], [56, -22, "#13408e"], [59, -22, "#91bada"], [59, -24, "#84b0db"], [57, -20, "#011e5f"], [60, -20, "#3a7dd2"]]],
            ["#224f68", [[7, -12, "#133140"], [21, -7, "#23516c"], [43, -17, "#1f57a1"], [46, -17, "#517bbe"], [50, -17, "#7ca3b7"], [46, -20, "#3381cf"], [46, -15, "#0a1d52"]]]

        ],
        "purple": [
            ["#221728", [[12, 7, "#503560"], [18, -21, "#462e52"], [32, -12, "#3e294a"], [59, -28, "#592168"], [63, -28, "#a97cb5"], [62, -30, "#f5c2fa"], [61, -26, "#471054"]]],
            ["#271a2e", [[5, 2, "#3f2a49"], [17, -22, "#482f56"], [58, -30, "#6b2e73"], [60, -30, "#884c94"], [62, -30, "#d1a0d7"], [60, -32, "#a15ba4"], [60, -28, "#460c56"]]]
        ]
    };
    for (let key in SlabColorList)
    {
        let colorList = SlabColorList[key];
        let isTheColor = FindMultiColors(colorList, region);
        if (isTheColor) return key;
    }
    return "null";
};

const WearBestSlab = (type) =>
{
    console.log("^^WearBestSlab");
    GoBack();
    OpenMenu();
    if (type == "suit")
    {
        RandomPress([962, 122, 21, 27]);
    }
    else if (type == "guardian")
    {
        RandomPress([1025, 118, 28, 27]);
    }
    WaitUntilPageBack();
    const curSlab = GetSlabColor([126, 565, 86, 82]);
    const nextSlab = GetSlabColor([216, 565, 84, 85]);

    if (FindGreenBtn([1019, 498, 156, 56]))
    {
        RandomPress([1037, 508, 119, 31]);
    }
    if ((curSlab == "white" && (nextSlab == "green" || nextSlab == "blue" || nextSlab == "purple")) || (curSlab == "green" && (nextSlab == "blue" || nextSlab == "purple")))
    {
        RandomPress([228, 587, 60, 96]);
        Sleep();
        if (FindGreenBtn([1019, 498, 156, 56]))
        {
            RandomPress([1037, 508, 119, 31]);
            hasWearNewSlab = true;
        }
    }
    console.log("curSlab: " + curSlab);
    console.log("nextSlab: " + nextSlab);
};
const MergeIntoSlab = (type) =>
{
    console.log("开始融合石板： " + type);

    RandomPress([173, 101, 62, 21]);
    for (let i = 0; i < 10; i++)
    {
        let canAutoSelect = FindGreenBtn([936, 495, 157, 59]);
        if (!canAutoSelect) break;
        RandomPress([954, 509, 123, 29]);
        let canMerge = FindGreenBtn([1105, 496, 151, 55]);
        if (!canMerge) break;
        RandomPress([1118, 508, 126, 31]);
        Sleep();
        WaitUntilPageBack();
        Sleep();
        let hasJumpAnim = FindCheckMark([1096, 638, 37, 32]);
        if (!hasJumpAnim)
        {
            RandomPress([1104, 647, 87, 16]);
        }
        Sleep();
        let hasOpenBtn = FindGreenBtn([525, 623, 232, 60]);
        if (hasOpenBtn)
        {
            RandomPress([545, 634, 191, 35]);
        }
        Sleep();
        let hasGrayBtn = FindGrayBtn([525, 623, 232, 60]);
        if (hasGrayBtn)
        {
            RandomPress([545, 634, 191, 35]);
        }
    }
    Sleep();
    GoBack();
    console.log("融合" + type + "完成");
};
const OpenAllProps = () =>
{
    OpenSlab();
    OpenNoOptionBox();
    CloseBackpack();
    WearBestSlab("suit");
    MergeIntoSlab("suit");
    Sleep();
    WearBestSlab("guardian");
    MergeIntoSlab("guardian");
};
// -----------------------strengthen equipment -------------------------

const GetWeaponColor = (region) =>
{
    const ColorObj = {
        "white": WhiteSquare,
        "green": GreenSquare,
        "blue": BlueSquare,
        "purple": PurpleSquare
    };
    for (let key in ColorObj)
    {
        let hasColor = FindMultiColors(ColorObj[key], region);
        if (hasColor) return key;
    }
    return "unknown color";
};
const SortEquipment = function ()
{
    Sleep();
    RandomPress([1075, 509, 22, 22]);
    RandomPress([1041, 423, 90, 21]);
    Sleep();
};
const WearEquipment = () =>
{
    const IsQualityBetter = (shot) =>
    {
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
    const IsQualityLess = () =>
    {
        const curEquipColor = GetWeaponColor([78, 77, 73, 73]);
        const selectedEquipColor = GetWeaponColor([579, 77, 73, 74]);
        const colorPrivilege = ["null", "white", "green", "blue", "purple"];
        if (colorPrivilege.indexOf(curEquipColor) > colorPrivilege.indexOf(selectedEquipColor)) return true;
        else return false;
    };
    const IsPlusPower = () =>
    {
        const plusArr = [
            ["#107093", [[3, 0, "#058ec0"], [5, 0, "#0a6c8f"], [2, -4, "#197a9f"], [2, 0, "#078fbf"], [2, 4, "#1f4e60"], [2, 6, "#262626"], [-5, -1, "#252526"]]],
            ["#242425", [[5, 0, "#252626"], [8, 0, "#185d76"], [10, 0, "#0f8ebb"], [13, 0, "#145a73"], [10, -2, "#167fa5"], [10, 2, "#087499"], [10, 8, "#262626"]]]
        ];
        const subArr = [
            ["#252626", [[5, 0, "#c3570f"], [8, 0, "#8a4415"], [6, -3, "#262626"], [6, 2, "#31251f"]]],
            ["#242526", [[3, 0, "#c3570f"], [4, 0, "#cc590b"], [6, 0, "#8a4415"], [3, -3, "#262626"], [4, 4, "#262626"]]]
        ];
        const isPlus = FindMultiColors(plusArr, { region: [815, 156, 56, 37] });
        const isSub = FindMultiColors(subArr, { region: [815, 156, 56, 37] });
        if (isPlus) return true;
        else if (isSub) return false;
        else return false;
    };
    log("开始穿戴装备");
    OpenBackpack("equipment");
    let shot = captureScreen();
    const isfewEquip = EmptyCheck([1145, 253, 64, 67]);
    if (!isfewEquip)
    {
        SortEquipment();
        shot = captureScreen();
    }
    let clip = images.clip(shot, 905, 142, 25, 29);
    out: for (let i = 0; i < 5; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let isEquip = EquippedCheck([920 + j * 65, 110 + i * 65, 40, 40]);
            let isBlank = EmptyCheck([890 + j * 65, 125 + i * 65, 50, 50]);
            let isSame = images.findImage(shot, clip, { region: [887 + j * 65, 128 + i * 65, 60, 58] });
            clip = images.clip(shot, 905 + j * 65, 142 + i * 65, 25, 29);
            if (isBlank)
            {
                Sleep();
                break out;
            }
            if (isEquip || isSame) continue;
            if (i > 2)
            {
                let isWhite = GetWeaponColor([870 + j * 65, 120 + i * 65, 80, 20]);
                if (isWhite == "white") continue;
            }
            RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
            Sleep();
            let equipmentItem_shot = captureScreen();
            let isQualityBetter_result = IsQualityBetter(equipmentItem_shot);
            let isPlus = IsPlusPower();
            let newEquip = images.findMultiColors(equipmentItem_shot,
                "#262626", [[19, 3, "#252626"], [4, 18, "#242526"], [31, 18, "#242526"],],
                { region: [176, 192, 60, 132] }
            );
            if (IsQualityLess())
            {
                continue;
            }
            if (isQualityBetter_result == true)
            {
                RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
                Sleep();
            }
            else if (isPlus || newEquip == null)
            {
                RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
                Sleep();
            }
        }
        Sleep();
    }
    Sleep();
    log("穿戴装备完成");
};

const DecomposeAll = () =>
{
    console.log('开始分解所有装备');
    OpenBackpack();
    RandomPress([1009, 511, 23, 20]); //decompose
    Sleep();
    RandomPress([922, 512, 53, 16]); //normal
    RandomPress([1018, 511, 14, 16]); // green btn;
    for (let i = 0; i < 3; i++)
    {
        let isZeroItem = GetNumber("strengthen", [1170, 504, 20, 27]);
        if (isZeroItem == 0) break;
        RandomPress([1120, 508, 122, 22]); //decompose

        RandomPress([696, 563, 127, 23]); //popup confirm
        Sleep(2000, 4000);
        let isNoMoney = images.findMultiColors(captureScreen(), "#383838", [[-1, 21, "#29292a"], [88, 0, "#333333"], [112, 21, "#2e2e2e"]], { region: [429, 537, 183, 71] });
        if (isNoMoney)
        {
            RandomPress([455, 565, 132, 20]);
            // NoMoneyAlert("{{分解装备无金币}}");
            break;
        }
        else
        {
            RandomPress([323, 95, 522, 217]);
        }
    }
    Sleep();
    RandomPress([1243, 69, 27, 15]);
    CloseBackpack();
    console.log("分解道具完毕");
};

const DecomposeGreenSuit = () =>
{
    let deCount = 0;
    //分解绿装
    const reservedList = [];
    for (let i = 0; i < 15; i++)
    {
        reservedList.push(ReadImg(`reservedList/${(i + 1).toString().padStart(2, "0")}`));
    }
    const shot = captureScreen();
    for (let i = 0; i < 5; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let itemColor = GetWeaponColor([885 + j * 65, 125 + i * 65, 60, 60]);
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
const DecomposeAllGreenSuit = () =>
{
    let decomposeSuccess = false;
    OpenBackpack("equipment");
    RandomPress([1005, 506, 33, 28]); //decompose btn;   
    decomposeSuccess = DecomposeGreenSuit();
    for (let i = 0; i < 3; i++)
    {
        if (!decomposeSuccess) break;
        decomposeSuccess = DecomposeGreenSuit();
        Sleep();
    }
    RandomPress([1242, 69, 28, 15]); //close decompose window;
    return decomposeSuccess;
};

/**
 * 
 * @param {*} type "armor" "weapon" 
 * @returns 
 */
const FindScroll = (type) =>
{
    const scroll = ReadImg(`backpack/strengthenPageScroll/${type}`);
    let scrollPos = false;
    for (let i = 0; i < 5; i++)
    {
        let isWhiteBG = FindMultiColors(WhiteSquare, [913 + i * 64, 520, 60, 55]);
        if (isWhiteBG)
        {
            let hasScroll = images.findImage(captureScreen(), scroll, { region: [913 + i * 64, 520, 60, 55] });
            if (hasScroll)
            {
                scrollPos = hasScroll;
            }
        }
    }
    scroll.recycle();
    return scrollPos;
};

const NoScrollCheck = () =>
{
    const noScrollArr = [
        ["#1a1b1b", [[19, 9, "#32322f"], [39, 2, "#202020"], [47, 25, "#202021"], [18, 21, "#2f302b"], [9, 32, "#3f3f3c"], [2, 48, "#191b1b"], [41, 41, "#1d1d1e"]]],
        ["#1a1b1b", [[4, 17, "#1b1b1b"], [0, 37, "#1d1d1d"], [19, 41, "#3c3d3a"], [24, 20, "#2b2c27"], [41, 11, "#222323"], [40, 38, "#1d1e1f"], [33, 27, "#212122"]]]
    ];
    return FindMultiColors(noScrollArr, [348, 204, 79, 78]);
};
const GetWeaponType = () =>
{
    const weaponTypeList = {
        "weapon": ReadImg("backpack/equipmentType/weapon"),
        "armor": ReadImg("backpack/equipmentType/armor"),
        "ornament": ReadImg("backpack/equipmentType/ornament")
    };
    for (let key in weaponTypeList)
    {
        let theType = images.findImage(captureScreen(), weaponTypeList[key], { region: [650, 109, 46, 48] });
        if (theType) return key;
    }
    return "unknown equipment type";
};
/**
 * 
 * @param {*} type "weapon" "armor" "ornament" 
 * @returns 
 */
const StrengthenPlayerEquipment = (type) =>
{
    console.log("start strengthen player equipment ........");
    OpenBackpack("equipment");
    let hadNeedStrengthen = false;
    out: for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let isEquip = EquippedCheck([929 + j * 65, 126 + i * 65, 19, 20]);

            if (isEquip)
            {
                let strLevel = GetNumber("strengthen", [921 + j * 65, 163 + i * 65, 30, 29]);
                if (strLevel < 7)
                {
                    RandomPress([899 + j * 65, 139 + i * 65, 39, 38]); //click the equipment for detail
                    Sleep(2000, 4000);
                    let equipmentType = GetWeaponType();
                    if (type == equipmentType)
                    {
                        RandomPress([599, 465, 24, 17]); //enter strengthen page
                        Sleep(4000, 6000);
                        hadNeedStrengthen = true;
                        break out;
                    }

                }
            }
        }
    }
    if (hadNeedStrengthen)
    {
        RandomPress([1028, 497, 58, 14]); //cancel not bind
        const hadFind = FindScroll(type);
        if (hadFind)
        {
            RandomPress([hadFind.x - 10, hadFind.y - 5, 30, 30]);
            let next_strLevel = GetNumber("amount", [1084, 605, 58, 34]);
            if (next_strLevel < 8)
            {
                if (FindGreenBtn([913, 657, 323, 61]))
                {
                    RandomPress([936, 672, 281, 29]); //strengthen btn;
                }

                Sleep(3000, 5000);
            }
        }
        GoBack();
    }
    else
    {
        CloseBackpack();
    }
    console.log("strengthen player equipment finish");
};
const StrengthenToLevel_10 = function ()
{
    console.log("strengthen to level 10");
    let isUpToLevel_10 = false;
    for (let n = 0; n < 4; n++)
    {
        let strenghten_shot = captureScreen();
        isUpToLevel_10 = GetNumber("amount", [1089, 607, 49, 31]);
        if (isUpToLevel_10 > 10)
        {
            isUpToLevel_10 = true;
            break;
        };
        let hasFailed = images.findMultiColors(strenghten_shot, "#1d1d1f", [[13, 1, "#202020"], [29, 0, "#1e1e1f"], [29, 20, "#202021"],
        [28, 43, "#1e1f20"], [-7, 53, "#1a1a1b"], [-31, 54, "#19191b"], [-35, 32, "#19191b"]], { region: [85, 203, 78, 81] });
        if (hasFailed) break;
        let isUseOut_2 = images.findMultiColors(strenghten_shot, "#191a1a", [[26, -1, "#1b1d1d"], [59, -1, "#1f1f20"],
        [61, 24, "#1f1f20"], [61, 54, "#1d1d1e"], [31, 59, "#171718"], [1, 59, "#191919"], [-2, 28, "#191919"], [26, 13, "#2e2f2c"],
        [41, 18, "#40403b"], [27, 26, "#2d2e29"], [17, 35, "#3d3d3a"], [32, 44, "#393a37"]], { region: [350, 206, 74, 76] });
        if (isUseOut_2) break;
        if (FindGreenBtn([912, 658, 320, 56]))
        {
            RandomPress([937, 675, 280, 28]);// strengthen btn;  
        }
        else break;

        Sleep(5000, 8000);
        RandomPress([459, 142, 390, 533]); // click to see result;
        Sleep(3000, 5000);
        RandomPress([459, 142, 390, 533]); // click to close result;
        Sleep(3000, 5000);
    }
    console.log("strengthen to level 10 result: " + isUpToLevel_10);
    return isUpToLevel_10;
};
const StrengthenTradeEquipment = function (arr)
{
    let strengthenSuccess = false;
    if (arr.length == 0) return false;
    //get the most expensive equipment
    const mostExpensive = arr.sort((a, b) => b.price - a.price)[0];
    const { row, col, type } = mostExpensive;
    console.log("strengthen the equipment: " + row + " " + col + " " + type);
    if (mostExpensive.price < 50)
    {
        console.log("the price is too low, no need to strengthen");
        return false;
    }
    RandomPress([895 + col * 65, 135 + row * 65, 40, 40]); // click the equipment
    Sleep(1000, 3000);
    RandomPress([599, 465, 25, 20]); // click strengthen
    Sleep(2000, 4000);
    RandomPress([1027, 497, 61, 15]); //concel the normal strengthen
    Sleep();
    const scroll = ReadImg(`backpack/strengthenPageScroll/${type}`);
    const shot = captureScreen();
    for (let i = 0; i < 5; i++)
    {
        let BGcolor = GetWeaponColor([920 + i * 63, 525, 55, 55]);
        if (BGcolor == "white")
        {
            let hasScroll = images.findImage(shot, scroll, { region: [920 + i * 63, 525, 55, 55] });
            if (hasScroll)
            {
                RandomPress([hasScroll.x, hasScroll.y, 20, 20]);
                Sleep(2000, 4000);
                strengthenSuccess = StrengthenToLevel_10();
                break;
            }
        }
    }
    scroll.recycle();
    GoBack();
    return strengthenSuccess;
};
const StrengthenTradeGreenSuit = function ()
{
    console.log("start strengthen trade green suit");
    LockCanSellEquipment();
    let isStrengthenSuccess = false;
    OpenBackpack("equipment");
    out: for (let i = 0; i < 5; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let weaponColor = GetWeaponColor([886 + j * 65, 126 + i * 65, 60, 60]);
            if (weaponColor == "green")
            {
                if (EquippedCheck([927 + j * 65, 123 + i * 65, 24, 24]))
                {
                    continue;
                }
                RandomPress([900 + j * 65, 139 + i * 65, 33, 35]);
                Sleep();
                let isLocked = IsLocked([574, 113, 31, 37]);
                if (isLocked)
                {
                    RandomPress([582, 132, 10, 6]);
                    Sleep();
                    let canSell = CanSell();
                    if (canSell)
                    {
                        RandomPress([604, 466, 16, 18]);
                        WaitUntilPageBack();
                        RandomPress([1029, 497, 63, 15]);
                        let scroll = FindScroll("armor");
                        if (scroll)
                        {
                            RandomPress([scroll.x, scroll.y, 10, 10]);
                            isStrengthenSuccess = StrengthenToLevel_10();

                        }
                        break out;
                    }
                }

            }
        }
    }
    CloseBackpack();
    GoBack();
    console.log("end: strengthen armor");
    return isStrengthenSuccess;
};

// ---------------------------------trade ------------------------------
const ViewPrice = function ()
{
    let amount, price = 0;

    amount = GetNumber("amount", [929, 177, 98, 40]);
    if (amount > 200)
    {
        return [amount, 10];
    }
    RandomPress([277, 181, 958, 31]); // item detail
    Sleep(2000, 4000);
    const level_10 = ReadImg("number/trade_strengthenedLevel10");
    const hasLevel10 = images.findImage(captureScreen(), level_10, { region: [232, 171, 103, 472] });
    if (hasLevel10)
    {
        amount = GetNumber("amount", [905, hasLevel10.y, 145, 30]);
        price = GetNumber("amount", [1075, hasLevel10.y, 125, 30]);
    }
    GoBack();
    Sleep();
    level_10.recycle();
    return [amount, price];
};
const GetAllEquipmentPrice = function ()
{
    const priceList = [];
    const shot = captureScreen();
    let lastClip = images.clip(shot, 0, 0, 10, 10);
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
            let equipmentColor = GetWeaponColor([885 + j * 65, 125 + i * 65, 60, 60]);
            if (equipmentColor == "white")
            {
                RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
                Sleep();
                let detailShot = captureScreen();
                let canSell = images.findMultiColors(detailShot, "#9e9e88", [[0, 7, "#8e8e7c"], [-3, 9, "#282829"], [4, 12, "#282929"], [11, 12, "#9d9d91"], [-11, 12, "#a0a08f"]],
                    { region: [647, 453, 38, 43] });
                if (canSell)
                {
                    let type = GetWeaponType();
                    if (type == "unknown equipment type") continue;
                    RandomPress([654, 460, 24, 26]); // enter trade market;
                    Sleep(3000, 5000);
                    let [amount, price] = ViewPrice();
                    let item = { row: i, col: j, amount: amount, price: price, type: type };
                    priceList.push(item);
                    Sleep();
                    OpenBackpack("equipment");
                }
            }
        }
    }
    return priceList;
};


const SaleEquipment = function ()
{
    let salePrice = 0;
    Sleep(2000, 3000);
    RandomPress([1232, 298, 22, 30]); // equipment icon;

    out: for (let i = 0; i < 5; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            Sleep();
            let color = GetWeaponColor([875 + j * 65, 175 + i * 65, 60, 60]);
            if (color == "green" || color == "blue" || color == "purple")
            {
                RandomPress([887 + j * 65, 188 + i * 65, 40, 35]); // click the equipment
                Sleep(1000, 3000);
                let price = GetNumber("amount", [925, 385, 132, 33]);
                if (price > 10)
                {
                    RandomPress([680, 644, 125, 22]); // sell btn;
                    RandomPress([688, 486, 124, 22]); // confirm btn;
                    salePrice += price;
                }
                else
                {
                    RandomPress([497, 643, 128, 23]); //cancel btn;
                }
            }
            else
            {
                break out;
            }
        }
    }
    // GoBack();
    return salePrice;
};
const SaleMaterials = function ()
{
    Sleep(1000, 3000);
    RandomPress([1232, 388, 21, 32]); //material icon;
    const shot = captureScreen();
    let total, price = 0;
    out: for (let i = 0; i < 5; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            Sleep();
            let color = GetWeaponColor([875 + j * 65, 175 + i * 65, 60, 60]);
            if (color == "purple" || color == "blue" || color == "green")
            {
                RandomPress([887 + j * 65, 188 + i * 65, 40, 35]); // click the equipment
                Sleep(1000, 3000);
                price = GetNumber("amount", [925, 385, 132, 33]);
                log("sale price: " + price);
                if (price > 10)
                {
                    RandomPress([680, 644, 125, 22]); // sell btn;
                    RandomPress([688, 486, 124, 22]); // confirm btn;
                    total += price;
                }
                else
                {
                    RandomPress([497, 643, 128, 23]); //cancel btn;
                }
            }
            else if (color == "white") continue;
            else
            {
                break out;
            }
        }
    }
    return total;
};
const GetSettlement = function ()
{
    console.log("Start Today Settlement");
    Sleep(2000, 3000);
    const hadSettlement = FindTipPoint([366, 83, 40, 32]);
    if (hadSettlement)
    {
        RandomPress([298, 95, 75, 31]); // settlement icon;
        Sleep(2000, 4000);
        let settlement = GetNumber("amount", [997, 672, 103, 34]);
        if (settlement == null)
        {
            settlement = 0;
        }

        if (new Date().getDate() == 1)
        {
            if (todaySettlementTimes == 0)
            {
                game_config.trade.monthlyIncome = 0;
            }

        }

        RandomPress([1118, 674, 127, 30]); //settlement btn;
        Sleep();

        console.log("Today earnings: " + settlement + " 钻石");
        game_config.trade.monthlyIncome += settlement;
        RWFile("trade", game_config.trade);

        ui.run(function ()
        {
            floaty_window.monthlyIncome.setText(`${game_config.trade.monthlyIncome}`);
        });
    }
    else
    {
        console.log("今日收益: 0 钻石");
    }
    console.log("End Today Settlement");
    return hadSettlement;
};
const RePutOnShelf = function ()
{
    Sleep(1000, 3000);
    const hasOverTime = images.findMultiColors(captureScreen(), "#3e4638", [[30, -4, "#3c4537"], [67, 0, "#343a2e"], [117, 3, "#383e32"], [114, 28, "#30382c"],
    [55, 30, "#2b3528"], [5, 29, "#2c3428"], [-6, 14, "#343c2f"]], { region: [1101, 663, 156, 51] });
    if (hasOverTime)
    {
        RandomPress([1113, 673, 131, 32]);
        Sleep(1000, 3000);
        RandomPress([685, 484, 126, 24]);
    }
};

const PutOnSale = function ()
{
    console.log("start put on sale");
    let hadSold = false;
    const hasMenu = HasMenu();
    if (!hasMenu)
    {
        console.log("No Menu");
        return false;
    }
    RandomPress([1025, 20, 25, 25]);
    WaitUntilPageBack();
    RandomPress([166, 103, 74, 20]);
    const totalPrice = SaleEquipment();
    if (totalPrice > 0)
    {
        hadSold = true;
        game_config.trade.monthlyIncome += totalPrice;
    }
    else
    {
        hadSold = false;
    }

    Sleep(1000, 3000);
    Sleep();
    RePutOnShelf();
    Sleep();
    GetSettlement();
    GoBack();
    Sleep();

    return hadSold;
};

module.exports = {
    OpenAllEquipmentBox,
    OpenAllProps,
    WearEquipment,
    StrengthenPlayerEquipment,
    DecomposeAll,
    PutOnSale,
    StrengthenTradeGreenSuit
};



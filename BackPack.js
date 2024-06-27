const { ReadImg, Sleep, RandomPress, GoBack, NumberRecognition, TipPointCheck, ConvertTradeTime, NoMoneyAlert, GetColorInMultiple, RandomHollow } = require("./Utils.js");
const { EmptyGrid, WhiteSquare, GreenSquare, BlueSquare, PurpleSquare, Equipped, GreenBtn } = require("./Color.js");
const { PropsCollectionFlow } = require("./PropsCollection.js");
/**
 * @param {*} page "equipment" "props" "material"
 * @returns 
 */
const OpenBackpack = (page) =>
{
    const backPackIcon = ReadImg('icon/backpack_icon');
    const hasBackpack = findImage(captureScreen(), backPackIcon, { region: [1075, 7, 56, 53] });
    backPackIcon.recycle();
    if (!hasBackpack) return false;
    const backpack_close = ReadImg("icon/backpack_close");
    const hasBackpack_close = findImage(captureScreen(), backpack_close, { region: [1235, 57, 43, 40] });
    if (!hasBackpack_close)
    {
        log(page == undefined ? "open backpack" : "open backpack: " + page);
        RandomPress([1091, 21, 29, 28]);
        Sleep(3000, 4000);
    }
    const CurrentPageCheck = (region) => images.findMultiColors(captureScreen(), "#cc6a2e", [[0, 2, "#cc6a2d"], [0, 9, "#cc692d"], [0, 17, "#cc692d"], [0, 25, "#cc6a2e"], [0, 31, "#cc6a2e"]], { region });
    if (page == "equipment")
    {
        const isInEquipPage = CurrentPageCheck([1209, 196, 18, 53]);
        if (!isInEquipPage)
        {
            RandomPress([1237, 207, 19, 29]);
        }
    }
    else if (page == "props")
    {
        const isInPropsPage = CurrentPageCheck([1210, 271, 16, 56]);
        if (!isInPropsPage)
        {
            RandomPress([1235, 285, 28, 28]);
        }
    }
    else if (page == "material")
    {
        const isInMaterialPage = CurrentPageCheck([1210, 349, 16, 55]);
        if (!isInMaterialPage)
        {
            RandomPress([1232, 361, 24, 26]);
        }

    }
    backpack_close.recycle();
    Sleep();
    return true;
};
const CloseBackpack = () =>
{
    const backpack_close = ReadImg("icon/backpack_close");
    const hasBackpack_close = findImage(captureScreen(), backpack_close, { region: [1235, 57, 43, 40] });
    if (hasBackpack_close)
    {
        console.log('close backpack');
        if (random() > 0.5)
        {
            RandomPress([1241, 69, 27, 16]);
        }
        else
        {
            RandomPress([1092, 24, 28, 21]);
        }
    }
    backpack_close.recycle();

};
const EmptyCheck = (shot, region) =>
{
    return GetColorInMultiple(shot, EmptyGrid, region);
};
const EquippedCheck = (shot, region) =>
{
    return GetColorInMultiple(shot, Equipped, region);
};


// -------------------------------tool ---------------------------
const ReturnHome = () =>
{
    console.log('----------------return home----------------');
    const quickItem_returnHome = ReadImg("quickItem/scroll_returnHome");
    const hasQuickReturnHome = images.findImage(captureScreen(), quickItem_returnHome, { region: [647, 624, 71, 68] });
    if (hasQuickReturnHome)
    {
        RandomPress([670, 642, 30, 35]);
        Sleep(10000, 15000);
    }
    else
    {
        OpenBackpack("props");
        const returnHomeIcon = ReadImg("backpack/scroll/returnHome");
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
            RandomPress([955, 19, 35, 30]); // 商城
            Sleep(4000, 6000);
            RandomPress([296, 98, 72, 28]); //第三页 普通页
            Sleep(2000, 4000);
            RandomPress([17, 211, 173, 37]); // 消耗品分页
            Sleep(2000, 4000);
            RandomPress([529, 164, 227, 236]); //return home scroll
            RandomPress([686, 578, 151, 24]); //confrim
            GoBack();
            RandomPress([668, 644, 37, 32]);
        }
    }
    quickItem_returnHome.recycle();
    log("return home to purchase potion");
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
    let hasOpenSlab = false;
    for (let i = 0; i < slabList.length; i++)
    {
        let hasSlab = images.findImage(shot, slabList[i], { region: [882, 122, 333, 333] });
        if (hasSlab)
        {
            RandomPress([hasSlab.x - 10, hasSlab.y, 40, 30]);
            Sleep();
            RandomPress([hasSlab.x - 10, hasSlab.y, 40, 30]);
            Sleep(2000, 4000);
            let hasPopup = GetColorInMultiple(captureScreen(), GreenBtn, [641, 500, 125, 50]);
            if (hasPopup)
            {
                RandomPress([663, 515, 86, 23]);
            }
            Sleep(6000, 8000);
            let hasOpenBtn = GetColorInMultiple(captureScreen(), GreenBtn, [522, 617, 238, 70]);
            if (hasOpenBtn)
            {
                RandomPress([545, 634, 191, 34]);
                Sleep(3000, 5000);
                hasOpenSlab = true;
            }
            break;
        }
    }
    if (hasOpenSlab)
    {
        GoBack();
    }
    slabList.forEach(slab => slab.recycle());

    console.log("open slab flow end; has open: " + hasOpenSlab);
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
            const hasPopup = GetColorInMultiple(captureScreen(), GreenBtn, [642, 497, 122, 54]);
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

const OpenAllProps = () =>
{
    OpenSlab();
    OpenNoOptionBox();
    CloseBackpack();
};
// -----------------------strengthen equipment -------------------------

const GetWeaponColor = (shot, region) =>
{
    const ColorObj = {
        "white": WhiteSquare,
        "green": GreenSquare,
        "blue": BlueSquare,
        "purple": PurpleSquare
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
    const IsPlusPower = (shot) =>
    {
        const plusArr = [
            ["#107093", [[3, 0, "#058ec0"], [5, 0, "#0a6c8f"], [2, -4, "#197a9f"], [2, 0, "#078fbf"], [2, 4, "#1f4e60"], [2, 6, "#262626"], [-5, -1, "#252526"]]],
            ["#242425", [[5, 0, "#252626"], [8, 0, "#185d76"], [10, 0, "#0f8ebb"], [13, 0, "#145a73"], [10, -2, "#167fa5"], [10, 2, "#087499"], [10, 8, "#262626"]]]
        ];
        const subArr = [
            ["#252626", [[5, 0, "#c3570f"], [8, 0, "#8a4415"], [6, -3, "#262626"], [6, 2, "#31251f"]]],
            ["#242526", [[3, 0, "#c3570f"], [4, 0, "#cc590b"], [6, 0, "#8a4415"], [3, -3, "#262626"], [4, 4, "#262626"]]]
        ];
        const isPlus = GetColorInMultiple(shot, plusArr, { region: [815, 156, 56, 37] });
        const isSub = GetColorInMultiple(shot, subArr, { region: [815, 156, 56, 37] });
        if (isPlus) return true;
        else if (isSub) return false;
        else return false;
    };
    log("开始穿戴装备");
    OpenBackpack("equipment");
    let shot = captureScreen();
    const isfewEquip = EmptyCheck(shot, [1145, 253, 64, 67]);
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
            let isEquip = EquippedCheck(shot, [920 + j * 65, 110 + i * 65, 40, 40]);
            let isBlank = EmptyCheck(shot, [890 + j * 65, 125 + i * 65, 50, 50]);
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
                let isWhite = GetWeaponColor(shot, [870 + j * 65, 120 + i * 65, 80, 20]);
                if (isWhite == "white") continue;
            }
            RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
            Sleep();
            let equipmentItem_shot = captureScreen();
            let isQualityBetter_result = IsQualityBetter(equipmentItem_shot);
            let isPlus = IsPlusPower(equipmentItem_shot);
            let newEquip = images.findMultiColors(equipmentItem_shot,
                "#262626", [[19, 3, "#252626"], [4, 18, "#242526"], [31, 18, "#242526"],],
                { region: [176, 192, 60, 132] }
            );
            if (isQualityBetter_result == true || isPlus || newEquip == null)
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
        let isZeroItem = NumberRecognition("strengthen", [1170, 504, 20, 27]);
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

const FindScroll = (type) =>
{
    const shot = captureScreen();
    const scroll = ReadImg(`backpack/scroll/${type}`);
    for (let i = 0; i < 5; i++)
    {
        let isBind = GetWeaponColor(shot, [919 + i * 64, 524, 50, 50]);
        if (isBind == "white")
        {
            let hasScroll = images.findImage(captureScreen(), scroll, { region: [899, 518, 303, 71] });
            if (hasScroll) return hasScroll;
        }
    }

    scroll.recycle();
    return false;
};

const NoScrollCheck = () =>
{
    const noScrollArr = [
        ["#1a1b1b", [[19, 9, "#32322f"], [39, 2, "#202020"], [47, 25, "#202021"], [18, 21, "#2f302b"], [9, 32, "#3f3f3c"], [2, 48, "#191b1b"], [41, 41, "#1d1d1e"]]],
        ["#1a1b1b", [[4, 17, "#1b1b1b"], [0, 37, "#1d1d1d"], [19, 41, "#3c3d3a"], [24, 20, "#2b2c27"], [41, 11, "#222323"], [40, 38, "#1d1e1f"], [33, 27, "#212122"]]]
    ];
    return GetColorInMultiple(captureScreen(), noScrollArr, [348, 204, 79, 78]);
};
const GetWeaponType = function (shot)
{
    const weaponTypeList = {
        "weapon": ReadImg("backpack/equipmentType/weapon"),
        "armor": ReadImg("backpack/equipmentType/armor"),
        "ornament": ReadImg("backpack/equipmentType/ornament")
    };
    for (let key in weaponTypeList)
    {
        let theType = images.findImage(shot, weaponTypeList[key], { region: [650, 109, 46, 48] });
        if (theType) return key;
    }
    return "unknown equipment type";
};
const StrengthenPlayerEquipment = (type) =>
{
    console.log("start strengthen player equipment ........");
    OpenBackpack("equipment");
    let hadNeedStrengthen = false;
    const backpackShot = captureScreen();
    out: for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let isEquip = EquippedCheck(backpackShot, [929 + j * 65, 126 + i * 65, 19, 20]);

            if (isEquip)
            {
                let strLevel = NumberRecognition("strengthen", [921 + j * 65, 163 + i * 65, 30, 29]);
                if (strLevel < 7)
                {
                    RandomPress([899 + j * 65, 139 + i * 65, 39, 38]); //click the equipment for detail
                    Sleep(2000, 4000);
                    let equipmentType = GetWeaponType(captureScreen());
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
        if (!hadFind) return false;
        else
        {
            RandomPress([hadFind.x - 10, hadFind.y - 5, 30, 30]);
            let next_strLevel = NumberRecognition("amount", [1084, 605, 58, 34]);
            if (next_strLevel <= 7)
            {
                RandomPress([936, 672, 281, 29]); //strengthen btn;
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
        isUpToLevel_10 = NumberRecognition("amount", [1089, 607, 49, 31]);
        if (isUpToLevel_10) break;
        let hasFailed = images.findMultiColors(strenghten_shot, "#1d1d1f", [[13, 1, "#202020"], [29, 0, "#1e1e1f"], [29, 20, "#202021"],
        [28, 43, "#1e1f20"], [-7, 53, "#1a1a1b"], [-31, 54, "#19191b"], [-35, 32, "#19191b"]], { region: [85, 203, 78, 81] });
        if (hasFailed) break;
        let isUseOut_2 = images.findMultiColors(strenghten_shot, "#191a1a", [[26, -1, "#1b1d1d"], [59, -1, "#1f1f20"],
        [61, 24, "#1f1f20"], [61, 54, "#1d1d1e"], [31, 59, "#171718"], [1, 59, "#191919"], [-2, 28, "#191919"], [26, 13, "#2e2f2c"],
        [41, 18, "#40403b"], [27, 26, "#2d2e29"], [17, 35, "#3d3d3a"], [32, 44, "#393a37"]], { region: [350, 206, 74, 76] });
        if (isUseOut_2) break;
        RandomPress([937, 675, 280, 28]);// strengthen btn;

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
    const scroll = ReadImg(`backpack/scroll/${type}`);
    const shot = captureScreen();
    for (let i = 0; i < 5; i++)
    {
        let isWhite = GetWeaponColor(shot, [920 + i * 63, 525, 55, 55]);
        if (isWhite == "white")
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

// ---------------------------------trade ------------------------------
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
    const level_10 = ReadImg("number/trade_strengthenedLevel10");
    const hasLevel10 = images.findImage(captureScreen(), level_10, { region: [232, 171, 103, 472] });
    if (hasLevel10)
    {
        amount = NumberRecognition("amount", [905, hasLevel10.y, 145, 30]);
        price = NumberRecognition("amount", [1075, hasLevel10.y, 125, 30]);
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
            let equipmentColor = GetWeaponColor(shot, [885 + j * 65, 125 + i * 65, 60, 60]);
            if (equipmentColor == "white")
            {
                RandomPress([895 + j * 65, 135 + i * 65, 40, 40]);
                Sleep();
                let detailShot = captureScreen();
                let canSell = images.findMultiColors(detailShot, "#9e9e88", [[0, 7, "#8e8e7c"], [-3, 9, "#282829"], [4, 12, "#282929"], [11, 12, "#9d9d91"], [-11, 12, "#a0a08f"]],
                    { region: [647, 453, 38, 43] });
                if (canSell)
                {
                    let type = GetWeaponType(detailShot);
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
    const shot = captureScreen();
    out: for (let i = 0; i < 5; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            Sleep();
            let color = GetWeaponColor(shot, [875 + j * 65, 175 + i * 65, 60, 60]);
            if (color == "white" || color == "green" || color == "blue" || color == "purple")
            {
                RandomPress([887 + j * 65, 188 + i * 65, 40, 35]); // click the equipment
                Sleep(1000, 3000);
                let price = NumberRecognition("amount", [925, 385, 132, 33]);
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
            let color = GetWeaponColor(shot, [875 + j * 65, 175 + i * 65, 60, 60]);
            if (color == "purple" || color == "blue" || color == "green")
            {
                RandomPress([887 + j * 65, 188 + i * 65, 40, 35]); // click the equipment
                Sleep(1000, 3000);
                price = NumberRecognition("amount", [925, 385, 132, 33]);
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
    const hadSettlement = TipPointCheck([366, 83, 40, 32]);
    if (hadSettlement)
    {
        RandomPress([298, 95, 75, 31]); // settlement icon;
        Sleep(2000, 4000);
        let settlement = NumberRecognition("amount", [997, 672, 103, 34]);
        if (settlement == null)
        {
            settlement = 0;
        }
        let todaySettlementTimes, lastSettlement;
        const player = game_config.player;

        if (player.trade == undefined)
        {
            player.trade = {};
        }
        if (typeof player.trade.todaySettlementTimes != "number")
        {
            player.trade.todaySettlementTimes = 0;
        }
        if (typeof player.trade.settlement != "number")
        {
            player.trade.settlement = 0;
        }
        todaySettlementTimes = player.trade.todaySettlementTimes;
        lastSettlement = player.trade.settlement;
        const isFirstDayofMonth = new Date().getDate() == 1;
        if (isFirstDayofMonth)
        {
            if (todaySettlementTimes == 0)
            {
                lastSettlement = 0;
            }
            else
            {
                todaySettlementTimes++;

            }
        }
        else
        {
            todaySettlementTimes = 0;
        }
        settlement = settlement + lastSettlement;
        const lastTime = ConvertTradeTime(NumberRecognition("amount", [1050, 670, 44, 36]));

        RandomPress([1118, 674, 127, 30]); //settlement btn;
        Sleep();

        const total = NumberRecognition("amount", [504, 3, 113, 32]);
        console.log("Today earnings: " + settlement + " 钻石");
        player.trade.total = total;
        player.trade.settlement = settlement;
        player.trade.lastTime = lastTime;
        player.trade.todaySettlementTimes = todaySettlementTimes;
        RWFile("player", player);
        Sleep();
        ui.web.jsBridge.callHandler('updateTradeRecord', JSON.stringify(player.trade), (data) =>
        {
            console.log("update trade record success" + data);
        });
        ui.run(function ()
        {
            floaty_window.settlement.setText(`${settlement}`);
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
    let hadSold = false;
    // PropsCollectionFlow();
    Sleep(2000, 3000);
    console.log("start put on sale");
    DecomposeAllGreenSuit();
    Sleep();
    SortEquipment();
    const priceList = GetAllEquipmentPrice();
    if (priceList.length == 0)
    {
        console.log("no equipment to sale");
        hadSold = false;
        RandomPress([843, 69, 28, 15]); //close the equipment detail page;
    }
    else
    {
        StrengthenTradeEquipment(priceList);
        Sleep(2000, 3000);
        OpenBackpack("equipment");
    }
    DecomposeAll();
    Sleep();
    RandomPress([1024, 15, 28, 31]); // trade icon;
    Sleep(3000, 5000);
    RandomPress([180, 99, 54, 23]); // sell page
    Sleep();
    const totalPrice = SaleEquipment();
    if (totalPrice > 0)
    {
        hadSold = true;
    }
    else
    {
        hadSold = false;
    }

    Sleep(1000, 3000);
    SaleMaterials();
    Sleep();
    RePutOnShelf();
    Sleep();
    GetSettlement();
    GoBack();
    return hadSold;
};

module.exports = {
    OpenBackpack,
    CloseBackpack,
    OpenAllEquipmentBox,
    OpenAllProps,
    WearEquipment,
    StrengthenPlayerEquipment,
    DecomposeAll,
    ReturnHome,
    PutOnSale,
};




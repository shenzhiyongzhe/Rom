const { OpenBackpack, CloseBackpack } = require("./BackPack");
const { MenuCloseColorList } = require("./Color");
const { ReadImg, FindGreenBtn, FindMultiColors, GetNumber, Sleep } = require("./Utils");

const imgList = {
    noPotion: ReadImg("exception/noPotion"),
    haltMode_noPotion: ReadImg("exception/haltMode_noPotion"),
    haltMode_backpack90: ReadImg("exception/haltMode_backpack90"),
    haltMode_backpack100: ReadImg("exception/haltMode_backpack100"),
};

const MainUIArray = [
    ["#ff2200", [[-1, 6, "#ff2200"], [20, 4, "#ff2200"], [57, 11, "#ff2200"], [68, 10, "#ffffff"]]],
    ["#fe2200", [[0, 7, "#fe2200"], [19, -4, "#fd2300"], [19, 13, "#fe2200"], [68, 6, "#fefefc"], [114, 10, "#fefefc"]]]
];

const HasMainUI = () => FindMultiColors(MainUIArray, [1107, 664, 148, 49]);
const HasMenuCloseIcon = () => FindMultiColors(MenuCloseColorList, [1213, 9, 47, 48]);

const HasDeathPopup = () => FindGreenBtn([538, 533, 204, 57]);
const HasDisconnectionPopup = () => FindGreenBtn([660, 434, 178, 46]);
const HasStartGame = () => FindGreenBtn([1085, 647, 173, 46]);
const HasLongTimeNoInput = () => FindGreenBtn([551, 434, 180, 47]);
const HasBackpackFull = () =>
{
    const shot = captureScreen();
    const backpack90 = images.findImage(shot, imgList.haltMode_backpack90, { region: [967, 16, 65, 65] });
    const backpack100 = images.findImage(shot, imgList.haltMode_backpack100, { region: [967, 16, 65, 65] });
    if (backpack90 || backpack100)
    {
        console.log("---------------backpack full--------------");
        return true;
    }
    return false;
};
const HasBackpackFull_notInHaltMode = () =>
{
    OpenBackpack();
    let hasMax = false;
    const curItemNum = GetNumber("amount", [1124, 505, 45, 34]);
    const maxItemNum = GetNumber("amount", [1166, 503, 40, 35]);
    if (maxItemNum - curItemNum < 5)
    {
        console.log("---------------backpack full--------------");
        hasMax = true;
    }
    CloseBackpack();
    return hasMax;
};
const HasNoPotion = () =>
{
    const shot = captureScreen();
    const hasNoPotion = images.findImage(shot, imgList.noPotion, { region: [941, 615, 80, 82] });
    const hasNoPotion_haltMode = images.findImage(shot, imgList.haltMode_noPotion, { region: [904, 4, 63, 70] });
    if (hasNoPotion || hasNoPotion_haltMode)
    {
        console.log("---------------no potion---------------");
        return true;
    }

    return false;
};
const HasNoExp = () =>
{
    let curExp = images.clip(captureScreen(), 149, 544, 82, 31);
    for (let i = 0; i < 10; i++)
    {
        Sleep(10000, 20000);
        let hasIncrease = images.findImage(captureScreen(), curExp, { region: [142, 538, 99, 45] });

        if (hasIncrease == null) return false;
        else
        {
            curExp = images.clip(captureScreen(), 149, 544, 82, 31);
        }
        if (i == 9)
        {
            console.log("long time no exp!!! exit halt mode check game");
            return true;
        }
    }
    return false;
};

const pinkColorList = [
    ["#87052f", [[15, -1, "#88012a"], [19, 12, "#8e022e"], [8, 15, "#8b0029"], [-1, 22, "#8b002a"]]],
    ["#760222", [[15, 0, "#7c0225"], [34, -2, "#810226"], [7, 12, "#7d0227"], [24, 14, "#870126"]]],
    ["#640421", [[13, 0, "#6a0423"], [25, 0, "#6d0322"], [8, 15, "#76011c"], [-27, 10, "#720825"]]],
    ["#85032c", [[17, -4, "#8b032e"], [15, 13, "#91012d"], [4, 16, "#990227"]]],
    ["#6c071e", [[14, -1, "#6d0727"], [27, -1, "#6f0526"], [5, 11, "#75031e"], [18, 11, "#6d0220"]]],
    ["#61021c", [[17, -4, "#640421"], [29, -3, "#690424"], [14, 10, "#670222"], [3, 15, "#6a0525"]]],
    ["#a70236", [[17, -4, "#af0136"], [35, -6, "#b60139"], [23, 3, "#b50138"], [9, 10, "#b70038"]]],
    ["#600320", [[14, -3, "#61031f"], [25, -8, "#640321"], [9, 5, "#670422"], [26, 3, "#60001b"]]]
];
const HasAttackByOthers = () => FindMultiColors(pinkColorList, [1213, 651, 66, 67]);

const CanPickExpOrEquipment = () =>
{
    const crucifixIconList = [
        ["#c3ab97", [[3, 0, "#e1cbbf"], [16, 0, "#ccb597"], [10, -10, "#ab8354"], [10, -3, "#bd926b"], [10, 6, "#9b8063"], [10, 15, "#a87d55"], [10, 18, "#a27c53"]]],
        ["#af8b6b", [[7, 0, "#ddcebb"], [18, 0, "#d2b595"], [11, -11, "#ae8861"], [11, -7, "#ba9b7e"], [12, 6, "#6b5033"], [11, 11, "#aa8a64"], [11, 16, "#a6805b"]]]
    ];
    return FindMultiColors(crucifixIconList, [883, 8, 42, 53]);
};
module.exports = {
    HasMainUI, HasMenuCloseIcon,
    HasDeathPopup, HasDisconnectionPopup, HasStartGame, HasLongTimeNoInput,
    HasBackpackFull, HasBackpackFull_notInHaltMode, HasNoPotion, HasNoExp, CanPickExpOrEquipment,
    HasAttackByOthers
};


const { OpenBackpack } = require("./BackPack");
const { MenuCloseColorList } = require("./Color");
const { ReadImg, FindGreenBtn, FindMultiColors, GetNumber } = require("./Utils");

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
    const curItemNum = GetNumber("amount", [1124, 505, 45, 34]);
    const maxItemNum = GetNumber("amount", [1166, 503, 40, 35]);
    if (maxItemNum - curItemNum < 5)
    {
        console.log("---------------backpack full--------------");
        return true;
    }
    return false;
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
    let curExp = images.clip(captureScreen(), 151, 547, 80, 24);
    for (let i = 0; i < 10; i++)
    {
        Sleep(10000, 20000);
        let hasIncrease = images.findImage(captureScreen(), curExp, { region: [136, 536, 121, 52] });

        if (hasIncrease == null) return false;
        else if (i == 9)
        {
            console.log("long time no exp!!! exit halt mode check game");
            return true;
        }
    }
    return false;
};

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
    HasBackpackFull, HasBackpackFull_notInHaltMode, HasNoPotion, HasNoExp, CanPickExpOrEquipment
};


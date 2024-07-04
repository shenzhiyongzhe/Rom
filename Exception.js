const { FindMultiColors, IsHaltMode, ExitHaltMode, IsInCity, HasPageBack } = require("./Utils");
const { HasMainUI, HasDisconnectionPopup, HasStartGame, HasLongTimeNoInput, HasBackpackFull, HasNoPotion, HasNoExp, HasDeathPopup, HasBackpackFull_notInHaltMode } = require("./ExceptionCheck");
const { MainUIFlow, PageBackFlow, DisconnectionFlow, StartGameFlow, LongTimeNoInputFlow, BackpackFullFlow, NoPotionFlow, NoExpFlow, DeathFlow, InCityFlow } = require("./ExceptionFlow");



const Exception = () =>
{
    const isHalt = IsHaltMode();
    if (isHalt)
    {
        HasBackpackFull() && BackpackFullFlow();
        HasNoPotion() && NoPotionFlow();
        HasNoExp && NoExpFlow();
    }
    else
    {
        HasMainUI() && MainUIFlow();
        HasPageBack() && PageBackFlow();
        HasDisconnectionPopup() && DisconnectionFlow();
        HasStartGame() && StartGameFlow();
        HasLongTimeNoInput() && LongTimeNoInputFlow();
        HasDeathPopup() && DeathFlow();
        IsInCity() && InCityFlow();
        HasBackpackFull_notInHaltMode() && BackpackFullFlow();
    }
};

const UnifyScreen = function ()
{
    Sleep();
    let shot = captureScreen();
    const menuIcon = ReadImg("icon/menu_icon");
    const hasMenu = images.findImage(shot, menuIcon, { region: [1206, 6, 68, 64] });
    menuIcon.recycle();
    if (hasMenu)
    {
        return true;
    };
    const inSaveMode = images.findMultiColors(shot, "#454442", [[24, 1, "#373737"], [47, 4, "#535353"], [73, 1, "#515151"], [91, 1, "#494947"]], { region: [516, 172, 271, 250] });
    if (inSaveMode)
    {
        Sleep();
        ExitHaltMode();
        return false;
    }
    return false;
};
const FirstOpenGameCheck = function ()
{
    //screen is black
    const blackScreenArr = [
        ["#000000", [[-11, 162, "#000000"], [-8, 383, "#000000"], [-12, 598, "#000000"], [474, 644, "#000000"], [1033, 643, "#000000"], [1045, 324, "#000000"], [1046, -10, "#000000"]]],
        ["#000000", [[43, 187, "#000000"], [57, 480, "#000000"], [287, 99, "#000000"], [881, 88, "#000000"], [987, 443, "#000000"], [664, 532, "#000000"], [499, 556, "#000000"]]],
        ["#000000", [[362, 23, "#000000"], [600, 42, "#000000"], [1040, 257, "#000000"], [797, 487, "#000000"], [441, 509, "#000000"], [152, 469, "#000000"], [544, 581, "#000000"]]]
    ];
    for (let i = 0; i < 3; i++)
    {
        let isFirstEnterGame = FindMultiColors(blackScreenArr, [4, 4, 1275, 714]);
        if (isFirstEnterGame)
        {
            Sleep(120000, 180000);
            break;
        }
        Sleep(3000, 6000);
    }
};

module.exports = {
    Exception, UnifyScreen, FirstOpenGameCheck
};

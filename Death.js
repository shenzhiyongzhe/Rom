
const { game_config, RWFile } = require("./RomConfig.js");
const { ReadImg, Sleep, RandomPress, GoBack, GetNumber, FindCheckMark, RandomSwipe } = require("./Utils.js");
const { Daily } = require("./Daily.js");
const { MissionAwardFlow } = require("./Common.js");


//购买药水
const GroceryFlow = function ()
{
    RandomPress([77, 275, 97, 28]);
    const potion = ReadImg("grocery_bigPotion");
    for (let i = 0; i < 10; i++)
    {
        let hasPotion = images.findImage(captureScreen(), potion, { region: [69, 112, 91, 91] });
        if (hasPotion) break;
        Sleep(3000, 5000);
    }
    log("start grocery");
    potion.recycle();
    Sleep();
    let setting = game_config.setting;
    const isZero = GetNumber("amount", [1130, 658, 108, 34]);
    if (setting.autoGrocery == false || setting.autoGrocery == undefined || isZero == 0)
    {
        // set auto purchase;
        RandomPress([65, 662, 295, 25]); //set auot btn;
        Sleep();
        RandomPress([281, 214, 33, 14]); // max big potion
        RandomSwipe([168, 507, 213, 41], [167, 143, 211, 35]);
        Sleep();
        RandomSwipe([168, 507, 213, 41], [167, 143, 211, 35]);
        Sleep(2000, 3000);
        const returnHome = ReadImg("grocery_returnHome");
        const hasReturnHome = images.findImage(captureScreen(), returnHome, { region: [86, 352, 64, 64] });
        if (hasReturnHome)
        {
            RandomPress([156, 437, 37, 14]); // 10 per return home
            RandomPress([156, 313, 38, 17]); // randomPostion 10 per
        }
        RandomPress([231, 660, 152, 31]); // save setting
        setting.autoGrocery = true;
        RWFile("setting", setting);
    }
    // auto purchase
    RandomPress([930, 658, 302, 30]); // purchase 
    GoBack();
};

function DeathFlow()
{
    gameMode = game_config.ui.gameMode;
    Sleep();
    console.log("Character Dead!!!");
    CrucifixFlow();
    Sleep(2000, 3000);
    Daily();
    Sleep();
    MissionAwardFlow();
    Sleep(3000, 5000);
    GroceryFlow();
    Sleep();
    if (gameMode == "mainStory" && game_config.player.deathtime > 2)
    {
        console.log("死亡次数大于2次，退出游戏");
        alert("死亡三次，退出主线");
    }
};


module.exports = {  DeathFlow, GroceryFlow };
// CrucifixFlow()



const { ReadImg, Sleep, RandomPress, GoBack, game_config, RWFile } = require("./Global.js");

const { WearEquipment } = require("./BackPack.js");
const { Daily } = require("./Daily.js");
const { MissionAwardFlow } = require("./Common.js");

const CrucifixFlow = function () 
{
    let needToEquip = false;
    Sleep(3000, 5000);
    RandomPress([894, 20, 21, 31]);
    Sleep(3000, 5000);
    const exp = ReadImg("crucifix_exp");
    let shot = captureScreen();
    for (let i = 0; i < 5; i++)
    {
        let isOverTime = images.findMultiColors(shot, "#3f421f", [[39, 0, "#3e3f1f"], [-7, 25, "#3f421f"], [-2, 58, "#3f431f"], [39, 60, "#3c3f1f"]], { region: [60, 119 + i * 83, 197, 97] });
        if (isOverTime) continue;
        let isExp = images.findImage(shot, exp, { region: [77, 132 + i * 83, 67, 70] });
        if (isExp)
        {
            RandomPress([178, 139 + i * 83, 190, 55]);
        }
        else break;

    }
    exp.recycle();
    const coin_icon = ReadImg("crucifix_coin");
    const hasExpCoin = images.findImage(captureScreen(), coin_icon, { region: [123, 513, 70, 50] });
    coin_icon.recycle();

    if (hasExpCoin) RandomPress([108, 529, 16, 14]);

    RandomPress([104, 595, 192, 22]); //confirm

    RandomPress([674, 474, 133, 23]); // popup confirm

    Sleep();
    let expPopExist = images.findMultiColors(captureScreen(), "#383838", [[105, -2, "#383838"], [105, 19, "#323232"], [5, 21, "#2a2a2a"]], { region: [447, 458, 183, 59] });
    if (expPopExist) RandomPress([476, 475, 131, 26]); // cancel popup

    //equipment 
    const hasLostEquipment = images.findMultiColors(captureScreen(), "#c32513", [[1, 0, "#c62714"], [3, 0, "#c42617"], [3, 1, "#b82215"], [1, 1, "#ca2817"]], { region: [32, 214, 40, 38] });
    if (hasLostEquipment)
    {
        RandomPress([24, 238, 30, 46]); // equip page
        shot = captureScreen();
        const equipment_coin = ReadImg("crucifix_equipment_coin");
        for (let j = 0; j < 5; j++)
        {
            let isEquipOverTime = images.findMultiColors(shot, "#3f421f", [[39, 0, "#3e3f1f"], [-7, 25, "#3f421f"], [-2, 58, "#3f431f"], [39, 60, "#3c3f1f"]], { region: [60, 119 + j * 83, 197, 97] });
            if (isEquipOverTime) continue;
            let isEquip = images.findImage(shot, equipment_coin, { region: [138, 136 + j * 83, 60, 67] });
            if (isEquip)
            {
                RandomPress([178, 139 + j * 83, 190, 55]);
            }
            else break;
        }

        RandomPress([104, 595, 192, 22]); //confirm
        RandomPress([674, 474, 133, 23]); // popup confirm
        Sleep();
        let equipPopExist = images.findMultiColors(captureScreen(), "#383838", [[105, -2, "#383838"], [105, 19, "#323232"], [5, 21, "#2a2a2a"]], { region: [447, 458, 183, 59] });
        if (equipPopExist) RandomPress([476, 475, 131, 26]); // cancel popup

        needToEquip = true;
    }
    RandomPress([355, 71, 26, 14]);

    return needToEquip;
};

const RandomSwipe = function ([x1, y1, w1, h1], [x2, y2, w2, h2])
{
    let x1 = random() * w1 + x1;
    let y1 = random() * h1 + y1;
    let x2 = random() * w2 + x2;
    let y2 = random() * h2 + y2;
    const duration = random() * 100 + 400;
    swipe(x1, y1, x2, y2, duration);
    Sleep(2000, 3000);
};
// RandomSwipe([168, 507, 213, 41], [167, 143, 211, 35]);
// RandomSwipe([168, 507, 213, 41], [167, 143, 211, 35]);
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
    if (setting.autoGrocery == false || setting.autoGrocery == undefined)
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
// GroceryFlow();
// log(images.findImage(captureScreen(), ReadImg("grocery_returnHome"), { region: [86, 352, 64, 64] }));
//死亡流程 点击确认按钮，购买药水
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


module.exports = { DeathFlow, GroceryFlow };
// DeathFlow();
// CrucifixFlow();
// MissionAwardFlow();
// GroceryFlow();
// log(images.findImage(captureScreen(), ReadImg("grocery_returnHome"), { region: [47, 108, 358, 493] }));

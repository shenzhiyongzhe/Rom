
const { ReadImg, Sleep, RandomPress, GoBack, game_config } = require("./Global.js");

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

//购买药水
const GroceryFlow = function ()
{
    RandomPress([77, 275, 97, 28]);
    const potion = ReadImg("grocery_potion");
    for (let i = 0; i < 30; i++)
    {
        let hasPotion = images.findImage(captureScreen(), potion, { region: [69, 112, 91, 91] });
        if (hasPotion) break;
        Sleep(3000, 5000);
    }
    potion.recycle();
    Sleep();
    RandomPress([158, 139, 222, 51]); //potion
    Sleep();
    RandomPress([821, 370, 51, 23]); // max
    RandomPress([684, 527, 167, 23]);// confirm
    Sleep(3000, 5000);
    const isNoMoney = images.findMultiColors(captureScreen(), "#3e4638", [[21, 2, "#363e32"], [139, 1, "#383f34"], [141, 18, "#32392d"], [19, 16, "#30382b"]],
        { region: [653, 504, 218, 68] });
    if (isNoMoney)
    {
        console.log("No money to buy potion");
        if (random() > 0.5) RandomPress([439, 528, 161, 21]);
        else RandomPress([883, 139, 29, 14]);
    }
    RandomPress([1138, 16, 133, 32]); //go back

};

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

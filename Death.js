
const { ReadImg, Sleep, RandomPress, GoBack, game_config, currentVariables, } = require("./Global.js");

const CrucifixFlow = require("./Crucifix.js");
const { WearEquipment } = require("./BackPack.js");
const EnterInstanceZones = require("./Menu/InstanceZones.js");
const DeathImg = {
    revive: ReadImg("character_revive"),
};
const DeathPos = {
    grocery: [70, 270, 100, 30],
    potion: [160, 137, 221, 51],
    potionMax: [820, 365, 40, 20],
    potionConfirm: [685, 520, 65, 25],
};

const Death_RecPos = {
    grocery: [54, 257, 89, 64],
    potion: [160, 220, 200, 40],
    potionMax: [820, 365, 40, 20],
    potionConfirm: [685, 520, 65, 25],
    grocery: [54, 257, 89, 64]
};

//购买药水
const GroceryFlow = function ()
{
    const groceryIcon = ReadImg("grocery");
    let inGrocery = findImage(captureScreen(), groceryIcon, { region: Death_RecPos.grocery });
    const staminaPotion_icon = ReadImg("staminaPotion_icon");
    if (inGrocery)
    {
        RandomPress(DeathPos.grocery);
        for (let i = 0; i < 10; i++)
        {
            let staminaPotion = images.findImage(captureScreen(), staminaPotion_icon);
            Sleep();
            if (staminaPotion)
            {
                RandomPress(DeathPos.potion);
                Sleep(1500, 2500);
                const potionMax = ReadImg("potionMax");
                let isMax = findImage(captureScreen(), potionMax);
                Sleep(400, 1000);
                if (isMax)
                {
                    RandomPress(DeathPos.potionMax);
                    Sleep(1000, 1500);
                    RandomPress(DeathPos.potionConfirm);
                    Sleep(1000, 1500);
                    GoBack();
                }
                staminaPotion_icon.recycle();
                potionMax.recycle();
                break;
            }
        }
    }
    groceryIcon.recycle();
};
const DeathCheck = function ()
{
    const hasRevive = findImage(captureScreen(), DeathImg.revive, { region: [568, 544, 124, 68] });
    if (hasRevive)
    {
        game_config.player.deathtime++;
        console.log("死亡次数：" + game_config.player.deathtime);
        Sleep(1000, 5000);
        RandomPress([574, 565, 140, 25]);
        Sleep(12000, 15000);
        RandomPress([563, 546, 160, 34]);
        Sleep();
        return true;
    }
    else return false;
};
//死亡流程 点击确认按钮，购买药水
const DeathFlow = function ()
{
    console.log("开始死亡流程");


    const hasRecover = CrucifixFlow();
    Sleep();
    if (hasRecover)
    {
        WearEquipment();
    }

    Sleep(2000, 3000);
    GroceryFlow();
    Sleep(3000, 5000);
    if (game_config.ui.gameMode == "mainStory" && game_config.player.deathtime > 2)
    {
        console.log("死亡次数大于2次，退出游戏");
        alert("死亡三次，退出主线");
    }
    else if (game_config.ui.gameMode == "instance")
    {
        console.log("副本挂机死亡，重新进入副本");
        if (currentVariables.instancePos[0] == 0)
        {
            game_config.ui.normalZone[currentVariables.instancePos[1]].checked = true;
        }
        else if (currentVariables.instancePos[0] == 1)
        {
            game_config.ui.specialZone[currentVariables.instancePos[1]].checked = true;
        }
        Sleep();
        EnterInstanceZones();
    }
};


module.exports = { DeathFlow, DeathCheck };
// DeathFlow();
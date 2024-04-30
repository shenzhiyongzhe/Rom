
const {
    imgRef,
    posRef,
    Player,
    ReadImg,
    Sleep,
    RandomPress,
    GoBack,
} = require("./Global.js");

const CrucifixFlow = require("./Crucifix.js");
const { BackPack_EquipmentFlow } = require("./BackPack.js");
const DeathImg = {
    revive: ReadImg("character_revive"),

};
const DeathPos = {
    revive: [554, 556, 175, 39],
    deathConfirm: [551, 544, 179, 37],
    grocery: [70, 270, 100, 30],
    potion: [160, 137, 221, 51],
    potionMax: [820, 365, 40, 20],
    potionConfirm: [685, 520, 65, 25],
};

const Death_RecPos = {
    revive: [546, 511, 203, 54],
    deathConfirm: [609, 541, 67, 44],
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
        Sleep(300, 5000);
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
//死亡流程 点击确认按钮，购买药水
const DeathFlow = function ()
{
    const hasRevive = findImage(captureScreen(), DeathImg.revive, { region: Death_RecPos.revive });
    if (hasRevive)
    {
        Sleep(1000, 8000);
        RandomPress(DeathPos.revive);
        Sleep(10000, 15000);
        RandomPress(DeathPos.deathConfirm);
    }

    const hasRecover = CrucifixFlow();
    Sleep();
    if (hasRecover)
    {
        RandomPress([1090, 20, 25, 15]);
        Sleep(2000, 3000);
        BackPack_EquipmentFlow();
    }

    Sleep(2000, 3000);
    GroceryFlow();
};


module.exports = DeathFlow;
// DeathFlow();
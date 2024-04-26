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
const DeathImg = {
    revive: ReadImg("CN_revive"),
    deathConfirm: ReadImg("death_confirm"),
};
const DeathPos = {
    deathConfirm: [551, 544, 179, 37],
    grocery: [70, 270, 100, 30],
    potion: [160, 220, 200, 40],
    potionMax: [820, 365, 40, 20],
    potionConfirm: [685, 520, 65, 25],
};

//死亡流程 点击确认按钮，购买药水
const DeathFlow = function ()
{
    const revive = findImage(captureScreen(), DeathImg.revive, {
        region: [546, 511, 203, 54],
    });
    if (revive)
    {
        Sleep(1000, 10000);
        RandomPress([568, 525, 145, 31]);
        Sleep(3000, 1000);
        let deathConfirmBtn;
        for (let i = 0; i < 5; i++)
        {
            deathConfirmBtn = findImage(captureScreen(), DeathImg.deathConfirm, { region: [531, 522, 224, 77] });
            if (deathConfirmBtn)
            {
                Sleep();
                RandomPress(DeathPos.deathConfirm);
                break;
            }
            Sleep(500, 1500);
        }
    }

    //寻找死亡弹窗的确认按钮
    Sleep(3000, 5000);
    CrucifixFlow();
    Sleep(2000, 3000);
    GroceryFlow();
};

//购买药水
const GroceryFlow = function ()
{
    const groceryIcon = ReadImg("grocery");
    const inGrocery = findImage(captureScreen(), groceryIcon, { region: [54, 257, 89, 64] });
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
                Sleep(200, 500);
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

module.exports = DeathFlow;
// DeathFlow();
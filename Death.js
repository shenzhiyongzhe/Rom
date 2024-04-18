const {
    imgRef,
    posRef,
    Player,
    ReadImg,
    Sleep,
    RandomClick,
    RandomPress,
    GoBack,
    CharacterIdentity,
} = require("./Global.js");

const CrucifixFlow = require("./Crucifix.js");

//死亡流程 点击确认按钮，购买药水
const Flow = function ()
{
    const revive = findImage(captureScreen(), imgRef.revive, {
        region: [546, 511, 203, 54],
    });
    if (revive)
    {
        Sleep(1000, 10000);
        RandomPress([568, 525, 145, 31]);
        Sleep(3000, 1000);
        let deathConfirmBtn;
        do
        {
            deathConfirmBtn = findImage(captureScreen(), imgRef.confirm);
            if (deathConfirmBtn)
            {
                Sleep();
                RandomPress(posRef.deathConfirm, random(100, 300));
                break;
            }
            Sleep(200, 500);
        } while (!deathConfirmBtn);
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
    const inGrocery = findImage(captureScreen(), ReadImg("grocery"));
    const staminaPotion_icon = ReadImg("staminaPotion_icon");
    if (inGrocery)
    {
        RandomPress(posRef.grocery);
        Sleep(300, 5000);
        while (true)
        {
            let staminaPotion = images.findImage(
                captureScreen(),
                staminaPotion_icon
            );
            Sleep();
            if (staminaPotion)
            {
                RandomPress(posRef.potion);
                Sleep(1500, 2500);
                const potionMax = ReadImg("potionMax");
                let isMax = findImage(captureScreen(), potionMax);
                Sleep(200, 500);
                if (isMax)
                {
                    RandomPress(posRef.potionMax);
                    Sleep(1000, 1500);
                    RandomPress(posRef.potionConfirm);
                    Sleep(1000, 1500);
                    GoBack();
                }
                staminaPotion_icon.recycle();
                potionMax.recycle();
                break;
            }
        }
    }
};

module.exports = Flow;
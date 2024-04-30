
// const { BackPack_EquipmentFlow } = require("./BackPack.js");
const {
    ReadImg,
    Sleep,
    RandomPress,
    GoBack,
} = require("./Global.js");

const CrucifixPos = {
    icon: [894, 20, 21, 31],
    recoverBtn: [99, 593, 196, 26],
    close: [346, 67, 38, 18],
    confirm: [672, 472, 138, 30],
    equipmentPage: [25, 234, 23, 52]
};

const CrucifixCheckPos = {
    icon: [880, 9, 47, 55],
    confirm: [698, 453, 55, 29]
};


const GetCoinArr = function ()
{
    const coin = ReadImg("crucifix_coin");
    const equipmentArr = images.matchTemplate(captureScreen(), coin, { region: [138, 138, 60, 401], threshold: 0.7 });
    coin.recycle();
    return equipmentArr.points;
};

const RecoverExp = () =>
{
    const crucifixIcon = ReadImg("crucifix");
    const hasCrucifix = findImage(captureScreen(), crucifixIcon, { region: CrucifixCheckPos.icon, threshold: 0.8 });
    if (hasCrucifix == null) return;

    RandomPress(CrucifixPos.icon);
    Sleep();
    const expArr = GetCoinArr();

    if (expArr.length == 0) return;
    else
    {
        for (let i = 0; i < expArr.length; i++)
        {
            RandomPress([expArr[i].x, expArr[i].y, random(-50, 180), random(-17, 26)]);
            Sleep(600, 1000);
        }
        RandomPress(CrucifixPos.recoverBtn);
        Sleep();
        const confirmBtn = ReadImg("crucifix_confirm");
        const hasConfirm = images.findImage(captureScreen(), confirmBtn, { region: CrucifixCheckPos.confirm, threshold: 0.8 });
        if (hasConfirm == null) return;
        RandomPress(CrucifixPos.confirm);
        confirmBtn.recycle();
        crucifixIcon.recycle();
    }
};

//恢复装备
const RecoverEquipment = () =>
{
    const hasTipPoint = images.findMultiColors(captureScreen(), "#bc2210", [[0, 2, "#c12616"], [-2, 2, "#c92617"], [3, 1, "#db3626"]]
        , { region: [33, 125, 40, 38], threshold: 20 });
    if (hasTipPoint == null) return false;

    RandomPress(CrucifixPos.equipmentPage);
    Sleep();
    const equipmentArr = GetCoinArr();
    if (equipmentArr.length == 0) return false;
    else
    {
        for (let i = 0; i < equipmentArr.length; i++)
        {
            RandomPress([equipmentArr[i].x, equipmentArr[i].y, random(-10, 180), random(-15, 25)]);
            Sleep(600, 1000);
        }
        Sleep();
        RandomPress(CrucifixPos.recoverBtn);
        Sleep(3000, 5000);
        RandomPress(CrucifixPos.confirm);
        return true;
    };
};

function CrucifixFlow() 
{
    RecoverExp();

    Sleep();

    const hasRecover = RecoverEquipment();
    Sleep();
    if (random(1) > 0.5) RandomPress(CrucifixPos.icon);
    else RandomPress(CrucifixPos.close);
    Sleep();
    return hasRecover;
    // if (hasRecover)
    // {
    //     RandomPress([1090, 20, 25, 15]);
    //     BackPack_EquipmentFlow();
    // }

};
// RandomPress([1090, 20, 25, 15]);
// BackPack_EquipmentFlow();
// CrucifixFlow();
module.exports = CrucifixFlow;
//38, 214, 33, 38   33,125,40,38
// const hasTipPoint = images.findMultiColors(captureScreen(), "#bc2210", [[0, 2, "#c12616"], [-2, 2, "#c92617"], [3, 1, "#db3626"]]
//     , { region: [33, 125, 40, 38], threshold: 20 });
// log(hasTipPoint);
// RecoverEquipment();
// log(GetCoinArr());
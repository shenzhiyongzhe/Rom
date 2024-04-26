
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
    close: [351, 66, 30, 20],
    confirm: [672, 472, 138, 30],
    equipmentPage: [25, 234, 23, 52]
};
const crucifixIconPos = [894, 21, 22, 28];
const recoverPos = [104, 594, 190, 25];
const closePos = [294, 68, 28, 14];
const centerConfirm = [667, 454, 113, 25];


const RecoverExp = () =>
{
    const crucifixIcon = ReadImg("crucifix");
    const hasCrucifix = findImage(captureScreen(), crucifixIcon, { region: [880, 9, 47, 55], threshold: 0.8 });
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
        const confirmBtn = ReadImg("confirm");
        const hasConfirm = images.findImage(captureScreen(), confirmBtn, { region: [698, 453, 55, 29], threshold: 0.8 });
        if (hasConfirm == null) return;
        RandomPress(CrucifixPos.confirm);
        confirmBtn.recycle();
        crucifixIcon.recycle();
    }
};
const CrucifixFlow = () =>
{
    RecoverExp();

    Sleep();

    RecoverEquipment();
    Sleep();
    if (random(1) > 0.5) RandomPress(CrucifixPos.icon);
    else RandomPress(CrucifixPos.close);

    Sleep();
    // if (hasRecover)
    // {
    //     RandomPress([1090, 20, 25, 15]);
    //     BackPack_EquipmentFlow();
    // }

};

const GetCoinArr = function ()
{
    const coin = ReadImg("crucifix_coin");
    const equipmentArr = images.matchTemplate(captureScreen(), coin, { region: [138, 138, 60, 401], threshold: 0.7 });
    coin.recycle();
    return equipmentArr.points;
};

const ExpFlow = (crucifixIcon) =>
{
    let hasCrucifix = findImage(captureScreen(), crucifixIcon, { region: [880, 9, 47, 55], threshold: 0.8 });
    for (let i = 0; i < 3; i++)
    {
        if (hasCrucifix) break;
        Sleep(1000);
        hasCrucifix = findImage(captureScreen(), crucifixIcon, { region: [880, 9, 47, 55], threshold: 0.7 });
    }

    if (hasCrucifix == null) return;

    RandomPress(CrucifixPos.icon);
    Sleep();
    let showCrucifixWindow = images.findMultiColors(captureScreen(), "#928878", [[-9, 6, "#b1aea1"], [7, 6, "#b4ad9c"],
    [-1, 14, "#c5bfb2"], [-1, 22, "#c5bbb0"]], { region: [49, 67, 49, 50], threshold: 12 });
    for (let i = 0; i < 10; i++)
    {
        if (showCrucifixWindow) break;
        Sleep(500);
        showCrucifixWindow = images.findMultiColors(captureScreen(), "#928878", [[-9, 6, "#b1aea1"], [7, 6, "#b4ad9c"],
        [-1, 14, "#c5bfb2"], [-1, 22, "#c5bbb0"]], { region: [49, 67, 49, 50], threshold: 12 });
    }

    if (showCrucifixWindow == null) return;

    const expArr = GetCoinArr();

    if (expArr.length == 0) return;
    else
    {
        for (let i = 0; i < expArr.length; i++)
        {
            RandomPress([expArr[i].x, expArr[i].y, random(-50, 180), random(-17, 26)]);
            Sleep(600, 1000);
        }
        RandomPress(recoverPos);
        Sleep();
        const confirmBtn = ReadImg("confirm");
        const hasConfirm = images.findImage(captureScreen(), confirmBtn, { region: [698, 453, 55, 29], threshold: 0.8 });
        if (hasConfirm == null) return;
        RandomPress(centerConfirm);
        confirmBtn.recycle();
    }
};

//装备
const RecoverEquipment = () =>
{
    const hasTipPoint = images.findMultiColors(captureScreen(), "#bc2210", [[0, 2, "#c12616"], [-2, 2, "#c92617"], [3, 1, "#db3626"]]
        , { region: [33, 125, 40, 38], threshold: 20 });
    if (hasTipPoint == null) return;

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
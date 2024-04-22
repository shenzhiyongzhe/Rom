
const {
    ReadImg,
    Sleep,
    RandomPress,
    GoBack,
} = require("./Global.js");

const crucifixIconPos = [894, 21, 22, 28];
const recoverPos = [87, 504, 162, 24];
const closePos = [294, 68, 28, 14];
const centerConfirm = [667, 454, 113, 25];
const equipmentPage = [23, 203, 25, 46];


const Flow = () =>
{
    const crucifixIcon = ReadImg("crucifix");

    ExpFlow(crucifixIcon);

    Sleep();

    EquipmentPageFlow();

    Sleep();
    if (random(1) > 0.5) RandomPress(crucifixIconPos);
    else RandomPress(closePos);

    crucifixIcon.recycle();
};

const GetCoinArr = function ()
{
    const coin = ReadImg("crucifix_coin");
    const equipmentArr = images.matchTemplate(captureScreen(), coin, { region: [118, 120, 38, 317], threshold: 0.8 });
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

    RandomPress(crucifixIconPos);
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
const EquipmentPageFlow = () =>
{
    const hasTipPoint = images.findMultiColors(captureScreen(), "#c44535", [[-2, 1, "#d55c4e"], [-2, 4, "#d12e1a"], [0, 4, "#c32718"], [3, 4, "#d93522"]]
        , { region: [31, 189, 34, 36], threshold: 12 });
    if (hasTipPoint == null) return;

    RandomPress(equipmentPage);
    Sleep();
    const equipmentArr = GetCoinArr();
    if (equipmentArr.length == 0) return;
    else
    {
        for (let i = 0; i < equipmentArr.length; i++)
        {
            RandomPress([equipmentArr[i].x, equipmentArr[i].y, random(-50, 180), random(-17, 26)]);
            Sleep(600, 1000);
        }
        Sleep(400, 600);
        RandomPress(recoverPos);
        Sleep();
        const confirmBtn = ReadImg("confirm");
        const hasConfirm = images.findImage(captureScreen(), confirmBtn, { region: [698, 453, 55, 29], threshold: 0.8 });
        if (hasConfirm == null) return;
        RandomPress(centerConfirm);
        confirmBtn.recycle();

    };
};
// Flow();
module.exports = Flow;


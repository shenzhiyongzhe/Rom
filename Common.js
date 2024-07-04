
const { ReadImg, Sleep, RandomPress, PressBlank, GoBack } = require("./Utils.js");

const MissionAwardFlow = function ()
{
    const hasAwards = images.findMultiColors(captureScreen(), "#b51f0d", [[-2, 2, "#c52314"], [2, 2, "#bc2416"], [0, 5, "#bd2a1b"]], { region: [1174, 2, 28, 28] });
    if (hasAwards == null) return;

    RandomPress([1154, 19, 37, 34]);
    Sleep(3000, 5000);
    RandomPress([539, 99, 84, 24]); //award page
    Sleep(2000, 3000);
    for (let i = 0; i < 5; i++)
    {
        let canContinousPress = images.findMultiColors(captureScreen(), "#353c30", [[95, 0, "#32392d"], [102, 13, "#2e362b"], [2, 13, "#272e23"]], { region: [1116, 140, 161, 65] });
        if (canContinousPress)
        {
            RandomPress([1140, 159, 113, 25]);
            PressBlank();
        }
        Sleep();
    }
    RandomPress([1158, 11, 115, 41]);
};

const AbilityPointsFlow = function ()
{
    console.log("AbilityPointsFlow");
    const AbilityPointCheck = images.findMultiColors(captureScreen(), "#bd220f", [[3, 0, "#bd2415"], [-1, 3, "#d62d1d"], [3, 3, "#bb2316"],],
        { region: [13, 4, 71, 31] });
    if (AbilityPointCheck == null) return;

    Sleep();
    RandomPress([14, 14, 50, 44]);
    Sleep(2000, 3000);
    const isMax = images.findMultiColors(captureScreen(), "#2d2e31", [[7, 0, "#757678"], [13, 0, "#757578"], [9, -5, "#757577"], [9, 3, "#747477"],
    [9, 11, "#292a2b"], [10, -8, "#2d2e31"], [9, 0, "#7e7f81"]], { region: [302, 273, 44, 42] });
    if (isMax)
    {
        RandomPress([314, 399, 21, 18]); //体力
    }
    else
    {
        RandomPress([318, 287, 15, 14]); //敏捷
    }

    Sleep();
    RandomPress([230, 510, 120, 20]);
    Sleep();
    if (random() > 0.5)
    {
        RandomPress([340, 71, 31, 13]);
    }
    else
    {
        RandomPress([22, 20, 47, 30]);
    }
    console.log("AbilityPointsFlow end");
};

const propCollectionPos = [1098, 121, 19, 27];
const propsLogin = [752, 610, 109, 23];
const progressAward = [1103, 252, 139, 27];
//道具图鉴flow
const FindTipPoint = function (shot, [x, y, w, h])
{
    return findMultiColors(
        shot,
        "#c62716",
        [[2, 0, "#c52615"], [2, 1, "#c22616"], [0, 2, "#d12a19"],],
        { region: [x, y, w, h], threshold: 12 }
    );
};
const FindAllTipPoint = function ()
{
    let shot = captureScreen();
    let points = [];
    for (let i = 0; i < 7; i++)
    {
        for (let j = 0; j < 4; j++)
        {
            let point = FindTipPoint(shot, [93 + j * 54, 140 + i * 70, 20, 20]);
            point && points.push(point);
        }
    }
    return points;
};
const canLogin = () =>
    images.findMultiColors(
        captureScreen(),
        "#3d4538", [[101, 1, "#383f34"], [98, 19, "#32392d"], [-5, 19, "#2e362a"],],
        { region: [728, 596, 155, 53] }
    );

const LoginProgressAward = function ()
{
    let shot = captureScreen();
    let point = images.findMultiColors(shot, "#a91b09", [[-3, 2, "#c42819"], [3, 2, "#cd2f21"], [0, 4, "#bf2616"]],
        { region: [1226, 233, 30, 39], threshold: 12 });

    if (point == null) return;

    RandomPress(progressAward);
    Sleep();
    shot = captureScreen();
    for (let i = 0; i < 5; i++)
    {
        let isgotAward = images.findMultiColors(shot, "#de6c09", [[1, 0, "#ed7208"], [2, 0, "#ed7208"], [4, 0, "#d96a09"]],
            { region: [1220, 314 + i * 51, 15, 26], threshold: 12 });
        if (isgotAward == null)
        {
            RandomPress([1222, 320 + i * 50, 10, 10]);

            Sleep();
            PressBlank();
            Sleep();
        };
    }

};

function FirstLoginCheck()
{
    const hasPropsCollection_loginConfirm = images.findMultiColors(captureScreen(), "#343434", [[-5, 12, "#313131"], [78, 5, "#2e3629"], [85, 18, "#2b3328"], [113, 5, "#2c3429"]],
        { region: [444, 419, 412, 86] });
    if (hasPropsCollection_loginConfirm)
    {
        RandomPress([582, 397, 13, 13]); // 关闭不再提示
        Sleep();
        RandomPress([666, 444, 150, 28]); //点击登录
        Sleep();
    }
}

const loginItem = function (points)
{
    for (let i = 0; i < points.length; i++)
    {
        let { x, y } = points[i];
        x = x + random(-35, 0);
        y = y + random(1, 35);
        press(x, y, random(100, 300));
        Sleep();
        FirstLoginCheck();
        if (canLogin())
        {
            RandomPress(propsLogin);
            Sleep(2000, 3000);
        }
    }
};
const PropsCollectionFlow = function ()
{
    console.log("道具图鉴");
    Sleep();
    RandomPress([1223, 18, 29, 32]); // 菜单栏图标
    Sleep();
    RandomPress(propCollectionPos);
    Sleep(4000, 5000);
    LoginProgressAward();
    let points = FindAllTipPoint();
    loginItem(points);

    for (let i = 0; i < 10; i++)
    {

        RandomPress([179, 97, 71, 26]);
        RandomPress([54, 100, 68, 23]);
        Sleep();
        points = FindAllTipPoint();
        if (points.length == 0) break;
        loginItem(points);
        Sleep();
    }

    GoBack();
    Sleep();
    console.log("道具图鉴结束");
};
module.exports = { AbilityPointsFlow, MissionAwardFlow, PropsCollectionFlow };




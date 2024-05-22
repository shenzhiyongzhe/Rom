const { game_config, Sleep, RandomPress, GoBack, ReadImg, PressBlank, } = require("./Global.js");

const { WearEquipment, DecomposeProps } = require("./BackPack.js");
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
    Sleep();
    WearEquipment();
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
    DecomposeProps();
    Sleep();

};
// PropsCollectionFlow();
// log(FindAllTipPoint());
module.exports = { PropsCollectionFlow };



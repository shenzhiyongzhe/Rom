const {
    Sleep,
    RandomPress,
    GoBack,
    posRef,
    ReadImg,
} = require("../Global.js");

const { BackPack_EquipmentFlow, DecomposeProps } = require("../BackPack.js");
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
            { region: [1215, 314 + i * 51, 15, 26], threshold: 12 });
        if (isgotAward == null)
        {
            press(1200 + random(-10, 10), 314 + i * 51 + random(-10, 10), random(30, 200));
            Sleep();
            RandomPress(posRef.blank);
            Sleep();
        };
    }

};
const PropsCollectionFlow = function ()
{
    RandomPress([1090, 20, 25, 15]); //背包图标
    Sleep(2000, 3000);
    BackPack_EquipmentFlow();
    Sleep();
    RandomPress([1223, 18, 29, 32]); // 菜单栏图标
    Sleep();
    RandomPress(propCollectionPos);
    Sleep(4000, 5000);
    LoginProgressAward();
    const points = FindAllTipPoint();
    const warningConfirm = ReadImg("propsCollection_warningConfirm");
    Sleep();
    if (points.length > 0)
    {
        for (let i = 0; i < points.length; i++)
        {
            let { x, y } = points[i];
            x = x + random(-35, 0);
            y = y + random(1, 35);
            press(x, y, random(100, 300));
            Sleep();
            if (canLogin())
            {
                RandomPress(propsLogin);
                Sleep(2000, 3000);
                const hasWarningTip = images.findImage(captureScreen(), warningConfirm, { threshold: 0.8, region: [496, 340, 43, 36] });
                if (hasWarningTip)
                {
                    RandomPress([582, 397, 13, 13]); // 关闭不再提示
                    Sleep();
                    RandomPress([666, 444, 150, 28]); //点击登录
                    Sleep();
                }

            }
        }
        warningConfirm.recycle();
        GoBack();
        Sleep();
        DecomposeProps();
        Sleep();
    }
    else
    {
        Sleep();
        GoBack();
        Sleep();
    }

};
// PropsCollectionFlow();
module.exports = PropsCollectionFlow;

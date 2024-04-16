const {
    Sleep,
    RandomPress,
    GoBack,
} = require("../Global.js");

const propCollectionPos = [1098, 121, 19, 27];
const propsLogin = [752, 610, 109, 23];
//道具图鉴flow
const FindTipPoint = function (shot, [x, y, w, h])
{
    return findMultiColors(
        shot,
        "#c62716",
        [
            [2, 0, "#c52615"],
            [2, 1, "#c22616"],
            [0, 2, "#d12a19"],
        ],
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
        "#3d4538",
        [
            [101, 1, "#383f34"],
            [98, 19, "#32392d"],
            [-5, 19, "#2e362a"],
        ],
        { region: [728, 596, 155, 53] }
    );
const Flow = function ()
{
    RandomPress(propCollectionPos);
    Sleep(2000, 3000);
    const points = FindAllTipPoint();

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
            }
        }
    }
    GoBack();
};
module.exports = Flow;

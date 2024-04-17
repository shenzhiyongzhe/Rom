const {
    ReadImg,
    Sleep,
    RandomPress,
    GoBack,
} = require("./Global.js");

const back = ReadImg("back");
const close = ReadImg("close");
const confirm = ReadImg("CN_confirm");
const version = ReadImg("version");

const Flow = function ()
{
    const shot = captureScreen();
    const existBack = images.findImage(shot, back, { region: [1183, 8, 90, 58] });
    const existClose = images.findImage(shot, close, { region: [780, 8, 488, 234] });
    const existConfirm = images.findImage(shot, confirm, { region: [371, 188, 557, 355] });
    if (existBack)
    {
        GoBack();
    }
    if (existClose)
    {
        RandomPress([existClose.x, existClose.y, 10, 10]);
    }
    if (existConfirm)
    {
        RandomPress([existConfirm.x - 20, existConfirm.y - 5, 20, 10]);
    }
    ReGetInGame(shot);
};
const ReGetInGame = function (shot)
{
    const isVersion = images.findImage(shot, version, {
        region: [1136, 14, 125, 45],
        threshold: 0.8,
    });
    const startGameBtn = ReadImg("startGameBtn");
    if (isVersion)
    {
        RandomPress([136, 63, 966, 500]);
        Sleep(3000, 5000);
        let isStart;
        while (!isStart)
        {
            isStart = images.findImage(captureScreen(), startGameBtn, {
                region: [1118, 634, 107, 67],
                threshold: 0.8,
            });
            if (isStart)
            {
                Sleep();
                let x = isStart.x + random(-40, 90);
                let y = isStart.y + random(-5, 10);
                press(x, y, random(100, 300));
                break;
            }
        }
    }

    startGameBtn.recycle();
};
module.exports = Flow;
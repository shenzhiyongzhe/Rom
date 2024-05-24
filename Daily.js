const { ReadImg, Sleep, RandomPress, GoBack, PressBlank, PressMenu, game_config } = require("./Global.js");
const DutyFlow = require("./Menu/Duty.js");


const overMaxNumber = () =>
{
    Sleep();
    const hasConfirm = images.findMultiColors(captureScreen(), "#3d4538", [[22, -1, "#3a4436"], [129, 1, "#373f33"], [126, 17, "#333a2e"], [15, 16, "#2f372b"]]
        , { region: [543, 425, 201, 64] });
    if (hasConfirm)
    {
        RandomPress([570, 443, 141, 26]);
        return true;
    }
    return false;
};

//每日签到检测
const SignInCheck = (shot) => images.findMultiColors(shot, "#ad2514", [[0, 2, "#c32513"], [0, 5, "#c32719"]], { region: [969, 527, 36, 43] });

//邮箱检测
const EmailCheck = (shot) => images.findMultiColors(shot, "#ad210f", [[0, 2, "#c42312"], [0, 5, "#c82818"]], { region: [1036, 529, 44, 43] });

//使命检查
const DutyCheck = (shot) => images.findMultiColors(shot, "#b72313", [[0, 2, "#bd2515"], [0, 4, "#be2417"]], { region: [1172, 175, 41, 45] });
const NoMoneyCheck = function ()
{
    Sleep();
    const isNoMoney = images.findMultiColors(captureScreen(), "#3d4538", [[121, 1, "#384033"], [143, 11, "#333b2f"], [4, 17, "#2b3428"]], { region: [658, 556, 209, 66] });
    if (isNoMoney == null) return false;
    else
    {
        console.log("No Money");
        if (random() > 0.5)
        {
            RandomPress([447, 580, 157, 21]);
        }
        else
        {
            RandomPress([958, 78, 32, 14]);
        }
        return true;
    }
};
/** 
*每日登录奖励领取
*/
const SignInFlow = function ()
{
    RandomPress([961, 555, 26, 30]);
    Sleep(2000, 4000);
    const shot = captureScreen();
    let hasTipPoint, hasTipPoint2, canGetAward, isCurPage;
    for (let i = 0; i < 4; i++)
    {
        Sleep();
        hasTipPoint = images.findMultiColors(shot, "#b02c1c", [[0, 3, "#bc2213"], [0, 5, "#c02619"]], { region: [130 + 162 * i, 77, 100, 40] });
        hasTipPoint2 = images.findMultiColors(shot, "#ba2414", [[0, 2, "#bc2213"], [0, 4, "#c02619"]], { region: [130 + 162 * i, 77, 100, 40] });
        isCurPage = images.findMultiColors(captureScreen(), "#c38e4d", [[13, 0, "#d29950"], [20, 0, "#d49a50"], [30, 0, "#d59a4f"]], { region: [40 + 162 * i, 120, 140, 15] });
        if (hasTipPoint || hasTipPoint2)
        {
            if (isCurPage == null)
            {
                RandomPress([hasTipPoint.x - 110, hasTipPoint.y, 120, 15]);
                Sleep(2000, 4000);
            }
            Sleep();
            canGetAward = images.findMultiColors(captureScreen(), "#3c4538", [[14, 16, "#2e362a"], [131, 15, "#353c30"], [160, -1, "#c62414"], [160, 20, "#2c3328"]], { region: [1020, 547, 230, 85] });
            if (canGetAward)
            {
                RandomPress([1051, 570, 160, 31]);
                overMaxNumber();
            }
        }
    }
    GoBack();
};

/**
 * 邮件奖励领取
*/
const EmailFlow = function ()
{
    RandomPress([1024, 556, 31, 22]);
    Sleep(2000, 4000);
    const shot = captureScreen();
    let hasTipPoint, canGetAward, isCurPage;
    for (let i = 0; i < 4; i++)
    {
        Sleep();
        hasTipPoint = images.findMultiColors(shot, "#c02914", [[0, 1, "#c12411"], [0, 4, "#c22718"]], { region: [100 + 125 * i, 80, 100, 40] });
        isCurPage = images.findMultiColors(captureScreen(), "#cb9f63", [[4, 0, "#d0a262"], [10, 0, "#d8a867"], [21, 0, "#dca966"]], { region: [30 + 125 * i, 115, 140, 15] });
        if (hasTipPoint)
        {
            if (!isCurPage)
            {
                RandomPress([hasTipPoint.x - 110, hasTipPoint.y, 120, 15]);
                Sleep(2000, 4000);
            }
            Sleep();
            canGetAward = images.findMultiColors(captureScreen(), "#3b4436", [[5, 19, "#2b3428"], [118, 9, "#373f32"], [136, 28, "#2e362a"]], { region: [1044, 635, 214, 77] });
            if (canGetAward)
            {
                RandomPress([1078, 659, 154, 33]);
                Sleep(2000, 3000);
                let isOverMax = overMaxNumber();
                if (isOverMax == false) PressBlank();
                log("get award");
            }
        }
        else break;

    }
    GoBack();
};


/**
 *---------------------------------商城购买----------------------------
 *
 */
const PressMax = () => RandomPress([765, 412, 45, 27]);
const PressConfirm = () => RandomPress([686, 578, 151, 24]);

const DaliyCall = () =>
{
    RandomPress([167, 96, 80, 33]); // 召唤页
    Sleep();
    RandomPress([18, 270, 171, 39]); //每日召唤page
    Sleep();
    const shot = captureScreen();
    for (let i = 0; i < 2; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            let isUnlock = images.findMultiColors(shot, "#333736", [[3, 14, "#323633"], [192, 6, "#272b28"], [204, 22, "#313633"], [198, 29, "#1a1f1e"]],
                { region: [200 + j * 286, 254 + i * 288, 308, 68] });
            if (isUnlock == null)
            {
                RandomPress([284 + j * 286, 188 + i * 288, 147, 152]);
                PressConfirm();
                let isNoMoney = NoMoneyCheck();
                if (isNoMoney == true) return;
                Sleep(4000, 6000);
                RandomPress([554, 640, 174, 25]);
                Sleep(2000, 3000);
                RandomPress([554, 640, 174, 25]);
                Sleep();
            }

        }
    }
};

const ShopFlow = function ()
{
    let isNoMoney = false;
    RandomPress([955, 19, 35, 30]); // 商城
    Sleep();
    RandomPress([296, 98, 72, 28]); //第三页 普通页
    RandomPress([17, 211, 173, 37]); // 强化卷轴页
    // 购买防御卷轴
    RandomPress([817, 159, 224, 243]);
    PressMax();
    PressConfirm();
    Sleep();
    isNoMoney = NoMoneyCheck();
    if (isNoMoney == true)
    {
        GoBack();
        return;
    }
    // 购买武器卷轴
    RandomPress([537, 443, 201, 241]);
    PressMax();
    PressConfirm(); //确定
    Sleep();
    isNoMoney = NoMoneyCheck();
    if (isNoMoney == true)
    {
        GoBack();
        return;
    }
    //购买装备宝箱
    // RandomPress([821, 439, 186, 241]);
    // PressMax();
    // PressConfirm(); //确定
    // Sleep();
    // NoMoneyCheck();
    //购买水晶宝箱
    // RandomPress([417, 96, 79, 33]);
    // RandomPress([18, 209, 171, 39]);
    // RandomPress([255, 223, 186, 394]);
    // PressMax();
    // PressConfirm(); //确定
    // Sleep();
    // NoMoneyCheck();
    //每日召唤
    // DaliyCall();
    // Sleep();
    GoBack();
};
function Daily()
{
    const menuIcon = ReadImg("menu_icon");
    let shot = captureScreen();

    const hasMenu = images.findImage(shot, menuIcon, { region: [1203, 1, 70, 65] });
    if (hasMenu == null) return;
    const hasMenuTipPoint = images.findMultiColors(shot, "#b52110", [[0, 3, "#c22516"], [0, 5, "#c32b1c"]], { region: [1236, 3, 32, 25] });
    if (hasMenuTipPoint == null) return;
    PressMenu();
    Sleep(3000, 5000);
    shot = captureScreen();
    const hasGetSignIn = SignInCheck(shot);
    const hasGetEmail = EmailCheck(shot);

    if (hasGetSignIn)
    {
        Sleep();
        SignInFlow();
        Sleep();
        ShopFlow();
        PressMenu();
        const hasDuty = DutyCheck(captureScreen());
        if (hasDuty != null)
        {
            Sleep();
            DutyFlow();
        }
        else PressMenu();
        return;
    }

    if (hasGetEmail) EmailFlow();
    else PressMenu();
}


module.exports = { Daily };
// SignInFlow();
// EmailFlow();
// ShopFlow();
// MenuCheck(captureScreen()) && console.log("Menu Check");
// Daily();
// DaliyCall();
// log(EmailCheck(captureScreen()));
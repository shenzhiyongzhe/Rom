const { ReadImg, Sleep, RandomPress, GoBack, PressBlank, PressMenu } = require("./Global.js");


const overMaxNumber = () =>
{
    const confirm = ReadImg("mainStory_confirm");
    const hasConfirm = images.findImage(captureScreen(), confirm, { region: [595, 426, 90, 63] });
    if (hasConfirm) RandomPress([570, 443, 141, 26]);
    confirm.recycle();
};

/**
 * 邮件奖励领取
*/
const EmailFlow = function ()
{
    PressMenu();
    RandomPress([1025, 475, 25, 10]);
    Sleep();
    const shot = captureScreen();
    const accountPage = images.findMultiColors(
        shot,
        "#b4301a", [[-4, 3, "#d8382d"], [-1, 3, "#c52412"], [2, 3, "#c72818"], [0, 5, "#c62717"],],
        { region: [105, 76, 45, 50], threshold: 12 }
    );
    const characterPage = images.findMultiColors(
        shot,
        "#b4301a", [[-4, 3, "#d8382d"], [-1, 3, "#c52412"], [2, 3, "#c72818"], [0, 5, "#c62717"],],
        { region: [204, 86, 80, 39], threshold: 12 }
    );
    if (accountPage)
    {
        RandomPress([1070, 660, 160, 25]);
        Sleep(1500, 2500);
        overMaxNumber();
        PressBlank();
        Sleep();
        if (characterPage == null) GoBack();
    }
    if (characterPage)
    {
        RandomPress([170, 99, 58, 30]);
        RandomPress([1070, 660, 160, 25]);
        Sleep(1500, 2500);
        overMaxNumber();
        PressBlank();
    }
    Sleep();
    GoBack();
};

/** 
*每日登录奖励领取
*/
const SignInFlow = function ()
{
    PressMenu();
    RandomPress([960, 468, 20, 32]);
    Sleep();
    const shot = captureScreen();
    const isGreen = images.findMultiColors(shot, "#c02312", [[-3, 1, "#d42b1e"], [0, 4, "#b42416"], [4, 2, "#b62b1c"],], { region: [147, 71, 45, 48], threshold: 12 });
    const isCharacter = images.findMultiColors(shot, "#c02312", [[-3, 1, "#d42b1e"], [0, 4, "#b42416"], [4, 2, "#b62b1c"],], { region: [318, 76, 35, 38], threshold: 12 });
    const kate = images.findMultiColors(shot, "#b42d1a", [[-4, 2, "#ce2723"], [-1, 2, "#c62612"], [3, 2, "#d12c1c"], [0, 5, "#bd2517"],], { region: [478, 77, 49, 37], threshold: 12 });
    for (let i = 0; i < 3; i++)
    {
        if (isGreen == null && isCharacter == null && kate == null)
        {
            shot = captureScreen();
            Sleep(1000, 2000);
        }
        else break;
    }

    if (isGreen)
    {
        RandomPress([1050, 570, 150, 30]);
        Sleep();
        if (isCharacter == null && kate == null) GoBack();
    }
    Sleep();

    if (isCharacter)
    {
        RandomPress([210, 100, 100, 15]);
        Sleep(2000, 2500);
        RandomPress([1050, 570, 150, 30]);
        Sleep(2000, 4000);
        overMaxNumber();
        if (kate == null) GoBack();
    }

    if (kate)
    {
        RandomPress([386, 100, 88, 21]);
        Sleep();
        RandomPress([1050, 570, 150, 30]);
        Sleep(2000, 4000);
        overMaxNumber();
        GoBack();
    }
};

/**
 *---------------------------------商城购买----------------------------
 *
 */
const PressMax = () => RandomPress([765, 412, 45, 27]);
const PressConfirm = () => RandomPress([686, 578, 151, 24]);

const DaliyCall = () =>
{
    RandomPress([167, 96, 80, 33]);
    Sleep();
    RandomPress([18, 270, 171, 39]);
};

const DailyShopFlow = function ()
{
    RandomPress([955, 19, 35, 30]); // 商城
    Sleep();
    RandomPress([296, 98, 72, 28]); //第三页 普通页
    RandomPress([17, 211, 173, 37]); // 强化卷轴页
    // 购买防御卷轴
    RandomPress([817, 159, 224, 243]);
    PressMax();
    PressConfirm();
    Sleep();
    // 购买武器卷轴
    RandomPress([537, 443, 201, 241]);
    PressMax();
    PressConfirm(); //确定
    Sleep();

    //购买水晶宝箱
    RandomPress([417, 96, 79, 33]);
    RandomPress([18, 209, 171, 39]);
    RandomPress([255, 223, 186, 394]);
    PressMax();
    PressConfirm(); //确定
    Sleep();
    GoBack();
};
function DailyCheck()
{
    console.log("Daily Check");
    EmailFlow();
    Sleep();
    SignInFlow();

}

// EmailFlow();
// SignInFlow();
DailyShopFlow();
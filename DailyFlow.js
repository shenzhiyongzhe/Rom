const { ReadImg, Sleep, RandomPress, GoBack, PressBlank, PressMenu, game_config } = require("./Global.js");
const DutyFlow = require("./Menu/Duty.js");


const overMaxNumber = () =>
{
    const confirm = ReadImg("mainStory_confirm");
    const hasConfirm = images.findImage(captureScreen(), confirm, { region: [595, 426, 90, 63] });
    if (hasConfirm) RandomPress([570, 443, 141, 26]);
    confirm.recycle();
};
//菜单小红点检查
const MenuCheck = (shot) => images.findMultiColors(shot, "#b8200c", [[0, 3, "#d72a19"], [2, 3, "#b72215"], [1, 5, "#c22b1c"]], { region: [1237, 2, 32, 28] });
//每日签到检测
const SignInCheck = (shot) => images.findMultiColors(shot, "#d8564a", [[4, 1, "#c82819"], [0, 2, "#c82117"], [4, 2, "#c52719"],], { region: [952, 446, 56, 49] });

//邮箱检测
const EmailCheck = (shot) => images.findMultiColors(shot, "#ca6054", [[-2, 3, "#ca291d"], [2, 3, "#cb2818"], [2, 7, "#d33120"],], { region: [1018, 449, 59, 41] });

//使命检查
const DutyCheck = (shot) => images.findMultiColors(shot, "#c33522", [[-2, 2, "#c92419"], [3, 2, "#d92d1c"], [0, 5, "#ba2516"],], { region: [1169, 180, 44, 37] });

/**
 * 邮件奖励领取
*/
const EmailFlow = function ()
{
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
    RandomPress([167, 96, 80, 33]); // 召唤页
    Sleep();
    RandomPress([18, 270, 171, 39]); //每日召唤
};
const NoMoneyCheck = function ()
{
    Sleep();
    const isNoMoney = images.findMultiColors(captureScreen(), "#3d4538", [[121, 1, "#384033"], [143, 11, "#333b2f"], [4, 17, "#2b3428"]], { region: [658, 556, 209, 66] });
    if (isNoMoney == null) return;
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
    }
};
const ShopFlow = function ()
{
    RandomPress([955, 19, 35, 30]); // 商城
    Sleep();
    RandomPress([296, 98, 72, 28]); //第三页 普通页
    RandomPress([17, 211, 173, 37]); // 强化卷轴页
    // 购买回城卷轴
    RandomPress([534, 159, 217, 240]);
    RandomPress([858, 415, 19, 24]); // 计算器图标
    const numberArr = [[652, 237, 42, 41], [529, 306, 41, 37], [591, 305, 41, 41], [653, 305, 41, 41], [531, 373, 39, 40], [591, 374, 41, 36], [653, 371, 39, 42]];
    const number = Math.floor(Math.random() * numberArr.length);
    RandomPress(numberArr[number]);
    RandomPress([663, 509, 91, 28]);
    PressConfirm(); //确定
    Sleep();
    NoMoneyCheck();
    // 购买防御卷轴
    RandomPress([817, 159, 224, 243]);
    PressMax();
    PressConfirm();
    Sleep();
    NoMoneyCheck();
    // 购买武器卷轴
    // RandomPress([537, 443, 201, 241]);
    // PressMax();
    // PressConfirm(); //确定
    // Sleep();
    // NoMoneyCheck();
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
function DailyFlow()
{
    const hasMenu = MenuCheck(captureScreen());
    if (hasMenu == null) return true;

    console.log("Daily Flow Start! get email and signin reward");
    PressMenu();
    Sleep();
    const shot = captureScreen();
    const hasGetSignIn = SignInCheck(shot);
    const hasGetEmail = EmailCheck(shot);
    const hasDuty = DutyCheck(shot);
    if (hasGetSignIn != null)
    {
        console.log("Get SignIn Reward");
        SignInFlow();
        if (hasDuty != null)
        {
            console.log("Get Duty Reward");
            PressMenu();
            DutyFlow();
        }
    }

    if (hasGetSignIn == null && hasGetEmail != null)
    {
        Sleep();
        EmailFlow();
        Sleep();
        ShopFlow();
    }
    else if (hasGetSignIn != null && hasGetEmail != null)
    {
        PressMenu();
        Sleep();
        EmailFlow();
        Sleep();
        ShopFlow();
    }
    if (hasGetEmail == null && hasGetSignIn == null)
    {
        if (game_config.ui.gameMode == "mainStory")
        {
            PressMenu();
            return false;
        }
        else if (game_config.ui.gameMode == "daily")
        {
            return false;
        }
    }
}


module.exports = { DailyFlow };
// EmailFlow();
// SignInFlow();
// ShopFlow();
// MenuCheck(captureScreen()) && console.log("Menu Check");
// DailyFlow();
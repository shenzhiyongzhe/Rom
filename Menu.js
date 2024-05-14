const {
    ReadImg,
    Sleep,
    RandomPress,
    GoBack,
    CharacterIdentity,
} = require("./Global.js");

const CraftFlow = require("./Menu/Craft.js");
const DutyFlow = require("./Menu/Duty.js");
const PropsCollectionFlow = require("./Menu/PropsCollection.js");
const WearSlabStone = require("./Menu/SlabStone.js");
//每日签到检测
const SignInCheck = (shot) => images.findMultiColors(shot, "#d8564a", [[4, 1, "#c82819"], [0, 2, "#c82117"], [4, 2, "#c52719"],], { region: [952, 446, 56, 49] });

//邮箱检测
const EmailCheck = (shot) => images.findMultiColors(shot, "#ca6054", [[-2, 3, "#ca291d"], [2, 3, "#cb2818"], [2, 7, "#d33120"],], { region: [1018, 449, 59, 41] });

//道具图鉴检测
const PropCollectionCheck = (shot) => images.findMultiColors(shot, "#bb3221", [[-4, 2, "#e22f2b"], [0, 2, "#cb2816"], [-2, 6, "#c02a19"], [2, 5, "#c12718"],], { region: [1085, 99, 59, 45] });

//使命检查
const DutyCheck = (shot) => images.findMultiColors(shot, "#c33522", [[-2, 2, "#c92419"], [3, 2, "#d92d1c"], [0, 5, "#ba2516"],], { region: [1169, 180, 44, 37] });

//制造小红点检查
const CraftCheck = (shot) => images.findMultiColors(shot, "#b72e1b", [[-4, 3, "#db2e1c"], [1, 3, "#c02517"], [4, 3, "#cf3324"], [0, 5, "#be2618"],], { region: [971, 178, 35, 37] });

const SuitCheck = (shot) => images.findMultiColors(shot, "#c92613", [[2, 0, "#d0291a"], [1, 2, "#c72718"]], { region: [969, 99, 37, 40] });
const FollowerCheck = (shot) => images.findMultiColors(shot, "#b52313", [[-3, 2, "#c12416"], [0, 2, "#c52718"], [-1, 4, "#ba2517"]], { region: [1034, 93, 45, 43] });

const MenuFlow = function ()
{
    RandomPress([1226, 20, 25, 24]);
    const shot = captureScreen();
    Sleep(100, 300);
    const isSignIn = SignInCheck(shot);
    const isEmail = EmailCheck(shot);
    const isCollectionPage = PropCollectionCheck(shot);
    const isDuty = DutyCheck(shot);
    const isCraft = CraftCheck(shot);
    const isSuit = SuitCheck(shot);
    const isFollower = FollowerCheck(shot);


    if (isCollectionPage)
    {
        PropsCollectionFlow();
    } else if (isDuty)
    {
        DutyFlow();
    } else if (isCraft)
    {
        CraftFlow();
    }
    else if (isSuit)
    {
        WearSlabStone("suit");
    }
    else if (isFollower)
    {
        WearSlabStone("follower");
    }
};

module.exports = MenuFlow;
// Flow();
// log(SuitCheck(captureScreen()));
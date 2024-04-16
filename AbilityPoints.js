const {
    imgRef,
    posRef,
    Player,
    ReadImg,
    Sleep,
    RandomClick,
    RandomPress,
    GoBack,
} = require("./Global.js");

const CharacterIdentity = function ()
{
    const acter = ReadImg("archer");
    if (images.findImage(captureScreen(), acter)) Player.profession = "archer";
    else Player.profession = "wizard";
    acter.recycle();
};
//升级属性点数
const Flow = function ()
{
    CharacterIdentity();
    Sleep(600, 1500);
    RandomClick(posRef.skillPoint);
    Sleep(1000, 1500);
    if (Player.profession == "archer")
    {
        RandomPress(posRef.skillPoint_swift); //游侠 敏捷
    } else if (Player.profession == "wizard")
    {
        RandomPress(posRef.skillPoint_wisedom); // 法师 智力
    }

    Sleep(600, 1500);
    RandomPress(posRef.skillConfirm);
    Sleep(600, 1500);
    RandomClick(posRef.skillClose);
};
module.exports = Flow;
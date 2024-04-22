"ui";
const UI = require("./UI.js");
UI();


const {
    imgRef,
    posRef,
    Player,
    ReadImg,
    Sleep,
    RandomPress,
    GoBack,
} = require("./Global.js");
const {
    DeathCheck,
    AbilityPointCheck,
    MissionCheck,
    MenuCheck,
    BackPackCheck,
} = require("./Check.js");
const AbilityPointsFlow = require("./AbilityPoints.js");



const MainStoryFlow = require("./MainStory.js");
const MissionFlow = require("./Mission.js");
const MenuFlow = require("./Menu.js");
const BackPackFlow = require("./BackPack.js");
const DeathFlow = require("./Death.js");
const ExceptionCatch = require("./Exception.js");

const Check = function ()
{
    let shot = images.captureScreen();
    MainStoryFlow();
    Sleep();
    DeathCheck(shot) && DeathFlow();
    Sleep();
    AbilityPointCheck(shot) && AbilityPointsFlow();
    Sleep();
    MissionCheck(shot) && MissionFlow();
    Sleep();
    MenuCheck(shot) && MenuFlow();
    Sleep();
    BackPackCheck(shot) && BackPackFlow();
    Sleep();
    ExceptionCatch();
    // toast("Checking.....");
};

const Main = function ()
{
    threads.start(function ()
    {
        setInterval(() =>
        {
            Check();
        }, 2000);

    });
};
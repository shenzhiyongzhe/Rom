
const { MainStoryFlow } = require("./MainStory");
const { InstanceCheck } = require("./Instance.js");
const { ExceptionCheck } = require("./Exception.js");
const { DeathCheck } = require("./Death.js");


const Check = function (gameMode)
{
    const shot = images.captureScreen();
    if (gameMode == "mainStory")
    {
        MainStoryFlow(shot);
    }
    else if (gameMode == "instance")
    {
        InstanceCheck(shot);
    }
    else if (gameMode == "delegate")
    {
        // DelegateFlow(shot)
        console.log("DelegateFlow");
    }
    ExceptionCheck(shot);
    DeathCheck(shot);

};

module.exports = Check;

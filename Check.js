
const { MainStory } = require("./MainStory");
const { InstanceCheck } = require("./Instance.js");
const { ExceptionCheck } = require("./Exception.js");
const { DeathCheck } = require("./Death.js");


const Check = function (gameMode)
{
    if (gameMode == "mainStory")
    {
        MainStory();
    }
    else if (gameMode == "instance")
    {
        InstanceCheck();
    }
    else if (gameMode == "delegate")
    {
        // DelegateFlow(shot)
        console.log("DelegateFlow");
    }
    // ExceptionCheck(shot);
    // DeathCheck(shot);

};

module.exports = Check;

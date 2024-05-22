
const { MainStory } = require("./MainStory");
const { InstanceCheck } = require("./Instance.js");
const { Exception } = require("./Exception.js");



const Check = function (gameMode)
{
    Exception();

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
};

module.exports = Check;

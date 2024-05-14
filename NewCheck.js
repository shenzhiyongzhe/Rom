const { Sleep } = require("./Global.js");

const GameTime = {
    startTime: '',
    currentTime: ''
};

GameTime.startTime = new Date().getTime();

setInterval(() =>
{
    GameTime.currentTime = new Date().getTime();
}, 1000);

// Daily Check Function


// 长间隔检查函数

function LongIntervalCheck()
{
    // 长间隔检查代码
    console.log("长间隔检查");

}
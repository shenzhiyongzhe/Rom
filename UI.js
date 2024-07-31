const { game_config } = require("./RomConfig");
const initialSetting = {
    "ui": {
        "gameMode": "mainStory",
        "isBeginner": false,
        "isRandomServer": false,
        "instanceQueue": [],
    },
    "setting": {
        "date": 0,
        "hasDailyBuy": false,
        "hasFinishedDelegate": false,
        "deathTimes": 0,
        "reset": false
    },
    "trade": {
        "monthlyIncome": 0,
        "priceList": [],
    }
};
let isRunning = false;

function StartScript(data)
{
    if (isRunning == true)
    {
        console.log("结束");
        java.lang.System.exit(0);
        // engines.stopAllAndToast();
        // exit();
    }
    else if (isRunning == false)
    {
        threads.start(function ()
        {
            isRunning = true;
            auto();
            images.requestScreenCapture(true);
            app.launch("com.kakaogames.rom");
            console.log(data);
            Main(data);
        }
        );
    }
}

const UpdateScript = function ()
{
    threads.start(function ()
    {
        console.log("start update scripte:");
        const url = "http://10.6.130.129:82/Rom.apk";
        const apkUrl = "/sdcard/Rom/Rom.apk";
        let r = http.client().newCall(
            http.buildRequest(url, {
                method: "GET",
            })
        ).execute();
        files.createWithDirs("/sdcard/Rom/");
        let fs = new java.io.FileOutputStream(apkUrl);

        let is = r.body().byteStream();
        const buffer = util.java.array("byte", 1024);
        let byteRead; //每次读取的byte数
        while ((byteRead = is.read(buffer)) != -1)
        {
            fs.write(buffer, 0, byteRead); //读取
        }
        if (files.exists(apkUrl))
        {
            app.viewFile(apkUrl);
            sleep(400);
            click(580, 765);
            // sleep(2000);
            // click(580, 765);
        } else
        {
            toastLog('下载失败');
        }
    });
};

const UI = () =>
{
    ui.layout(`
    <vertical>
        <webview id="web" h="*"/>
    </vertical>`);

    ui.web.loadUrl("file://" + files.path("./UI/ui.html"));

    if (game_config.setting.reset == undefined)
    {
        const path = "/sdcard/Rom/game_config.json";
        files.write(path, JSON.stringify(initialSetting));
    }
    ui.web.jsBridge.registerHandler("WebToAndroid", (data, callBack) =>
    {
        StartScript(data);
        setTimeout(() =>
        {
            //回调web
            callBack("successful");
        }, 1000);
    });

    ui.web.jsBridge.registerHandler("updateScript", (data, callBack) =>
    {
        UpdateScript();
        callBack("successful");
    });
    ui.web.jsBridge.registerHandler("reset", (data, callBack) =>
    {
        const path = "/sdcard/Rom/game_config.json";
        toastLog(data + " successful");

        files.write(path, JSON.stringify(initialSetting));

        callBack("reset successful");
    });

    //定时器中等待web加载完成
    setTimeout(() =>
    {
        ui.web.jsBridge.callHandler('InitUIData', JSON.stringify(game_config), (data) =>
        {
            toastLog("更新数据成功");
        });
        const config = files.read("/sdcard/Rom/game_config.json");
        const logFile = files.read("/sdcard/Rom/rom-log.txt");
        ui.web.jsBridge.callHandler("getConfigFile", config, (data) =>
        {
            toastLog("获取配置成功");
        }
        );
        ui.web.jsBridge.callHandler("getLogFile", logFile, (data) =>
        {
            toastLog("获取日志成功");
        }
        );
        ui.run(function ()
        {
            floaty_window.monthlyIncome.setText(`${game_config.trade.monthlyIncome}`);
        });
    }, 1000);
};
module.exports = UI;
// UI();
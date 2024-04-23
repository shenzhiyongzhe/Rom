"ui";
let isRunning = false;
const UI = () =>
{
    ui.layout(
        <vertical bg="#fffbe8">
            <button id="start" text="开始" textSize="20sp" bg="#96c996" />
            <horizontal>
                <text text="操作延迟（单位毫秒）" />
                <input number="true" hint="默认1000 2000" />
                <button text="普通的按钮" />
            </horizontal>
            <button id="stop" text="结束" />
        </vertical>
    );
    console.setGlobalLogConfig({
        "file": "/sdcard/脚本/log/rom-log.txt",
        "maxFileSize": 5120 * 1024,
        "maxBackupSize": 10,
        "filePattern": "%d{dd日}%m%n"
    });

    ui.start.click(() =>
    {
        if (isRunning == true)
        {
            toast("脚本已经在运行中...");
            console.log("js脚本已经在运行中...");
            return;
        };
        toast("脚本开始运行...");
        console.log("运行中...");
        threads.start(function ()
        {
            try
            {
                auto();
                images.requestScreenCapture(true);

                isRunning = true;
                ui.start.attr("bg", "#a5a7a6");
                ui.start.setText("正在运行中...");
                Main();

            }
            catch (e)
            {
                console.log(e);
            }
        }
        );

    });
    ui.stop.click(function ()
    {
        console.log("结束");
        // threads.shutDownAll();
        // engines.stopAll();
        engines.stopAllAndToast();
        // java.lang.System.exit(0);
    });
}
    ;
module.exports = UI;
// UI();
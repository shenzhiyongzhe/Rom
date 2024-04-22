
const UI = () =>
{
    ui.layout(
        <vertical bg="#fffbe8">
            <button id="start" text="开始" textSize="20sp" />
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
        console.log("开始");
        threads.start(function ()
        {
            try
            {
                auto();
                images.requestScreenCapture(true);
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
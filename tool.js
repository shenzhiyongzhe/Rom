
const GetCaptureScreenPermission = () =>
{
    requestScreenCapture(true);
    const img = captureScreen();
    toast(img.getWidth() + " X " + img.getHeight());
};
GetCaptureScreenPermission();

//adb pull /sdcard/脚本/RomProj/build/Rom_v1.0.0703.apk  C:/nginx/Rom/Rom.apk
// test 1 ip:  10.240.130.213
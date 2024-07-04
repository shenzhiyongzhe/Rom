
const GetCaptureScreenPermission = () =>
{
    requestScreenCapture(true);
    const img = captureScreen();
    log(img.getWidth(), img.getHeight());
};
GetCaptureScreenPermission();
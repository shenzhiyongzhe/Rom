"ui";
ui.layout(`
    <vertical>
        <webview id="web" h="*"/>
    </vertical>`);

ui.web.loadUrl("file://" + files.path("ui.html"));
ObjC.import('stdlib');
ObjC.import('AppKit');
ObjC.import('Foundation');
exports.alert = function (text, informationalText) {
    var options = {}
    if (informationalText) options.message = informationalText
    app.displayAlert(text, options)
}
exports.confirm = function (text) {
    try {
        app.displayDialog(text)
        return true
    } catch (e) {
        return false
    }
}
//!/usr/bin/env osascript -l JavaScript
exports.evaluateFile = function () {

    var fm = $.NSFileManager.defaultManager;
    var contents = fm.contentsAtPath(path.toString()); // NSData
    contents = $.NSString.alloc.initWithDataEncoding(contents, $.NSUTF8StringEncoding);

    eval(ObjC.unwrap(contents));
}
exports.prompt = function prompt(text, defaultAnswer) {
    var options = {defaultAnswer: defaultAnswer || ''};
    try {
        return app.displayDialog(text, options).textReturned;
    } catch (e) {
        return null;
    }
};

exports.fileContent = function (path) {
    var fm = $.NSFileManager.defaultManager;
    var contents = fm.contentsOfDirectoryAtPathError(path, null);
    var files = ObjC.unwrap(contents).map(function (oItem) {
        return ObjC.unwrap(oItem);
    });
};
exports.bundleId = function (name) {
    return Application(name).id();
};

// Look for iTunes

exports.isRunning = function (app) {
    var id = typeof app === "string" ? exports.bundleId(app) : app.id();
    var isRunning = false;
    var apps = $.NSWorkspace.sharedWorkspace.runningApplications; // Note these never take () unless they have arguments
    apps = ObjC.unwrap(apps); // Unwrap the NSArray instance to a normal JS array
    var app, itunes;
    for (var i = 0, j = apps.length; i < j; i++) {
        app = apps[i];

        // Another option for comparison is to unwrap app.bundleIdentifier
        // ObjC.unwrap(app.bundleIdentifier) === 'org.whatever.Name'

        // Some applications do not have a bundleIdentifier as an NSString
        if (typeof app.bundleIdentifier.isEqualToString === 'undefined') {
            continue;
        }

        if (app.bundleIdentifier.isEqualToString(id)) {
            return true;
        }
    }
    return false

};
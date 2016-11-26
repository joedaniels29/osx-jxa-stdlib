//!/usr/bin/env osascript -l JavaScript
//https://closure-compiler.appspot.com/home

ObjC.import('Foundation');

//needs to be global in this case! think of this as private api for includes.scpt
var require = function (path) {
        var fm = $.NSFileManager.defaultManager;
        path = path.toString();
        path = path.endsWith('.js') ?  path : path + '.js';
        var contents = fm.contentsAtPath(path); // NSData
        contents = $.NSString.alloc.initWithDataEncoding(contents, $.NSUTF8StringEncoding);

        var module = {exports: {}};
        var exports = module.exports;
        eval(ObjC.unwrap(contents));

        return module.exports;
};
function requireLibrary(name){
    var ppath = "/Users/Joe/Library/Script Libraries/";
    console.log('ppath');
    return require(ppath + name)
}
function requireStdio(){
    return Object.assign(
        requireLibrary("stdio")
    )
}
JsOsaDAS1.001.00bplist00�Vscript_�ObjC.import('Foundation');

var path = "/Users/Joe/Library/Script Libraries/"
// debugger;
//bootstrap require... its basically the same file.
var fm = $.NSFileManager.defaultManager;
var contents = fm.contentsAtPath((path + "require.js")); // NSData
contents = $.NSString.alloc.initWithDataEncoding(contents, $.NSUTF8StringEncoding);
//


eval(ObjC.unwrap(contents));
// function run(argv) {
//     console.log(JSON.stringify(argv))
// }

//console.log(require)                              �jscr  ��ޭ
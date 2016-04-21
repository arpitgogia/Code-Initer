// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var workspace = vscode.workspace;
var window = vscode.window;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "code-initer" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var initialise = vscode.commands.registerCommand('extension.Initialise', function() {
        vscode.window.showInformationMessage('Inside Extension');    
        var doc = window.activeTextEditor.document;
        if(doc.languageId == 'java'){
            // var edit = new vscode.TextEdit();
            var insertion = "class {\npublic static void main(String[] args){}}";
            edit.insert(0, insertion);
            workspace.applyEdit(edit);
            console.log("Execution Complete");
        }
    });
    context.subscriptions.push(initialise);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
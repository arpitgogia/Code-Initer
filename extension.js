// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var workspace = vscode.workspace;
var window = vscode.window;
function textEditFactory(range, content) {
    return new vscode.TextEdit(range, content);
}
function editFactory(coords, content) {
    var start = PositionFactory(coords.start.line, coords.start.char);
    var end = PositionFactory(coords.end.line, coords.end.char);
    var range = rangeFactory(start, end);
    return textEditFactory(range, content);  
}
function workspaceEditFactory() {
    return new vscode.WorkspaceEdit();
}
function getDocument (vsEditor) {
    return typeof vsEditor._documentData !== 'undefined' ? vsEditor._documentData : vsEditor._document
}
function setEditFactory(uri, coords, content) {
    var workspaceEdit = workspaceEditFactory();
    var edit = editFactory(coords, content);
    
    workspaceEdit.set(uri, [edit]);
    return workspaceEdit;
}
function rangeFactory(start, end) {
    return new vscode.Range(start, end);
}
function PositionFactory(line, char) {
    return new vscode.Position(line, char);
}
function applyEdit(vsEditor, coords, content) {
    var vsDocument = getDocument(vsEditor);
    var edit = setEditFactory(vsDocument._uri, coords, content);
    vscode.workspace.applyEdit(edit);    
}
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
        var edit = new vscode.WorkspaceEdit();
        vscode.window.showInformationMessage('Inside Extension');    
        var doc = window.activeTextEditor.document;
        var insertion = "class {\n\tpublic static void main(String[] args){}\n}";
        edit.insert(0, insertion);
        // workspace.applyEdit(edit);
        console.log(insertion);
    });
    context.subscriptions.push(initialise);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
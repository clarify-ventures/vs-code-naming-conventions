"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
var vscode = require("vscode");
var NamingSuggester_1 = require("./NamingSuggester");
var fs = require("fs");
var path = require("path");
/**
 * Determines whether the given workspace folder is a Symfony project.
 *
 * The function checks for the presence of a `composer.json` file with a Symfony dependency,
 * as well as the existence of a `bin/console` file and a `config` directory, which are
 * common indicators of a Symfony project.
 *
 * @param workspaceFolder The workspace folder to check.
 * @returns `true` if the workspace folder is a Symfony project, `false` otherwise.
 */
function isSymfonyProject(workspaceFolder) {
    var composerJsonPath = path.join(workspaceFolder.uri.fsPath, 'composer.json');
    var binConsolePath = path.join(workspaceFolder.uri.fsPath, 'bin', 'console');
    var configDirPath = path.join(workspaceFolder.uri.fsPath, 'config');
    if (fs.existsSync(composerJsonPath)) {
        var composerJson = JSON.parse(fs.readFileSync(composerJsonPath, 'utf8'));
        var require_1 = composerJson.require || {};
        if (require_1['symfony/symfony'] || require_1['symfony/framework-bundle']) {
            return true;
        }
    }
    if (!fs.existsSync(composerJsonPath)) {
        return false;
    }
    return fs.existsSync(binConsolePath) && fs.existsSync(configDirPath);
}
/**
 * Activates the extension and sets up a listener for TypeScript file saves. If the current workspace is a Symfony project, it will display an information message when naming suggestions are available.
 *
 * @param context The extension context.
 */
function activate(context) {
    var workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        return;
    }
    var isSymfony = workspaceFolders.some(isSymfonyProject);
    if (isSymfony) {
        vscode.workspace.onDidSaveTextDocument(function (document) {
            if (document.languageId === 'typescript') {
                var code = document.getText();
                var suggester = new NamingSuggester_1.NamingSuggester();
                var suggestions = suggester.suggestRefactoring(code);
                if (Object.keys(suggestions.suggested).length > 0) {
                    vscode.window.showInformationMessage('Naming suggestions available!');
                }
            }
        });
    }
}
/**
 * Deactivates the extension.
 */
function deactivate() { }
vscode.window.showInformationMessage("Hello World!");
if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0 && isSymfonyProject(vscode.workspace.workspaceFolders[0])) {
    vscode.window.showInformationMessage("This is a Symfony project");
}
else {
    // Print answer as alert
    vscode.window.showInformationMessage("This is not a Symfony project");
}

import * as vscode from 'vscode';
import { NamingSuggester } from './NamingSuggester';
import * as fs from 'fs';
import * as path from 'path';

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
function isSymfonyProject(workspaceFolder: vscode.WorkspaceFolder): boolean {
    const composerJsonPath = path.join(workspaceFolder.uri.fsPath, 'composer.json');
    const binConsolePath = path.join(workspaceFolder.uri.fsPath, 'bin', 'console');
    const configDirPath = path.join(workspaceFolder.uri.fsPath, 'config');

    if (fs.existsSync(composerJsonPath)) {
        const composerJson = JSON.parse(fs.readFileSync(composerJsonPath, 'utf8'));
        const require = composerJson.require || {};
        if (require['symfony/symfony'] || require['symfony/framework-bundle']) {
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
export function activate(context: vscode.ExtensionContext) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        return;
    }

    const isSymfony = workspaceFolders.some(isSymfonyProject);

    if (isSymfony) {
        vscode.workspace.onDidSaveTextDocument((document) => {
            if (document.languageId === 'typescript') {
                const code = document.getText();
                const suggester = new NamingSuggester();
                const suggestions = suggester.suggestRefactoring(code);

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
export function deactivate() {}


vscode.window.showInformationMessage("Hello World!");
if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0 && isSymfonyProject(vscode.workspace.workspaceFolders[0])) {
	vscode.window.showInformationMessage("This is a Symfony project");
}else {
	// Print answer as alert
	vscode.window.showInformationMessage("This is not a Symfony project");
}
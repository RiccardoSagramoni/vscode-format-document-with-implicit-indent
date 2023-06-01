import * as vscode from 'vscode';


// This method is called when your extension is deactivated
export function deactivate() { }


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "format-with-implicit-indent" is now active!');
	
	// Implement command
	let disposable = vscode.commands.registerCommand(
		'format-with-implicit-indent.format',
		async () => {
			// Display a message box to the user
			vscode.window.showInformationMessage('Format document with implicit indent!');
			// Format document with VSCode plugin
			await vscode.commands.executeCommand("editor.action.formatDocument");
			// Apply implicit indentation
			await executeImplicitIndent(vscode.window.activeTextEditor!);
		});
	
	context.subscriptions.push(disposable);
}


async function executeImplicitIndent(editor: vscode.TextEditor) {
	// Check indentation in each line
	const lineCount = editor.document.lineCount;

	for (let i = 0; i < lineCount; i++) {
		indentLine(editor, i);
	}
}


function indentLine(editor: vscode.TextEditor, lineNum: number) {
	let line = editor.document.lineAt(lineNum);
	// Apply implicit indentation only on empty or whitespace-only lines
	if (line.text === "") {
		// Find the next line that is not empty or whitespace-only.
		let nextLineNum = lineNum;
		var nextLineText;
		try {
			nextLineText = editor.document.lineAt(nextLineNum).text;
			while (/\S/.test(nextLineText) === false) {
				nextLineNum = nextLineNum + 1;
				nextLineText = editor.document.lineAt(nextLineNum).text;
			}
		} catch (e) {
			nextLineText = "";
		}
		
		// Figure out the indentation level of that next line,
		// and copy it here to the cursor line.
		const nextLineIndent = nextLineText.match(/^\s*/)![0]!;
		editor.edit((edit) => {
			edit.insert(line.range.end, nextLineIndent);
		});
	}
}

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
	
	// Initialize an array of tuples
	const indentTuples: [vscode.Position, string][] = [];
	
	for (let i = 0; i < lineCount; i++) {
		let line = editor.document.lineAt(i);
		// Apply implicit indentation only on empty or whitespace-only lines
		if (line.text === "") {
			indentTuples.push(
				computeIndentation(editor.document, line.range.end, i)
			);
		}
	}
	
	editor.edit((edit) => {
		indentTuples.forEach((tuple) => {
			edit.insert(tuple[0], tuple[1]);
		});
	});
}


function computeIndentation(
	document: vscode.TextDocument,
	position: vscode.Position,
	lineNum: number
): [vscode.Position, string] {
	// Find the next line that is not empty or whitespace-only.
	let nextLineNum = lineNum + 1;
	var nextLineText;
	try {
		nextLineText = document.lineAt(nextLineNum).text;
		while (/\S/.test(nextLineText) === false) {
			nextLineNum = nextLineNum + 1;
			nextLineText = document.lineAt(nextLineNum).text;
		}
	} catch (e) {
		nextLineText = "";
	}
	
	// Figure out the indentation level of that next line,
	// and copy it here to the cursor line.
	const nextLineIndent = nextLineText.match(/^\s*/)![0]!;

	return [position, nextLineIndent];
}

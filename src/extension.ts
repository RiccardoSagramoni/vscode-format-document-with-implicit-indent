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

/**
 * This function is responsible for applying implicit indentation to an open document. 
 * It detects empty or whitespace-only lines in the document 
 * and inserts the appropriate indentation.
 * @param editor the VS Code TextEditor object representing the currently open text editor.
 */
async function executeImplicitIndent(editor: vscode.TextEditor) {
	// Check indentation in each line
	const lineCount = editor.document.lineCount;
	
	// Array of tuples (position-in-document, indentation-to-insert)
	const indentTuples: [vscode.Position, string][] = [];
	
	// Compute the indentation to be inserted inside the document
	for (let i = 0; i < lineCount; i++) {
		let line = editor.document.lineAt(i);
		// Apply implicit indentation only on empty or whitespace-only lines
		if (line.text === "") {
			indentTuples.push(
				[line.range.end, computeIndentation(editor.document, i)]
			);
		}
	}
	
	// Apply implicit indentation to the document
	editor.edit((edit) => {
		indentTuples.forEach((tuple) => {
			edit.insert(tuple[0], tuple[1]);
		});
	});
}

/**
 * Compute the indentation level of the currently scanned line
 * @param document current text document
 * @param lineNum number of the currently analyzed line. The line MUST be empty or whitespace-only.
 * @returns the indentation to append to the line
 */
function computeIndentation(document: vscode.TextDocument, lineNum: number): string {
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
	
	return nextLineIndent;
}

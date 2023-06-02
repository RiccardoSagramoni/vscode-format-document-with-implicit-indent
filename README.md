# VSCode: format document with implicit indentation

<div align="center">

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

![stability-alpha](https://img.shields.io/badge/stability-ALPHA-f4d03f.svg?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](./LICENSE)

</div>
<br>

**VS Code extension** which is a wrapper for the *Format Document* command.
It automatically indent to the correct level every empty lines after formatting the document.


## Features

The extension define a new command **Format Document with implicit indent** (`format-with-implicit-indent.format`) which format the current document and apply implicit indentation.


## Why?

This extension aims to solve an issue common to the majority of formatting utilities, i.e. removing the indentation from all the empty lines.
This can be a very annoying inconvenience for developers who uses IDEs like VS Code, which don't work well when indents are stripped from empty lines, making navigation confusing. (See issue [rust-lang/rustfmt#887](https://github.com/rust-lang/rustfmt/issues/887))

The extension [`implicit-indent`](https://marketplace.visualstudio.com/items?itemName=jemc.vscode-implicit-indent) already solves this issue in a clever way, by automatically adding indentation when cursor moves on empty lines.

My extension tries a different approach, by **automatically adding indentation on all the empty lines of the document after formatting the document**.


## Installation

1. Clone this repository.
2. Install NodeJS and NPM.
3. Install extension dependencies
	```sh
	sudo npm install -g @vscode/vsce
	npm install 
	```
4. Build the extension
	```sh
	vsce package
	```
5. Install the extension
	```sh
	code --install-extension format-with-implicit-indent-0.0.1.vsix
	```


## VS Code configuration

I suggest configuring the IDE with the following setting:
```json
"editor.trimAutoWhitespace": false
```
In this way, the editor will not automatically trim the whitespaces on empty lines (thus making this extension useless XD).


## Credits

- [vscode-implicit-indent](https://github.com/jemc/vscode-implicit-indent) for the implicit indentation algorithm.

import * as vscode from 'vscode';
import createFile from './sundry/createFile';
import generateGuid from './sundry/generateGuid';
import gitgnoreTemplate from './template/defaultGitignore';
import LICENSETemplate from './template/defaultLICENSE';
import packageAuthorVersion from './template/defaultPAAVInfo';
export function activate(context: vscode.ExtensionContext) {

	// guid - 生成大写
	context.subscriptions.push(vscode.commands.registerTextEditorCommand('odin-sundry.generateGuidToUpper', (textEditor, edit) => {
		const position = textEditor.selection.active;
		edit.insert(position, generateGuid().toUpperCase());
	}));

	// guid - 生成小写
	context.subscriptions.push(vscode.commands.registerTextEditorCommand('odin-sundry.generateGuidToLower', (textEditor, edit) => {
		const position = textEditor.selection.active;
		edit.insert(position, generateGuid().toLowerCase());
	}));

	// gitgnore - 生成 .gitgnore 文件
	context.subscriptions.push(vscode.commands.registerCommand('odin-sundry.generateGitignore', (uri) => {
		createFile(uri, ".gitignore", gitgnoreTemplate);
	}));

	// 生成 LICENSETemplate 文件
	context.subscriptions.push(vscode.commands.registerCommand('odin-sundry.generateLICENSE', (uri) => {
		createFile(uri, "LICENSE", LICENSETemplate);
	}));

	// package.json 文件插入作者、版本以及Git信息
	context.subscriptions.push(vscode.commands.registerTextEditorCommand('odin-sundry.generatePackageJson-AuthorVersionGitInfo', (textEditor, edit) => {
		let author: string | undefined = '';
		let gitRepositoryName: string | undefined = "";
		let icon: string | undefined = '';
		// 输入 icon
		vscode.window.showInputBox({
			// 这个对象中所有参数都是可选参数
			password: false, // 输入内容是否是密码
			ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
			placeHolder: '输入 icon 路径', // 在输入框内的提示信息 
			value: '/assets/avatar.png'
		}).then(iconValue => {
			if (iconValue !== '') {
				icon = iconValue;
			}
			// 输入作者名称
			const authorBox = vscode.window.showInputBox({
				// 这个对象中所有参数都是可选参数
				password: false, // 输入内容是否是密码
				ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
				placeHolder: '作者', // 在输入框内的提示信息 
				value: 'odinGitGmail'
			}).then(authorBoxValue => {
				if (authorBoxValue !== '') {
					author = authorBoxValue;
				}
				// 输入Git仓库名称
				vscode.window.showInputBox({
					// 这个对象中所有参数都是可选参数
					password: false, // 输入内容是否是密码
					ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
					placeHolder: 'Git仓库名称', // 在输入框内的提示信息 
				}).then(gitRepositoryValue => {
					if (gitRepositoryValue !== '') {
						gitRepositoryName = gitRepositoryValue;
						var pvavInfo = packageAuthorVersion(author!, gitRepositoryName!);
						textEditor.edit(edit => {
							const position = textEditor.selection.active;
							edit.insert(position, pvavInfo);
						});
					}
					else {
						vscode.window.showErrorMessage("必须输入Git仓库的url网址");
						return;
					}
				});
			});
		});
	}));

	// 添加 changeLog 命令
	context.subscriptions.push(vscode.commands.registerTextEditorCommand('odin-sundry.generateChangeLogCommand', (textEditor, edit) => {
		const position = textEditor.selection.active;
		const changeLogCommand = `"genChangeLog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"`;
		edit.insert(position, changeLogCommand);
		let outputChannel = vscode.window.createOutputChannel(`Sundry`);
		outputChannel.show(true);
		outputChannel.append('请确保安装了conventional-changelog, 使用命令 npm install -g conventional-changelog-cli');
	}));
}

export function deactivate() { }

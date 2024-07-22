import * as vscode from 'vscode';
import fs from 'fs';
import path from 'path';
import generateGuid from './sundry/generateGuid';
import gitgnoreTemplate from './template/defaultGitgnore';
export function activate(context: vscode.ExtensionContext) {

	// guid - 生成大写
	context.subscriptions.push(vscode.commands.registerTextEditorCommand('odin-sundry.generateGuidToUpper', (textEditor, edit) => {
		const position = textEditor.selection.active;
		edit.insert(position,generateGuid().toUpperCase());
	}));

	// guid - 生成小写
	context.subscriptions.push(vscode.commands.registerTextEditorCommand('odin-sundry.generateGuidToLower', (textEditor, edit) => {
		const position = textEditor.selection.active;
		edit.insert(position,generateGuid().toLowerCase());	
	}));

	// gitgnore - 生成 .gitgnore 文件
	context.subscriptions.push(vscode.commands.registerCommand('odin-sundry.generateGitgnore', (uri) => {
		// 判断文件是否存在
		const gitgnorePath = uri.toString().startsWith('file://')
						? uri.toString().replace('file://', '')
						: uri.toString();
		const gitgnoreFullPath = path.join(gitgnorePath,".gitgnore"); 
		fs.stat(gitgnoreFullPath,async (err,stats)=>{
			if(!err){
				// 如果文件存在
				vscode.window.showErrorMessage(`当前路径 ${gitgnorePath} 已经有 .gitgnore 文件`);
			}
			else{
				// 如果不存在
				await fs.writeFileSync(gitgnoreFullPath,gitgnoreTemplate,"utf-8");
				vscode.window.showInformationMessage(`${gitgnorePath} 已添加 .gitgnore 文件`);
			}
		});
	}));
}

export function deactivate() {}

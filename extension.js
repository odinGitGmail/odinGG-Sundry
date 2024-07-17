const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	

	context.subscriptions.push(vscode.commands.registerTextEditorCommand('odin-sundry.generateGuidToUpper', (textEditor, edit) => {
		const position = textEditor.selection.active;
		edit.insert(position,generateGuid().toUpperCase())		
	}));


	context.subscriptions.push(vscode.commands.registerTextEditorCommand('odin-sundry.generateGuidToLower', (textEditor, edit) => {
		const position = textEditor.selection.active;
		edit.insert(position,generateGuid().toLowerCase())		
	}));
}

function deactivate() {}

function generateGuid() {
    function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

module.exports = {
	activate,
	deactivate
}

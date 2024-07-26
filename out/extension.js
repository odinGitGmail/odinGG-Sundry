"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const createFile_1 = __importDefault(require("./sundry/createFile"));
const generateGuid_1 = __importDefault(require("./sundry/generateGuid"));
const defaultGitignore_1 = __importDefault(require("./template/defaultGitignore"));
const defaultLICENSE_1 = __importDefault(require("./template/defaultLICENSE"));
const defaultPAAVInfo_1 = __importDefault(require("./template/defaultPAAVInfo"));
function activate(context) {
    // guid - 生成大写
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('odin-sundry.generateGuidToUpper', (textEditor, edit) => {
        const position = textEditor.selection.active;
        edit.insert(position, (0, generateGuid_1.default)().toUpperCase());
    }));
    // guid - 生成小写
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('odin-sundry.generateGuidToLower', (textEditor, edit) => {
        const position = textEditor.selection.active;
        edit.insert(position, (0, generateGuid_1.default)().toLowerCase());
    }));
    // gitgnore - 生成 .gitgnore 文件
    context.subscriptions.push(vscode.commands.registerCommand('odin-sundry.generateGitignore', (uri) => {
        (0, createFile_1.default)(uri, ".gitignore", defaultGitignore_1.default);
    }));
    // 生成 LICENSETemplate 文件
    context.subscriptions.push(vscode.commands.registerCommand('odin-sundry.generateLICENSE', (uri) => {
        (0, createFile_1.default)(uri, "LICENSE", defaultLICENSE_1.default);
    }));
    // package.json 文件插入作者、版本以及Git信息
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('odin-sundry.generatePackageJson-AuthorVersionGitInfo', (textEditor, edit) => {
        let author = '';
        let gitRepositoryName = "";
        let icon = '';
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
            vscode.window.showInputBox({
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
                        var pvavInfo = (0, defaultPAAVInfo_1.default)(author, gitRepositoryName);
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
function deactivate() { }
//# sourceMappingURL=extension.js.map
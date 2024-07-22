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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const generateGuid_1 = __importDefault(require("./sundry/generateGuid"));
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
    context.subscriptions.push(vscode.commands.registerCommand('odin-sundry.generateGitgnore', (uri) => {
        // 判断文件是否存在
        const gitgnorePath = uri.toString().startsWith('file://')
            ? uri.toString().replace('file://', '')
            : uri.toString();
        const gitgnoreFullPath = path_1.default.join(gitgnorePath, ".gitgnore");
        fs_1.default.stat(gitgnoreFullPath, async (err, stats) => {
            if (!err) {
                // 如果文件存在
                vscode.window.showErrorMessage(`当前路径 ${gitgnorePath} 已经有 .gitgnore 文件`);
            }
            else {
                // 如果不存在
                const gitgnoreTemplatePath = "./template/defaultGitgnore.txt";
                var templateContent = fs_1.default.readFileSync(gitgnoreTemplatePath, 'utf-8');
                await fs_1.default.writeFileSync(gitgnoreFullPath, templateContent, "utf-8");
                vscode.window.showInformationMessage(`${gitgnorePath} 已添加 .gitgnore 文件`);
            }
        });
    }));
}
function deactivate() { }
//# sourceMappingURL=extension.js.map
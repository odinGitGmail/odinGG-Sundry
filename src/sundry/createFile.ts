import * as vscode from 'vscode';
import fs from 'fs';
import path from 'path';

const createFile = (filePath: string, fileName: string, fileContent: string) => {
    // 判断文件是否存在
    const createFilePath = filePath.toString().startsWith('file:///')
        ? filePath.toString().replace('file:///', '').replace("%3A", ":")
        : filePath.toString();
    const fileFullPath = path.join(createFilePath, fileName);
    fs.stat(fileFullPath, async (err, stats) => {
        if (!err) {
            // 如果文件存在
            vscode.window.showErrorMessage(`当前路径 ${createFilePath} 已经有 ${fileName} 文件`);
        }
        else {
            // 如果不存在
            await fs.writeFileSync(fileFullPath, fileContent, "utf-8");
            vscode.window.showInformationMessage(`${createFilePath} 已添加 ${fileName} 文件`);
        }
    });
};

export default createFile;
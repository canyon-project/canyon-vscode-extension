import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// 扫描当前工作目录下的文件
function scanFiles() {
    // 获取当前工作目录
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('No workspace folder found!');
        return;
    }

    const workspacePath = workspaceFolders[0].uri.fsPath;

    // 递归扫描目录
    const scanDirectory = (dirPath: string) => {
        fs.readdirSync(dirPath).forEach(file => {
            const filePath = path.join(dirPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                // 如果是目录，继续递归扫描
                if (path.basename(filePath) !== 'node_modules') {
                    scanDirectory(filePath);
                }
            } else {
                // 处理文件
                console.log(filePath);
                // 在这里你可以执行你的文件处理逻辑
            }
        });
    };

    scanDirectory(workspacePath);
}

// 插件激活时被调用
export function activate(context: vscode.ExtensionContext) {
    // 在启动时扫描文件
    scanFiles();
}

// 插件停用时被调用
export function deactivate() {}

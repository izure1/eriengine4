import path from 'path'
import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { handler as ensureProject } from './ensureProject'
import { handler as addScene } from './addScene'
import { parseProperty } from '@/Utils/parseProperty'
import {
    PROJECT_DIRECTORY_NAME,
    PROJECT_SRC_DIRECTORY_NAME,
    PROJECT_SRC_SCENE_DIRECTORY_NAME
} from '@/Const'

async function ensureDefaultScenes(projectDirPath: string): Promise<Engine.GameProject.AddSceneSuccess|Engine.GameProject.AddSceneFail> {
    const scenes: string[] = [ 'main.ts', 'gui_main.ts' ]
    const sceneRootDir: string = path.resolve(projectDirPath, PROJECT_SRC_DIRECTORY_NAME, PROJECT_SRC_SCENE_DIRECTORY_NAME)
    for (const key of scenes) {
        const filePath: string = path.resolve(sceneRootDir, key)
        const sceneAdd: Engine.GameProject.AddSceneSuccess|Engine.GameProject.AddSceneFail = await addScene(projectDirPath, filePath)
        if (!sceneAdd.success) {
            return sceneAdd as Engine.GameProject.AddSceneFail
        }
    }
    return {
        success: true,
        name: '씬 초기화 성공',
        message: '씬 초기화에 성공했습니다',
        path: projectDirPath
    }
}

export async function handler(directoryPath: string, config: Engine.GameProject.Config): Promise<Engine.GameProject.CreateProjectSuccess|Engine.GameProject.CreateProjectFail> {
    const projectDirName: string = parseProperty(PROJECT_DIRECTORY_NAME, config)
    const projectDirPath: string = path.resolve(directoryPath, projectDirName)

    const projectEnsure = await ensureProject(projectDirPath, config)
    if (!projectEnsure.success) {
        return projectEnsure as Engine.GameProject.CreateProjectFail
    }

    // 기본 씬 생성
    const sceneEnsure = await ensureDefaultScenes(projectDirPath)
    if (!sceneEnsure.success) {
        return sceneEnsure as Engine.GameProject.CreateProjectFail
    }

    return {
        success: true,
        name: '프로젝트 생성 성공',
        message: '프로젝트 생성을 성공했습니다.',
        path: projectDirPath,
        config
    }
}

export function ipc(): void {
    ipcMain.handle('create-project', async (e: IpcMainInvokeEvent, directoryPath: string, config: Engine.GameProject.Config): Promise<Engine.GameProject.CreateProjectSuccess|Engine.GameProject.CreateProjectFail> => {
        return await handler(directoryPath, config)
    })
}
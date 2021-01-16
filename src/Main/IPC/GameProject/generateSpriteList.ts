import path from 'path'
import normalize from 'normalize-path'
import glob from 'fast-glob'
import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { handler as writeFile } from '../FileSystem/writeFile'
import { getEnumContentFromArray } from '@/Utils/getEnumContentFromArray'
import {
    PROJECT_SRC_DIRECTORY_NAME,
    PROJECT_SRC_DATA_DIRECTORY_NAME,
    PROJECT_SRC_DATA_SPRITE_DIRECTORY_NAME,
    PROJECT_SRC_SPRITELIST_NAME
} from '@/Const'

export async function handler(projectDirPath: string): Promise<Engine.GameProject.GenerateSpriteListSuccess|Engine.GameProject.GenerateSpriteListFail> {
    const cwd: string       = normalize(path.resolve(projectDirPath, PROJECT_SRC_DIRECTORY_NAME, PROJECT_SRC_DATA_DIRECTORY_NAME, PROJECT_SRC_DATA_SPRITE_DIRECTORY_NAME))
    const listPath: string  = normalize(path.resolve(projectDirPath, PROJECT_SRC_DIRECTORY_NAME, PROJECT_SRC_SPRITELIST_NAME))

    try {
        const list: string[]            = await glob('**/*.ts', { cwd, absolute: false })
        const jsonWrite                 = await writeFile(listPath, getEnumContentFromArray(list))
        if (!jsonWrite.success) {
            return jsonWrite as Engine.GameProject.GenerateSpriteListFail
        }
    } catch(e) {
        const { name, message } = e as Error
        return {
            success: false,
            name,
            message
        }
    }

    return {
        success: true,
        name: '스프라이트 리스트 생성 성공',
        message: '스프라이트 리스트 생성에 성공했습니다',
        path: listPath
    }
}

export function ipc(): void {
    ipcMain.handle('generate-sprite-list', async (e: IpcMainInvokeEvent, projectDirPath: string): Promise<Engine.GameProject.GenerateSpriteListSuccess|Engine.GameProject.GenerateSpriteListFail> => {
        return await handler(projectDirPath)
    })
}
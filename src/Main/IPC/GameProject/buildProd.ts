import path from 'path'
import normalize from 'normalize-path'
import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { handler as buildCreateFiles } from './buildCreateFiles'
import { ProcessSpawner } from '@/Utils/ProcessSpawner'
import { writeToRenderer } from '@/Utils/stream'

export async function handler(projectDirPath: string): Promise<Engine.GameProject.BuildProdSuccess|Engine.GameProject.BuildProdFail> {

    try {
        const spawner = new ProcessSpawner({ shell: true, cwd: projectDirPath })
        const command: string = 'npm run build:prod'

        await spawner.spawn(command, { writeStream: writeToRenderer('build'), deadWord: 'build-prod' })
    } catch(reason) {
        const { name, message } = reason as Error
        return {
            success: false,
            name,
            message
        }
    }

    const htmlAppend = await buildCreateFiles(projectDirPath)
    if (!htmlAppend.success) {
        return htmlAppend as Engine.GameProject.BuildProdFail
    }

    return {
        success: true,
        name: '게임 배포 빌드',
        message: '게임을 배포모드로 성공적으로 빌드하였습니다',
        path: normalize(path.resolve(projectDirPath, 'dist'))
    }

}

export function ipc(): void {
    ipcMain.handle('build-prod', async (e: IpcMainInvokeEvent, projectDirPath: string): Promise<Engine.GameProject.BuildProdSuccess|Engine.GameProject.BuildProdFail> => {
        return await handler(projectDirPath)
    })
}
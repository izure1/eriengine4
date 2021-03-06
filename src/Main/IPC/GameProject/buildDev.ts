import path from 'path'
import normalize from 'normalize-path'
import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { handler as del } from '../FileSystem/delete'
import { handler as buildCreateFiles } from './buildCreateFiles'
import { ProcessSpawner } from '@/Utils/ProcessSpawner'
import { writeToRenderer } from '@/Utils/stream'
import {
  PROJECT_BUILD_DIRECTORY_NAME,
  PROJECT_BUILD_SRC_DIRECTORY_NAME
} from '@/Const'

export async function handler(projectDirPath: string): Promise<Engine.GameProject.BuildDevSuccess|Engine.GameProject.BuildDevFail> {
  const srcDirPath = path.resolve(projectDirPath, PROJECT_BUILD_DIRECTORY_NAME, PROJECT_BUILD_SRC_DIRECTORY_NAME)
  const srcDirDelete = await del(srcDirPath, false)
  if (!srcDirDelete.success) {
    return srcDirDelete as Engine.GameProject.BuildProdFail
  }

  try {
    const spawner = new ProcessSpawner({ shell: true, cwd: projectDirPath })
    const command = 'npm run build:dev'

    await spawner.spawn(command, { writeStream: writeToRenderer('build'), deadWord: 'build-dev' })
  } catch (reason) {
    const { name, message } = reason as Error
    return {
      success: false,
      name,
      message
    }
  }

  const htmlAppend = await buildCreateFiles(projectDirPath)
  if (!htmlAppend.success) {
    return htmlAppend as Engine.GameProject.BuildDevFail
  }

  return {
    success: true,
    name: '게임 개발자 빌드',
    message: '게임을 개발자모드로 성공적으로 빌드하였습니다',
    path: normalize(path.resolve(projectDirPath, PROJECT_BUILD_DIRECTORY_NAME, PROJECT_BUILD_SRC_DIRECTORY_NAME))
  }
}

export function ipc(): void {
    ipcMain.handle('build-dev', async (e: IpcMainInvokeEvent, projectDirPath: string): Promise<Engine.GameProject.BuildDevSuccess|Engine.GameProject.BuildDevFail> => {
        return await handler(projectDirPath)
    })
}
<template>
  <file-generator-component
    :cwd="cwd"
    :add="add"
    :description="[
      '씬에서 벌어지는 내용을 프로그래밍합니다.',
      '하지만 씬 파일에서 모든 내용을 프로그래밍하기는 불편하고, 관리하기 힘듭니다.<br>스크립트는 프로그래밍 코드를 쪼개서 관리할 수 있도록 도와줍니다.',
      '이곳에서 추가한 스크립트는 자동으로 해당 씬에 등록됩니다.'
    ]"
    :extraActions="extraActions"
    filename="script.ts"
  />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ipcRenderer } from 'electron'
import { getStorageKeyFromFilename } from '@/Utils/getStorageKeyFromFilename'
import FileGeneratorComponent, { ContextItemAction } from '@/Renderer/components/Manager/FileGenerator.vue'
import {
  PROJECT_SRC_STORAGE_SCENE_SCRIPT_DIRECTORY_NAME
} from '@/Const'

@Component({
  components: {
    FileGeneratorComponent
  }
})
export default class ScriptMainComponent extends Vue {
  private cwd: string = ''
  private extraActions: ContextItemAction[] = [
    {
      icon: 'mdi-arrow-left',
      description: '뒤로가기',
      action: (): void => {
        this.goBack()
      }
    }
  ]

  private get filePath(): string {
    return decodeURIComponent(this.$route.params.filePath)
  }

  private get storageKey(): string {
    return getStorageKeyFromFilename(this.filePath)
  }

  private get projectDirectory(): string {
    return this.$store.state.projectDirectory
  }

  private async add(scriptFilePath: string): Promise<void> {
    if (!this.storageKey) {
      return
    }
    const scriptAdd: Engine.GameProject.AddSceneScriptSuccess|Engine.GameProject.AddSceneScriptFail = await ipcRenderer.invoke('add-scene-script', this.projectDirectory, this.filePath, scriptFilePath)
    if (!scriptAdd.success) {
      this.$store.dispatch('snackbar', scriptAdd.message)
      return
    }
  }

  private goBack(): void {
    this.$router.replace('/manager/scene').catch(() => null)
  }

  private checkKey(): void {
    if (this.storageKey) {
      return
    }
    this.$store.dispatch('snackbar', '파일명에 스토리지 정보가 없습니다')
    this.goBack()
  }

  private async setCwd(): Promise<void> {
    const pathGet: Engine.GameProject.GetStoragePathSuccess|Engine.GameProject.GetStoragePathFail = await ipcRenderer.invoke('get-storage-path', this.projectDirectory, this.storageKey, PROJECT_SRC_STORAGE_SCENE_SCRIPT_DIRECTORY_NAME, '')
    if (!pathGet.success) {
      this.$store.dispatch('snackbar', pathGet.message)
      this.goBack()
      return
    }

    this.cwd = pathGet.path
  }

  created(): void {
    this.checkKey()
    this.setCwd()
  }
}
</script>
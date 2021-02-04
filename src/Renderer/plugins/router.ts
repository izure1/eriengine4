import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Error404 from '@/Renderer/components/Error/404.vue'
import DependenciesMain from '@/Renderer/components/Dependencies/Main.vue'
import DependenciesInstall from '@/Renderer/components/Dependencies/Install.vue'
import ProjectMain from '@/Renderer/components/Project/Main.vue'
import ProjectNew from '@/Renderer/components/Project/New.vue'
import ProjectOpen from '@/Renderer/components/Project/Open.vue'
import ProjectClose from '@/Renderer/components/Project/Close.vue'
import Manager from '@/Renderer/components/Manager/Main.vue'
import ManagerConfig from '@/Renderer/components/Manager/Config/Main.vue'
import ManagerRestructure from '@/Renderer/components/Manager/Restructure/Main.vue'
import ManagerBuild from '@/Renderer/components/Manager/Build/Main.vue'
import ManagerBuildRunner from '@/Renderer/components/Manager/Build/Runner.vue'
import ManagerAsset from '@/Renderer/components/Manager/Asset/Main.vue'
import ManagerScene from '@/Renderer/components/Manager/Data/Scene/Main.vue'
import ManagerSceneScript from '@/Renderer/components/Manager/Data/Scene/Script/Main.vue'
import ManagerSceneMap from '@/Renderer/components/Manager/Data/Scene/Map/Main.vue'
import ManagerActor from '@/Renderer/components/Manager/Data/Actor/Main.vue'
import ManagerActorScript from '@/Renderer/components/Manager/Data/Actor/Script/Main.vue'
import ManagerAnimation from '@/Renderer/components/Manager/Data/Animation/Main.vue'
import ManagerSkill from '@/Renderer/components/Manager/Data/Skill/Main.vue'
import ManagerImage from '@/Renderer/components/Manager/Data/Image/Main.vue'
import ManagerAudio from '@/Renderer/components/Manager/Data/Audio/Main.vue'
import ManagerVideo from '@/Renderer/components/Manager/Data/Video/Main.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: '/dependencies'
    },
    {
        path: '/dependencies',
        component: DependenciesMain
    },
    {
        path: '/dependencies/install',
        redirect: '/dependencies'
    },
    {
        path: '/dependencies/install/:missings',
        component: DependenciesInstall
    },
    {
        path: '/project',
        component: ProjectMain
    },
    {
        path: '/project/new',
        component: ProjectNew
    },
    {
        path: '/project/open',
        component: ProjectOpen
    },
    {
        path: '/project/close',
        component: ProjectClose
    },
    {
        path: '/manager',
        component: Manager,
        children: [
            {
                path: '',
                redirect: 'scene'
            },
            {
                path: 'scene',
                component: ManagerScene
            },
            {
                path: 'scene/script',
                component: ManagerSceneScript
            },
            {
                path: 'scene/script/:filePath',
                component: ManagerSceneScript
            },
            {
                path: 'scene/map',
                component: ManagerSceneMap
            },
            {
                path: 'scene/map/:filePath',
                component: ManagerSceneMap
            },
            {
                path: 'actor',
                component: ManagerActor
            },
            {
                path: 'actor/script',
                component: ManagerActorScript
            },
            {
                path: 'actor/script/:filePath',
                component: ManagerActorScript
            },
            {
                path: 'asset',
                component: ManagerAsset
            },
            {
                path: 'animation',
                component: ManagerAnimation
            },
            {
                path: 'skill',
                component: ManagerSkill
            },
            {
                path: 'image',
                component: ManagerImage
            },
            {
                path: 'audio',
                component: ManagerAudio
            },
            {
                path: 'video',
                component: ManagerVideo
            },
            {
                path: 'config',
                component: ManagerConfig
            },
            {
                path: 'restructure/:cwd',
                component: ManagerRestructure
            },
            {
                path: 'build',
                component: ManagerBuild
            },
            {
                path: 'build/runner/:buildData',
                component: ManagerBuildRunner
            }
        ]
    },
    {
        path: '*',
        component: Error404
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

<script lang="ts" setup>
import { ref } from 'vue'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'

const emit = defineEmits<{
    (e: 'navigate', index: string): void
}>()

const isCollapse = ref(false)
const activeIndex = ref('1')

const handleSelect = (index: string) => {
    activeIndex.value = index
    emit('navigate', index)
}

const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<template>

    <el-menu :default-active="activeIndex" :collapse="isCollapse" @close="handleClose" @select="handleSelect"
        class="el-menu-vertical">
        <el-radio-group v-model="isCollapse">
            <el-radio-button :value=!isCollapse>Switch</el-radio-button>
        </el-radio-group>

        <el-menu-item index="1">
            <el-icon>
                <Location />
            </el-icon>
            <template #title>最新价格</template>
        </el-menu-item>
        <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <template #title>价格趋势</template>
        </el-menu-item>
        <el-menu-item index="3">
            <el-icon>
                <Document />
            </el-icon>
            <template #title>地区对比</template>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon>
                <setting />
            </el-icon>
            <template #title>来源对比</template>
        </el-menu-item>
    </el-menu>
</template>



<style>
.el-menu-vertical {
    width: 200px;
    height: 100vh;
}
</style>
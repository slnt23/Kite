<script setup lang="ts">
import AboutSection from '@/components/blog/AboutSection.vue'
import EducationSection from '@/components/blog/EducationSection.vue'
import SkillsSection from '@/components/blog/SkillsSection.vue'
import PostsSection from '@/components/blog/PostsSection.vue'
</script>

<template>
    <div class="blog-container">
        <AboutSection />
        <PostsSection />
        <EducationSection />
        <SkillsSection />
    </div>
</template>

<style scoped lang="scss">
.blog-container {
    min-height: 100vh;
    padding-bottom: 60px;
}
</style>
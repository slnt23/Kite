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
  max-width: 1120px;
  margin: 0 auto;
  padding: 60px 20px 80px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

@media (max-width: 768px) {
  .blog-container {
    padding: 30px 16px 60px;
    gap: 40px;
  }
}
</style>

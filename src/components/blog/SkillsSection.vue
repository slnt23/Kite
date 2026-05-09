<script setup lang="ts">
import { ref } from 'vue'

const skills = ref([
    {
        category: 'Web',
        items: ['Vue.js', 'Nuxt.js', 'Node.js', 'React.js', 'TypeScript', 'JavaScript', 'CSS', 'HTML']
    },
    {
        category: 'Programming',
        items: ['Python', 'PyTorch', 'C', 'C++', 'C#', 'R', 'MySQL', 'PostgreSQL']
    },
    {
        category: 'Tools',
        items: ['VSCode', 'Vim', 'Git', 'Linux', 'Docker', 'Nginx']
    },
    {
        category: 'Design',
        items: ['Figma', 'Photoshop', 'Illustrator']
    },
    {
        category: 'Other',
        items: ['Markdown', 'LaTeX']
    }
])
</script>

<template>
    <section class="skills-section">
        <h2 class="section-title">Skills</h2>
        <div class="skills-container">
            <div v-for="skill in skills" :key="skill.category" class="skill-category">
                <h3 class="category-name">{{ skill.category }}</h3>
                <div class="skill-tags">
                    <span v-for="item in skill.items" :key="item" class="skill-tag">
                        {{ item }}
                    </span>
                </div>
            </div>
        </div>

        <div class="poem-box">
            <span class="poem-dot"></span>
            <span class="poem-text">春潮带雨晚来急，野渡无人舟自横。</span>
        </div>
    </section>
</template>

<style scoped lang="scss">
.skills-section {
    padding: 40px 20px;
    max-width: 900px;
    margin: 0 auto;
}

.section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 32px;
    color: var(--color-text-deep);
}

.skills-container {
    display: flex;
    flex-direction: column;
    gap: 28px;
}

.skill-category {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 12px;
}

.category-name {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text-deep);
    min-width: 100px;
    margin: 0;
}

.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    flex: 1;
}

.skill-tag {
    display: inline-block;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid var(--color-border);
    border-radius: 999px;
    font-size: 0.9rem;
    color: var(--color-muted-deep);
    transition: all 0.2s ease;

    &:hover {
        background: var(--color-accent);
        border-color: var(--color-primary);
        color: var(--color-primary);
    }
}

.poem-box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: 40px;
    padding: 16px 32px;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid var(--color-border);
    border-radius: 999px;
}

.poem-dot {
    width: 10px;
    height: 10px;
    background: #22c55e;
    border-radius: 50%;
}

.poem-text {
    font-size: 1rem;
    color: var(--color-text);
    font-style: italic;
}

@media (max-width: 768px) {
    .skills-section {
        padding: 30px 16px;
    }

    .skill-category {
        flex-direction: column;
        gap: 8px;
    }

    .category-name {
        min-width: auto;
    }

    .poem-box {
        padding: 12px 20px;
        margin-top: 30px;
    }

    .poem-text {
        font-size: 0.9rem;
    }
}
</style>
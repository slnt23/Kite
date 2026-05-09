<script setup lang="ts">
import { ref } from 'vue'
import { Calendar } from '@element-plus/icons-vue'

const posts = ref([
    {
        id: 1,
        title: '从医学到AI：我的跨界学习之路',
        excerpt: '作为一名医学生，我是如何踏上AI研究之路的...',
        date: '2024-01-15',
        tags: ['AI', '学习', '医学'],
        readTime: '8 min'
    },
    {
        id: 2,
        title: 'PyTorch实战：从零开始构建LLM',
        excerpt: '详细记录了我学习PyTorch并构建大型语言模型的过程...',
        date: '2024-01-10',
        tags: ['PyTorch', 'LLM', 'NLP'],
        readTime: '12 min'
    },
    {
        id: 3,
        title: 'Minecraft中的编程思维',
        excerpt: '游戏不仅仅是娱乐，更是培养编程思维的好工具...',
        date: '2024-01-05',
        tags: ['游戏', '编程', '思维'],
        readTime: '6 min'
    },
    {
        id: 4,
        title: '双学位的挑战与收获',
        excerpt: '同时修读医学和计算机双学位是一种怎样的体验...',
        date: '2023-12-28',
        tags: ['学习', '经验', '大学'],
        readTime: '10 min'
    }
])
</script>

<template>
    <section class="posts-section">
        <div class="section-header">
            <h2 class="section-title">Posts</h2>
            <button class="view-all-btn">View All</button>
        </div>

        <div class="posts-grid">
            <article v-for="post in posts" :key="post.id" class="post-card">
                <div class="post-header">
                    <span class="read-time">{{ post.readTime }}</span>
                    <span class="date">
                        <Calendar class="date-icon" />
                        {{ post.date }}
                    </span>
                </div>

                <h3 class="post-title">{{ post.title }}</h3>
                <p class="post-excerpt">{{ post.excerpt }}</p>

                <div class="post-tags">
                    <span v-for="tag in post.tags" :key="tag" class="post-tag">
                        <Tag class="tag-icon" />
                        {{ tag }}
                    </span>
                </div>
            </article>
        </div>
    </section>
</template>

<style scoped lang="scss">
.posts-section {
    padding: 40px 20px;
    max-width: 900px;
    margin: 0 auto;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
}

.section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: var(--color-text-deep);
}

.view-all-btn {
    padding: 10px 20px;
    border: 1px solid var(--color-border);
    border-radius: 999px;
    background: transparent;
    color: var(--color-muted-deep);
    font-size: 0.9rem;
    transition: all 0.3s ease;

    &:hover {
        background: var(--color-accent);
        border-color: var(--color-primary);
        color: var(--color-primary);
    }
}

.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
}

.post-card {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid var(--color-border);
    border-radius: 20px;
    padding: 24px;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
        border-color: var(--color-primary);
    }
}

.post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    font-size: 0.85rem;
    color: #686d79;
}

.read-time {
    padding: 4px 10px;
    background: var(--color-accent);
    border-radius: 999px;
}

.date {
    display: flex;
    align-items: center;
    gap: 4px;
}

.date-icon {
    font-size: 0.75rem;
}

.post-title {
    font-size: 1.15rem;
    font-weight: 600;
    margin: 0 0 12px 0;
    color: var(--color-text-deep);
    line-height: 1.4;
}

.post-excerpt {
    font-size: 0.95rem;
    color: var(--color-muted-deep);
    line-height: 1.6;
    margin: 0 0 16px 0;
}

.post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.post-tag {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    background: rgba(64, 158, 255, 0.08);
    border-radius: 999px;
    font-size: 0.8rem;
    color: var(--color-primary);
}

.tag-icon {
    font-size: 0.65rem;
}

@media (max-width: 768px) {
    .posts-section {
        padding: 30px 16px;
    }

    .posts-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .post-card {
        padding: 20px;
    }

    .section-header {
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
    }
}
</style>
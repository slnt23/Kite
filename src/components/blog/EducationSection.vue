<script setup lang="ts">
import { ref } from 'vue'

const educations = ref([
    {
        school: '北京大学',
        degree: '预防医学 & 计算机科学技术双学位',
        period: 'August 2021 - Present',
        color: '#c4a7c7'
    },
    {
        school: '中国人民大学附属中学',
        degree: '早培班 & 人工智能实验班',
        period: 'August 2014 - July 2021',
        color: '#7db4d8'
    }
])
</script>

<template>
    <section class="education-section">
        <h2 class="section-title">Education</h2>
        <div class="education-list">
            <div v-for="(edu, index) in educations" :key="index" class="education-card"
                :style="{ '--accent-color': edu.color }">
                <div class="education-content">
                    <h3 class="school-name">{{ edu.school }}</h3>
                    <p class="degree">{{ edu.degree }}</p>
                    <p class="period">{{ edu.period }}</p>
                </div>
                <div class="education-decoration"></div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.education-section {
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

.education-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.education-card {
    position: relative;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid var(--color-border);
    border-radius: 24px;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
    }
}

.education-content {
    flex: 1;
    padding: 24px 32px;
    z-index: 2;
}

.school-name {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: var(--color-text-deep);
}

.degree {
    font-size: 1rem;
    color: var(--color-muted-deep);
    margin: 0 0 6px 0;
}

.period {
    font-size: 0.9rem;
    color: #686d79;
    margin: 0;
}

.education-decoration {
    position: absolute;
    right: -20px;
    top: -20px;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle at center, var(--accent-color) 0%, transparent 70%);
    opacity: 0.3;
    border-radius: 50%;
}

@media (max-width: 768px) {
    .education-section {
        padding: 30px 16px;
    }

    .education-content {
        padding: 20px 24px;
    }

    .school-name {
        font-size: 1.1rem;
    }

    .education-decoration {
        width: 150px;
        height: 150px;
    }
}
</style>
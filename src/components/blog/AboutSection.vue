<script setup lang="ts">
// import { user, view } from '@element-plus/icons-vue'
</script>

<template>
    <section class="about-section">
        <div class="about-header">
            <div class="avatar-wrapper">
                <img class="avatar"
                    src="https://neeko-copilot.bytedance.net/api/text2image?prompt=anime%20style%20portrait%20of%20a%20young%20man%20with%20black%20hair%20and%20glasses%2C%20wearing%20formal%20attire%2C%20soft%20lighting%2C%20professional%20headshot&size=512x512"
                    alt="Arthals" />
            </div>
            <h1 class="name">Arthals</h1>
            <div class="location">
                <MapPin class="icon" />
                <span>China / Beijing</span>
                <a href="https://github.com" target="_blank" class="github-link">
                    <Github class="icon" />
                    <span>GitHub</span>
                </a>
            </div>
        </div>

        <div class="about-content">
            <h2 class="section-title">About</h2>
            <div class="tag-line">Developer / Designer / Medical student</div>
            <p class="description">
                你好，我叫 Arthals，是一个兴趣使然、热爱编程的医学生。
            </p>
            <p class="description">
                目前就读于北京大学医学部，同时修读计算机科学技术双学位。一边被病理病生药理内外妇儿折磨，一边在ICS的Lab作业PyTorch中debug到头秃。
            </p>
            <p class="description">
                我即将在北京大学先进制造与机器人学院攻读博士学位。
            </p>
            <p class="description">
                我的兴趣主要在 Large Language Model / Embodied AI 方向。
            </p>
            <p class="description">
                我喜欢 Minecraft。
            </p>

            <div class="codetime-badge">
                <span class="codetime-icon">⌨️</span>
                <span class="codetime-text">CodeTime</span>
                <span class="codetime-hours">2317hrs 53mins</span>
            </div>

            <button class="more-btn">More about me</button>
        </div>
    </section>
</template>

<style scoped lang="scss">
.about-section {
    padding: 60px 20px;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

.about-header {
    margin-bottom: 40px;
}

.avatar-wrapper {
    margin-bottom: 24px;
}

.avatar {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    object-fit: cover;
}

.name {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 16px 0;
    color: var(--color-text-deep);
}

.location {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    color: var(--color-muted-deep);
    font-size: 1rem;
}

.icon {
    margin-right: 6px;
}

.github-link {
    display: flex;
    align-items: center;
    color: var(--color-muted-deep);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
        color: var(--color-primary);
    }
}

.about-content {
    text-align: left;
}

.section-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: var(--color-text-deep);
}

.tag-line {
    font-size: 1.1rem;
    color: var(--color-muted-deep);
    margin-bottom: 20px;
}

.description {
    font-size: 1rem;
    line-height: 1.8;
    color: var(--color-text);
    margin-bottom: 16px;
}

.codetime-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 999px;
    margin: 24px 0;
    font-size: 0.9rem;
}

.codetime-icon {
    font-size: 1.2rem;
}

.codetime-text {
    font-weight: 500;
}

.codetime-hours {
    font-weight: 600;
    color: #4ade80;
}

.more-btn {
    display: block;
    margin-left: auto;
    padding: 12px 28px;
    border: 1px solid var(--color-border);
    border-radius: 999px;
    background: transparent;
    color: var(--color-text-deep);
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
        background: var(--color-accent);
        border-color: var(--color-primary);
        color: var(--color-primary);
        transform: translateY(-2px);
    }
}

@media (max-width: 768px) {
    .about-section {
        padding: 40px 16px;
    }

    .avatar {
        width: 150px;
        height: 150px;
    }

    .name {
        font-size: 2rem;
    }

    .location {
        flex-direction: column;
        gap: 12px;
    }
}
</style>
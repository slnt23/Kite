<template>
  <footer class="site-footer">
    <!-- 横线分割 -->
    <hr class="footer-divider">

    <!-- 主要内容区域 -->
    <div class="footer-content">
      <!-- 最上方：标题 -->
      <div class="footer-header">
        <h3 class="footer-title">Adventure is worthwhile.</h3>
      </div>

      <!-- 第二行：链接带图标 -->
      <div class="footer-links">
        <a href="https://space.bilibili.com/1237791199?spm_id_from=333.1007.0.0" class="footer-link">
          <el-icon class="link-icon">
            <VideoCamera />
          </el-icon>
          BiliBili
        </a>
        <a href="https://github.com/" target="_blank" rel="noreferrer" class="footer-link">
          <el-icon class="link-icon">
            <Star />
          </el-icon>
          GitHub
        </a>
        <a href="https://www.behance.net/" target="_blank" rel="noreferrer" class="footer-link">
          <el-icon class="link-icon">
            <CoffeeCup />
          </el-icon>
          占位
        </a>
      </div>

      <!-- 第三行：底部信息，用竖线分割 -->
      <div class="footer-bottom">
        <span class="footer-info">邮箱：relax271828@petalmail.com</span>
        <span class="divider">|</span>
        <span class="footer-info">设计人：Kite Studio</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { CoffeeCup, Message, Star, VideoCamera, View } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
// Design System Variables - from DESIGN.md
$runway-black: #000000;
$dark-surface: #1a1a1a;
$pure-white: #ffffff;
$cool-slate: #767d88;
$mid-slate: #7d848e;
$footer-gray: #999999;
$border-dark: #27272a;

.site-footer {
  margin-top: 78px;
  padding: 64px 0 48px;
  text-align: center;
  background: $runway-black;
  border-top: 1px solid $border-dark;
}

.footer-divider {
  border: none;
  height: 1px;
  background: $border-dark;
  margin: 0 auto 48px auto;
  width: 80%;
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-header {
  margin-bottom: 20px;
}

.footer-title {
  margin: 0;
  color: $pure-white;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.0;
  letter-spacing: -0.9px;
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: $cool-slate;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.35px;
  text-transform: uppercase;
  padding: 8px 12px;
  border-radius: 4px;
  transition: color 0.3s ease;

  &:hover {
    color: $pure-white;
  }
}

.link-icon {
  font-size: 16px;
  color: $cool-slate;
}

.footer-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  color: $footer-gray;
}

.footer-info {
  font-size: 11px;
  color: $footer-gray;
  line-height: 1.3;
}

.divider {
  color: $border-dark;
  font-size: 11px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .site-footer {
    margin-top: 48px;
    padding: 48px 0 32px;
  }

  .footer-content {
    padding: 0 16px;
  }

  .footer-title {
    font-size: 1.5rem;
  }

  .footer-links {
    gap: 24px;
    margin-bottom: 24px;
  }

  .footer-link {
    font-size: 13px;
    padding: 6px 10px;
  }

  .footer-bottom {
    gap: 12px;
  }

  .footer-info {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .footer-links {
    flex-direction: column;
    gap: 12px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 8px;
  }

  .divider {
    display: none;
  }
}
</style>
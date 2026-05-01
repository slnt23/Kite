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
.site-footer {
  margin-top: 40px;
  padding: 60px 0 30px;
  text-align: center;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.footer-divider {
  border: none;
  height: 1px;
  background: var(--color-border);
  margin: 0 auto 30px auto;
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
  color: var(--color-text-deep);
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.4;
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text);
  text-decoration: none;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    color: var(--color-primary);
    background: var(--color-bg-light);
    transform: translateY(-1px);
  }
}

.link-icon {
  font-size: 16px;
  color: var(--color-primary);
}

.footer-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  color: #686d79;
}

.footer-info {
  font-size: 12px;
  color: var(--color-muted-light);
  line-height: 1.4;
}

.divider {
  color: var(--color-border);
  font-size: 12px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .site-footer {
    margin-top: 30px;
    padding: 30px 0 15px;
  }

  .footer-content {
    padding: 0 16px;
  }

  .footer-title {
    font-size: 1.3rem;
  }

  .footer-links {
    gap: 20px;
    margin-bottom: 16px;
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
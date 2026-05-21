import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/index.scss'
import { createPinia } from "pinia";
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DataZoomComponent,
    MarkLineComponent,
    MarkPointComponent,
    ToolboxComponent,
    RadarComponent,
} from 'echarts/components';

// 注册 echarts 组件
use([
    CanvasRenderer,
    BarChart,
    LineChart,
    PieChart,
    RadarChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DataZoomComponent,
    MarkLineComponent,
    MarkPointComponent,
    ToolboxComponent,
    RadarComponent,
]);

const app = createApp(App)
const pinia = createPinia()


app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.component('VChart', VChart);

app.mount('#app')
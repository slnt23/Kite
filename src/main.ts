import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/index.scss'
import { createPinia } from "pinia";
import VChart from 'vue-echarts';
import { use, registerMap } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart, RadarChart, MapChart, ScatterChart } from 'echarts/charts';
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
    GeoComponent,
    VisualMapComponent,
} from 'echarts/components';
import chinaGeo from 'china-geojson'

// 注册 echarts 组件
use([
    CanvasRenderer,
    BarChart,
    LineChart,
    PieChart,
    RadarChart,
    MapChart,
    ScatterChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DataZoomComponent,
    MarkLineComponent,
    MarkPointComponent,
    ToolboxComponent,
    RadarComponent,
    GeoComponent,
    VisualMapComponent,
]);

// 注册中国地图
registerMap('china', chinaGeo.China as any)

const app = createApp(App)
const pinia = createPinia()


app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.component('VChart', VChart);

app.mount('#app')
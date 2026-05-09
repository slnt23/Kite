// spotlight.api.ts
// import axios from 'axios';
import request from '../request';
import type { SpotlightItem, FeatureItem } from '@/types';
import type { Result } from '@/types';

const FEATURE_BASE_URL = '/admin/feature';
const SPOTLIGHT_BASE_URL = '/admin/spotlight';   // 根据您的代理配置调整

export const spotlightApi = {
    /**
     * 获取全部焦点项目（按 order 升序）
     */
    list: () => {
        return request.get<Result<SpotlightItem[]>>(SPOTLIGHT_BASE_URL);
    },

    getById: (id: number) => {
        return request.get<Result<SpotlightItem>>(`${SPOTLIGHT_BASE_URL}/${id}`);
    },

    create: (data: SpotlightItem) => {
        return request.post<Result<number>>(SPOTLIGHT_BASE_URL, data);
    },

    update: (id: number, data: SpotlightItem) => {
        const payload = { ...data, id };
        return request.put<Result<boolean>>(`${SPOTLIGHT_BASE_URL}/${id}`, payload);
    },

    deleteById: (id: number) => {
        return request.delete<Result<boolean>>(`${SPOTLIGHT_BASE_URL}/${id}`);
    }
};




export const featureApi = {
    /**
     * 获取全部产品特性（按 sort_order 升序排列）
     * 说明：后端当前只返回前四个
     */
    list: () => {
        return request.get<Result<FeatureItem[]>>(FEATURE_BASE_URL);
    },

    getById: (id: number) => {
        return request.get<Result<FeatureItem>>(`${FEATURE_BASE_URL}/${id}`);
    },

    create: (data: FeatureItem) => {
        return request.post<Result<number>>(FEATURE_BASE_URL, data);
    },

    update: (id: number, data: FeatureItem) => {
        const payload = { ...data, id };   // 确保 id 一致
        return request.put<Result<boolean>>(`${FEATURE_BASE_URL}/${id}`, payload);
    },

    deleteById: (id: number) => {
        return request.delete<Result<boolean>>(`${FEATURE_BASE_URL}/${id}`);
    }
};
// spotlight.api.ts

import request from '../request';
import type { SpotlightItem, FeatureItem } from '@/types';
import type { Result } from '@/types';

const FEATURE_BASE_URL = '/admin/feature';
const SPOTLIGHT_BASE_URL = '/admin/spotlight';   // 根据您的代理配置调整

export const spotlightApi = {
    /**
     * 获取全部焦点项目（按 order 升序）
     */
    list(): Promise<Result<SpotlightItem[]>> {
        return request.get('/admin/spotlight');
    },

    getById(id: number): Promise<Result<SpotlightItem>> {
        return request.get(`${SPOTLIGHT_BASE_URL}/${id}`)
    },

    create(data: SpotlightItem): Promise<Result<number>> {
        return request.post(SPOTLIGHT_BASE_URL, data)
    },

    update(id: number, data: SpotlightItem): Promise<Result<boolean>> {
        const payload = { ...data, id }
        return request.put(`${SPOTLIGHT_BASE_URL}/${id}`, payload)
    },

    deleteById(id: number): Promise<Result<boolean>> {
        return request.delete(`${SPOTLIGHT_BASE_URL}/${id}`)
    }
};




export const featureApi = {
    /**
     * 获取全部产品特性（按 sort_order 升序排列）
     * 说明：后端当前只返回前四个
     */
    list(): Promise<Result<FeatureItem[]>> {
        return request.get(FEATURE_BASE_URL);
    },

    getById(id: number): Promise<Result<FeatureItem>> {
        return request.get(`${FEATURE_BASE_URL}/${id}`)
    },

    create(data: FeatureItem): Promise<Result<number>> {
        return request.post(FEATURE_BASE_URL, data)
    },

    update(id: number, data: FeatureItem): Promise<Result<boolean>> {
        const payload = { ...data, id }
        return request.put(`${FEATURE_BASE_URL}/${id}`, payload)
    },

    deleteById(id: number): Promise<Result<boolean>> {
        return request.delete(`${FEATURE_BASE_URL}/${id}`)
    }
};
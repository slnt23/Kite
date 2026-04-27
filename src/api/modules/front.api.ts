import request from '../request/index'


export const getSpotLightItemsApi = (data: any) => {
    return request({
        url: '/api/spotlight/getSpotLightItems',
        method: 'GET',
        data
    })
}

export const getFeatureListApi = (data: any) => {
    return request({
        url: '/api/feature/getFeatureList',
        method: 'GET',
        data
    })
}
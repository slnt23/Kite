
/**
 * 统一返回包装类 - 前端对应类型
 * 对应后端 Result<T> 类
 */
export interface Result<T = any> {
    code: number
    message: string
    data: T
}

/**
 * 分页数据返回包装类
 * 对应后端 ResultPage<T> 类
 */
export interface PageResult<T = any> {
    /** 当前页码 */
    currentPage: number
    /** 每页条数 */
    pageSize: number
    /** 总记录数 */
    total: number
    /** 总页数 */
    totalPage: number
    /** 数据列表 */
    records: T[]
}

/**
 * 空数据返回类型
 */
export type EmptyResult = Result<null>

/**
 * 布尔值返回类型
 */
export type BooleanResult = Result<boolean>

/**
 * 字符串返回类型
 */
export type StringResult = Result<string>

/**
 * 数字返回类型
 */
export type NumberResult = Result<number>
/**
 * 查询接口
 * @param f 接口函数
 * @param query 查询参数
 * @returns {*}
 */
export function getItems(f, query) {
    query = query || {pageSize: 10000}
    return f(query)
}

/**
 * 接口返回字典初始化
 * @param response 接口返回
 * @param k 返回时字典key
 * @param v 返回时字典value
 * @returns {*[]} 初始化为{key,value}格式
 */
export function setItems(response, k, v) {
    const data = []
    k = k || 'id'
    v = v || 'name'
    if (response.data && response.data.data && response.data.data.length > 0) {
        response.data.data.forEach(e => {
            data.push({
                key: e[k].toString(),
                value: e[v].toString()
            })
        })
        return data
    }
}

/**
 * 通过 options 数组获取 指定 key 对应的 value
 * 当options列表内，不是key,value的键时，可以指定key和value 的键值name
 */
export function getOptionValue(key, options, keyName = 'key', valueName = 'value') {
    if (Array.isArray(options)) {
        const option = options.find(value => {
            return key + "" === value[keyName] + "";
        })
        if (option !== undefined) {
            return option[valueName];
        }
    } else {
        return '没选项'
    }
}


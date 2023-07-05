const getters = {
    dict: state => state.dict.dict,
    dictLoading: state => state.dict.loading,
    hasLogin: state => state.user.hasLogin,
    userInfo: state => state.user.userInfo,
    roles: state => state.user.roles,
    permissions: state => state.user.permissions,
    token: state => state.user.appToken,

    searchText: state => state.search.searchText,
    localSearchListKey: state => state.search.localSearchListKey,


}
export default getters

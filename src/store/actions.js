export default{
    // 异步用改变用户信息
    setAdminUserSync({commit},info){
        commit('setAdminUser',info);
    }
}
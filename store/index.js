export const state = () => ({
    editorDefineData: null,
    markdownTextData: null,
    accessTokenData: null,
    refreshTokenData: null
});
export const mutations = {
    //エディタTextareaのオブジェクトデータを格納
    editorDefine(state, editorDefineData) {
        state.editorDefineData = editorDefineData
    },
    //Markdownエディタの本文を格納
    markdownText(state, markdownTextData) {
        state.markdownTextData = markdownTextData
    },
    accessToken(state, accessTokenData) {
        state.accessTokenData = accessTokenData
    },
    refreshToken(state, refreshTokenData) {
        state.refreshTokenData = refreshTokenData
    },
}
export const getters = {
    editorDefineData(state) {
        return state.editorDefineData;
    },
    markdownText(state) {
        return state.markdownTextData;
    },
    accessToken(state) {
        return state.accessTokenData;
    },
    refreshToken(state) {
        return state.refreshTokenData;
    },
}
export const actions = {
    editorDefine({ commit }, editorDefineData) {
        commit('editorDefine', editorDefineData)
    },
    markdownText({ commit }, markdownTextData) {
        commit('markdownText', markdownTextData)
    },
    accessToken({ commit }, accessTokenData) {
        commit('accessToken', accessTokenData)
    },
    refreshToken({ commit }, refreshTokenData) {
        commit('refreshToken', refreshTokenData)
    }






}
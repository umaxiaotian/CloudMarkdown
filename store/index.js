export const state = () => ({
    editorDefineData: null,
    markdownTextData: null
});
export const mutations = {
    //エディタTextareaのオブジェクトデータを格納
    editorDefine(state, editorDefineData) {
        state.editorDefineData = editorDefineData
    },
    //Markdownエディタの本文を格納
    markdownText(state, markdownTextData) {
        state.markdownTextData = markdownTextData
    }
}
export const getters = {
    markdownText(state) {
        return state.markdownTextData;
    }
}
export const actions = {
    editorDefine({ commit }, editorDefineData) {
        commit('editorDefine', editorDefineData)
    },
    markdownText({ commit }, markdownTextData) {
        commit('markdownText', markdownTextData)
    }
}
export const state = () => ({
  companyList: []
})

export const mutations = {
  SET_COMPANY_LIST(state, list) {
    state.companyList = list;
  }
}

import { defineStore } from 'pinia';

export const useJsonParseStore = defineStore('jsonParse', {
  state: () => ({
    jsonString: '',
  }),
  getters: {
    getJsonStringStore(state): string {
      return state.jsonString;
    },
  },
  actions: {
    changeJsonStringStore(newJsonString: string) {
      this.jsonString = newJsonString;
    },
  },
});

export default useJsonParseStore;

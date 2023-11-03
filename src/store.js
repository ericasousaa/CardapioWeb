export const storeCatalog = (function () {
  let store = []

  function createInstance() {
    return [];
  }

  return {
    getInstance: function () {
      if (localStorage.getItem('catalog')) {
        store = localStorage.getItem('catalog')
      }

      return store;
    },
    setCatalog: function (data, index) {
      if (index != null && !isNaN(index)) {
        store[index] = data
      }

      store.push(data)
      localStorage.setItem('catalog', store)
    }
  };
})();
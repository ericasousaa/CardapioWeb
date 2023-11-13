export const storeCatalog = (function () {
  let store = {}
  let currentProduct = {}

  if(localStorage.getItem('catalog')) {
    store = JSON.parse(localStorage.getItem('catalog'))
  }

  return {
    getCatalog: function () {
      if (localStorage.getItem('catalog')) {
        store = JSON.parse(localStorage.getItem('catalog'))
      }

      return store;
    },
    getProduct: function (id) {
      return store[id]
    },
    setCatalog: function (data) {
      let dataTreated = data;

      if(!dataTreated?.id) {
        let id = Math.ceil(Math.random() * 5000)

        do {
          id = Math.ceil(Math.random() * 5000)
        } while (store[id])

        dataTreated = {...data, id: id}
      }

      store[dataTreated.id] = dataTreated

      localStorage.setItem('catalog', JSON.stringify(store))

      return dataTreated.id
    },
    setProduct: function (data) {
      currentProduct = data
    }
  };
})();
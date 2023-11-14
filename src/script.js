let catalog;
const handlePages = {
  index: () => {
    listProducts()
  }, formAction: () => {
    const product = handleSaveData()
    handleShow(product)
  }, form: () => {
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault()
    })
    window.addEventListener('unload', () => {
      window.removeEventListener('beforeunload')
      window.removeEventListener('unload')
    })
  }
}

const handleChangeRoute = (e) => {
  const navSelected = document.querySelector(`#${e.target.id}`)
  navSelected.classList.toggle('active')
}

(async function () {
  const page = wherePage()
  let navSelect;
  if (page === 'formAction') {
    navSelect = document.querySelector(`#form`)
  } else {
    navSelect = document.querySelector(`#${page}`)
  }
  navSelect.classList.add('active')

  //Import StoreCatalog
  await import('./store.js').then(({storeCatalog}) => {
    catalog = storeCatalog
  })

  if (handlePages[page])
    handlePages[page]()

})()

function addImageRegister(event) {
  const backgroundImage = document.querySelector("#bg-image-form")
  const inputFile = document.querySelector("input[name='image']")
  const buttonImage = document.querySelector("#bg-image-form label")
  const buttonClearImage = document.querySelector("#bg-image-form .clear-image")
  const inputURLFile = document.querySelector("input[name='url-image']")
  let file;

  if (event.target?.files) {
    file = event.target?.files[0];
  }

  if (Boolean(file)) {
    const reader = new FileReader();

    reader.onload = function (e) {
      localStorage.setItem('image-product', e.target.result)
      buttonImage.style.display = "none"
      buttonClearImage.style.display = "block"
      backgroundImage.style.backgroundImage = `url(${e.target.result})`
      backgroundImage.style.backgroundSize = "cover"
    }

    reader.readAsDataURL(file)

    inputURLFile.value = encodeURIComponent(URL.createObjectURL(file));
  } else {
    inputFile.files[0] = null
    buttonClearImage.style.display = "none"
    buttonImage.style.display = "grid"
    backgroundImage.style.backgroundImage = ""
    backgroundImage.style.backgroundSize = ""
  }
}

function wherePage() {
  const url = window.location.href
  const lastIndexBar = url.lastIndexOf("/")
  const lastIndexDo = url.indexOf("?")
  const indexDot = url.lastIndexOf(".")
  let page;

  if ((indexDot !== -1 && lastIndexBar !== -1) || (lastIndexBar !== -1 && lastIndexDo)) {
    page = url.slice(lastIndexBar + 1, lastIndexDo ? lastIndexDo : indexDot)
  }

  if (lastIndexDo) {
    page = page.split('.')[0]
  }

  return page
}

function getParameters() {
  let paramsObject = {};
  let url = window.location.href;
  let paramsStart = url.indexOf("?")

  if (url.includes('?')) {
    let params = url.substring(paramsStart + 1)
    params = decodeURIComponent(params)
    params = params.split('&')

    params.forEach((param => {
      const [key, value] = param.split('=')
      paramsObject[key] = decodeURIComponent(value.replace(/\+/g, ' '))
    }))
    return paramsObject
  }
  return null
}

function registerProduct(event) {
  const fields = [{name: 'name', field: 'produto'}, {name: 'value', field: 'valor'}, {name: 'image', field: 'imagem'}]
  let errors = []

  fields.forEach(field => {
    errors = []
    const errorFieldElement = document.querySelector(`#error-${field.name}`)
    if (event.target[field.name].value.length < 1) {
      errorFieldElement.style.display = 'inline'
      errorFieldElement.innerText = `O campo ${field.field} é obrigatorio`
      errors.push(`O campo ${field.field} é obrigatorio`)
    } else {
      errorFieldElement.style.display = 'none'
      errorFieldElement.innerText = ''
    }

    if(field.name === 'value') {
      const verify = verificarLetras(event.target[field.name].value)

      if(verify) {
        errorFieldElement.style.display = 'inline'
        errorFieldElement.innerText = `O campo ${field.field} aceita somente números válidos!`
        errors.push(`O campo ${field.field} aceita somente números válidos!`)
      }
    }
  })

  if (errors.length > 0) {
    event.preventDefault()
  }

}

function handleSaveData() {
  let id;
  const params = getParameters()

  if (!params?.id) {
    // Set Product
    let imgURL = localStorage.getItem('image-product')
    id = catalog.setCatalog({...params, 'url-image': imgURL})

    const url = new URL(window.location.href)
    url.searchParams.set('id', id)

    window.history.replaceState({}, document.title, url.toString());
  } else {
    id = params.id
  }

  //return product data
  return catalog.getProduct(id)
}

function handleShow(product) {
  const backgroundImage = document.querySelector('#bg-image-form')

  const fields = ['name', 'value']

  if (product['url-image']?.length) {
    backgroundImage.style.backgroundImage = `url(${product['url-image']})`
    backgroundImage.style.backgroundSize = "cover"
    backgroundImage.style.backgroundPosition = "center"
  }

  fields.forEach(field => {
    document.querySelector(`input[name='${field}']`).value = product[field]
  })
}

function listProducts() {
  const cardOriginal = document.querySelector('#card-product')
  const elementoPai = document.querySelector('#catalog')

  const products = catalog.getCatalog()

  for (let key in products) {
    const product = products[key]
    const cardClone = cardOriginal.cloneNode(true)
    cardClone.style.display = 'initial'
    cardClone.style.backgroundImage = `url(${product['url-image']})`
    cardClone.style.backgroundSize = 'cover'
    cardClone.style.backgroundPosition = 'center'

    cardClone.querySelector('.name-product').innerText = product.name
    cardClone.querySelector('.value-product').innerText = `R$ ${product.value}`

    elementoPai.appendChild(cardClone)
  }
}

function verificarLetras(str, field) {
  return /[a-zA-Z]/.test(str);
}
const beforeSelected = 'inicio'
//let params = getParameters();

const handleChangeRoute = (e) => {
  const previousSelected = document.querySelector(`#${beforeSelected}`)
  previousSelected.classList.remove(beforeSelected)
  const navSelected = document.querySelector(`#${e.target.id}`)
  navSelected.classList.toggle('active')
}

(function () {
  const page = wherePage()
  const navSelect = document.querySelector(`#${page}`)
  navSelect.classList.add('active')
  getParameters()
})()

function addImageRegister (event) {
  const backgroundImage = document.querySelector("#bg-image-form")
  const inputFile = document.querySelector("input[name='image']")
  const buttonImage = document.querySelector("#bg-image-form label")
  const buttonClearImage = document.querySelector("#bg-image-form .clear-image")
  let file;

  if(event.target?.files) {
    file = event.target?.files[0];
  }

  if(Boolean(file)) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageObject = new Image();

      buttonImage.style.display = "none"
      buttonClearImage.style.display = "block"
      backgroundImage.style.backgroundImage = `url(${e.target.result})`
      backgroundImage.style.backgroundSize = "cover"
    }

    reader.readAsDataURL(file)
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

  if(lastIndexDo) {
    page = page.split('.')[0]
  }

  return page
}

function getParameters() {
  let params = [];
  let paramsObject = {};
  let url = window.location.href;
  let paramsStart = url.indexOf("?")

  if (url.includes('?')) {
    let params = url.substring(paramsStart + 1)
    params = decodeURIComponent(params)
    params = params.split('&')

    params.forEach((param => {
      const [key, value] = param.split('=')
      paramsObject[key] = value
    }))
    return paramsObject
  }
  return null
}

function registerProduct (event) {
  console.log(event.target)
}
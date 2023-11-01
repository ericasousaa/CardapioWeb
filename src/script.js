const beforeSelected = 'inicio'

const handleChangeRoute = (e) => {
  const previousSelected = document.querySelector(`#${beforeSelected}`)
  previousSelected.classList.remove(beforeSelected)
  const navSelected = document.querySelector(`#${e.target.id}`)
  navSelected.classList.toggle('active')
}

(function () {
  const navSelect = document.querySelector(`#${beforeSelected}`)
  navSelect.classList.add('active')
})()
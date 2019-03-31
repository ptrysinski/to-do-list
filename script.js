class ToDoList {
  constructor(selector) {
    this.container = document.querySelector(selector) || document.body

    this.tasks = JSON.parse(localStorage.getItem('to-do-list')) || []

    this.render()
  }

  renderForm() {
    const div = document.createElement('div')
    const input = document.createElement('input')
    const button = document.createElement('button')

    input.setAttribute('placeholder', 'Dodaj zadanie')
    button.innerHTML = 'Dodaj do listy'

    const clickHandler = () => this.addTask(input.value)

    button.addEventListener(
      'click',
      clickHandler
    )

    div.appendChild(input)
    div.appendChild(button)
    this.container.appendChild(div)
  }


  saveTasks() {
    localStorage.setItem('to-do-list', JSON.stringify(this.tasks))
  }

  toggleTask(taskIndex) {
    this.tasks = this.tasks.map(
      (task, index) => (
        index === taskIndex ?
          {
            text: task.text,
            isCompleted: !task.isCompleted,
          }
          :
          task
      )
    )

    this.render()
    this.saveTasks()
  }

  addTask(newTaskText) {
    const newTask = {
      text: newTaskText,
      isCompleted: false,
    }

    this.tasks = this.tasks.concat(newTask)

    this.render()
    this.saveTasks()


  }

  render() {
    this.container.innerHTML = ''

    this.renderForm()

    this.tasks.forEach(
      (task, index) => this.renderTask(task, index)
    )
  }


  renderTask(task, index) {
    const div = document.createElement('div')

    div.innerHTML = task.text

    if (task.isCompleted) div.style.textDecoration = 'line-through'

    div.addEventListener(
      'click',
      () => this.toggleTask(index)
    )

    this.container.appendChild(div)

    const button = document.createElement('button')

    button.innerHTML = ('Usuń z listy')

    this.container.appendChild(button)

    const clickHandler = () => this.removeTask(index)

    button.addEventListener(
      'click',
      clickHandler
    )
  }

  removeTask(index){
    this.tasks.splice(index, 1)
    this.render()
    this.saveTasks()
}

}
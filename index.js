//count items left
const itemCount = document.querySelector(".count span");
itemCount.innerText = document.querySelectorAll('.list').length

//adding the task to the list
const itemInput = document.getElementById('item-input');
const inputButton = document.querySelector('#input-field button');
const todoList = document.querySelector('.todo-list-items');

//appending the task to the todo list
inputButton.addEventListener('click' ,() =>{
    if (itemInput.value.length>0) {
        addItems(itemInput.value)
        itemInput.value = '';
    }
})
itemInput.addEventListener('keypress',(event)=>{
    if (event.key ==='Enter'&& itemInput.value.length>0) {
        addItems(itemInput.value)
        itemInput.value = '';
    }
})


//dynamic todo list i.e adding the task to the list
function addItems(text){
    const item = document.createElement('li')
    item.innerHTML = 
    `
    <label class ="list">
    <input type="checkbox" name="checkbox" class = "task-checkbox">
    <span class="text">${text}</span>
  </label>
  <span class="remove"></span>
  `;
  todoList.append(item);
  updateCount(1);
}

function updateCount(num) {
    itemCount.innerText = parseInt(itemCount.innerText) + num ;
}
//Removing task from the list
function removeItems(item) {
    todoList.removeChild(item);
    updateCount(-1)
}

todoList.addEventListener('click',(event)=>{
    if(event.target.classList.contains('remove')){
        removeItems(event.target.closest('li')); // Closest 'li' ancestor of the remove button
    }
})

//Filter section
const filters = document.querySelectorAll('.filters input[type="radio"]');
filters.forEach(filter => {
  filter.addEventListener('change', filterItems);
});

function filterItems() {
  const filter = document.querySelector('.filters input[type="radio"]:checked').id;
  const items = todoList.querySelectorAll('li');
  items.forEach(item => {
    const isChecked = item.querySelector('.task-checkbox').checked;
    switch (filter) {
      case 'all':
        item.style.display = 'flex';
        break;
      case 'active':
        item.style.display = isChecked ? 'none' : 'flex';
        break;
      case 'completed':
        item.style.display = isChecked ? 'flex' : 'none';
        break;
    }
  });
}


//Clearing completed items
const clearCompleted = document.querySelector(".clear-completed");
clearCompleted.addEventListener('click' , () =>{
    const itemChecked = document.querySelectorAll(('.list input[type="checkbox"]:checked'));
    itemChecked.forEach(item => {
        removeItems(item.closest('li'))
    });
})

// For changing theme
const themeChange = document.querySelector('.theme-img');
const backgroundImage = document.querySelector('.background')
themeChange.addEventListener('click' , () =>{
  document.body.classList.toggle('dark-theme')
  if (document.body.classList.contains('dark-theme')) {
    themeChange.src = 'images/icon-sun.svg';
    backgroundImage.style.backgroundImage = ' url("images/bg-desktop-dark.jpg")'
  }
  else{
    themeChange.src = 'images/icon-moon.svg';
    backgroundImage.style.backgroundImage = ' url("images/bg-desktop-light.jpg")'
  }

})
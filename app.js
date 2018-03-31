// Define UI vars
const form      = document.querySelector('#task-form') ;
const taskList  = document.querySelector('.collection') ;
const clearBtn  = document.querySelector('.clear-tasks') ;
const filter    = document.querySelector('#filter') ;
const taskInput = document.querySelector('#task') ;

// call this to load all event listeners
loadEventListeners() ;

function loadEventListeners() {
  // Add DOMContentLoaded event to docuemnt.
  document.addEventListener('DOMContentLoaded', getTasks) ;

  // Add task event.
  form.addEventListener('submit', addTask) ;

  // Remove task event.
  taskList.addEventListener('click', removeTask) ;

  // Clear all tasks event.
  clearBtn.addEventListener('click', clearTasks) ;

  // Filter task event.
  filter.addEventListener('keyup', filterTasks) ;
}

// Get all tasks from LocalStorage.
function getTasks() {
  let tasks ;
  if ( localStorage.getItem('tasks') === null ) {
    tasks = [] ;
  } else {
    tasks = JSON.parse( localStorage.getItem('tasks') ) ;
  }

  tasks.forEach( function( task ) {
    // create li tag.
    const li = document.createElement( 'li' ) ;

    // Add class
    li.classList.add( 'collection-item' ) ;

    // create text and append to li
    li.appendChild( document.createTextNode( task ) ) ;

    // Create new link element.
    const link = document.createElement( 'a' ) ;
    link.classList.add( 'delete-item', 'secondary-content' ) ;
    link.innerHTML = '<i class="fa fa-remove"></i>' ;
    li.appendChild( link ) ;

    // append li to ul.
    taskList.appendChild( li ) ;
  } ) ;

}

function addTask(e) {

  if ( taskInput.value === '' ) {
    alert('Please, add a task') ;
  }

  // create li tag.
  const li = document.createElement('li') ;

  // Add class
  li.classList.add('collection-item') ;

  // create text and append to li
  li.appendChild( document.createTextNode(taskInput.value) ) ;

  // Create new link element.
  const link = document.createElement('a') ;
  link.classList.add('delete-item', 'secondary-content') ;
  link.innerHTML = '<i class="fa fa-remove"></i>' ;
  li.appendChild( link ) ;

  // append li to ul.
  taskList.appendChild( li ) ;

  // Add task to LocalStorage.
  storeTaskInLocalStorage(taskInput.value) ;

  // clear task input.
  taskInput.value = '' ;

  e.preventDefault() ;
}

// Store task to local LocalStorage
function storeTaskInLocalStorage(task) {
  let tasks ;
  if ( localStorage.getItem('tasks') === null ) {
    tasks = [] ;
  } else {
    tasks = JSON.parse( localStorage.getItem('tasks') ) ;
  }
  tasks.push( task ) ;
  localStorage.setItem( 'tasks', JSON.stringify(tasks) ) ;
}

// Remove task
function removeTask(e) {
  if ( e.target.parentElement.classList.contains('delete-item') ) {
    if ( confirm('Are you sure?') ) {
      e.target.parentElement.parentElement.remove() ;
      removeTaskFromLocalStorage( e.target.parentElement.parentElement ) ;
    }
  }
}

// Remove task from LS
function removeTaskFromLocalStorage( taskItem ) {
  let tasks ;
  if ( localStorage.getItem('tasks') === null ) {
    tasks = [] ;
  } else {
    tasks = JSON.parse( localStorage.getItem('tasks') ) ;
  }
  tasks.forEach( function( task, index ) {
    if ( taskItem.textContent === task ) {
      tasks.splice( index, 1 ) ;
    }
  } ) ;
  localStorage.setItem( 'tasks', JSON.stringify( tasks ) ) ;
}

// Clear al tasks.
function clearTasks(e) {
  // less efficient way.
  // taskList.innerHTML = '' ;

  // faster way.
  while( taskList.firstChild ) {
    taskList.removeChild( taskList.firstChild ) ;
  }

  // Clear tasks from LocalStorage.
  clearTasksFromLocalStorage() ;

}

function clearTasksFromLocalStorage() {
  localStorage.clear() ;
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase() ;

  document.querySelectorAll('.collection-item').forEach( function(task) {
    const item = task.firstChild.textContent ;

    if ( item.toLowerCase().indexOf(text) != -1 ) {
      task.style.display = 'block' ;
    } else {
      task.style.display = 'none' ;
    }
  } ) ;
}

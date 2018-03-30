// Define UI vars
const form      = document.querySelector('#task-form') ;
const taskList  = document.querySelector('.collection') ;
const clearBtn  = document.querySelector('.clear-tasks') ;
const filter    = document.querySelector('#filter') ;
const taskInput = document.querySelector('#task') ;

// call this to load all event listeners
loadEventListeners() ;

function loadEventListeners() {
  // Add task event.
  form.addEventListener('submit', addTask) ;

  // Remove task event.
  taskList.addEventListener('click', removeTask) ;

  // Clear all tasks event.
  clearBtn.addEventListener('click', clearTasks) ;

  // Filter task event.
  filter.addEventListener('keyup', filterTasks) ;
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

  // clear task input.
  taskInput.value = '' ;

  e.preventDefault() ;
}

// Remove task
function removeTask(e) {
  if ( e.target.parentElement.classList.contains('delete-item') ) {
    if ( confirm('Are you sure?') ) {
      e.target.parentElement.parentElement.remove() ;
    }
  }
}

// Clear al tasks.
function clearTasks(e) {
  // less efficient way.
  // taskList.innerHTML = '' ;

  // faster way.
  while( taskList.firstChild ) {
    taskList.removeChild( taskList.firstChild ) ;
  }
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

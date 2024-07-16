





let input = document.getElementById('addinput');
let add = document.getElementById('add');
let outputs = document.querySelector('.outputs');




const addtask = () => {
    let task = input.value;
    console.log(task);
    if (task.trim() === '') {
        alert('Please enter a task');
    } else {
        let out = document.createElement('div');
        out.className = 'out';
        out.innerHTML = `<input type="checkbox" id="check">
        <p>${task}</p>
        <button id="edit">Edit</button>
        <button id="delete">Delete</button>`;
        outputs.appendChild(out);
        console.log(out);
        input.value = '';
    }
};
const deletetask = (e) => {
    if (e.target.id === 'delete') {
        e.target.parentElement.remove();
    }
};
const edittask = (e) => {
    if (e.target.id === 'edit') {
        let newtask = prompt('Enter new task');
        if (newtask.trim() === '') {
            alert('Please enter a task');
        } else {
            e.target.previousElementSibling.textContent = newtask;
        }
    }
};
const checktask = (e) => {
    if (e.target.id === 'check') {
        e.target.nextElementSibling.classList.toggle('checked');
    }

};
outputs.addEventListener('click', deletetask);
outputs.addEventListener('click', edittask);
outputs.addEventListener('click', checktask);

add.addEventListener('click', addtask);

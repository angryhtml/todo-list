(function () {
    //создаем и возвращаем заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    //создаем и возвращаем форму для создания дела
    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Enter the task name';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Add task';
        button.disabled = true;

        input.addEventListener('input', function () {
            button.disabled = !input.value.trim();
        });

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    //создаем и возвращаем список элементов
    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createToDoItem(todo) {
        let item = document.createElement('li');
        //кнопки перемещаем в элемент, который красиво покажет их в одной группе
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        //устанавливаем стили для элемента списка, а также для размещения кнопок
        //в его правой части с помощью flex
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = todo.name;

        if (todo.done) {
            item.classList.add('list-group-item-success')
        }

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Done';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Delete';

        doneButton.addEventListener('click', function () {
            item.classList.toggle('list-group-item-success');
        });

        deleteButton.addEventListener('click', function () {
            if (confirm('Are you sure?')) {
                item.remove();
            }
        });

        //вкладываем кнопки вотдельный элемент, чтобы они объединились в один блок
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return item;
    }

    function createTodoApp(container, title = 'To-Do List') {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        todoItemForm.form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!todoItemForm.input.value.trim()) {
                return;
            }

            let todoItem = createToDoItem({
                name: todoItemForm.input.value.trim(),
                done: false
            });

            todoList.append(todoItem);
            todoItemForm.input.value = '';
            todoItemForm.button.disabled = true
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        let container = document.getElementById('todo-app');
        createTodoApp(container, 'My To-Do List');
    });
})();

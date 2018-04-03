const addItemToTodos = () => {
  $domesticate(".form").on("submit", e => {
    e.preventDefault();
    const value = document.querySelectorAll('.user-input')[0].value;
    if (value) {
      $domesticate('.todo-list').append(
        `<li class="list-item">
          <span class="item">${value}</span>
          <div>
            <button class="delete">X</button>
            <input type="checkbox" class="complete-item"></input>
          </div>
        </li>`
      );
    }
    document.querySelectorAll('.user-input')[0].value = "";
  });
};

const removeItemFromTodos = () => {
  $domesticate(".todo-list").on("click", e => {
    if ($domesticate(e.target).attr("class") === "delete") {
      $domesticate(e.target).parent().remove();
    }
  });
};

const completeItem = () => {
  $domesticate(".todo-list").on("click", e => {
    if ($domesticate(e.target).attr("class") === "complete-item") {
      $domesticate(e.target).parent().parent().toggleClass('strikethrough');
    }
  });
};

const initialize = () => {
  $domesticate('.todo-list').append(
    `<li class="first-child">Your to-dos</li>`
  );

  addItemToTodos();
  removeItemFromTodos();
  completeItem();
};

$domesticate(() => { initialize(); });

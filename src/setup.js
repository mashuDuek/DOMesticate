const addItemToTodos = () => {
  $domesticate(".form").on("submit", e => {
    e.preventDefault();
    const value = document.querySelectorAll('.user-input')[0].value;
    if (value) {
      $domesticate('.todo-list').append(
        `<li class="list-item">
          <span class="item">${value}</span>
          <button class="delete">X</button>
          <input type="checkbox" class="complete-item"></input>
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
      $domesticate(e.target).parent().toggleClass('strikethrough');
    }
  });
};

$domesticate(() => {
  addItemToTodos();
  removeItemFromTodos();
  completeItem();
});

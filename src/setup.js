const addItem = () => {
  $domesticate(".form").on("submit", e => {
    e.preventDefault();
    const value = document.querySelectorAll('.user-input')[0].value;
    if (value) {
      $domesticate('.todo-list').append(
        `<li class="list-item">
          <span class="item">${value}</span>
          <button class="delete">X</button>
        </li>`);
    }
    document.querySelectorAll('.user-input')[0].value = "";
  });
};

const removeItem = () => {
  $domesticate(".todo-list").on("click", e => {
    if ($domesticate(e.target).attr("class") === "delete") {
      $domesticate(e.target).parent().remove();
    }
  });
};

$domesticate(() => {
  addItem();
  removeItem();
});

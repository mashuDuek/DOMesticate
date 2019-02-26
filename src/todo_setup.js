const addItem = () => {
  $domesticate(".form").on("submit", e => {
    e.preventDefault();
    const value = document.querySelectorAll('.user-input')[0].value;
    if (value) {
      $domesticate('.todo-list').append(
        `<li class="list-item">
          <span class="item">${value}</span>
          <div>
            <button class="delete">X</button>
            <button class="complete-item">done</input>
          </div>
        </li>`
      );
    };
    
    document.querySelectorAll('.user-input')[0].value = "";
  });
};

const removeItem = () => {
  $domesticate(".todo-list").on("click", e => {
    if ($domesticate(e.target).attr("class") === "delete") {
      $domesticate(e.target).parent().parent().remove();
    }
  });
};

const completeItem = () => {
  $domesticate(".todo-list").on("click", e => {
    if ($domesticate(e.target).attr("class") === "complete-item") {
      if ($domesticate(e.target).nodes[0].innerText === 'undo') {
        $domesticate(e.target).nodes[0].innerText = 'done';
      } else {
        $domesticate(e.target).nodes[0].innerText = 'undo';
      };
      $domesticate(e.target).parent().parent().find('.item').toggleClass('finished');
    }
  });
};

const initialize = () => {
  $domesticate('.todo-list').append(
    `<p class="first-child">Your to-dos</p>`
  );

  addItem();
  removeItem();
  completeItem();
};

$domesticate(() => { initialize(); });

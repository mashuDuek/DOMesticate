class Todos {
  constructor() {
    $domesticate(this.initialize.bind(this));
  }
  
  addItem() {
    $domesticate(".form").on("submit", function(e) {
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

  removeItem() {
    $domesticate(".todo-list").on("click", function(e) {
      if ($domesticate(e.target).attr("class") === "delete") {
        $domesticate(e.target).parent().parent().remove();
      }
    });
  };

  completeItem() {
    $domesticate(".todo-list").on("click", function(e) {
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

  initialize() {
    $domesticate('.todo-list').append(
      `<p class="first-child">Your to-dos</p>`
    );
    
    this.addItem();
    this.removeItem();
    this.completeItem();
  };
}
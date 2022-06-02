function apiLoad() {

  // fecth the API endpoint
  async function getKanban() {
    let kanbanList = [];
    await fetch('https://ej2services.syncfusion.com/production/web-services/api/Kanban')
      .then(res => res.json())
      .then(data => {
        kanbanList = data;
      });
    return kanbanList;
  }

  // create a new promise with our kanban data
  let kanbanList = getKanban();

  kanbanList.then((data) => {
    // filters to store each of the status/list type 
    let todo = data.filter(listType => listType.Status === "Open");
    let progress = data.filter(listType => listType.Status === "InProgress");
    let testing = data.filter(listType => listType.Status === "Testing");
    let done = data.filter(listType => listType.Status === "Close");

    // render the data for the 'To Do' column
    let htmlTodo = "";
    todo.forEach(todo => {
      let htmlSegment =
        `<div class="card ${todo.Priority.toLowerCase()}">
        <p class="summary">${todo.Summary}</p>
        <p><strong>Priority: </strong>${todo.Priority}</p>
      </div>`;
      htmlTodo += htmlSegment;
    });

    // render the data for the 'In Progress' column
    let htmlProgress = "";
    progress.forEach(progress => {
      let htmlSegment =
        `<div class="card ${progress.Priority.toLowerCase()}">
        <p class="summary">${progress.Summary}<p>
        <p><strong>Priority: </strong>${progress.Priority}</p>
       </div>`;
      htmlProgress += htmlSegment;
    });

    // render the data for the 'Testing' column
    let htmlTesting = "";
    testing.forEach(testing => {
      let htmlSegment =
        `<div class="card ${testing.Priority.toLowerCase()}">
        <p class="summary">${testing.Summary}</p>
        <p><strong>Priority: </strong>${testing.Priority}</p>
      </div>`;
      htmlTesting += htmlSegment;
    });

    // render the data for the 'Done' column
    let htmlDone = "";
    done.forEach(done => {
      let htmlSegment =
        `<div class="card ${done.Priority.toLowerCase()}">
        <p class="summary">${done.Summary}</p>
        <p><strong>Priority: </strong>${done.Priority}</p>
        </div>`;
      htmlDone += htmlSegment;
    });

    // display each status type under respected coloumn
    document.getElementById("todo").innerHTML = htmlTodo;
    document.getElementById("progress").innerHTML = htmlProgress;
    document.getElementById("testing").innerHTML = htmlTesting;
    document.getElementById("done").innerHTML = htmlDone;

    // display the number of each status type at the header of each coloumn
    document.getElementById("todo-count").innerHTML = todo.length;
    document.getElementById("progress-count").innerHTML = progress.length;
    document.getElementById("testing-count").innerHTML = testing.length;
    document.getElementById("done-count").innerHTML = done.length;

  });

}

apiLoad();
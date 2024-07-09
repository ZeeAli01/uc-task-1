const rows = [
  {
    topic: "Topic 1",
    duration: "2 hrs",
    link: "https://github.com/Asabeneh/30-Days-Of-JavaScript",
    hidden: false, //to handle change of table rows
  },
  {
    topic: "Topic 2",
    duration: "1 hr",
    link: "https://github.com/Asabeneh/30-Days-Of-JavaScript",
    hidden: false,
  },
  {
    topic: "Topic 3",
    duration: "1 hr 45 min",
    link: "https://github.com/Asabeneh/30-Days-Of-JavaScript",
    hidden: false,
  },
];
//add ALL rows to table:
for (let i = 0; i < rows.length; ++i) {
  const row = document.createElement("tr");
  row.classList.add("row");
  row.innerHTML = ` <td><input type="checkbox" class="checkbox" value="${i}"></td><td>${rows[i].topic}</td><td>${rows[i].duration}</td><td><a class="link" href=${rows[i].link} target="_blank">${rows[i].link}</a></td>`;
  row.classList.add("task-row");
  const table = document.getElementById("table");
  table.appendChild(row);
}
function toggle(source) {
  let checkboxes = document.querySelectorAll('input[type="checkbox"].checkbox');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = source.checked;
  }
}
function hide() {
  //hide button on screen->
  const checkboxes = document.getElementsByClassName("checkbox");
  for (let i = 0; i < checkboxes.length; i++) {
    var checkbox = checkboxes[i];
    var row = checkbox.parentElement.parentElement; //div
    if (checkbox.checked === true) {
      const index = checkbox.value;
      rows[index].hidden = true;
    } else {
      row.classList.remove("hidden");
    }
  }
  updateTableState();
}
//SHOW BUTTON HANDLER:
function show() {
  //show button on screen->
  const checkboxes = document.getElementsByClassName("checkbox");
  for (let i = 0; i < checkboxes.length; i++) {
    var checkbox = checkboxes[i];
    if (checkbox.checked === true) {
      const index = checkbox.value;
      rows[index].hidden = false;
    }
  }
  updateTableState();
}
//on load:
document.addEventListener("DOMContentLoaded", (event) => {
  updateTableState();
  handleChange();

  const outerCheckbox = document.getElementById("outer-checkbox");
  outerCheckbox.addEventListener("change", (event) => {
    toggle(event.target);
  });

  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"].checkbox'
  );
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", () => {
      let allChecked = true;
      for (let j = 0; j < checkboxes.length; j++) {
        if (!checkboxes[j].checked) {
          allChecked = false;
          break;
        }
      }
      outerCheckbox.checked = allChecked;
    });
  }
});

function handleChange() {
  const showBtn = document.getElementById("show-btn");
  const hideBtn = document.getElementById("hide-btn");
  const select = document.getElementById("select");

  if (select.value === "show") {
    hideBtn.classList.remove("hidden");
    showBtn.classList.add("hidden");
  } else if (select.value === "hide") {
    hideBtn.classList.add("hidden");
    showBtn.classList.remove("hidden");
  } else {
    showBtn.classList.add("hidden");
    hideBtn.classList.add("hidden");
  }
  updateTableState();
}

function updateTableState() {
  const table = document.getElementById("table");
  const select = document.getElementById("select");
  const colHeading = `
      <tr id="column-name">
        <th><input type="checkbox" id="outer-checkbox" onclick="toggle(this)"></th>
        <th>Title</th>
        <th>Duration</th>
        <th>Link</th>
      </tr>
    `;
  table.innerHTML = colHeading;

  for (let i = 0; i < rows.length; i++) {
    const tr = document.createElement("tr");
    tr.classList.add("row");
    tr.innerHTML = `
        <td><input type="checkbox" class="checkbox" value="${i}"></td>
        <td>${rows[i].topic}</td>
        <td>${rows[i].duration}</td>
        <td><a class="link" href="${rows[i].link}" target="_blank">${rows[i].link}</a></td>
      `;

    if (select.value === "show" && rows[i].hidden) {
      // Don't show hidden rows when the filter is "show"
      tr.classList.add("hidden");
    } else if (select.value === "hide" && !rows[i].hidden) {
      // Don't show visible rows when the filter is "hide"
      tr.classList.add("hidden");
    }

    table.appendChild(tr);
  }
}

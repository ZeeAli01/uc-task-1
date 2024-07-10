const rows = [
  {
    topic: "Topic 1",
    duration: "2 hrs",
    link: "https://github.com/Asabeneh/30-Days-Of-JavaScript",
    hidden: false,
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
document.addEventListener("DOMContentLoaded", () => {
  addRowsToTable(); //initial configuration.
  updateTableState(); //show only [row.hidden=false] either in hide or show mode.
  handleChange(); //show filter shows HIDE btn and vice versa.
  //new:
  //if some outer checkbox change then immediately change all of inner ones:
  document
    .getElementById("outer-checkbox")
    .addEventListener("change", function (event) {
      toggle(event.target);
    });

  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"].checkbox'
  );
  //if some inner checkbox changes then immediately change master one:
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", updateMasterCheckbox);
  }
});

function addRowsToTable() {
  const table = document.getElementById("table");
  const colHeading = `
      <tr id="column-name">
          <th><input type="checkbox" id="outer-checkbox" onclick="toggle(this)"></th>
          <th>Title</th>
          <th>Duration</th>
          <th>Link</th>
      </tr>
  `;
  table.innerHTML = colHeading;

  for (let i = 0; i < rows.length; ++i) {
    const row = document.createElement("tr");
    row.classList.add("row");
    row.innerHTML = `
      <td><input type="checkbox" class="checkbox" value="${i}"></td>
      <td>${rows[i].topic}</td>
      <td>${rows[i].duration}</td>
      <td><a class="link" href=${rows[i].link} target="_blank">${rows[i].link}</a></td>`;
    row.classList.add("task-row");
    table.appendChild(row);
  }
}
function toggle(source) {
  let checkboxes = document.querySelectorAll('input[type="checkbox"].checkbox');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = source.checked;
  }

  updateMasterCheckbox();
}
//on click hide button:
function hide() {
  const checkboxes = document.getElementsByClassName("checkbox");
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      const index = checkboxes[i].value;
      rows[index].hidden = true; //HIDE CHECKED
    }
  }
  updateTableState();
}
//on click show button:
function show() {
  const checkboxes = document.getElementsByClassName("checkbox");
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      const index = checkboxes[i].value;
      rows[index].hidden = false;
    }
  }
  updateTableState();
}
//show and hide buttons:
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
//print rows based on hidden property:
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
    const row = rows[i];
    if (
      (select.value === "show" && row.hidden) ||
      (select.value === "hide" && !row.hidden)
    ) {
      continue;
    } else {
      const tr = document.createElement("tr");
      tr.classList.add("row");
      tr.innerHTML = `
          <td><input type="checkbox" class="checkbox" value="${i}"></td>
          <td>${row.topic}</td>
          <td>${row.duration}</td>
          <td><a class="link" href="${row.link}" target="_blank">${row.link}</a></td>
      `;
      table.appendChild(tr);
    }
  }
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"].checkbox'
  );
  //if some inner checkbox changes then immediately change master one:
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", updateMasterCheckbox);
  }
  updateMasterCheckbox();
}

function updateMasterCheckbox() {
  let allChecked = true;
  let anyChecked = false;
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"].checkbox'
  );
  const outerCheckbox = document.getElementById("outer-checkbox");

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      anyChecked = true;
    } else {
      allChecked = false;
    }
  }
  if (checkboxes.length === 1) {
    if (anyChecked === true) {
      allChecked = true;
    } else {
      allChecked = false;
    }
  }
  outerCheckbox.checked = allChecked;
}

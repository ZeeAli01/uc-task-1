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
  const form = document.getElementById("modal-form");
  form.addEventListener("submit", function (event) {
    if (form.checkValidity()) {
      event.preventDefault();

      const data = new FormData(form);
      const title = data.get("title-input");
      const duration = data.get("duration-input");
      const url = data.get("url-input");

      let newDuration = 0;
      if (duration < 60) {
        newDuration = `${duration} mins`;
      } else if (duration === 60) {
        newDuration = `1 hr`;
      } else {
        newDuration = `${Math.floor(duration / 60)} hrs ${duration % 60} mins`;
      }

      const row = {
        topic: title,
        duration: newDuration,
        link: url,
        hidden: false,
      };
      rows.push(row);
      handleChange();

      form.reset();
      const modal = document.getElementById("exampleModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
    } else {
      event.preventDefault();
      form.reportValidity();
    }
  });

  addRowsToTable();
  updateTableState();
  handleChange();

  document
    .getElementById("outer-checkbox-task1")
    .addEventListener("change", function (event) {
      toggle(event.target);
    });

  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"].checkbox-task1'
  );
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", updateMasterCheckbox);
  }
});

function addRowsToTable() {
  const table = document.getElementById("table-task1");
  const colHeading = `
      <tr id="column-name-task1">
          <th><input type="checkbox" id="outer-checkbox-task1" onclick="toggle(this)"></th>
          <th>Title</th>
          <th>Duration</th>
          <th>Link</th>
          <th>Actions</th>
      </tr>
  `;
  table.innerHTML = colHeading;

  for (let i = 0; i < rows.length; ++i) {
    const row = document.createElement("tr");
    row.classList.add("row-task1");
    row.innerHTML = `
      <td><input type="checkbox" class="checkbox-task1" value="${i}"></td>
      <td>${rows[i].topic}</td>
      <td>${rows[i].duration}</td>
      <td><a class="link-task1" href=${rows[i].link} target="_blank">${rows[i].link}</a></td>
      <td><button class="row-delete-button" onclick="handleRowDelete(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button></td>
      `;
    row.classList.add("task-row-task1");
    table.appendChild(row);
  }
}

function toggle(source) {
  let checkboxes = document.querySelectorAll(
    'input[type="checkbox"].checkbox-task1'
  );
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = source.checked;
  }

  updateMasterCheckbox();
}

function hide() {
  const checkboxes = document.getElementsByClassName("checkbox-task1");
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      const index = checkboxes[i].value;
      rows[index].hidden = true;
    }
  }
  updateTableState();
}

function show() {
  const checkboxes = document.getElementsByClassName("checkbox-task1");
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      const index = checkboxes[i].value;
      rows[index].hidden = false;
    }
  }
  updateTableState();
}

function handleChange() {
  const showBtn = document.getElementById("show-btn-task1");
  const hideBtn = document.getElementById("hide-btn-task1");
  const select = document.getElementById("select-task1");

  if (select.value === "show") {
    hideBtn.classList.remove("hidden-task1");
    showBtn.classList.add("hidden-task1");
  } else if (select.value === "hide") {
    hideBtn.classList.add("hidden-task1");
    showBtn.classList.remove("hidden-task1");
  } else {
    showBtn.classList.add("hidden-task1");
    hideBtn.classList.add("hidden-task1");
  }
  updateTableState();
}

function updateTableState() {
  const table = document.getElementById("table-task1");
  const select = document.getElementById("select-task1");
  const colHeading = `
      <tr id="column-name-task1">
          <th><input type="checkbox" id="outer-checkbox-task1" onclick="toggle(this)"></th>
          <th>Title</th>
          <th>Duration</th>
          <th>Link</th>
          <th>Actions</th>
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
      tr.classList.add("row-task1");
      tr.innerHTML = `
          <td><input type="checkbox" class="checkbox-task1" value="${i}"></td>
          <td>${row.topic}</td>
          <td>${row.duration}</td>
          <td><a class="link-task1" href="${row.link}" target="_blank">${row.link}</a></td>
          <td><button class="row-delete-button" onclick="handleRowDelete(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button></td>
      `;
      table.appendChild(tr);
    }
  }
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"].checkbox-task1'
  );
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", updateMasterCheckbox);
  }
  updateMasterCheckbox();
}

function updateMasterCheckbox() {
  let allChecked = true;
  let anyChecked = false;
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"].checkbox-task1'
  );
  const outerCheckbox = document.getElementById("outer-checkbox-task1");

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

function handleRowDelete(btn) {
  const rowToDelete = btn.parentElement.parentElement;
  const rowIndex = rowToDelete.querySelector(".checkbox-task1").value;
  rows.splice(rowIndex, 1);
  updateTableState();
}

const rows = [
  {
    topic: "Topic 1",
    duration: "2 hr",
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
  //------------TASK 2----------------------
  //MODAL FOR CREATE ROW:
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
        newDuration = `${duration} min`;
      } else if (duration === 60) {
        newDuration = `1 hr`;
      } else {
        newDuration = `${Math.floor(duration / 60)} hr ${duration % 60} min`;
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

  //  MODAL FOR UPDATE ROW:
  const updateForm = document.getElementById("modal-form2");
  updateForm.addEventListener("submit", function (event) {
    if (updateForm.checkValidity()) {
      event.preventDefault();
      console.log(event.target);
      const data = new FormData(updateForm);
      const title = data.get("title-input2");
      const duration = data.get("duration-input2");
      const url = data.get("url-input2");
      console.log("BEFORE EDIT DATA IS :", title, duration, url);
      let newDuration = 0;
      if (duration < 60) {
        newDuration = `${duration} min`;
      } else if (duration === 60) {
        newDuration = `1 hr`;
      } else {
        newDuration = `${Math.floor(duration / 60)} hr ${duration % 60} min`;
      }

      const row = {
        topic: title,
        duration: newDuration,
        link: url,
        hidden: false,
      };
      let index = console.log("THE TARGET ROW IS:");
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row.hidden === "tobeupdated") {
          index = i;
          row.hidden = false;
        }
      }
      rows[index] = row;
      handleChange();

      //
      updateForm.reset();
      const modal = document.getElementById("exampleModal2");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
      // console.log("row to update has data as follow: ", row);
      console.log(
        `AFTER EDIT DATA: title: ${title} , duration: ${newDuration}, link:${url}`
      );
    } else {
      event.preventDefault();
      updateForm.reportValidity();
    }
  });
  //------------TASK 2----------------------
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
      <td class="actions-td"><button class="row-delete-button btn btn-danger" onclick="handleRowDelete(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button>

<div class="text-center">
        <button  onclick="handleRowUpdateClick(this)" type="button" class="btn btn-primary row-update-button" data-bs-toggle="modal"
            data-bs-target="#exampleModal2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></button>
    </div>

</td>
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

  if (select.value === "show" || select.value === "none") {
    hideBtn.classList.remove("hidden-task1");
    showBtn.classList.add("hidden-task1");
  } else if (select.value === "hide") {
    hideBtn.classList.add("hidden-task1");
    showBtn.classList.remove("hidden-task1");
  } else {
    showBtn.classList.add("hidden-task1");
    hideBtn.classList.remove("hidden-task1");
  }
  updateTableState();
}

function updateTableState() {
  const table = document.getElementById("table-task1");
  const select = document.getElementById("select-task1");
  const colHeading = `
      <tr id="column-name-task1">
          <th><input type="checkbox" id="outer-checkbox-task1" onclick="toggle(this)"></th>
          <th >Title</th>
          <th>Duration</th>
          <th>Link</th>
          <th>Actions</th>
      </tr>
  `;
  table.innerHTML = colHeading;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (
      ((select.value === "show" || select.value === "none") && row.hidden) ||
      (select.value === "hide" && !row.hidden)
    ) {
      continue;
    } else {
      const tr = document.createElement("tr");
      //   tr.classList.add("row-task1");
      tr.innerHTML = `
          <td><input type="checkbox" class="checkbox-task1" value="${i}"></td>
          <td>${row.topic}</td>
          <td>${row.duration}</td>
          <td><a class="link-task1" href="${row.link}" target="_blank">${row.link}</a></td>
          <td class="actions-td"><button class="row-delete-button btn btn-danger" onclick="handleRowDelete(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button>

<div class="text-center">
        <button onclick="handleRowUpdateClick(this)" type="button" class="btn btn-primary row-update-button" data-bs-toggle="modal"
            data-bs-target="#exampleModal2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></button>
    </div>
</td>
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
//TASK 2:
function handleRowDelete(btn) {
  const rowToDelete = btn.parentElement.parentElement;
  const rowIndex = rowToDelete.querySelector(".checkbox-task1").value;
  rows.splice(rowIndex, 1);
  updateTableState();
}
function convertDurationToMinutes(duration) {
  //  console.log("Inside convertDurationToMinutes() with duration:", duration);
  const regex = /(?:(\d+)\s*hr\s*)?(?:(\d+)\s*min)?/;
  const matches = duration.match(regex);
  // console.log("Matches:", matches);

  let totalMinutes = 0;

  if (matches) {
    if (matches[1]) {
      const hours = parseInt(matches[1], 10);
      totalMinutes += hours * 60;
      //  console.log("Hours:", hours, "Total Minutes:", totalMinutes);
    }
    if (matches[2]) {
      const minutes = parseInt(matches[2], 10);
      totalMinutes += minutes;
      //  console.log("Minutes:", minutes, "Total Minutes:", totalMinutes);
    }
  } else {
    return null;
  }

  //console.log("Final Total Minutes:", totalMinutes);
  return totalMinutes;
}
function handleRowUpdateClick(btn) {
  console.log("inside handleRowUpdateClick()");
  const rowToUpdate = btn.parentElement.parentElement.parentElement;
  const rowIndex = rowToUpdate.querySelector(".checkbox-task1").value;
  console.log(rows[rowIndex].duration);
  const updateForm = document.getElementById("modal-form2");
  const durationStr = rows[rowIndex].duration;
  const duration = convertDurationToMinutes(durationStr);
  //set the initial data equal to selected row:
  document.getElementById("title-input2").value = rows[rowIndex].topic;
  document.getElementById("duration-input2").value = duration;
  document.getElementById("url-input2").value = rows[rowIndex].link;
  //make the hidden status to tobeupdated:
  rows[rowIndex].hidden = "tobeupdated";
}

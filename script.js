const rows = [
  {
    topic: "Topic 1",
    duration: "2 hrs",
    link: "https://github.com/Asabeneh/30-Days-Of-JavaScript",
  },
  {
    topic: "Topic 2",
    duration: "1 hr",
    link: "https://github.com/Asabeneh/30-Days-Of-JavaScript",
  },
  {
    topic: "Topic 3",
    duration: "1 hr 45 min",
    link: "https://github.com/Asabeneh/30-Days-Of-JavaScript",
  },
];

for (let i = 0; i < rows.length; ++i) {
  const row = document.createElement("tr");
  row.classList.add("row");
  row.innerHTML = ` <td><input type="checkbox" class="checkbox" value="0"></td><td>${rows[i].topic}</td><td>${rows[i].duration}</td><td><a class="link" href=${rows[i].link} target="_blank">${rows[i].link}</a></td>`;
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
  const checkboxes = document.getElementsByClassName("checkbox");
  for (var i = 0; i < checkboxes.length; i++) {
    var checkbox = checkboxes[i];
    var row = checkbox.parentElement.parentElement; //div
    if (checkbox.checked) {
      row.classList.add("hidden");
    } else {
      row.classList.remove("hidden");
    }
  }
}

function show() {
  const rows = document.getElementById("table").rows;
  for (var i = 0; i < rows.length; i++) {
    rows[i].classList.remove("hidden");
  }
}
document.addEventListener("DOMContentLoaded", (event) => {
  // Initial behavior:
  handleChange();
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"].checkbox'
  );
  const outerCheckbox = document.getElementById("outer-checkbox");

  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", () => {
      let allChecked = true;
      for (let i = 0; i < checkboxes.length; i++) {
        if (!checkboxes[i].checked) {
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
}

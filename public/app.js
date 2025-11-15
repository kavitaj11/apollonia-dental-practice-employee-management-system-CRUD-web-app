const API_BASE = "/api";

document.addEventListener("DOMContentLoaded", () => {
  setupDepartmentForm();
  setupEmployeeForm();
  loadDepartments();
  loadEmployees();
});

/* ---------- Shared helpers ---------- */

function showError(message) {
  const box = document.getElementById("error-box");
  box.textContent = message;
  box.classList.remove("hidden");

  clearTimeout(showError.timeoutId);
  showError.timeoutId = setTimeout(() => {
    box.classList.add("hidden");
  }, 4000);
}

function validateFields(values) {
  for (const [label, value] of Object.entries(values)) {
    if (value === "" || value === null || value === undefined) {
      return `${label} is required.`;
    }
  }
  return null;
}

async function handleJsonResponse(res) {
  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }
  if (!res.ok) {
    const msg = data.error || data.message || "Unexpected error occurred";
    throw new Error(msg);
  }
  return data;
}

/* ---------- Departments ---------- */

function setupDepartmentForm() {
  const form = document.getElementById("department-form");
  const resetBtn = document.getElementById("department-reset");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("department-id").value;
    const name = document.getElementById("department-name").value.trim();
    const description = document
      .getElementById("department-description")
      .value.trim();

    const error = validateFields({ "Department name": name });
    if (error) {
      showError(error);
      return;
    }

    const payload = { name, description };

    try {
      let res;
      if (id) {
        res = await fetch(`${API_BASE}/departments/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE}/departments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      await handleJsonResponse(res);
      form.reset();
      document.getElementById("department-id").value = "";
      await loadDepartments();
    } catch (err) {
      console.error(err);
      showError(err.message);
    }
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    document.getElementById("department-id").value = "";
  });
}

async function loadDepartments() {
  try {
    const res = await fetch(`${API_BASE}/departments`);
    const departments = await handleJsonResponse(res);
    renderDepartments(departments);
    populateDepartmentSelect(departments);
  } catch (err) {
    console.error(err);
    showError("Unable to load departments.");
  }
}

function renderDepartments(departments) {
  const tbody = document.getElementById("departments-table-body");
  tbody.innerHTML = "";

  if (!departments.length) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 3;
    td.textContent = "No departments yet. Add one above.";
    td.style.fontStyle = "italic";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  departments.forEach((dept) => {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = dept.name;

    const descTd = document.createElement("td");
    descTd.textContent = dept.description || "";

    const actionsTd = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "small";
    editBtn.addEventListener("click", () => fillDepartmentForm(dept));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "small danger";
    deleteBtn.addEventListener("click", () => deleteDepartment(dept._id));

    actionsTd.appendChild(editBtn);
    actionsTd.appendChild(deleteBtn);

    tr.appendChild(nameTd);
    tr.appendChild(descTd);
    tr.appendChild(actionsTd);

    tbody.appendChild(tr);
  });
}

function fillDepartmentForm(dept) {
  document.getElementById("department-id").value = dept._id;
  document.getElementById("department-name").value = dept.name;
  document.getElementById("department-description").value =
    dept.description || "";
}

async function deleteDepartment(id) {
  if (!confirm("Delete this department?")) return;
  try {
    const res = await fetch(`${API_BASE}/departments/${id}`, {
      method: "DELETE",
    });
    const data = await handleJsonResponse(res);
    console.log(data);
    await loadDepartments();
    await loadEmployees();
  } catch (err) {
    console.error(err);
    showError(err.message);
  }
}

function populateDepartmentSelect(departments) {
  const select = document.getElementById("employee-department");
  const current = select.value;
  select.innerHTML = '<option value="">-- None --</option>';

  departments.forEach((dept) => {
    const opt = document.createElement("option");
    opt.value = dept._id;
    opt.textContent = dept.name;
    select.appendChild(opt);
  });

  if (current) {
    select.value = current;
  }
}

/* ---------- Employees ---------- */

function setupEmployeeForm() {
  const form = document.getElementById("employee-form");
  const resetBtn = document.getElementById("employee-reset");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("employee-id").value;
    const payload = {
      firstName: document.getElementById("employee-firstName").value.trim(),
      lastName: document.getElementById("employee-lastName").value.trim(),
      email: document.getElementById("employee-email").value.trim(),
      phone: document.getElementById("employee-phone").value.trim(),
      role: document.getElementById("employee-role").value.trim(),
      department: document.getElementById("employee-department").value || null,
      isActive: document.getElementById("employee-isActive").checked,
    };

    const hireDateValue = document.getElementById("employee-hireDate").value;
    if (hireDateValue) {
      payload.hireDate = hireDateValue;
    }

    const required = {
      "First name": payload.firstName,
      "Last name": payload.lastName,
      Email: payload.email,
    };
    const error = validateFields(required);
    if (error) {
      showError(error);
      return;
    }

    try {
      let res;
      if (id) {
        res = await fetch(`${API_BASE}/employees/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE}/employees`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      await handleJsonResponse(res);

      form.reset();
      document.getElementById("employee-id").value = "";
      document.getElementById("employee-isActive").checked = true;
      await loadEmployees();
    } catch (err) {
      console.error(err);
      showError(err.message);
    }
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    document.getElementById("employee-id").value = "";
    document.getElementById("employee-isActive").checked = true;
  });
}

async function loadEmployees() {
  try {
    const res = await fetch(`${API_BASE}/employees`);
    const employees = await handleJsonResponse(res);
    renderEmployees(employees);
  } catch (err) {
    console.error(err);
    showError("Unable to load employees.");
  }
}

function renderEmployees(employees) {
  const tbody = document.getElementById("employees-table-body");
  tbody.innerHTML = "";

  if (!employees.length) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 6;
    td.textContent = "No employees yet. Add one above.";
    td.style.fontStyle = "italic";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  employees.forEach((emp) => {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = `${emp.firstName} ${emp.lastName}`;

    const roleTd = document.createElement("td");
    roleTd.textContent = emp.role || "";

    const deptTd = document.createElement("td");
    deptTd.textContent = emp.department ? emp.department.name : "";

    const emailTd = document.createElement("td");
    emailTd.textContent = emp.email;

    const activeTd = document.createElement("td");
    const span = document.createElement("span");
    span.className = "badge " + (emp.isActive ? "badge-green" : "badge-red");
    span.textContent = emp.isActive ? "Active" : "Inactive";
    activeTd.appendChild(span);

    const actionsTd = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "small";
    editBtn.addEventListener("click", () => fillEmployeeForm(emp));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "small danger";
    deleteBtn.addEventListener("click", () => deleteEmployee(emp._id));

    actionsTd.appendChild(editBtn);
    actionsTd.appendChild(deleteBtn);

    tr.appendChild(nameTd);
    tr.appendChild(roleTd);
    tr.appendChild(deptTd);
    tr.appendChild(emailTd);
    tr.appendChild(activeTd);
    tr.appendChild(actionsTd);

    tbody.appendChild(tr);
  });
}

function fillEmployeeForm(emp) {
  document.getElementById("employee-id").value = emp._id;
  document.getElementById("employee-firstName").value = emp.firstName;
  document.getElementById("employee-lastName").value = emp.lastName;
  document.getElementById("employee-email").value = emp.email || "";
  document.getElementById("employee-phone").value = emp.phone || "";
  document.getElementById("employee-role").value = emp.role || "";
  document.getElementById("employee-department").value =
    emp.department?._id || "";
  document.getElementById("employee-isActive").checked = !!emp.isActive;

  if (emp.hireDate) {
    const d = new Date(emp.hireDate);
    const iso = d.toISOString().slice(0, 10);
    document.getElementById("employee-hireDate").value = iso;
  } else {
    document.getElementById("employee-hireDate").value = "";
  }
}

async function deleteEmployee(id) {
  if (!confirm("Delete this employee?")) return;
  try {
    const res = await fetch(`${API_BASE}/employees/${id}`, {
      method: "DELETE",
    });
    await handleJsonResponse(res);
    await loadEmployees();
  } catch (err) {
    console.error(err);
    showError(err.message);
  }
}

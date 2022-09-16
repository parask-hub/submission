let entries = [];
function sub(e) {
  e.preventDefault();
  let data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    dob: document.getElementById("dob").value,
    acceptTerm: !!document.getElementById("acceptTerm").value,
  };
  const dt = new Date();
  const dob = new Date(data.dob);
  let age = dt.getFullYear() - dob.getFullYear();

  if (
    dt.getMonth() < dob.getMonth() ||
    (dt.getMonth() === dob.getMonth() && dt.getDate() < dob.getDate())
  ) {
    age--;
  }
  if (!(age >= 18 && age <= 55)) {
    document.querySelector("#dob").setCustomValidity("Error");
    document.querySelector("#dob").reportValidity();
    return false;
  }
  entries.push(data);
  localStorage.setItem("users", JSON.stringify(entries));
  document.querySelector("table").appendChild(createUser(data));
}

function createUser(user) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.password}</td>
    <td>${user.dob}</td>
    <td>${user.acceptTerm}</td>
    
    `;
  return row;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("submit", sub);
  entries = JSON.parse(localStorage.getItem("users")) || [];
  for (let user of entries) {
    document.querySelector("table").appendChild(createUser(user));
  }
});

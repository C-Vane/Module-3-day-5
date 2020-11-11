window.onload = () => {
  datacontroller();
};
const url_users = "https://jsonplaceholder.typicode.com/users";
const get = (url) => {
  const response = fetch(url, {
    method: "GET",
  });
  return response;
};
let data = [];
async function getusers() {
  try {
    let users = await get(url_users);
    return await users.json();
  } catch (err) {
    console.error(err);
  }
}

const datacontroller = async () => {
  data = await getusers();
  let destination = document.getElementsByTagName("tbody")[0];
  data.forEach((element) => {
    destination.innerHTML += ` 
    <tr onclick="window.location='landingpage.html?id=${element.id}';">
    <th class="id" scope="row">${element.id}</th>
    <td class="name">${element.name}</td>
    <td class="phone">${element.phone}</td>
    <td class="username">${element.username}</td>
    <td class="website">${element.website}</td>
    <td class="email">${element.email}</td>
  </tr>`;
  });
  addressList();
  destination.parentElement.parentElement.appendChild(document.createTextNode("Users: " + displayNames()));
};
const searchUser = () => {
  const search = document.querySelector("#searchbox").value.toLowerCase();
  const searchby = "." + document.querySelector("#selectby").value;
  const users = document.querySelectorAll("tr");

  users.forEach((el) => (el.style.display = "table-row"));
  const search_user = Array.from(users)
    .slice(1)
    .filter((user) => !user.querySelector(searchby).innerText.toLowerCase().includes(search));
  search_user.forEach((el) => (el.style.display = "none"));
};
const filterUser = (event) => {
  const search = event.target.value;
  search.length > 2 ? searchUser() : document.querySelectorAll("tr").forEach((el) => (el.style.display = "table-row"));
};
const displayNames = () => {
  const users = document.querySelectorAll("table .name");
  let names = "";
  Array.from(users).forEach((user) => (names += user.innerText + ", "));
  return names;
};

const addressList = () => {
  let destination = document.querySelectorAll(".container")[1];
  let address = document.createElement("ul");
  let title = document.createElement("h4");
  title.innerText = "Users Address";
  let text = [];
  data.forEach((element) => text.push(Object.values(element.address).slice(0, 4).join(" , ")));
  text.forEach((element) => (address.innerHTML += `<li>${element}</li>`));
  destination.appendChild(title);
  destination.appendChild(address);
};

const sortAZ = (event) => {
  const names = [];
  Array.from(document.querySelectorAll("table .name")).forEach((name) => names.push(name.innerText));
  let button = event.target;
  button.classList.remove("bnt-info");
  button.classList.add("btn-warning");
  button.innerText = "Sort Z-A";
  button.setAttribute("onclick", "sortZA(event)");
  displaySorted(names.sort());
};
const sortZA = (event) => {
  const names = [];
  Array.from(document.querySelectorAll("table .name")).forEach((name) => names.push(name.innerText));
  let button = event.target;
  button.classList.add("bnt-info");
  button.classList.remove("btn-warning");
  button.innerText = "Sort A-Z";
  button.setAttribute("onclick", "sortAZ(event)");
  displaySorted(names.sort().reverse());
};
const displaySorted = (names) => {
  const users = document.querySelectorAll("tr");
  const destination = users[1].parentElement;
  let sorted_list = [];
  names.forEach((el) =>
    sorted_list.push(
      Array.from(users)
        .slice(1)
        .filter((user) => el === user.querySelector(".name").innerText)
    )
  );
  sorted_list.forEach((user) => {
    destination.appendChild(user[0]);
  });
};

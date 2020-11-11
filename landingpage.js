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
let userdata = [];
async function getusers() {
  try {
    let users = await get(url_users);
    return await users.json();
  } catch (err) {
    console.error(err);
  }
}

const datacontroller = async () => {
  let data = await getusers();
  let params = new URLSearchParams(document.location.search.substring(1));
  const id = params.get("id");
  let destination = document.getElementsByTagName("section")[0];
  data.forEach((element) => {
    element.id == id
      ? (destination.innerHTML = ` <h1>${element.name}</h1> 
        <div class="card mb-3">
  <div class="row no-gutters">
    <div class="col-md-6">
    <iframe 
    height="100%"
    width="100%"
    frameborder="0" 
    scrolling="yes" 
    marginheight="0" 
    marginwidth="0" 
    src="https://maps.google.com/maps?q=${Number(element.address.geo.lat)},${Number(element.address.geo.lng)}&hl=es&z=14&amp;output=embed"
   >
   </iframe>
    </div>
    <div class="col-md-6">
      <div class="card-body">
        <h5 class="card-title"> User: ${element.name}</h5>
       <ul>
       <li> Id: ${element.id} </li>
       <li> Name: ${element.name} </li>
       <li> Email: ${element.emial} </li>
       <li> Phone: ${element.phone} </li>
       <li> User Name: ${element.username} </li>
       <li> Website: ${element.website}</li>
       <li> <ul>
        <h6 class="m-1">Address:</h6>
       <li> City:  ${element.address.city}, ${element.address.street}, ${element.address.suite}, (${element.address.zipcode}) </li>
       </ul></li>
       <li> <ul>
        <h6 class="m-1">Company:</h6>
       <li class="font-weight-bold"">${element.company.name}</li>
       <li> <i class="text-muted"> ${element.company.catchPhrase}</i></li>
       <li> Business: ${element.company.bs} </li>
       </ul></li>
       </ul>
      </div>
    </div>
  </div>
</div>
       `)
      : console.log(element.id === id);
  });
  console.log(destination.innerHTML);
};

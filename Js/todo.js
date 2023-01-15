//show username and if no user logout
document.addEventListener("DOMContentLoaded", () => {
  const o = Object.assign({}, JSON.parse(localStorage.getItem('userData')));
  nulinis.innerHTML = o.userName ?? ``;
  if (!o.userName) {
    alert('No Access. Please Log in');
    window.location.href = "login.html";}
    setTimeout(() => {
      viewData();
    }, 1000);
});


//data view filter

function filter() {
  let value = document.getElementById("searchInput").value.toUpperCase();
  var names = document.getElementById("names");
  var rows = names.getElementsByTagName("tr");

  for (i = 0; i < rows.length; i++) {
    let column = rows[i].getElementsByTagName("td")[1];
    let language = column.textContent;

    rows[i].style.display =
      language.toUpperCase().indexOf(value) > -1 ? "" : "none";
  }
}
document.getElementById("searchInput").addEventListener("keyup", filter);

//view all for one user

const userID = JSON.parse(localStorage.getItem('localUserId'));
const userViewFormSbmBtn = document.querySelector("#user-view-submit");

const url = "https://localhost:7134/GetAllNotificationsForUser/"+userID.userID;
  const options = {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + window.localStorage.getItem('token')
    },
  };
  const response = {};
  function viewData() {
    fetch(url, options)
      .then((response) => response.json())
      .then((a) => {
         let visiDuomenys = "";
      a.forEach((element) => {
        let filtruojamiDuomuo 
        = `<tr><td> ${element.notificationID}</td>
               <td>${element.topic}</td>
               <td>${element.message}</td>
     
      </tr>`;
        tarpas = `<hr>`;
        visiDuomenys += tarpas;
        visiDuomenys += filtruojamiDuomuo;
  
      });
      names.innerHTML = visiDuomenys;
  })
  }


  userViewFormSbmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    viewData();
  });





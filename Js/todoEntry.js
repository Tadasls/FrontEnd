//prisijungimo duomenys

document.addEventListener("DOMContentLoaded", () => {
  const o = Object.assign({}, JSON.parse(localStorage.getItem('userData')));
  nulinis.innerHTML = o.userName ?? ``;
  //pirmas.innerHTML = o.regUserName ?? ``;
 // antras.innerHTML = o.regUserLastname ?? ``;
  //trecias.innerHTML = o.regUserName ??``;
 // setTimeout(() => {
   // viewData();
 // }, 1000);
});




//validacijos
const arUzpyldytiVartDuomenis = () => {
  if (!type.value) return false;
  if (!content.value) return false;
  if (!endDate.value) return false;
  return true;
};

const arUzpildytiIdData = () => {
  if (!id.value) return false;
  return true;
};

//create new

const userForm = document.querySelector("#user-edit-form");
const userFormSbmBtn = document.querySelector("#user-create-submit");
const user = JSON.parse(localStorage.getItem("UserData"));

function createData() {
  let data = new FormData(userForm);
  let obj = {};

  data.forEach((value, key) => {
    obj[key] = value;
  });
  obj["userId"] = user.ID;

  // fetch("https://testapi.io/api/Tadasls/resource/TLSusersDuomenys",
  fetch("https://localhost:7125/api/data/create",
   {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((obj) => console.log(obj.json()))
    .catch((error) => console.log(error));
}

userFormSbmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (arUzpyldytiVartDuomenis()) {
    createData();
    setTimeout(() => {
      viewData();
    }, 1000);
  } else {
    {
      window.alert("Duomenis nėra pilnai užpildyti");
    }
  }
});

//view all for one user


const userViewFormSbmBtn = document.querySelector("#user-view-submit");

  const url = "https://localhost:7134/api/Entry/GetAllEntries";
  const options = {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const response = {};
  
  function viewData() {
    fetch(url, options)
      .then((response) => response.json())
      .then((a) => {
         console.log(a);
         let visiDuomenys = "";
  
      a.forEach((element) => {
        console.log(element);
        let filtruojamiDuomuo 
        = `<tr><td> ${element.entryID}</td>
               <td>${element.horseName}</td>
               <td>${element.riderFullName}</td>
     
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

//edit data

const dataForm = document.querySelector("#user-edit-form");
const dataFormSbmBtn = document.querySelector("#user-edit-form-submit");

function editData() {
  let data = new FormData(dataForm);
  let obj = {};

  data.forEach((value, key) => {
    obj[key] = value;
  });
  obj["userId"] = user.ID;

  const url =
    // "https://testapi.io/api/Tadasls/resource/TLSusersDuomenys/" + obj.id;
    "https://localhost:7125/api/data/update/" + obj.id;

  fetch(url, {
    method: "put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((obj) => {
      const res = obj.json();
      console.log(res);
      return res;
    })
    .catch((klaida) => console.log(klaida));
}

dataFormSbmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (arUzpyldytiVartDuomenis() && arUzpildytiIdData()) {
    irasasRastas2Edit = false;
    validateDataEditinimui();
    setTimeout(() => {
      viewData();
    }, 1000);
  } else {
    {
      window.alert("Duomenis nėra pilnai užpildyti");
    }
  }
});

//delete
const userDelForm = document.querySelector("#user-edit-form");
const userDelFormSbmBtn = document.querySelector("#user-delete-submit");

function sendDataDel() {
  let data = new FormData(userDelForm);
  let obj = {};

  data.forEach((value, key) => {
    obj[key] = value;
  });

  const urlDel =
    "https://localhost:7125/api/data/delete/" + obj.id;
    // "https://testapi.io/api/Tadasls/resource/TLSusersDuomenys/" + obj.id;
  const urlFetch =
    "https://localhost:7125/api/data/data/" + obj.id;
    // "https://testapi.io/api/Tadasls/resource/TLSusersDuomenys/" + obj.id;
  const optionsFetch = {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const optionsDel = {
    method: "delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  fetch(urlFetch, optionsFetch)
    .then((response) => response.json())
    .then((a) => {
      return fetch(urlDel, optionsDel);
    })
    .then((obj) => {
      const res = obj; //.json()
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log(`Request failed with error: ${error}`);
    });
}

userDelFormSbmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (arUzpildytiIdData()) {
    if (confirm(`Ištrinti? ${id.value} Įrašą`) == true) {
      irasasRastas = false;
      validateDataTrynimiui();
    }
  } else {
    window.alert("Nėra pasirinktas trinamo elemento Id");
  }
});

add_actions.addEventListener("click", showForm);
function showForm() {
  document.getElementById("editforma").style.display =
    editforma.style.display == "none" ? "block" : "none";
}


//validacijos papildomai trinymui

const userON = JSON.parse(localStorage.getItem("UserData"));
// const url2 = "https://testapi.io/api/Tadasls/resource/TLSusersDuomenys";
const url2 = "https://localhost:7125/api/data/get";
const options2 = {
  method: "get",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
const response2 = {};

let irasasRastas = false;
function validateDataTrynimiui() {
  fetch(url2, options2)
    .then((response) => response.json())
    .then((informacija) => {
      for (const pranesimas of informacija) {
        if (pranesimas.userId === userON.ID) {
          if (pranesimas.id == id.value) {
            irasasRastas = true;
          }
        }
      }
      if (irasasRastas) {
        sendDataDel();
        window.alert("Įrašas ištrintas");
        setTimeout(() => {
          viewData();
        }, 1000);
      } else {
        window.alert("Tokio įrašo nėra");
      }
    });
}

//validacijos papildomai editui

let irasasRastas2Edit = false;
function validateDataEditinimui() {
  fetch(url2, options2)
    .then((response) => response.json())
    .then((informacija) => {
      for (const pranesimas of informacija) {
        if (pranesimas.userId === userON.ID) {
          if (pranesimas.id == id.value) {
            irasasRastas2Edit = true;
          }
        }
      }
      if (irasasRastas2Edit) {
        editData();

        window.alert("Įrašas pakoreguotas");
        setTimeout(() => {
          viewData();
        }, 1000);
      } else {
        window.alert("Tokio įrašo nėra");
      }
    });
}

//filtravimas

function filter() {
  let value = document.getElementById("searchInput").value.toUpperCase();
  var names = document.getElementById("names");
  var rows = names.getElementsByTagName("tr");

  for (i = 0; i < rows.length; i++) {
    let column = rows[i].getElementsByTagName("td")[2];
    let language = column.textContent;

    rows[i].style.display =
      language.toUpperCase().indexOf(value) > -1 ? "" : "none";
  }
}
document.getElementById("searchInput").addEventListener("keyup", filter);

//show username 
document.addEventListener("DOMContentLoaded", () => {
  const o = Object.assign({}, JSON.parse(localStorage.getItem('userData')));
  nulinis.innerHTML = o.userName ?? ``;
});
//meniu unhide
add_actions.addEventListener("click", showForm);
function showForm() {
  document.getElementById("editforma").style.display =
    editforma.style.display == "none" ? "block" : "none";
}

//data view filter
function filter() {
  let value = document.getElementById("searchInput").value.toUpperCase();
  var names = document.getElementById("names");
  var rows = names.getElementsByTagName("tr");

  for (i = 0; i < rows.length; i++) {
    let column = rows[i].getElementsByTagName("td")[3];
    let language = column.textContent;

    rows[i].style.display =
      language.toUpperCase().indexOf(value) > -1 ? "" : "none";
  }
}
document.getElementById("searchInput").addEventListener("keyup", filter);



//validation
const arUzpyldytiVartDuomenis = () => {
  if (!Title.value) return false;
  if (!Place.value) return false;

  return true;
};
const arUzpildytiIdData = () => {
  if (!EventID.value) return false;
  return true;
};


// const Variables

const userID = JSON.parse(localStorage.getItem('localUserId'));
const userViewFormSbmBtn = document.querySelector("#user-view-submit");
const userFormSbmBtn = document.querySelector("#user-create-submit");
const dataFormSbmBtn = document.querySelector("#user-edit-form-submit");
const userDelFormSbmBtn = document.querySelector("#user-delete-submit");
const dataForm = document.querySelector("#user-edit-form");
const errorEle = document.querySelector(".error-message");
const urlGet = "https://localhost:7134/api/Event/GetAllEvents";
const urlCreate = "https://localhost:7134/api/Event/CreateEvent";
const urlDel = "https://localhost:7134/api/Event/Event/delete/";
const urlUpdate = "https://localhost:7134/api/Event/Events/update/";


const optionsGet = {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + window.localStorage.getItem('token')
    },
  };
const optionsDel = {
    method: "delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + window.localStorage.getItem('token')
    },
};

const response = {};

//view all for one user
  function viewData() {
    fetch(urlGet, optionsGet)
      .then((response) => response.json())
      .then( async a => {
         console.log(a);
         let visiDuomenys = "";
  
      a.forEach((element) => {
     //   console.log(element);
        let filtruojamiDuomuo 
        = `<tr><td> ${element.eventID}</td>
               <td>${element.title}</td>
               <td>${element.place}</td>
               <td>${element.country}</td>

     
      </tr>`;
        tarpas = `<hr>`;
        visiDuomenys += tarpas;
        visiDuomenys += filtruojamiDuomuo;
  
      });
      names.innerHTML = visiDuomenys;
    })}
// view Button funtion
  userViewFormSbmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    viewData();
  });

//create new
function createData() {
  let data = new FormData(dataForm);
  let obj = {};
  data.forEach((value, key) => {
    obj[key] = value
});
  fetch(urlCreate,
   {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + window.localStorage.getItem('token')
    },
    body: JSON.stringify(obj),
  })
  .then(async res => {
    if(res.ok)
    {
      window.alert(`Data added `);
    }
    var resBody = await res.json();
    errorEle.textContent = resBody.message;
})
.catch((err) => console.log(err));
}
// add button function
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


//edit data implementation

function editData() {
  let data = new FormData(dataForm);
  console.log(data)
  let obj = {};

  data.forEach((value, key) => {
    obj[key] = value
});

  fetch(urlUpdate+obj.EventID, {
    method: "put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + window.localStorage.getItem('token')
    },
    body: JSON.stringify(obj),
  })
  .then(async res => {
    if(res.ok)
    {
      window.alert("data updated");
    }
   // console.log(res);
    var resBody = await res.json();
    errorEle.textContent = resBody.message;
})
.catch((err) => console.log(err));
}

dataFormSbmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (arUzpildytiIdData()) {
    editData();
    setTimeout(() => {
      viewData();
    }, 1000);
  } else {
    {
      window.alert("Form data is not fully entered");
    }
  }
});


//delete function
function sendDataDel() {
  let data = new FormData(dataForm);
  let obj = {};

  data.forEach((value, key) => {
    obj[key] = value;
  });
  fetch(urlGet, optionsGet)
    .then((response) => response.json())
    .then((a) => {
      return fetch(urlDel+obj.EventID, optionsDel);
    })
    .then((obj) => {
      const res = obj;
     // console.log(res)
      return res;
    })
    .catch((error) => {
      console.log(`Request failed with error: ${error}`);
    });
}

//delete button

userDelFormSbmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (arUzpildytiIdData()) {
    if (confirm(`Delete? ${EventID.value} entry`) == true) {
      sendDataDel();
      window.alert("data deleted");
      setTimeout(() => {
        viewData();
      }, 1000);
    }
  } else {
    window.alert("No such element with Id");
  }
});

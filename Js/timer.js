//show username and if no user logout
document.addEventListener("DOMContentLoaded", () => {
  const o = Object.assign({}, JSON.parse(localStorage.getItem('userData')));
  nulinis.innerHTML = o.userName ?? ``;

  if (!o.userName) {
    alert('No Access. Please Log in');
    window.location.href = "login.html";}

    const rol = Object.assign({}, JSON.parse(localStorage.getItem('role')));
   // console.log(rol.role)
    if (rol.role!==`admin`) {
   //   console.log(rol.role)
        alert('No Access. Just For Admins');
        window.location.href = "todo.html";}
});




var milliseconds = 0;
var seconds = 0;
var minutes = 0;
var timer;
var points = 0;

running = false;

function start() {
  if (this.running) {
    throw new Error("Stopwatch has already started.");
  } else 
  {
    startTimer();
    function startTimer() {
      running = true;
    timer = setInterval(function() {
        milliseconds++;
        if (milliseconds === 100) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        document.getElementById("timer").innerHTML = "Timer: " + minutes + " min " + seconds + " sec " + milliseconds + " millisec";
    }, 10);


  }

}
}


const dtPoints = document.querySelector('#Points');
const dtTime = document.querySelector('#Time');


function stopTimer() {
    clearInterval(timer);
    running = false;

    dtPoints.value = points?? ``;
    dtTime.value = seconds+minutes/60+milliseconds/100?? ``;
}

function resetTimer() {
    stopTimer();
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    points = 0;
    document.getElementById("timer").innerHTML = "Time: 0 min 0 sec 0 millisec";
    document.getElementById("points").innerHTML = "Penalty points: " + points;
    running = false;
}


function showPoints()
{
  points = points + 4 ;// magic number because penalties is always 4 points
  document.getElementById("points").innerHTML = "Penalty points: " + points;
};


function clearPoints(){
  points = points - 4 ;// magic number because penalties is always 4 points
 document.getElementById("points").innerHTML = "Penalty points: " + points;
};



//edit data implementation
const dataForm = document.querySelector("#user-edit-form");
const dataFormSbmBtn = document.querySelector("#user-edit-form-submit");

//const urlUpdate = "https://localhost:7134/api/Entry/Entrys/update/";
const urlUpdate = "https://localhost:7134/api/Entry/EntryAdmin/update/";
const errorEle = document.querySelector(".error-message");
var names = document.getElementById("names");

const value1 = points.valueOf;
const value2 = seconds.valueOf;

function editData() {
  let data = new FormData(dataForm);
  let obj = {};

  data.forEach((value, key) => {
    obj[key] = value
});
  fetch(urlUpdate+obj.EntryID,{
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
      viewData(EntryID);
    }
    var resBody = await res.json();

    errorEle.textContent = resBody.message;
})
.catch((err) => console.log(err));
}


// mygtukas siusti duomenis
dataFormSbmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (arUzpyldytiVartDuomenis()) {editData();} 
  else  { window.alert("Duomenis nėra pilnai užpildyti");}
  });

  // viewData(EntryID);

//validation
const arUzpyldytiVartDuomenis = () => {
  if (!EntryID.value) return false;
  if (!CId.value) return false;
  if (!Points.value) return false;
  if (!Time.value) return false;
  return true;
};

const arUzpyldytasID = () => {
  if (!EntryID.value) return false;
  return true;
};



//view one for one user
const urlGet = "https://localhost:7134/api/Entry/Entry/";
const userViewFormSbmBtn = document.querySelector("#user-view-submit");

const optionsGet = {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + window.localStorage.getItem('token')
    },
  };

const response = {};
let filtruojamiDuomuo = "";
function viewData(entryID) {
  fetch(urlGet+entryID.value, optionsGet)
    .then((response) => response.json())
    .then( a => {

      let filtruojamiDuomuo = 
        `<tr><td> ${a.entryID}</td>
             <td>${a.horseID}</td>
             <td>${a.riderID}</td>
             <td>${a.cId}</td>
             <td>${a.points}</td>
             <td>${a.time}</td>
    </tr>`;
    names.innerHTML = filtruojamiDuomuo;

    });
 
  }
 // view Button funtion
userViewFormSbmBtn.addEventListener("click", (e) => {
  e.preventDefault();
viewData(EntryID);
  });
localStorage.clear();
sessionStorage.clear();

start();
function start() {
    const laikrodis = setInterval(showTime, 1000);
  }

  function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    // am_pm = "AM";
  
    // if (hour > 12) {
    //   hour -= 12;
    //   am_pm = "PM";
    // }
    // if (hour == 0) {
    //   hr = 12;
    //   am_pm = "AM";
    // }
  
    // hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
  
    let currentTime = " Dabartinis laikas " + hour + ":" + min + ":" + sec; // + " " + am_pm;
    document.getElementById("laikrodis").innerHTML = currentTime;
  }





//view list of all events
const userViewFormSbmBtn = document.querySelector("#user-view-submit");

  const url = "https://localhost:7134/api/Event/GetAllEvents";
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
        = `<tr><td> ${element.place}</td>
               <td>${element.title}</td>
               <td>${element.country}</td>
     
      </tr>`;
        tarpas = `<hr>`;
        visiDuomenys += tarpas;
        visiDuomenys += filtruojamiDuomuo;
  
      });
      names.innerHTML = visiDuomenys;
  })
  }



  document.addEventListener("DOMContentLoaded", () => {
   
   setTimeout(() => {
     viewData();
   }, );
  });







//filtravimas

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
  
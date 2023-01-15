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


  const url = "https://localhost:7134/api/Entry/EntriesEager2";
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
         let allDataToShow = "";
         a.forEach((element) => {
          let parent =`
          <br>
          <tr>
          <tr bgcolor="lightblue">
                           <td>${element.eventID}</td>
                           <td>${element.place}</td>
                           <td>${element.title}</td>
                           <td>${element.organizer}</td>
                           </tr>`;
          allDataToShow += parent;
          let allChildsTableStart = `<tr><td colspan="4">
                                        <table><thead><tr>
                                       <tr bgcolor=#f0bead>
                                        <th>No</th>
                                        <th>Arena</th>
                                        <th>Title</th>
                                        <th>Article</th>
                                        <th>Class</th>
                                        
                                        </tr></thead><tbody>`
          allDataToShow += allChildsTableStart;
          element.competitions.forEach((competition) => {
              let child = `<tr></t>
                                   <td>${competition.number}</td><p>
                                   <td>${competition.arenaType}</td><p>
                                   <td>${competition.title}</td><p>
                                   <td>${competition.article}</td><p>
                                   <td>${competition.class}</td><p>
                            </tr>`;
              allDataToShow += child;
            });
          let allChildsTableEnd = `</tbody></table></td></tr>`          
          allDataToShow += allChildsTableEnd;
      });
      names.innerHTML = allDataToShow;
      })
  }

  document.addEventListener("DOMContentLoaded", () => {
   setTimeout(() => {
     viewData();
   }, );
  });

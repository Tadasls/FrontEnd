//prisijungimo duomenys

document.addEventListener("DOMContentLoaded", () => {
    const o = Object.assign({}, JSON.parse(localStorage.getItem('userData')));
    nulinis.innerHTML = o.userName ?? ``;
   // setTimeout(() => {
     // viewData();
   // }, 1000);
  });
  








var milliseconds = 0;
var seconds = 0;
var minutes = 0;
var timer;

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



function stopTimer() {
    clearInterval(timer);
    running = false;
}

function resetTimer() {
    stopTimer();
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    document.getElementById("timer").innerHTML = "Time: 0 min 0 sec 0 millisec";
    running = false;
}
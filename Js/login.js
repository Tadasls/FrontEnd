const loginForm = document.querySelector('#login-form');
const loginFormSbmBtn = document.querySelector('#login-form-submit');
const errorEle = document.querySelector(".error-message");



loginFormSbmBtn.addEventListener('click', (e) => {
  e.preventDefault(); 
  sendData();
})

function sendData() {
  let data = new FormData(loginForm);
  let obj = {};

  data.forEach((value, key) => {
      obj[key] = value
  });

const postURL = 'https://localhost:7134/api/User/login';

fetch(postURL, {
  method: 'post',
  headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(obj) 
})
.then(async res => {

  var resBody = await res.json();
 const userName = {userName: resBody.userName};
 const localUserId = {userID: resBody.id};
 const userRole = {role: resBody.role};

  window.localStorage.setItem('token', resBody.token);
  window.localStorage.setItem('userData', JSON.stringify(userName));
  window.localStorage.setItem('localUserId', JSON.stringify(localUserId));
  window.localStorage.setItem('role', JSON.stringify(userRole));

  if(res.ok)
  {
  
    window.alert(`Sveiki prisijunge ${JSON.stringify(resBody.userName)} `);
   window.location.href = "todo.html";
   sessionStorage.clear();
  } else {
    window.alert(`Toks vartotojas Neegzistuoja `);
     }


})

.catch((err) => console.log(err));
}


// saugoja Login formos  formos duomenis i laikina narsykles atminti

  const logUserName = document.querySelector('#UserName');
  const logPassWord = document.querySelector('#Password');

  const saveLogFormData = (key, value) => {
    const json = sessionStorage.getItem('SessionformData'); //nuskaitome rakta is sessionSorage
    const obj = JSON.parse(json); //nuskaityta string verciame i objekta
    const o = Object.assign({}, obj); //padarome objekta jeigu obj yra undefined
    o[key] = value; //pakeiciam o properti, jeigu tokio propercio objekte nera - sukuriamas naujas
    sessionStorage.setItem('SessionformData', JSON.stringify(o)); //graziname pakeistas reiksmes i sessionSorage
  };

  logUserName.addEventListener('change', (e) => {
    saveLogFormData('logUserName', e.target.value);
  });
  logPassWord.addEventListener('change', (e) => {
    saveLogFormData('logPassWord', e.target.value);
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const o = Object.assign({}, JSON.parse(sessionStorage.getItem('SessionformData')));
    logUserName.value = o.logUserName ?? ``;
    logPassWord.value = o.logPassWord ?? ``;
    
  });






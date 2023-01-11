
const arUzpyldytiDuomenis = () => {
  if (!regUserName.value) return false;
  if (!regPassword.value) return false;
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(regEmail.value)){ return (true)}
  else return false;
  return true;
};

///

const registrationForm = document.querySelector("#new-registration-form");
const registrationFormSbmBtn = document.querySelector("#new-registration-form-submit");
const errorEle = document.querySelector(".error-message");

registrationFormSbmBtn.addEventListener('click', (e) => {
  e.preventDefault(); 
  if(arUzpyldytiDuomenis())
  {
    sendData();
  } else { 
    window.alert('Duomenis nėra teisingai užpildyti');
  }
  


})



function sendData() {
    let data = new FormData(registrationForm);
    let obj = {};

    console.log(data);

    data.forEach((value, key) => {
        obj[key] = value
    });
    
    fetch('https://localhost:7134/api/User/register', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
               body: JSON.stringify(obj) 
    })
    .then(async res => {
        console.log(res.status);
              
        console.log(res);
        var resBody = await res.json();
        errorEle.textContent = resBody.message;
        if(res.ok)
        {
            window.alert(`vartotojas uzregistruotas ${Object.values(obj)}`);
            window.location.href = "login.html";
        }


    })

    .catch((err) => console.log(err));
}





//validacija nereikalinga nes atliekama backende, tik ar gauna pranesima matoma ?

function arEgzistuojaToksVartotojas() {
  let userExists = false
 
  // const url = 'https://testapi.io/api/Tadasls/resource/TLSusersDB';
  const url = 'https://localhost:7125/api/user/get';
  const options = {
      method: 'get',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }}
      fetch(url, options)
      .then((response) => response.json())
      .then((duomenys) => {
        for (const klientas of duomenys) {      
              if(klientas.userName.toLowerCase() === regUserName.value.toLowerCase() && 
                klientas.userLastname.toLowerCase() === regUserLastname.value && 
                klientas.userEmail === regUserEmail.value) 
              {userExists = true};
            }
              if(userExists){
                window.alert('Toks vartotojas Jau YRA Uzregistruotas');
                return false;
              }            
              else 
              {
                duomenuSiuntimasToDB();
                  return true;
              }
      })
      .catch(
                (klaida) => console.log(klaida)
        );
    }


// saugoja registracijos formos duomenis i laikina narsykles atminti

    const regUserName = document.querySelector('#UserName');
    const regFirstName = document.querySelector('#FirstName');
    const regLastName = document.querySelector('#LastName');
    const regPassword = document.querySelector('#Password');
    const regRole = document.querySelector('#Role');
    const regAdress = document.querySelector('#Adress');
    const regPhone = document.querySelector('#Phone');
    const regEmail = document.querySelector('#Email');
    const regLanguage = document.querySelector('#Language');

const saveFormData = (key, value) => {
  const json = sessionStorage.getItem('formData'); 
  const obj = JSON.parse(json); 
  const o = Object.assign({}, obj); 
  o[key] = value; 
  sessionStorage.setItem('formData', JSON.stringify(o)); 
};

regUserName.addEventListener('change', (e) => {
  saveFormData('regUserName', e.target.value);
});
regFirstName.addEventListener('change', (e) => {
  saveFormData('regFirstName', e.target.value);
});
regLastName.addEventListener('change', (e) => {
  saveFormData('regLastName', e.target.value);
});
regPassword.addEventListener('change', (e) => {
  saveFormData('regPassword', e.target.value);
});
regRole.addEventListener('change', (e) => {
  saveFormData('regRole', e.target.value);
});
regAdress.addEventListener('change', (e) => {
  saveFormData('regAdress', e.target.value);
});
regPhone.addEventListener('change', (e) => {
  saveFormData('regPhone', e.target.value);
});
regEmail.addEventListener('change', (e) => {
  saveFormData('regEmail', e.target.value);
});
regLanguage.addEventListener('change', (e) => {
  saveFormData('regLanguage', e.target.value);
});

//uzpildo duomenis is formos, jei puslapis buvo perkrautas

document.addEventListener('DOMContentLoaded', () => {
  const o = Object.assign({}, JSON.parse(sessionStorage.getItem('formData')));
  regUserName.value = o.regUserName ?? ``;
  regFirstName.value = o.regFirstName ?? ``;
  regLastName.value = o.regLastName ?? ``;
  regPassword.value = o.regPassword ?? ``;
  regRole.value = o.regRole ?? ``;
  regAdress.value = o.regAdress ?? ``;
  regPhone.value = o.regPhone ?? ``;
  regEmail.value = o.regEmail ?? ``;
  regLanguage.value = o.regLanguage ?? ``;


});







  
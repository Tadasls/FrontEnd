const dishCreateForm = document.querySelector('#create-form');
const dishCreateFormSbmBtn = document.querySelector('#create-form-submit');
const errorEle = document.querySelector(".error-message");

function sendData() {
    let data = new FormData(dishCreateForm);
    let obj = {};

    console.log(data);

    data.forEach((value, key) => {
        obj[key] = value
    });

    fetch('https://localhost:7068/api/Reservation/CreateReservation', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
        // Naudojame JSON.stringify, nes objekte neturim .json() metodo
        body: JSON.stringify(obj) 
    })
    .then(async res => {
        console.log(res.status);
        console.log(window.localStorage.getItem('token'));

        if(res.ok)
        {
            // If success
            //window.location.href = "./index.html";
        }
    })
    .catch((err) => console.log(err));
}

dishCreateFormSbmBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Breaks manual refresh after submit
    sendData();
})



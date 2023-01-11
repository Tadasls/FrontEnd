const url = 'https://localhost:7134/api/Horse/Horses';
const options = {
    method: 'get'
}

const response = {};

function loadData() {
    fetch(url, options)
    .then((response) => response.json())
    .then((a) => {
        console.log(a);
        const menuContainer = document.getElementById('menu-items');
        let htmlMenuItem = '';

        a.forEach(element => {
            console.log(element);
            let htmlElement = 
            `<article class="menu-item">
                <section class="menu-item-picture">
                    <img src="placeholder-150.bmp" alt="placeholder image">
                </section>
                <section class="menu-item-info">
                    <section class="menu-item-name">
                        <h3>${element.horseName}</h3>
                    </section>
                    <section class="menu-item-desc">
                      ŽirgoID:   ${element.horseID} 
                      Žirgo veislė  ${element.breed} 
                      Žirgo Lytis  ${element.gender} 
                      Žirgo Spalva  ${element.color} 
                      </section>
                    <section class="menu-item-price">
                        Savininkas: ${element.ownerName}
                    </section>
                </section>
            </article>`;
            htmlMenuItem += htmlElement;
        });

        menuContainer.innerHTML = htmlMenuItem;
    })
}

loadData();
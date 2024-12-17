/*
    Crea una interfaz web para gestionar los pedidos de cócteles. Esta interfaz debe cumplir los siguientes requisitos:

    Usa fetch para obtener los datos de todos los tragos con ron a partir de la API: https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum
    Usa el componente card de bootstrap para mostrarlos en tu interfaz.
    Cada una de las tarjetas debe incluir un botón para añadir al carrito.
    El carrito se debe almacenar en una cookie.
    Usa un componente offcanvas de bootstrap para mostrar el contenido del carrito al pulsar un botón.
    Botón para generar un pdf con el pedido/factura a partir de los datos del carrito.
*/
function createNode(element) {
    return document.createElement(element);
}

function append(parent, child) {
    return parent.appendChild(child);
}

const drinks = document.getElementById('cocteles');
const api = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum';

fetch(api)
    .then((resp) => resp.json())
    .then(function (data) {
        console.log(data)
        let cocteles = data.drinks
        cocteles.map(element => {
            /*
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="..." alt="Card image cap">
                <div class="card-body">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
            */
            let div = createNode("div")
            div.setAttribute('style', 'width: 18rem;')
            div.classList.add(
                "card",
                "m-5",
                
            )
            let img = createNode("img")
            img.setAttribute("src", element.strDrinkThumb)
            img.setAttribute("alt", element.strDrink)
            img.classList.add(
                "card-img-top"
            )
            let divbody = createNode("div")
            divbody.classList.add(
                "card-body"
            )
            let title = createNode("h5")
            title.innerHTML = element.strDrink
            title.classList.add(
                "card-title"
            )
            let button = createNode("button")
            button.innerHTML = "Añadir al carrito"
            button.setAttribute("id", element.idDrink)
            button.classList.add(
                "btn", 
                "btn-primary"
            )
            append(div, img)
            append(divbody, title)
            append(div, divbody)
            append(divbody, button)
            append(drinks, div)
        })
    })
    .catch(function (error) {
        console.log(error);
    });

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
const api = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum';


fetch(api)
    .then((resp) => resp.json())
    .then(function (data) {
        let cocteles = data.drinks
        let container = createNode("div")
        container.classList.add(
            "container"
        )
        document.body.appendChild(container)
        let div_cocteles = createNode("div")
        div_cocteles.setAttribute("id", "cocteles")
        div_cocteles.classList.add(
            "row",
            "row-cols-3"
        )
        append(container, div_cocteles)
        cocteles.map(element => {
            let div = createNode("div")
            div.setAttribute('style', 'width: 18rem;')
            div.classList.add(
                "card",
                "m-5",
                "col",
                "p-0",
                "shadow"
            )
            let img = createNode("img")
            img.setAttribute("src", element.strDrinkThumb)
            img.setAttribute("alt", element.strDrink)
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
            button.setAttribute("value", element.idDrink)
            button.setAttribute("id", element.strDrink)
            button.classList.add(
                "btn",
                "btn-primary"
            )
            append(div, img)
            append(divbody, title)
            append(div, divbody)
            append(divbody, button)
            append(document.getElementById("cocteles"), div)
        })
        const botones = document.getElementById("cocteles").getElementsByTagName("button")
        for (let i = 0; i < botones.length; i++) {
            botones[i].addEventListener("click", function () {
                if (localStorage.getItem('cocteles') != null) {
                    let cocteles = JSON.parse(localStorage.getItem('cocteles')) 
                    console.log(typeof(cocteles))
                    cocteles.push(this.id)
                    localStorage.setItem("cocteles", JSON.stringify(cocteles))
                } else {
                    localStorage.setItem("cocteles", JSON.stringify([this.id]))
                }
                location.reload()
            });
        }
        if (localStorage.getItem('cocteles') != null) {
            let locastoragetruco = JSON.parse(localStorage.getItem('cocteles')) 
            locastoragetruco.forEach(element => {
                let coctel = createNode("li")
                coctel.innerHTML = element
                document.getElementById("localS").append(coctel)
            });
        }
    })
    .catch(function (error) {
        console.log(error);
    });
    
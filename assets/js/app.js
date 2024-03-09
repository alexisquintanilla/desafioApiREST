$(document).ready(function () {
    // variables
    const btnBuscar = $("#formulario")
    const textForm = $("#textForm")
    const resultado = $("#resultado")
    // boton de busqueda
    btnBuscar.on("submit", function (e) {
        e.preventDefault()

        //CONECTAR APIREST

        $.ajax({
            url: `https://www.superheroapi.com/api.php/4905856019427443/${textForm.val()}`,
            method: "GET",
            success(data) {

                // recoleccion de datos para grafico
                const dataPoints = [
                    { y: data.powerstats.intelligence, label: "Intelligence" },
                    { y: data.powerstats.strength, label: "strength" },
                    { y: data.powerstats.speed, label: "speed" },
                    { y: data.powerstats.durability, label: "durability" },
                    { y: data.powerstats.power, label: "power" },
                    { y: data.powerstats.combat, label: "combat" },

                ]
                // impresion en dom de la biografia del heroe
                resultado.html(`
                    <h3 class="text-center">Super Héroe Encontrado</h3>
                    <div class="card">
                        <img src="${data.image.url}"
                            class="card-img-top" alt="...">
                        <div class="card-body">
        
                            <h5 class="card-title">Nombre : ${data.name}</h5>
                            <p class="card-text">Conexiones: ${data.connections["group-affiliation"]}
                              ${data.connections["relatives"]}</p>
                            <div class="ms-4">
                                <p class="my-2">Publicado por : ${data.biography.publisher} </p>
                                <hr class="my-0">
                                <p>Ocupación : ${data.work.occupation}</p>
                                <hr class="my-0">
                                <p>Primera Aparición : ${data.biography["first-appearance"]}</p>
                                <hr class="my-0">
                                <p>Altura : ${data.appearance.height}</p>
                                <hr class="my-0">
                                <p>Peso : ${data.appearance.weight}</p>
                                <hr class="my-0">
                                <p>Alianza : ${data.biography.aliases}</p>
        
                            </div>
        
                        </div>
                    </div>

                             
                `)
                // variable para imprimir grafico
                const chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light2", // "light1", "light2", "dark1", "dark2"
                    animationEnabled: true,
                    title: {
                        text: "Estadisticas de Poder de -heroe-"
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}%",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y}%",
                        dataPoints: dataPoints
                    }]
                });

                chart.render();

            },
            error(e) {
                console.error("CONEXION CON PROBLEMAS" + e.statusCode)

            }
        })


    })

})
//Revisar las promesas, callbacks métodos async y keyword await

let dataTable // Variable para almacenar la dataTable
let dataTableIsInitialized = false //variable para saber si la datatable ya esta inicializada

//Parámetros del dataTable:
const dataTableOptions = {
    //scrollX: "2000px", //si es tienes mucha data, permite colocar un scroll para desplazarse
    //propiedad para definir las columnas(nombre de la clase, y target = que columnas quiero que sean afectadas con el classname)
    columnDefs: [
        {className: "centered",targets: [0,1,2,3,4,5,6]},
        {orderable: false, targets: [5,6]},
        {searchable: false, targets: [0,2,3,4,5,6]} // para que la opción buscar solo busque en la primera columna
        //{width: "30%", targets: [0]} //para ajustar el ancho de las columnas
    ],
    lengthMenu: [5,10,15,20], // Para modificar el número de registros a mostrar en el combo llamando mostrar registros 
    pageLength: 3,
    destroy: true, //para que sea destruido
    language: {
        "processing": "Procesando...",
        "lengthMenu": "Mostrar _MENU_ registros",
        "zeroRecords": "No se encontraron resultados",
        "emptyTable": "Ningún dato disponible en esta tabla",
        "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
        "infoFiltered": "(filtrado de un total de _MAX_ registros)",
        "search": "Buscar:",
        "infoThousands": ",",
        "loadingRecords": "Cargando...",
        "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
        },
        "aria": {
            "sortAscending": ": Activar para ordenar la columna de manera ascendente",
            "sortDescending": ": Activar para ordenar la columna de manera descendente"
        }
    }
}

//función que permite inicializar la datatable
const initDataTable = async() => {
    //Cuando necesitamos recrear una tabla(es decir volver a cargarla, refrescarla porque se ha actualizado, etc.) primero se debe destruir 
    //La dataTable se debe destuir para volver a crearla
    if(dataTableIsInitialized) {
        dataTable.destroy() //Si la datatable está inicializada la destruimos para volver a cargarla
    }

    await listUsers()
    /* Otra forma
    dataTable = $("#datatable_users").DataTable({
        Colocar los parámetros dentro
    })
    */
    dataTable = $("#datatable_users").DataTable(dataTableOptions) //colocamos nuestros parámetros declarados en nuestra variable datatableOptions
    dataTableIsInitialized = true
}   

//Función q lista los usuario de la api de jsonplaceholder
const listUsers = async() => {
    try {
        // debemos utilizar user y los campos exacmente como se ha escrito, crtl + click para ver la data a consumir y ver sus campos
        //Fetch es la nueva forma que usa javascript, para trabajar de manera asíncrona(si refrescar la página) Es decir sin utilizar ajax
        const response = await fetch("https://jsonplaceholder.typicode.com/users") 
        const users = await response.json();

        let content = ``;
        
        users.forEach((user, index) => {
            content += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.address.city}</td>
                            <td>${user.company.name}</td>
                            <td><i class="fa-solid fa-check" style="color:green"></i></td>
                            <td>
                                <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
                                <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                            </td>
                        </tr>
            `
        });
        /* como es un id(del tbody) ya no es necesario referenciarlo con document.getelementbyid 
        ya en las nuevas versiones de js lo reconoce, lo referencia directamente*/
        tableBody_users.innerHTML = content

    } catch (error) {
        alert(error)
    }
}

window.addEventListener("load", async() => {
    await initDataTable();
})
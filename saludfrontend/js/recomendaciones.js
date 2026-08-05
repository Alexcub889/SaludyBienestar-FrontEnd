document.addEventListener("DOMContentLoaded",()=>{
    const tablarecomendaciones=document.getElementById("tablarecomendaciones");
    const id= sessionStorage.getItem("id");
    const crear_rec=document.getElementById("crear_rec");


    function quitarguion(data){
        return data.map(r=>r.replaceAll("_"," ")).join(", ");
    }
    
    
    async function cargarlista(){
            const resp=await fetch(`${API_BASE}/recommendations/${id}`,{
                method:"GET",
                headers: { "Content-Type": "application/json"},
            });
            const datos=await resp.json();

            tablarecomendaciones.innerHTML="";
                tablarecomendaciones.innerHTML+= `
                            <tr>
                            <td>${quitarguion(datos.alimentacion.recomendados)}</td>
                            <td>${quitarguion(datos.alimentacion.restringidos)}</td>
                            <td>${quitarguion(datos.ejercicio)}</td>
                            <td>${quitarguion(datos.descanso)}</td>
                            </tr>`;

            
    }

//no se implemento
    // crear_rec.addEventListener("click",async ()=>{

    //     let get= await fetch(`${API_BASE}/profiles/${id}`,{
    //             method:"GET",
    //             headers: { "Content-Type": "application/json"},
    //         });
            
    //         const datos=await get.json();

    //             let res= await fetch(`${API_BASE}/recommendations`,{

    //             method:"POST",
    //             headers:{"Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                         condiciones: datos.condiciones,
    //                         nivel_actividad: datos.nivel_actividad,
    //                         objetivo: datos.objetivo,
    //                         nivel_estres: datos.nivel_estres
    //             })
    //         });


    //         let data= await res.json();
    //         //revisa que la api mande un 200
    //         if(res.ok){
    //             alert("Nuevas recomendaciones generadas");
    //             location.reload();
    //         }
    //         else{
    //             //mostrar el error\
    //             console.log(data);
    //         }
    //});


    cargarlista();
});
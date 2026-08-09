document.addEventListener("DOMContentLoaded",()=>{
        const form_progreso=document.getElementById("form_progreso");
        const id= sessionStorage.getItem("id");
        const tablaprogreso=document.getElementById("tablaprogreso");


        async function cargarlista(){
            const resp=await fetch(`${API_BASE}/progress/${id}`,{
                method:"GET",
                headers: { "Content-Type": "application/json"},
            });
            const datos=await resp.json();
            tablaprogreso.innerHTML="";
            datos.forEach(e => {
                tablaprogreso.innerHTML+= `
                            <tr>
                            <td>${e.peso}</td>
                            <td>${e.horas_sueno}</td>
                            <td>${e.actividad_realizada}</td>
                            <td>${e.fecha_registro}</td>
                            </tr>`;
            });
            
    }





        form_progreso.addEventListener("submit",async a=>{
            a.preventDefault();


            let res= await fetch(`${API_BASE}/progress`,{
                method: "POST",
                headers:{"Content-Type":"Application/json"},
                body: JSON.stringify({
                    usuario_id: id,
                    peso: peso.value,
                    horas_sueno:horas_sueno.value,
                    actividad_realizada:actividad_realizada.value
                })

            
            });

            let data= await res.json();
            //revisa que la api mande un 200
            if(res.ok){
                alert("registro exitoso");
            }
            else{
                alert("Datos invalidos, intentelo de nuevo");
            }
        });

        cargarlista();
});




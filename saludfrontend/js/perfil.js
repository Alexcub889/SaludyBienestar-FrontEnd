document.addEventListener("DOMContentLoaded",()=>{
    const form_regperfil=document.getElementById("form_regperfil");
    const id= sessionStorage.getItem("id");
    const tablaperfilactual=document.getElementById("tablaperfilactual");
    const tablaperfiles=document.getElementById("tablaperfiles");

    let l_condiciones=[];

        form_regperfil.btncondiciones.onclick=() =>{
            addcondiciones(form_regperfil.condiciones.value);
            };
        


        function quitarguion(data){
        return data.replaceAll("_"," ");
        }



        function convert_estres(){
            //creo que ahorita solo existe alto_estres, los otros dan error
            let estres;
            if(form_regperfil.nivel_estres.value=="1"){
                estres="alto_estres";
            }else if(form_regperfil.nivel_estres.value=="2"){
                estres="moderado_estres";
            }else{
                estres="bajo_estres";
            }
            return estres;
        }

        function convert_objetivo(){
            let objetivo;
            switch(form_regperfil.objetivo.value){
                case "1":
                    objetivo="perdida_peso";
                break;

                case "2":
                    objetivo="ganancia_muscular";
                break;
                
                case "3":
                    objetivo="mejora_cardiovascular";
                break;

                case "4":
                    objetivo="reduccion_estres";
                break;

                case "5":
                    objetivo="mantenimiento";
                break;

                default:
                    objetivo="mantenimiento";
            }
            console.log(objetivo);
            return objetivo;
        }

        function addcondiciones(condicion){
        if(form_regperfil.condiciones.value.length===0){
            alert("Digite una condicion");
        }else{
            l_condiciones.push(condicion);
            document.getElementById("cond_label").textContent=`${l_condiciones}`;
        }

    }
            async function cargaractual(){
                const resp=await fetch(`${API_BASE}/profiles/${id}`,{
                    method:"GET",
                    headers: { "Content-Type": "application/json"},
                });
                const datos=await resp.json();
                tablaperfilactual.innerHTML="";
                
                    tablaperfilactual.innerHTML+= `
                                <tr>
                                <td>${datos.nivel_actividad}</td>
                                <td>${quitarguion(datos.objetivo)}</td>
                                <td>${quitarguion(datos.nivel_estres)}</td>
                                <td>${datos.alergias}</td>
                                <td>${datos.fecha_registro}</td>
                                <td>${datos.condiciones}</td>
                                </tr>`;
                
            
    }

        async function cargarperfiles(){
            const resp=await fetch(`${API_BASE}/profiles/${id}/history`,{
                method:"GET",
                headers: { "Content-Type": "application/json"},
            });
            const datos=await resp.json();
            tablaperfiles.innerHTML="";
            datos.forEach(e => {
                tablaperfiles.innerHTML+= `
                            <tr>
                            <td>${e.nivel_actividad}</td>
                            <td>${quitarguion(e.objetivo)}</td>
                            <td>${quitarguion(e.nivel_estres)}</td>
                            <td>${e.alergias}</td>
                            <td>${e.fecha_registro}</td>
                            <td>${e.condiciones}</td>
                            </tr>`;
            });
            
    }


    if(form_regperfil){
        form_regperfil.addEventListener("submit", async a=>{
            a.preventDefault();


            let res= await fetch(`${API_BASE}/profiles`,{
                method: "POST",
                headers:{"Content-Type":"Application/json"},
                body: JSON.stringify({
                    usuario_id: id,
                    nivel_actividad: nivel_actividad.value,
                    objetivo: convert_objetivo(),
                    nivel_estres: convert_estres(),
                    alergias: alergias.value,
                    condiciones: l_condiciones
                })
            
            
            });

            let data= await res.json();
            //revisa que la api mande un 200
            if(res.ok){
                //ir a index
                alert("Registro exitoso");
                //window.location.href="../paginas/login.html";
            }
            else{
                alert("Datos invalidos, intentelo de nuevo");
            }
        })
    }

    cargaractual();
    cargarperfiles();

});
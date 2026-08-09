document.addEventListener("DOMContentLoaded",()=>{
    const id= sessionStorage.getItem("id");
    const listahistorial=document.getElementById("listahistorial");
    const comparacionhistorial=document.getElementById("comparacionhistorial");
    const mensajecomparacion=document.getElementById("mensajecomparacion");
    const tablacomparacion=document.getElementById("tablacomparacion");
    const fechaanterior=document.getElementById("fechaanterior");
    const fechaactual=document.getElementById("fechaactual");


    function quitarguion(data){
        if(Array.isArray(data)){
            return data.map(r=>r.replaceAll("_"," ")).join(", ");
        }
        return data ? data.replaceAll("_"," ") : "";
    }

    function formatearfecha(fecha){
        return new Date(fecha).toLocaleString("es-ES",{dateStyle:"medium",timeStyle:"short"});
    }

    function filacomparacion(campo,valoranterior,valoractual){
        const clase = valoranterior!==valoractual ? "table-warning" : "";
        return `
                    <tr class="${clase}">
                    <td>${campo}</td>
                    <td>${valoranterior}</td>
                    <td>${valoractual}</td>
                    </tr>`;
    }

    function mostrarcomparacion(actual,anterior){
        fechaanterior.textContent = `Anterior (${formatearfecha(anterior.fecha_registro)})`;
        fechaactual.textContent = `Actual (${formatearfecha(actual.fecha_registro)})`;

        tablacomparacion.innerHTML="";
        tablacomparacion.innerHTML+=filacomparacion("Nivel de actividad",quitarguion(anterior.resultado_estructurado.perfil.nivel_actividad),quitarguion(actual.resultado_estructurado.perfil.nivel_actividad));
        tablacomparacion.innerHTML+=filacomparacion("Objetivo",quitarguion(anterior.resultado_estructurado.perfil.objetivo),quitarguion(actual.resultado_estructurado.perfil.objetivo));
        tablacomparacion.innerHTML+=filacomparacion("Nivel de estrés",quitarguion(anterior.resultado_estructurado.perfil.nivel_estres),quitarguion(actual.resultado_estructurado.perfil.nivel_estres));
        tablacomparacion.innerHTML+=filacomparacion("Condiciones",quitarguion(anterior.resultado_estructurado.perfil.condiciones),quitarguion(actual.resultado_estructurado.perfil.condiciones));
        tablacomparacion.innerHTML+=filacomparacion("Alimentos recomendados",quitarguion(anterior.resultado_estructurado.alimentacion.recomendados),quitarguion(actual.resultado_estructurado.alimentacion.recomendados));
        tablacomparacion.innerHTML+=filacomparacion("Alimentos restringidos",quitarguion(anterior.resultado_estructurado.alimentacion.restringidos),quitarguion(actual.resultado_estructurado.alimentacion.restringidos));
        tablacomparacion.innerHTML+=filacomparacion("Ejercicio",quitarguion(anterior.resultado_estructurado.ejercicio),quitarguion(actual.resultado_estructurado.ejercicio));
        tablacomparacion.innerHTML+=filacomparacion("Descanso",quitarguion(anterior.resultado_estructurado.descanso),quitarguion(actual.resultado_estructurado.descanso));
    }

    function tarjetahistorial(e){
        return `
                    <div style="background-color: rgb(189, 186, 186); border-radius: 10px; padding: 15px; margin-bottom: 15px; text-align: left;">
                    <h4>${formatearfecha(e.fecha_registro)}</h4>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Alimentos recomendados</th>
                                <th>Alimentos restringidos</th>
                                <th>Ejercicio</th>
                                <th>Descanso</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>${quitarguion(e.resultado_estructurado.alimentacion.recomendados)}</td>
                            <td>${quitarguion(e.resultado_estructurado.alimentacion.restringidos)}</td>
                            <td>${quitarguion(e.resultado_estructurado.ejercicio)}</td>
                            <td>${quitarguion(e.resultado_estructurado.descanso)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p><strong>Explicación:</strong> ${e.explicacion_humanizada}</p>
                    </div>`;
    }

    async function cargarhistorial(){
        const resp=await fetch(`${API_BASE}/recommendations/${id}/history`,{
            method:"GET",
            headers: { "Content-Type": "application/json"},
        });
        const datos=await resp.json();

        listahistorial.innerHTML="";
        if(datos.length===0){
            listahistorial.innerHTML="<p>Sin datos</p>";
        }else{
            datos.forEach(e=>{
                listahistorial.innerHTML+=tarjetahistorial(e);
            });
        }

        if(datos.length>=2){
            comparacionhistorial.style.display="";
            mensajecomparacion.style.display="none";
            mostrarcomparacion(datos[0],datos[1]);
        }else{
            comparacionhistorial.style.display="none";
            mensajecomparacion.style.display="";
        }
    }

    cargarhistorial();
});

//Esto maneja el login y registro
document.addEventListener("DOMContentLoaded",()=>{
        const form_login=document.getElementById("form_login");
        const form_registrar=document.getElementById("form_registrar");


    if(form_login){
        form_login.addEventListener("submit",async a=>{
            //Para que no recargue la pagina.
            a.preventDefault();

            let res= await fetch(`${API_BASE}/login`,{

                method:"POST",
                headers:{"Content-Type": "application/json"
                },
                body: JSON.stringify({
                            correo: correo.value,
                            password: password.value
                })
            });


            let data= await res.json();
            //revisa que la api mande un 200
            if(res.ok){
                window.location.href="../paginas/perfil.html";
                //Guarda el id para que se use en otros endpoints
                //Se borra automaticamente cuando se cierra la pagina
                sessionStorage.setItem("id",data.id);
            }
            else{
                alert("Usuario no reconocido");
            }
        });
    }

    if(form_registrar){
        form_registrar.addEventListener("submit", async a=>{

            a.preventDefault();

            let res= await fetch(`${API_BASE}/users`,{

                method:"POST",
                headers:{"Content-Type": "application/json"
                },
                body: JSON.stringify({
                            nombre: nombre.value,
                            correo: correo.value,
                            password: password.value
                })
            });


            let data= await res.json();
            //revisa que la api mande un 200
            if(res.ok){
                //volver a login
                alert("Registro exitoso");
                window.location.href="../paginas/login.html";
            }
            else{
                //mostrar el error
            }
        });
    }
});




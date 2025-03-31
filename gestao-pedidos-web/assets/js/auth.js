import checkAuhtentication from "./checkAuhtentication.js";

document.addEventListener('DOMContentLoaded',async function() {

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    await checkAuhtentication();
});

async function handleLogin(){
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const dados = {
        email: email,
        password: password
    }

    try {
         const response = await axios.post('http://localhost:3000/api/user/login', dados);
         localStorage.setItem('token', response.data.token)
        console.log(response.data.role)
         if(response.data.role === "admin"){
            window.location.href = "gestao_pedidos.html";
         }else{
            window.location.href = "pedidos.html";
         }
         
    } catch (error) {
        showError(error.response.data.error)
    }
    

}



function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000);
}
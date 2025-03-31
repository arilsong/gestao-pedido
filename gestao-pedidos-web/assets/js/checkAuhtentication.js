

async function checkAuthentication() {
    const currentPage = window.location.pathname.split('/').pop();

    const token = localStorage.getItem('token');
    let currentUser;

    if (!token && currentPage !== "login.html" && currentPage !== 'registro.html') {
        return window.location.href = "login.html"; 
    }

    
    // redirecionamentos especificos
    if (token) {
        try {
            const response = await axios.get('http://localhost:3000/api/user/get', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            currentUser = response.data;
        } catch (error) {
        console.log(error)
        }


        if (currentUser.role === 'admin' && (currentPage === 'pedidos.html' || currentPage === 'login.html' || currentPage === 'registro.html')) {
            return window.location.href = "gestao_pedidos.html";
        } else if (currentUser.role === 'user' && (currentPage === 'gestao_pedidos.html' || currentPage === 'login.html' || currentPage === 'registro.html')) {
            return window.location.href = "pedidos.html";
        }

    }
}

export default checkAuthentication;
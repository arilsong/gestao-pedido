import checkAuhtentication from "./checkAuhtentication.js";

document.addEventListener('DOMContentLoaded',  async function() {
    const token = localStorage.getItem('token');

    await checkAuhtentication()
    
    try {
        const response = await axios.get('http://localhost:3000/api/user/get', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const currentUser = response.data;
        
        document.getElementById('company-name').textContent = currentUser.name;

        // carega os pedidos recentes
        loadRecentOrders();
    
        // Configura o formulário de pedido
        document.getElementById('order-form').addEventListener('submit', function(e) {
            e.preventDefault();
            submitNewOrder();
        });
    } catch (error) {
        console.error(error);
    }

});

async function loadRecentOrders() {
    const response = await axios.get('http://localhost:3000/api/order/order-company', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });

    const orders = response.data.orders

    if(orders){
        const companyOrders = orders
        .slice(0, 5);

        renderRecentOrders(companyOrders);
    }
    }
   
   

function renderRecentOrders(orders) {
    const container = document.getElementById('recent-orders');
    container.innerHTML = '';
    
    if (orders.length === 0) {
        container.innerHTML = '<p class="no-orders">Nenhum pedido recente</p>';
        return;
    }
    
    orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-card';
        orderElement.innerHTML = `
            <div class="order-header">
                <h3>${order.tipo}</h3>
                <span class="order-date">${formatDate(order.data)}</span>
            </div>
            <div class="order-details">
                <p>${order.descricao}</p>
                <p class="order-value">Valor: ${order.valor.toFixed(2)} CVE</p>
                <span class="status-badge ${order.status.toLowerCase()}">${order.status}</span>
            </div>
        `;
        container.appendChild(orderElement);
    });
}

async function submitNewOrder() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const orderType = document.getElementById('order-type').value;
    const description = document.getElementById('order-description').value;
    const value = parseFloat(document.getElementById('order-value').value);
    
    if (!orderType || !description || isNaN(value)) {
        showNotification("Preencha todos os campos corretamente!");
        return;
    }
    
    const newOrder = {
        tipo: orderType,
	    descricao: description,
	    valor: value
    };

    try {  
        const response = await axios.post('http://localhost:3000/api/order', newOrder, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        showNotification("Pedido enviado com sucesso!");
        document.getElementById('order-form').reset();
        loadRecentOrders();
        
   } catch (error) {
        console.log(error)
        showError(error.response.data.error)
   }

}



function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

const logoutButtons = document.querySelectorAll('#logout');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('token');
            window.location.href = "login.html";
        });
    });
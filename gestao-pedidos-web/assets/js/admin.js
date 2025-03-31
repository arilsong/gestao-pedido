import checkAuhtentication from "./checkAuhtentication.js";

document.addEventListener('DOMContentLoaded', async function() {
    await checkAuhtentication()

    const token = localStorage.getItem('token');


   try {
        const response = await axios.get('http://localhost:3000/api/user/get', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const currentUser = response.data;

        document.getElementById('admin-name').textContent = currentUser.name;
   } catch (error) {
    console.log(error)
   }

    loadOrders();

    // configura os filtros
    document.getElementById('search').addEventListener('input', loadOrders);
    document.getElementById('filter-status').addEventListener('change', loadOrders);
});

async function loadOrders() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filterStatus = document.getElementById('filter-status').value;
    let orders;

    try {
        const response = await axios.get('http://localhost:3000/api/order/orders', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });

        orders = response.data.orders
    } catch (error) {
        console.log(error)
    }

        
    let filteredOrders = [...orders];
    // aplica filtro de status
    if (filterStatus !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.status === filterStatus);
    }
    
    // aplica pesquisa
    if (searchTerm) {
        filteredOrders = filteredOrders.filter(order => 
            order.companyName.toLowerCase().includes(searchTerm) || 
            order.tipo.toLowerCase().includes(searchTerm) ||
            order.descricao.toLowerCase().includes(searchTerm)
        );
    }
    
    
    renderOrders(filteredOrders);
    
    
}

function renderOrders(orders) {
    const tbody = document.querySelector('#orders-table tbody');
    tbody.innerHTML = '';
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="no-orders">Nenhum pedido encontrado</td></tr>';
        return;
    }
    
    orders.forEach(order => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${order.companyName}</td>
            <td>${order.tipo}</td>
            <td class="order-desc">${order.descricao}</td>
            <td>${order.valor.toFixed(2)} CVE</td>
            <td>${formatDate(order.data)}</td>
            <td><span class="status-badge ${order.status.toLowerCase()}">${order.status}</span></td>
            <td class="actions">
                ${order.status === 'pendente' ? 
                    `<button class="btn-approve" data-id="${order.id}">Aprovar</button>
                     <button class="btn-reject" data-id="${order.id}">Rejeitar</button>` : 
                    '<span class="processed">Processado</span>'}
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    // Adiciona eventos aos botões
    document.querySelectorAll('.btn-approve').forEach(btn => {
        btn.addEventListener('click', () => updateOrderStatus(btn.dataset.id, 'aprovado'));
    });
    
    document.querySelectorAll('.btn-reject').forEach(btn => {
        btn.addEventListener('click', () => updateOrderStatus(btn.dataset.id, 'rejeitado'));
    });
}

async function updateOrderStatus(orderId, newStatus) {

    try {
        const response = await axios.put(`http://localhost:3000/api/order/${orderId}`,{
            status: newStatus,
            processado: true
        }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });

        showNotification(`Pedido ${newStatus.toLowerCase()} com sucesso!`);
        loadOrders();

    } catch (error) {
        console.log(error)
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
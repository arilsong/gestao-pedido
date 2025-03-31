import checkAuhtentication from "./checkAuhtentication.js";

document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token');

    await checkAuhtentication();

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            registerCompany();
        });
    }

    // Configura o formulário de perfil
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        loadCompanyProfile();
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateCompanyProfile();
        });
    }
});

async function registerCompany() {
    const token = localStorage.getItem('token');

    const companyName = document.getElementById('companyName').value.trim();
    const companyNif = document.getElementById('companyNif').value;
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;


    if (password.length < 6) {
        showError("A senha deve ter pelo menos 6 caracteres!");
        return;
    }

    
    const novaEmpresa = {
        name : companyName,
        nif: companyNif,
        email : email,
        password : password,
    };

    try {
        const response = await axios.post('http://localhost:3000/api/user/register', novaEmpresa);

        showNotification("Empresa registrada com sucesso! Faça login.");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    } catch (error) {
        console.log(error)
        showNotification("Erro ao cadastrar empresa");
    }
    
    
}

async function loadCompanyProfile() {
    const token = localStorage.getItem('token');

    const response = await axios.get('http://localhost:3000/api/user/get', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const currentUser = response.data;
    console.log(currentUser)
    if (currentUser) {
        document.getElementById('company-name-input').value = currentUser.name;
        document.getElementById('company-id').value = currentUser.nif;
        document.getElementById('email').value = currentUser.email;
        document.getElementById('company-name').textContent = currentUser.name;
    }
}

async function updateCompanyProfile() {
    const companyName = document.getElementById('companyName').value.trim();
    const email = document.getElementById('email').value.trim();
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
        
    
    // Atualizar senha se fornecida
    if (newPassword) {
        if (newPassword !== confirmPassword) {
            showNotification("As senhas não coincidem!");
            return;
        }
    }

    const empresa = {
        name : companyName,
        email : email,
        currentPassword : currentPassword,
        newPassword: newPassword
    };

    try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:3000/api/user/get',{ empresa }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        showNotification("Perfil atualizado com sucesso!");
        
    } catch (error) {
        showNotification("Erro ao atulizar perfil");
    }
}

function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
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
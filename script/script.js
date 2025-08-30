// Dados dos serviços
const services = [
    { value: "Limpeza de Pele", text: "Limpeza de Pele" },
    { value: "Massagem Facial", text: "Massagem Facial" },
    { value: "Depilação a Laser", text: "Depilação a Laser" }
];

let appointments = [];

// Funções para manipulação do modal
const messageModal = document.getElementById('messageModal');
const modalMessage = document.getElementById('modalMessage');
const closeModalBtn = document.getElementById('closeModalBtn');

function showModal(message, isSuccess = true) {
    modalMessage.textContent = message;
    modalMessage.className = `text-lg font-semibold ${isSuccess ? 'text-green-600' : 'text-red-600'}`;
    messageModal.style.display = 'flex';
}

closeModalBtn.addEventListener('click', () => {
    messageModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === messageModal) {
        messageModal.style.display = 'none';
    }
});

// Função para renderizar agendamentos
function renderAppointments() {
    const appointmentsList = document.getElementById('appointments');
    if (!appointmentsList) return;

    appointmentsList.innerHTML = '';
    appointments.forEach((appointment, index) => {
        const li = document.createElement('li');
        li.className = 'bg-gray-50 p-4 rounded-md shadow-sm border-l-4 border-purple-400 flex justify-between items-center';
        li.innerHTML = `
            <div>
                <p class="font-bold text-gray-800">${appointment.clientName}</p>
                <p class="text-sm text-gray-600">${appointment.service}</p>
                <p class="text-xs text-gray-500">${appointment.date} às ${appointment.time}</p>
            </div>
            <button class="delete-btn bg-red-500 text-white text-xs px-2 py-1 rounded-md hover:bg-red-600 transition" data-index="${index}">
                Excluir
            </button>
        `;
        appointmentsList.appendChild(li);
    });

    // Adiciona evento de exclusão aos botões
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            appointments.splice(index, 1);
            renderAppointments();
            showModal('Agendamento excluído com sucesso!', true);
        });
    });
}

// Inicializa a lógica do formulário ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const scheduleForm = document.getElementById('scheduleForm');
    
    if (scheduleForm) {
        scheduleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const clientName = document.getElementById('clientName').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
    
            const newAppointment = {
                clientName,
                service,
                date,
                time
            };
    
            appointments.push(newAppointment);
            renderAppointments();
            e.target.reset(); // Reseta o formulário
            showModal('Agendamento realizado com sucesso!', true);
        });
    }

    renderAppointments();
});

// Função para mostrar o modal de mensagem
function showMessageModal(message) {
    const modal = document.getElementById('messageModal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

// Evento para fechar o modal
document.getElementById('closeModalBtn').addEventListener('click', () => {
    document.getElementById('messageModal').style.display = 'none';
});

// Evento para fechar o modal ao clicar fora dele
window.addEventListener('click', (event) => {
    const modal = document.getElementById('messageModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

const form = document.getElementById('scheduleForm');
const appointmentsList = document.getElementById('appointments');

// Array para armazenar os agendamentos (temporário, será substituído pelo Firestore)
let appointments = [];

// Função para renderizar os agendamentos na lista
function renderAppointments() {
    appointmentsList.innerHTML = '';
    // Ordenar agendamentos por data e hora
    appointments.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

    if (appointments.length === 0) {
        const li = document.createElement('li');
        li.className = 'text-gray-400';
        li.textContent = 'Nenhum agendamento encontrado.';
        appointmentsList.appendChild(li);
    } else {
        appointments.forEach(appt => {
            const li = document.createElement('li');
            li.className = 'bg-gray-700 p-4 rounded-lg flex justify-between items-center shadow-lg';
            li.innerHTML = `
                <div>
                    <p class="font-bold text-lg text-white">${appt.clientName}</p>
                    <p class="text-sm text-gray-300">Serviço: ${appt.service}</p>
                    <p class="text-sm text-gray-300">Data: ${appt.date}</p>
                    <p class="text-sm text-gray-300">Hora: ${appt.time}</p>
                </div>
            `;
            appointmentsList.appendChild(li);
        });
    }
}

// Evento de submit do formulário
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const clientName = document.getElementById('clientName').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Criar um novo objeto de agendamento
    const newAppointment = {
        clientName,
        service,
        date,
        time,
    };

    // Adicionar agendamento ao array (temporário)
    appointments.push(newAppointment);

    // Renderizar a lista atualizada
    renderAppointments();

    // Exibir mensagem de sucesso
    showMessageModal('Agendamento realizado com sucesso!');

    // Limpar o formulário
    form.reset();
});

// Inicializar a lista
renderAppointments();

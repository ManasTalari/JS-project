function displayUsers(users) {
    const userListDiv = document.querySelector('.user-list');
    userListDiv.innerHTML = '';

  if (!users || users.length === 0) {
        userListDiv.innerHTML = "<p>No users found.</p>";
        return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const headers = ["ID", "First Name", "Last Name", "Email", "Department", "Actions"];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name.split(' ')[0]}</td>
            <td>${user.name.split(' ')[1] || ''}</td>
            <td>${user.email}</td>
            <td>${user.company.name}</td>
            <td>
                <button class="edit-btn" data-id="${user.id}">Edit</button>
                <button class="delete-btn" data-id="${user.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    userListDiv.appendChild(table);
}


function clearForm() {
  document.getElementById('userId').value = "";
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('department').value = '';
}


function populateForm(user) {
    document.getElementById('userId').value = user.id;
    document.getElementById('firstName').value = user.name.split(' ')[0];
    document.getElementById('lastName').value = user.name.split(' ')[1] || "";
    document.getElementById('email').value = user.email;
    document.getElementById('department').value = user.company.name;

}

function displayError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function showModal(modal) {
  modal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}
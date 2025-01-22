document.addEventListener('DOMContentLoaded', () => {
    const userListDiv = document.querySelector('.user-list');
    const addUserBtn = document.getElementById('addUserBtn');
    const userModal = document.getElementById('userModal');
    const closeModalBtn = document.querySelector(".close");
    const userForm = document.getElementById('userForm');

    // Fetch and display users
    const loadUsers = async () => {
        try {
            const users = await getUsers();
            displayUsers(users);
        } catch (error) {
            displayError("Failed to load users. Please try again.");
        }
    };

    loadUsers();


    // Add User Modal
    addUserBtn.addEventListener('click', () => {
      clearForm();
      showModal(userModal);
      userModal.querySelector('h2').textContent = 'Add User';
    });

    // Close the modal
     closeModalBtn.addEventListener('click', () => {
      closeModal(userModal);
    });

  //Close on clicking outside modal
  window.addEventListener('click', (event) => {
      if(event.target === userModal) {
           closeModal(userModal);
      }
  })


    // Handle form submission
    userForm.addEventListener('submit', async (e) => {
       e.preventDefault();
      const userId = document.getElementById('userId').value;
      const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const department = document.getElementById('department').value;

      const user = {
          name: `${firstName} ${lastName}`,
          email: email,
          company: {
              name: department
          }
      };


      try {
        let apiResponse;
        if (userId) {
            apiResponse = await updateUser(userId, user);
           } else {
             apiResponse = await addUser(user)
         }

        closeModal(userModal);
        clearForm();
        loadUsers();
      } catch (error) {
         displayError("Failed to add/update user. Please try again.");
        }
    });


    // Event delegation for edit/delete buttons
    userListDiv.addEventListener('click', async (event) => {
      if (event.target.classList.contains('edit-btn')) {
        const userId = event.target.getAttribute('data-id');
         try {
           const users = await getUsers();
           const user = users.find(user => user.id === parseInt(userId));
           if(user) {
                populateForm(user);
                showModal(userModal);
               userModal.querySelector('h2').textContent = 'Edit User';
             }
         } catch (error) {
           displayError("Failed to fetch user data. Please try again.");
         }
      } else if (event.target.classList.contains('delete-btn')) {
        const userId = event.target.getAttribute('data-id');
         if (confirm("Are you sure you want to delete this user?")) {
           try {
                 await deleteUser(userId)
              loadUsers()
            } catch (error) {
              displayError("Failed to delete user. Please try again.");
            }
          }
        }
    });

});
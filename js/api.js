const API_URL = "https://jsonplaceholder.typicode.com/users";

async function getUsers() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch users:", error);
        throw error;
    }
}

async function addUser(user) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to add user:", error);
      throw error;
  }
}


async function updateUser(id, user) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
      if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
      console.error(`Failed to update user with ID ${id}:`, error);
      throw error;
  }
}

async function deleteUser(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
      if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response; // returns 200, or throw error if not
  } catch (error) {
        console.error(`Failed to delete user with ID ${id}:`, error);
      throw error;
  }
}
const API_URL = "http://localhost:8080";

const getHeaders = (token = null)=> ({
    'Content-Type': "application/json",
    Authorization: token ? token : ""
})

export const authenticateUser = data => {
    const url = `${API_URL}/login`
    return fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(response => response.json())
}

export const getDashboard = () => {
    const url = `${API_URL}/api/dashboard`;
    const token = localStorage.getItem('token');
    return fetch(url, {
        headers: getHeaders(token),
    }).then(response => response.json())
}

export const completeTask = id => {
    const url = `${API_URL}/api/tasks/${id}`;
    const token = localStorage.getItem('token');
    return fetch(url, {
        method: 'PUT',
        headers: getHeaders(token),
        body: JSON.stringify({ is_complete: true })
    }).then(response => response.json())
}

export const addTask = name => {
    const url = `${API_URL}/api/tasks`;
    const token = localStorage.getItem('token');
    return fetch(url, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify({ name })
    }).then(response => response.json())
}

export const deleteTask = id => {
    const url = `${API_URL}/api/tasks/${id}`;
    const token = localStorage.getItem('token');
    return fetch(url, {
        method: 'DELETE',
        headers: getHeaders(token),
    }).then(response => response.json())
}

export const updateTask = (id, name) => {
    const url = `${API_URL}/api/tasks/${id}`;
    const token = localStorage.getItem('token');
    return fetch(url, {
        method: 'PUT',
        headers: getHeaders(token),
        body: JSON.stringify({ name })
    }).then(response => response.json())
}
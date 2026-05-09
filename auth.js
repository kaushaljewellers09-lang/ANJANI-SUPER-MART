// Simple Admin Login (Password: admin123)
function checkAdminAccess() {
    const password = prompt('Admin Password:');
    if (password === 'admin123') {
        localStorage.setItem('isAdmin', 'true');
        return true;
    }
    alert('Wrong Password!');
    window.location.href = 'index.html';
}

// Check if admin on admin page
if (window.location.pathname.includes('admin.html') && localStorage.getItem('isAdmin') !== 'true') {
    window.location.href = 'login.html';
}

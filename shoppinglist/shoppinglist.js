import { checkAuth, fetchItems, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});


const items = await fetchItems();
console.log(items);
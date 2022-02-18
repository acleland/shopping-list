import { checkAuth, createItem, deleteAllItems, fetchItems, getUser, logout, toggleItem } from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const shoppingList = document.getElementById('shopping-list');
const addItemForm = document.getElementById('add-item');
const deleteButton = document.getElementById('delete');
const header = document.querySelector('header');

logoutButton.addEventListener('click', () => {
    logout();
});

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addItemForm);
    const item = formData.get('item');
    if (item) {
        await createItem(item);
        addItemForm.reset();
        displayItems();
    }
});

deleteButton.addEventListener('click', async () => {
    await deleteAllItems();
    displayItems();
});

async function displayItems() {
    shoppingList.innerHTML = '';
    const items = await fetchItems();
    
    for (let item of items) {
        const li = renderItem(item);
        li.addEventListener('click', async () => {
            await toggleItem(item);
            displayItems();
        });
        shoppingList.append(li);
    }
}

window.addEventListener('load', ()=> {
    displayItems();
    const loginEmail = getUser().email;
    const span = document.createElement('span');
    span.textContent = loginEmail;
    span.classList.add('loginEmail');
    header.prepend(span);
});

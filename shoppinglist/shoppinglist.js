import { checkAuth, fetchItems, logout, toggleItem } from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const shoppingList = document.getElementById('shopping-list');


logoutButton.addEventListener('click', () => {
    logout();
});


async function displayItems() {
    shoppingList.innerHTML = '';
    const items = await fetchItems();
    
    for (let item of items) {
        const li = renderItem(item);
        li.addEventListener('click', () => {
            toggleItem(item);
        });
        shoppingList.append(li);
    }
}


displayItems();
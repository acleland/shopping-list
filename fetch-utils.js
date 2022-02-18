const SUPABASE_URL = 'https://rkwuoifoqjtdyuamlqbt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrd3VvaWZvcWp0ZHl1YW1scWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQzNDE2MTAsImV4cCI6MTk1OTkxNzYxMH0.0bzW8RqDL090ne0FvaYqJLDBsUCtpfGm0oN6I-xwziw';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./shoppinglist');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

export async function fetchItems() {
    const resp = await client.from('shoppinglist').select('*').order('id');
    return checkError(resp);
}

export async function toggleItem(item) {

    const resp = await client.from('shoppinglist').update({ bought: !item.bought }).match({ id: item.id, user_id: getUser().id });
    return checkError(resp);
}

export async function createItem(item) {
    const resp = await client.from('shoppinglist').insert([{ item: item, user_id: getUser().id }]);
    return checkError(resp);
}

export async function deleteAllItems() {
    const resp = await client.from('shoppinglist').delete().match({ user_id: getUser().id });
    return checkError(resp);
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

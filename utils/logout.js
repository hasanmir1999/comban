export function logout() {
    document.cookie = "access_token=; max-age=0; path=/";
    window.location.replace('/login')
}

export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token').value;

    if (!token) {
        // If there's no token, redirect to the login page
        return navigateTo('/login');
    }

    // Optionally, you could verify the token here (e.g., decode and check its validity)
    // and handle cases where the token is expired or invalid.
});

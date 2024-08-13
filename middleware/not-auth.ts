export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log("is this running")
    const token = useCookie('token').value || ""

    try {
        const { data, success }: any = await $fetch('/auth/verify-token', {
            method: "POST",
            body: JSON.stringify({
                token
            })
        })
        console.log(success, data?.is_valid)
        if (success && data?.is_valid) return navigateTo('/')
    } catch (error) {
        console.error(error)
        // Handle error if needed
    }
})
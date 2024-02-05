import { getAuth } from "firebase/auth";

export default defineNuxtRouteMiddleware((to, from) => {

    const auth = getAuth();
    const user = auth.currentUser;
    if(user)  {
        console.log("dah login")
    }else{
        console.log("lom login")
        return navigateTo('/login')
    }
  })
  
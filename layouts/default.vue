<template>
    <div>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/profile">Profile</NuxtLink>
        <NuxtLink to="/login">Login</NuxtLink>
        <span @click="logout">Logout</span>
    </div>
    <slot />

</template>

<script setup>
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();

const logout=()=>{
signOut(auth).then((res) => {
    console.log(res,"success")
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
  console.log(error)
});
}


</script>
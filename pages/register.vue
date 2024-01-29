<template>

    <div class="login">
      <div class="login-core">
            <h1 class="my-4">Create an Account</h1>
            <div class="mb-3 w-75">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input v-model="email"  placeholder="Email" type="email" class="form-control w-100" id="exampleInputEmail1" aria-describedby="emailHelp">
                <label  for="exampleInputEmail1" class="form-label mt-3">Password</label>
                <input v-model="password" placeholder="Password" type="password" class="form-control w-100" id="exampleInputEmail1" aria-describedby="emailHelp">
           </div>
           <div class="w-75">
             <button  @click="register" type="button" class="w-100 btn btn-warning text-white">Sign Up</button>
           </div>
           <p class="mt-3">Or Login With</p>
           <div  @click="gmail"  class="login-google">
             <img src="~assets/google.png"  alt=""/>
           </div>
           <p class="mt-3">Have an account? <RouterLink to="/login">Sign In</RouterLink> </p>
      </div>
    </div>
    
  </template>
  
    <script setup>
      import { ref } from 'vue'
      // import firebase from 'firebase'
      import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, } from "firebase/auth";
      import { useRouter } from 'vue-router' // import router
      const email = ref('')
      const password = ref('')
      const router = useRouter() // get a reference to our vue router
      const auth = getAuth();

      definePageMeta({
        layout:"custom"
      })
     
  
      const register = () => {
        createUserWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("success login")
            console.log(user)
            router.push('/')
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
            // ..
          });
      }
    </script>
    
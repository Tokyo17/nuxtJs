<template>
       <div class="small-size">
    <div class="icon-alert">
            !
    </div>
    <div class="bingkai-alert">
        Harap membuka pada perangkat pc atau laptop karena aplikasi tidak didesain pada layar kecil
    </div>
   </div>

    <div class="login">
      <div class="login-core">
            <h1 class="my-4">Sign In First</h1>
            <div class="mb-3 w-75">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input v-model="email"  placeholder="Email" type="email" class="form-control w-100" id="exampleInputEmail1" aria-describedby="emailHelp">
                <label  for="exampleInputEmail1" class="form-label mt-3">Password</label>
                <input v-model="password" placeholder="Password" type="password" class="form-control w-100" id="exampleInputEmail1" aria-describedby="emailHelp">
           </div>
           <div class="w-75">
             <button :disabled='isLoading' @click="register" type="button" class="w-100 btn btn-primary">
              <span v-if="isLoading">
                <div class="spinner-border text-light" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </span>
              <span v-else>
                Sign In
              </span>
            </button>
           </div>
           <p class="mt-3">Or Login With</p>
           <div  @click="gmail"  class="login-google">
             <img src="~assets/google.png" alt=""/>
           </div>
           <p class="mt-3">Don'n have an account? <RouterLink to="/register">Sign Up</RouterLink> </p>
      </div>
    </div>
    
  </template>

  <style>
  @media screen and (max-width: 900px) {
.small-size{
    position: fixed;
    z-index: 999;
    bottom: 0;
    width: 100% !important;
    height: 100% !important;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.bingkai-alert{
    visibility: initial !important;
    display: flex;
    /* border: 1px solid; */
    width: 350px !important;
    height: 100px !important;
    justify-content: center;
    align-items: center;
    background: white;
    border-radius: 10px;
    box-shadow: 10px 9px 13px rgb(0 0 0 / 40%);
    text-align: center;
    padding: 20px;
} 
.icon-alert{
    visibility: initial !important;
    width: 50px    !important;
    height: 50px  !important;
    /* border: 1px solid; */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background:rgb(248, 175, 79);
    font-size: 40px;

    box-shadow: 4px 6px 9px rgb(0 0 0 / 40%);
    margin-bottom: 10px;
}
}

.bingkai-alert,.icon-alert{
    visibility: hidden;
    widows: 0;
    height: 0;
}

  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body{
    height: 100%;
  
  }

  #__nuxt{
    height: 100%;
    /* border: 1px solid; */
  }
  html{
    height: 100%;
    /* border: 1px solid; */
  }
  .login{
    /* border: 1px solid; */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .login a{
    color: black;
    font-weight: 600;
    text-decoration: revert;
  }
  .login-core{
    display: flex;
    align-items: center;
    flex-direction: column;
    /* border: 1px solid; */
    height:480px;
    width: 350px;
    border-radius: 10px;
    box-shadow: 1px 1px 5px rgb(0 0 0 / 60%);
  }
  .login-google{
    /* border: 1px solid; */
    cursor: pointer;
    box-shadow: 1px 1px 5px rgb(0 0 0 / 60%);
    width: 50px;
    height: 50px;
    padding: 10px;
    border-radius: 100%;

  }
  .login-google img{
    width: 100%;
  }
</style>
  
  <script setup>

    import { ref } from 'vue'
    import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, } from "firebase/auth";
    import { useRouter } from 'vue-router' // import router
import { useUserLoginStore } from '~/stores/state';
    const email = ref('')
    const isLoading = ref(false)
    const password = ref('')
    const router = useRouter() // get a reference to our vue router
    const auth = getAuth();
    const provider=new GoogleAuthProvider()
   

    definePageMeta({
        layout:"custom"
    })


    const storeLogin=useUserLoginStore()
    const {data}=storeToRefs(storeLogin)
    const {addUserLogin}=storeLogin

    const register = () => {
      isLoading.value=true
      console.log("loing")
      signInWithEmailAndPassword(auth, email.value, password.value)
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
          console.log(errorMessage)
          // ..
        }).finally(()=>{
          isLoading.value=false
        });
    }

  const gmail=()=>{
    // isLoading.value=true
    signInWithPopup(auth,provider)
    .then(result=>{
      console.log(result)
      router.push("/")
    })
    .catch(err=>{
      console.log(err)
    }).finally(()=>{
      // isLoading.value=false
    })
  }



  </script>
  
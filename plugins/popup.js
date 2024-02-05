import Swal from 'sweetalert2'
export default defineNuxtPlugin(()=>{
 const popup=()=> {  Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
      });}
})
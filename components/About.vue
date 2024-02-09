<template>

<div class="small-size">
    <div class="icon-alert">
            !
    </div>
    <div class="bingkai-alert">
        Harap membuka pada perangkat pc atau laptop karena aplikasi tidak didesain pada layar kecil
    </div>
   </div>

<div style="flex-direction: column;" class="center-all pt-4">
   <div class="mb-3">
        <button :disabled="isDelete>-1" @click="addHandle" type="button" class="btn btn-warning ">Tambah Data Mahasiswa</button>
        <button @click="logout" type="button" class="ms-1 btn btn-danger">Logout</button>
   </div>
    <table id="customers">
    <tr>
        <th>No</th>
        <th>Nama</th>
        <th>Usia</th>
        <th>Alamat</th>
        <th>Foto</th>
        <th>Action</th>
    </tr>
    <tr v-for="(data,index) in dataMahasiswa">
        <td>{{ index+1}}</td>
        <td>{{data.nama}}</td>
        <td>{{data.usia}}</td>
        <td>{{data.alamat}}</td>
        <td>
            <button @click="showFoto(data.foto)" type="button" class="btn btn-warning">Show</button>
        </td>
        <td>
            <button :disabled="isDelete>-1" @click="updateHandle(data)" type="button" class="btn btn-primary">Update</button>
            <button :disabled="isDelete>-1" style="width: 70px;" @click="deleteDataMahasiswa(data.id)" type="button" class="btn btn-danger">
            <span v-if="isDelete==data.id">
                <div style="width: 16px; height: 16px;" class="spinner-border text-light" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </span>
              <span v-else>
                Delete
              </span>
            </button>
        </td>
    </tr>
    </table>
</div>

    <div :class="{popupAdd:true,hiddenAdd:!showAddPopup}">
        <!-- <div @click="addHandle" class="close-popup-input center-all">
                X
            </div> -->
        <div class="bingkai">
            <p class="mx-3 my-2">Nama :</p>
            <input v-model="nama" class="form-control " type="text" placeholder="Tulis nama mahasiswa" aria-label="readonly input example">
            <p class="mx-3 my-2">Umur :</p>
            <input v-model="usia"  class="form-control" type="number" placeholder="Tulis umur mahasiswa" aria-label="readonly input example">
            <p class="mx-3 my-2">Foto :</p>
            <input ref="fileInput" @change="getFile"  accept="image/*"  class="form-control " type="file" id="formFile">
            <p class="mx-3 my-2">Alamat :</p>
            <textarea v-model="alamat" class="form-control " placeholder="Tulis alamat mahasiswa max 200 karakter" id="floatingTextarea2"></textarea>
            <div class="button-action-input">
                <button :disabled='isLoading' @click="updateOrAdd()" type="button" class="btn btn-primary">
                    <span v-if="isLoading">
                     <div style="width: 16px; height: 16px;" class="spinner-border text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                    </div>
                    </span>
                    <span v-else>
                        {{isUpdate?'Update':"Add"}}
                    </span>
                </button>
                <button :disabled="isLoading"  @click="addHandle" type="button" class="btn btn-danger">Cancle</button>
            </div>
        </div>
    </div>

    <div :class="{popupAdd:true,hiddenAdd:!showFotoPopup}">
        <div class="bingkai-foto">
            <div @click="showFoto" class="close-popup-input center-all">
                X
             </div>  
            <img :src="foto"/>
        </div>
    </div>


    <div v-if="showToast" id="liveToast" class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#007aff"></rect></svg>
      <strong class="me-auto">NuxtFeathers</strong>
    </div>
    <div class="toast-body">
      {{toastText }}
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

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}
.toast{
    position: fixed;
    right: 30px;
    bottom: 30px;
}
.center-all{
    display: flex;
    justify-content: center;
    align-items: center;
}
td button{
    margin: 5px;
}
.hiddenAdd{
    visibility: hidden;
    /* position: absolute; */
}

.popupAdd{
    background-color: rgba(0, 0, 0, 0.363);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.close-popup-input{
    width: 40px;
    height: 40px;
    background-color: #ffffff8a;
    position: absolute;
    right: 0;
    border-radius: 100%;
    cursor: pointer;
    height: 40px;
    position: absolute;
    right: 10px;
    width: 40px;
    top: 10px;
}
.bingkai{
    width: 400px;
    height: 430px;
    background: white;
    position: relative;
    padding: 20px;
    border-radius: 10px;
}
.bingkai-foto{
    max-width: 530px;
    max-height: 560px;
    background: white;
    position: relative;
    overflow-y: scroll;
    /* padding: 20px; */
    border-radius: 10px;
}
.bingkai-foto img{
    width: 100%;
}
.button-action-input{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}
.button-action-input button{
    margin: 5px;
}
</style>



<!-- ================= SCRIPT =================== -->

<script setup>
import { ref } from 'vue';
const fileInput=ref(null)
const FILE=ref(null)
const id=ref('')
const nama=ref('')
const alamat=ref('')
const foto=ref('')
const usia=ref('')
const toastText=ref("")
const isLoading=ref(false)
const isDelete=ref(-1)
const isUpdate=ref(false)
const showToast=ref(false)
const showAddPopup=ref(false)
const showFotoPopup=ref(false)
const dataMahasiswa=ref([])
const runtimeConfig = useRuntimeConfig();
import { getStorage,uploadBytes,uploadBytesResumable,getDownloadURL,ref as Ref} from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();
const storage=getStorage()
const route= useRouter()
const logout=()=>{
signOut(auth).then((res) => {
    console.log(res,"success")
    route.push('/login')
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
  console.log(error)
});
}

const showToastHandle=(text)=>{
    toastText.value=text
    showToast.value=true
    setTimeout(() => {
        showToast.value = false;
      }, 3000);
}


const kosongkan=()=>{
    isLoading.value=false
    // if (fileInput.value) {
        fileInput.value.value = null;
        fileInput.value = null;
        FILE.value=null
    // }
    id.value=''
    nama.value=""
    usia.value=""
    alamat.value=""
}

const getFile=(e)=>{
    // if(e.target.files[0].name){
    FILE.value=e.target.files[0]
    // }
    // console.log(fileInput.value.name)
}

const addHandle=()=>{
    showAddPopup.value=!showAddPopup.value
    isUpdate.value=false
}

const showFoto=(url)=>{
    showFotoPopup.value=!showFotoPopup.value
    foto.value=url
}

const updateHandle=(data)=>{
    console.log(data)
    id.value=data.id
    nama.value=data.nama
    usia.value=data.usia
    foto.value=data.foto
    alamat.value=data.alamat
    showAddPopup.value=!showAddPopup.value
    isUpdate.value=true
}

const updateOrAdd=()=>{

        if(isUpdate.value){
            isLoading.value=true
            if(!FILE.value){
                updateDataMahasiswa()
                console.log("FOTO KOSONG")
            }else{
                console.log("update dengan foto")
                firebaseUpload()
            }
        }else{
            if(!FILE.value||!nama.value||!usia.value||!alamat.value){
                   showToastHandle("Harap mengisi semua kolom dengan benar")
             }else{
                isLoading.value=true
                console.log("update dengan foto")
                firebaseUpload()
             }
        }
    
}

const getDataMahasiswa=async()=>{
    const res=await fetch(runtimeConfig.public.API+"/mahasiswa");
    const json=await res.json()
    dataMahasiswa.value=json
}

const updateDataMahasiswa=async(url)=>{
    console.log(FILE.value)
    let data
        if(FILE.value){
            data={
                nama:nama.value,
                usia:usia.value||null,
                foto:url,
                alamat:alamat.value,
            }
        }else{
          data=  {
                nama:nama.value,
                usia:usia.value||null,
                alamat:alamat.value,
            }
        }
    console.log(data)
    try{
        const res=await fetch(runtimeConfig.public.API+"/mahasiswa/"+id.value,
        {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        })
        getDataMahasiswa();
        addHandle()
        kosongkan()
        showToastHandle("Update data success")
    }catch(err){
        console.log(err)
    }
}

const firebaseUpload=async()=>{
    const random = Math.floor(Math.random() * 999)
    const namafile=FILE.value?.name+random
    console.log(FILE.value)

    const storageRef = Ref(storage, 'crud-mahasiswa/'+namafile);
        const uploadTask = uploadBytesResumable(storageRef, FILE.value);
     uploadTask.on('state_changed', 
        (snapshot) => {
        
        }, 
        (error) => {
            console.log(error)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            if(isUpdate.value){
                updateDataMahasiswa(downloadURL)
            }else{
                apiAddDataMahasiswa(downloadURL,namafile)
            }
            console.log(FILE.value)
            });
        }
     );
}

const apiAddDataMahasiswa=async(url,namafile)=>{

    try{
        const res=await fetch(runtimeConfig.public.API+"/mahasiswa",
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                nama:nama.value,
                usia:usia.value||null,
                foto:url||null,
                alamat:alamat.value,
                namafoto:namafile||null
            })
        })


        getDataMahasiswa();
        addHandle()
        kosongkan()
        showToastHandle("Tambah data success")
    }catch(err){
        console.log(err)
    }
}


const deleteDataMahasiswa=async(id)=>{
    isDelete.value=id
    try{
        const res= await fetch(runtimeConfig.public.API+"/mahasiswa/"+id,
        {
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        getDataMahasiswa();
        isDelete.value=-1
        showToastHandle("Delete success")
    }catch(err){
        console.log(err)
        isDelete.value=-1
    }
}

onMounted(()=>{
    getDataMahasiswa()
})
    

</script>

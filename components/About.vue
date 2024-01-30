<template>
    <!-- <button @click="addDataMahasiswa">ADD</button> -->
<div class="center-all mt-4">
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
            <button @click="showFotoHandle" type="button" class="btn btn-warning">Show</button>
        </td>
        <td>
            <button type="button" class="btn btn-primary">Update</button>
            <button @click="deleteDataMahasiswa(data.id)" type="button" class="btn btn-danger">Delete</button>
        </td>
    </tr>
    </table>
</div>

    <div :class="{popupFoto:true,hiddenFoto:!showFoto}">
        <div class="bingkai">
            <div @click="showFotoHandle" class="close-popup-input center-all">
                X
            </div>
            <p class="mx-3 my-2">Nama :</p>
            <input v-model="nama" class="form-control " type="text" placeholder="Tulis nama mahasiswa" aria-label="readonly input example">
            <p class="mx-3 my-2">Umur :</p>
            <input v-model="usia" class="form-control" type="text" placeholder="Tulis umur mahasiswa" aria-label="readonly input example">
            <p class="mx-3 my-2">Foto :</p>
            <input  class="form-control " type="file" id="formFile">
            <p class="mx-3 my-2">Alamat :</p>
            <textarea v-model="alamat" class="form-control " placeholder="Tulis alamat mahasiswa max 200 karakter" id="floatingTextarea2"></textarea>
            <div class="button-action-input">
                <button @click="addDataMahasiswa" type="button" class="btn btn-primary">Add</button>
                <button @click="showFotoHandle" type="button" class="btn btn-danger">Cancle</button>
            </div>
        </div>
    </div>

</template>

<style>
#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}
.center-all{
    display: flex;
    justify-content: center;
    align-items: center;
}
td button{
    margin: 5px;
}
.hiddenFoto{
    visibility: hidden;
}

.popupFoto{
    background-color: rgba(0, 0, 0, 0.363);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.close-popup-input{
    width: 40px;
    height: 40px;
    background-color: white;
    border: 1px solid;
    position: absolute;
    right: 0;
    transform: translate(10px, -30px);
    border-radius: 100%;
    cursor: pointer;
}
.bingkai{
    width: 400px;
    height: 430px;
    background: white;
    position: relative;
    padding: 20px;
    border-radius: 10px;
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

const nama=ref('')
const alamat=ref('')
const foto=ref('.jpg')
const usia=ref('')
const showFoto=ref(false)
const dataMahasiswa=ref([])
const runtimeConfig = useRuntimeConfig();



const showFotoHandle=()=>{
    showFoto.value=!showFoto.value
    console.log(showFoto.value)
}


const getDataMahasiswa=async()=>{
    const res=await fetch(runtimeConfig.public.API+"/mahasiswa");
    const json=await res.json()
    dataMahasiswa.value=json
}

const addDataMahasiswa=async()=>{
    try{
        const res=await fetch(runtimeConfig.public.API+"/mahasiswa",
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                nama:nama.value,
                usia:usia.value,
                foto:foto.value,
                alamat:alamat.value
            })
        })
        getDataMahasiswa();
        showFotoHandle()
    }catch(err){
        console.log(err)
    }
}

const deleteDataMahasiswa=async(id)=>{
    try{
        const res= await fetch(runtimeConfig.public.API+"/mahasiswa/"+id,
        {
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            // body:JSON.stringify({nama:"reza"})
        })
        getDataMahasiswa();
    }catch(err){
        console.log(err)
    }
}


    
onMounted(()=>{
    getDataMahasiswa()
})
    

</script>
<template>
    ini home
    {{ value }}
    <button @click="sum">+</button>
    <div v-for="item in datas">
       <p @click="addKeranjang(item)">{{ item.nama }} - Rp. {{ item.harga }}</p> 
    </div>
    <p>Keranjang :</p>
    <div v-for="item in dataKeranjang">
        <button @click="minKeranjang(item)">-</button>
        <span style="margin: 10px;"> {{ item.jumlah }} </span>
        <button style="margin-right: 5px;">+</button>
        <span> {{ item.nama }} - Rp. {{ item.totalHarga }}</span>
    </div>
</template>

<script setup>

import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

const storeCounter=useCounterStore()
const storeKeranjang=useKeranjangStore()

const {value}=storeToRefs(storeCounter)
const {dataKeranjang}=storeToRefs(storeKeranjang)

const {addKeranjang,minKeranjang}=storeKeranjang
const {sum}=storeCounter
const datas=ref([])



const get=async()=>{
    const res=await fetch("https://tes-mobile.landa.id/api/menus")
    const json=await res.json()
    datas.value=json.datas
}

onMounted(()=>{
    get()
    // const user = firebase.auth().currentUser;
    console.log(user)
})

</script>
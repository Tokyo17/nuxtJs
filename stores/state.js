import { defineStore } from "pinia";


export const useUserLoginStore = defineStore("userLogin",()=>{
    const data=ref()
    const addUserLogin=(value)=>{
        data.value=value
    }
    return{data,addUserLogin}
})

export const useCounterStore = defineStore("conter",()=>{
    const value=ref(0)
    const sum=()=>{
        value.value++
    }
    return{value,sum}
})

export const useKeranjangStore=defineStore("keranjang",()=>{
    const dataKeranjang=ref([])
    const addKeranjang=(value)=>{
        const {id}=value
        const indexItem=dataKeranjang.value.findIndex(item=>item.id===id)
        if(indexItem ==-1){
            value.jumlah=1
            value.totalHarga=value.harga
            dataKeranjang.value.push(value)
        }else{
            dataKeranjang.value[indexItem].jumlah+=1
            dataKeranjang.value[indexItem].totalHarga+=value.harga
        }
        console.log(JSON.parse(JSON.stringify(dataKeranjang.value)));
    }
    const minKeranjang=(value)=>{
        const {id,jumlah}=value
        const indexItem=dataKeranjang.value.findIndex(item=>item.id===id)
        console.log(jumlah)
       if(jumlah>=2){
         dataKeranjang.value[indexItem].jumlah-=1
       }else{
        dataKeranjang.value.splice(indexItem,1)
       }
    }
    return{dataKeranjang,addKeranjang,minKeranjang}
})
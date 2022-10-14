<template>
    <div class="cart-cont">
        <div v-if="totalCartsQty !== 0">
            <h1>Keranjang</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Gambar</th>
                        <th scope="col">Jenis Pesanan</th>
                        <th scope="col">Tipe</th>
                        <th scope="col">Jumlah</th>
                        <th scope="col">Harga</th>
                    </tr>
                </thead>
                <tbody class="table-info" v-for="(item) in carts" :key="item.idProduk">
                    <tr>
                        <td class="col-1">
                            <img :src="item.img_url" class="img-fluid"/>
                        </td>
                        <td>{{ item.nama }}</td>
                        <td>{{ item.tipe }}</td>
                        <td>{{ item.qty }}</td>
                        <td>Rp. {{ item.subTotal }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex justify-content-start">
                <h3>Total: Rp. {{ totalPrice }}</h3>
            </div>
            <router-link to="/">
                    <button type="button" class="btn btn-warning">Pilih produk lain</button>
            </router-link>
        </div>
        <div class="else text-center" v-else>
            <h1>Keranjang Masih Kosong</h1>
            <router-link to="/">
                <button type="button" class="btn btn-danger">Kembali ke Produk</button>
            </router-link>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {

    
    mounted() {
        console.log("Mounted")
    },
    computed: {
        ...mapGetters({
            allProduct: 'getAllProduct', // this is the function from store.js
            carts: 'getCarts',
            totalCartsQty: 'getTotalCartsQty',
            totalPrice: 'getTotalPrice'
        })
    },
    methods: {
        ...mapMutations({
            addToCart: 'addToCart', // this is the function from store.js
            removeFromCart: 'removeFromCart'
        }),
    }
}
</script>
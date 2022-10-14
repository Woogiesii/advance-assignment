import axios from "axios";
import { times } from "lodash";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        allProduct: [
            {
                id: 1,
                nama: "Netflix",
                tipe: "Sharing",
                qty: 20,
                carts_qty: 0,
                price: 30000,
                carts_price: 0,
                img_url: "https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI"
            },
            {
                id: 2,
                nama: "Prime Video",
                tipe: "Private",
                qty: 15,
                carts_qty: 0,
                price: 30000,
                carts_price: 0,
                img_url: "https://id-test-11.slatic.net/p/1f0feac18fbdaf45b63aaabae4ff3362.png"
            },
            {
                id: 3,
                nama: "Viu Premium",
                tipe: "Sharing",
                qty: 999,
                carts_qty: 0,
                price: 15000,
                carts_price: 0,
                img_url: "https://dl.memuplay.com/new_market/img/com.vuclip.viu.icon.2022-06-07-18-06-39.png"
            }
        ],
        carts: [],
        totalCartsQty: 0,
        totalPrice: 0
    },
    getters: {
        getAllProduct(state) {
            return state.allProduct
        },
        getCarts(state) {
            return state.carts
        },
        getTotalCartsQty(state) {
            return state.totalCartsQty
        },
        getTotalPrice(state) {
            return state.totalPrice
        }
    },
    mutations: {
        addToCart(state, id) {
            let produk = state.allProduct.find((item) => item.id == id);
            let cart = state.carts.find((item) => item.idProduk == id);

            produk.carts_qty++;
            produk.qty--;
            state.totalCartsQty++;

            if (!cart) {
                let cartItems = {
                    idProduk: produk.id,
                    nama: produk.nama,
                    tipe: produk.tipe,
                    price: produk.price,
                    img_url: produk.img_url,
                    qty: 1,
                    subTotal: produk.price,
                };
                state.carts.push(cartItems);
            } else {
                cart.qty++;
                cart.subTotal = cart.qty * cart.price;
            }
        },

        removeFromCart(state, id) {
            let produk = state.allProduct.find((item) => item.id == id);

            if (state.totalCartsQty > 0) {
                state.totalCartsQty--;
            } else {
                state.totalCartsQty = 0;
            }
            produk.qty++;
            produk.carts_qty--;

            state.carts.forEach((cart) => {
                if (cart.idProduk == id) {
                    if (cart.qty === 0) {
                        state.carts.splice(state.carts.indexOf(cart), 1);
                        console.log(cart.subTotal)
                    } else {
                        cart.qty -= 1;
                        cart.subTotal = cart.qty * cart.price;
                    }
                }
            });

        },

        triggerCheckout(state) {
            state.carts.forEach((cart) => {
                state.totalPrice += cart.subTotal;
            });
        }
    },
    actions: {
        getList(context) {
            let url = 'api/get_product'
            axios.get(url).then((response) => {
                context.commit('UPDATE_TODO', response.data)
            })
        },
        addToCart(id) {
            this.$store.commit("addToCart", id)
        },
        removeFromCart(id) {
            this.$store.commit("removeFromCart", id)
        },
        triggerCheckout(id) {
            this.$store.commit("triggerCheckout")
        }
    },
    modules: {

    }
})
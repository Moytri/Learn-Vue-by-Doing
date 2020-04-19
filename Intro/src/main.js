// vue instance is the root/heart of the vue application
// it is created by passing an options object into it
// options is used to store data and perfrom operation
// el is used to form a relation between Vue instance and part of the dom
// Vue instance is reactive
// if we update the value of the product, everywhere it is used will be updated
var app = new Vue({
 el: '#app', 
 data: {
    product: 'Socks',
    brand: 'Vue Mastery',
    description: 'It is a cotton Sock',
    //image: './assets/vmSocks-green.jpg',
    selectedVarient: 0,
    link: 'https://www.amazon.com/s?k=socks&ref=nb_sb_noss',
    inventory: 10,
    details: ["80% cotton", "20% polyster", "Gender-neutral"],
    varients: [
        {
            varientId: 2234,
            varientColor: 'green',
            varientImage: './assets/vmSocks-green.jpg'
        },
        {
            varientId: 2235,
            varientColor: 'blue',
            varientImage: './assets/vmSocks-blue.jpg'
        }
    ],
    sizes: ["XXL", "XL", "L", "M", "S"],
    cart: 0
 },

 methods: {
    addToCart: function() {
        this.cart += 1;
    },

    updateProduct: function(index) {
        this.selectedVarient = index;
    },
    
    decrementFromCart: function() {
        if (this.cart > 0) {
            this.cart -= 1;
        }       
    }
 },

 // like a calculated and they are cached
 // for the expessive operation computed is better than method 
 // beacuse do not need to re-run expessive operation frequently
 // https://codepen.io/GreggPollack/pen/KJOzoQ?editors=1010
 computed: {
    title() {
        return this.brand + ' ' + this.product;
    },
    image() {
        return this.varients[this.selectedVarient].varientImage;
    }
 }

})
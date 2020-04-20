
Vue.component('product-deatils', {
    props: {
        details: {
            type: Array,
            required: true,
        }
    },
    template: `<!--List Rendering v-for directive-->
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>`
})

Vue.component('product-review', {
    template: `
      <form class="review-form" @submit.prevent="onSubmit">

        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul v-for="error in errors">
                <li>{{ error }}</li>
            </ul>
        </p>
        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name">
        </p>
        
        <p>
          <label for="review">Review:</label>      
          <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>
        
        <p>
        Would you recommend this product?

        </p>
        <input type="radio" id="yes" value="Yes" v-model="recommend">
        <label for="yes">Yes</label>
        <br>
        <input type="radio" id="no" value="No" v-model="recommend">
        <label for="no">No</label>
        <p>
          <input type="submit" value="Submit">  
        </p>    
      
    </form>`,

    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: [],
            recommend: null
        }
    },

    methods:{
        onSubmit() {
            if (this.name && this.rating && this.review) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                this.$emit('review-submitted', productReview);
    
                this.name = null;
                this.review = null;
                this.rating = null;
            }
            else {
                if (!this.name) this.errors.push("Name is Required.");
                if (!this.review) this.errors.push("Review is Required.");
                if (!this.rating) this.errors.push("Rating is Required.");
            }
        }
    }
})

Vue.component('product', {
    props: {
        premium:{
            type: Boolean,
            required: true
        }
    },
    template: `<div class="product">

    <!-- Html Attribute: https://www.w3schools.com/html/html_attributes.asp
    v-bind:dynamically bind an attribute to an expression
    shorthand :src, :alt, :disabled, :href-->
    <div class="product-image">
        <!-- <img v-bind:src="image"> 
        instead of using image and change it using updateProduct(varient.varientImage), we can change image using computed property-->
        <img v-bind:src="image">
    </div>

    <div class="product-info">
        <!-- {{ }} is the expression -->
        <h1>{{ title }}</h1>
        <h2>{{ description }}</h2>
        <p>Shipping: {{ shipping }}</p>

        <!-- Conditionally Rendering v-if and v-show directive
        v-if is conditionally add and remove element in the dom
        on contrary v-show is not removing and adding element in the dom
        it is just toggoling between and hide and show element into dom-->
        <p v-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory<= 10 && inventory > 0">Almost Sold</p>
        <p v-else>Out of Stock</p>

        <product-deatils :details="details"></product-deatils>

        <!--Style Binding-->
        <div v-for="(varient, index) in varients" 
        :key="varient.varientId"
        class="color-box"
        :style="{ backgroundColor: varient.varientColor}"
        v-on:mouseover="updateProduct(index)"> 
        </div>

        <p v-if="inventory > 10 || inventory <= 10 && inventory > 0">
            Available Sizes:
            <ul>
                <li v-for="size in sizes">{{ size }}</li>
            </ul>
        </p>
        <a v-bind:href="link" target="_blank">More products</a>
        <br>

        <!--Event Handling e.g: @click, v-on:mouseover, @submit, @keyup.enter-->
        <!--Class Binding: https://codepen.io/GreggPollack/pen/YBmqaX-->
        <button v-on:click="addToCart"
        :class="{ disabledButton: inventory == 0 }">Add to Cart</button>
        <button @click="decrementFromCart">Decrement</button>
    </div>
    <div>
        <h2>Reviews</h2>
        <ul v-for="review in reviews">
           <li>Name: {{ review.name }} Review: {{ review.review }} Rating: {{ review.rating }} {{ review.recommend ? "Do you wan to recommend it: review.recommend" : null}}</li> 
        </ul>
    </div>
    <product-review @review-submitted="addReview"></product-review>
</div>`,
data() {
    return {
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
        reviews: []
    }
},

 methods: {
    addToCart: function() {
        this.$emit('add-to-cart', this.varients[this.selectedVarient].varientId);
    },

    updateProduct: function(index) {
        this.selectedVarient = index;
    },
    
    decrementFromCart: function() {
        this.$emit('remove-from-cart', this.varients[this.selectedVarient].varientId);
    },

    addReview: function(review) {
        this.reviews.push(review);
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
    },
    shipping() {
        return this.premium ? "Free" : "2.99"
    }
 }
})

// vue instance is the root/heart of the vue application
// it is created by passing an options object into it
// options is used to store data and perfrom operation
// el is used to form a relation between Vue instance and part of the dom
// Vue instance is reactive
// if we update the value of the product, everywhere it is used will be updated
var app = new Vue({
 el: '#app',
 data: {
    premium: true,
    cart: []
 },
 methods: {
    addToCart(id) {
        this.cart.push(id);
    },

    // better to remove or add with Id
    // https://codepen.io/GreggPollack/pen/JxgXvq
    decrementFromCart(id) {
        for(var i = this.cart.length - 1; i >= 0; i--) {
            if (this.cart[i] === id) {
                this.cart.splice(i, 1);
            }
        }
    }
 }
})
import Product from "./Products"
import data from "../data.json"
import { useState } from "react"





export default function App() {

    const newProducts = data.map(product => ({...product, quantity: 0}))
    const [productData, setProductData] = useState(newProducts)

     const [cartItems, setCartItems] = useState([])
    
    function addToCart(productName){
        const selectedProduct = productData.find(product => product.name === productName)

        if(selectedProduct.quantity > 0){

        
        setCartItems(prevItems => {
            const existingCartItem = prevItems.find(item => item.name === productName)
            if(existingCartItem) {
                return prevItems.map(item => item.name === productName ? {...item, quantity: item.quantity + 1} : item)
            } else{
                return [...prevItems, {...selectedProduct, quantity: 1}]
            }}
        )}
 } 

  function removeFromCart(productName){
        const selectedProduct = productData.find(product => product.name === productName)

        if(selectedProduct.quantity > 0){

        
        setCartItems(prevItems => {
            const existingCartItem = prevItems.find(item => item.name === productName)
            if(existingCartItem) {
                return prevItems.map(item => item.name === productName ? {...item, quantity: item.quantity - 1} : item)
            } else{
                return [...prevItems, {...selectedProduct, quantity: 0}]
            }}
        )}
 } 

    function increaseQuantity(productName){
        setProductData(prevData => prevData.map(
            product => {
                if(product.name === productName) {
                    return {...product, quantity: product.quantity + 1}
                }
                return product
            }))

            addToCart(productName)
    }

     function decreaseQuantity(productName){
        setProductData(prevData => prevData.map(
            product => {
                if(product.name === productName && product.quantity > 0) {
                    return {...product, quantity: product.quantity - 1}
                }
                return product
            }))

            removeFromCart(productName)
    }

    const cart = cartItems.map(item => {
        <li>{item.quantity}</li>
    })


   
    const productInfo = productData.map(dat => (
        <Product
            image={dat.image.mobile}
            name={dat.name}
            category={dat.category}
            price={dat.price}
            key={dat.name}
            increaseQuantity={() => increaseQuantity(dat.name)}
            decreaseQuantity={() => decreaseQuantity(dat.name)}
            productQuantity={dat.quantity}
        />
    ))

 
      

    return (
        <>
        <h1>Desserts</h1>
        <div className="container">
            <section className="products-section">
                 {productInfo}
            </section>

            <section className="cart-section">
                <p className="cart-header">Your Cart ({0})</p>
                <div className="cart-items-div">
                    <img src="src/assets/images/illustration-empty-cart.svg"/>
                    <ul className="empty-cart-text">{cart}</ul>
                </div>
            </section>
        </div>
        </>
        
    )
}
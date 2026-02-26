import Product from "./Products"
import data from "../data.json"
import { useState } from "react"
import removeItemIcon from "../assets/images/icon-remove-item.svg"
import carbonNeutralIcon from "../assets/images/icon-carbon-neutral.svg"





export default function App() {


    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    
    const newProducts = data.map(product => ({...product, quantity: 0}))
    const [productData, setProductData] = useState(newProducts)

     const [cartItems, setCartItems] = useState([])
    
    function addToCart(productName){
        const selectedProduct = productData.find(product => product.name === productName)

        

        
        setCartItems(prevItems => {
            const existingCartItem = prevItems.find(item => item.name === productName)
            if(existingCartItem) {
                return prevItems.map(item => item.name === productName ? {...item, quantity: item.quantity + 1} : item)
            } else{
                return [...prevItems, {...selectedProduct, quantity: 1}]
            }}
        )}
 

  function removeFromCart(productName){
        const selectedProduct = productData.find(product => product.name === productName)

        
        setCartItems(prevItems => {
            const existingCartItem = prevItems.find(item => item.name === productName)
            if(existingCartItem) {
                return prevItems.map(item => item.name === productName && item.quantity > 0 ? {...item, quantity: item.quantity - 1} : item)
            } else{
                return [...prevItems, {...selectedProduct, quantity: 0}]
            }}
        )}
 

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


    function removeItem(productName) {
        
         setProductData(prevData => prevData.map(
            product => {
                if(product.name === productName && product.quantity > 0) {
                    return {...product, quantity: 0}
                }
                return product
            }))


          const selectedProduct = productData.find(product => product.name === productName)

        if(selectedProduct.quantity >= 0){

        
        setCartItems(prevItems => {
            const existingCartItem = prevItems.find(item => item.name === productName)
            if(existingCartItem) {
                return prevItems.map(item => item.name === productName && item.quantity > 0 ? {...item, quantity: 0} : item)
            } else{
                return [...prevItems, {...selectedProduct, quantity: 0}]
            }}
        )} 
    }


    const cartItemsCount = cartItems.reduce((sum, item) => {
        return sum + item.quantity
    }, 0)

    const orderTotal = cartItems.reduce((total, item) => (
        total + item.price * item.quantity
    ), 0)
    
        
    const cart = cartItems.map(item => (
        item.quantity > 0 ? 
        
        <div className="cart-item" key={item.name}>
            <div className="cart-item-info" key={item.name}>
                <p className="item-name">{item.name}</p>
                <p className="item-info">
                    <span className="quantity">{item.quantity}x</span>
                    <span className="price">@ {formatter.format(item.price)}</span>
                    <span className="total-item-price">{formatter.format(item.price * item.quantity)}</span>
                </p>    
            </div> 
            <button className="remove-item-btn" onClick={() => removeItem(item.name)}><img src={removeItemIcon}/></button>
        </div>
             : null
    ))




    const cartStatus = cartItems.length > 0 ? 
    <>
        {cart}
        <div className="checkout">
            <div className="order-total">
                <p>Order total</p>
                <p className="order-total-price">{formatter.format(orderTotal)}</p>
            </div>
            <div className="carbon-status">
                <img src={carbonNeutralIcon}/>This is a    <span>carbon-neutral</span> delivery
            </div>
            <button>Confirm Order</button>
        </div>  
    </>
    :
         <>
            <img src="src/assets/images/illustration-empty-cart.svg"/>
            <p className="empty-cart-text">Your added items will appear here</p>               
        </>  


    
    
    
    const productInfo = productData.map(dat => (
        <Product
            image={dat.image.mobile}
            name={dat.name}
            category={dat.category}
            price={formatter.format(dat.price)}
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
                <p className="cart-header">Your Cart ({cartItemsCount})</p>
                <div className="cart-items-div">
                    {cartStatus}
                </div>
            </section>
        </div>
        </>
        
    )
}
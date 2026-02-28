import Product from "./Products"
import Modal from "./PopUp"
import data from "../data.json"
import { useState } from "react"






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
            <button className="remove-item-btn" onClick={() => removeItem(item.name)}><img src="/images/icon-remove-item.svg"/></button>
        </div>
             : null
    ))

    const [showModal, setShowModal] = useState(false)

    function displayPopUp(){
       return setShowModal(true)
    }

    function hidePopUp() {
      setShowModal(prevModal => { return false})
      setCartItems([])
    }

    const cartStatus = cartItemsCount > 0 ? 
    <>
        {cart}
        <div className="checkout">
            <div className="order-total">
                <p>Order total</p>
                <p className="order-total-price">{formatter.format(orderTotal)}</p>
            </div>
            <div className="carbon-status">
                <img src="/images/icon-carbon-neutral.svg"/>This is a    <span>carbon-neutral</span> delivery
            </div>
            <button className="big-red-button" onClick={displayPopUp}>Confirm Order</button>
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
            addToCartBtn=
            {
                dat.quantity === 0 ? 
                <button onClick={() => increaseQuantity(dat.name)} className="add-to-cart-inactive">
                    <img src="src/assets/images/icon-add-to-cart.svg" alt="add to cart button" className="cart-icon"/>
                    Add to Cart 
                </button>
                :
                <>
                    <button className="toggle-item-quantity-btn" onClick={() => decreaseQuantity(dat.name)}>
                        <img src="src/assets/images/icon-decrement-quantity.svg"/>
                    </button>
                    <span>{dat.quantity}</span>
                    <button className="toggle-item-quantity-btn" onClick={() => increaseQuantity(dat.name)}>
                        <img src="src/assets/images/icon-increment-quantity.svg"/>
                    </button>
                </>
            }
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
            {showModal && <Modal 
                cart={cartItems.map(item => (
           
                
                <div className="modal-cart-item" key={item.name}>
                        <div className="modal-cart-item-section1">
                        <div className="modal-thumbnail-img">
                            <img src={item.image.thumbnail} />
                        </div>
                        <div className="cart-item-info" key={item.name}>
                                <p className="item-name">{item.name}</p>
                                <p className="item-info">
                                    <span className="quantity">{item.quantity}x</span>
                                    <span className="price">@ {formatter.format(item.price)}</span>
                                </p>  
                            </div>

                                <div>
                                    <span className="modal-total-item-price">{formatter.format(item.price * item.quantity)}</span>
                                </div>
                             
                        </div> 
                </div>
            
                ))}
                orderTotal={
                    <div className="order-total">
                        <p>Order total</p>
                        <p className="order-total-price">{formatter.format(orderTotal)}</p>
                    </div>
            }
            hidePopUp={hidePopUp}
            />}
        </div>
        </>
        
    )
}
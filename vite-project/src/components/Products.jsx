

export default function Product(props) {

    
    return(
       <div className="product-div">
            <div className="product-img-div">
                <img src={props.image} alt={props.name} className="product-img"/>
                <div className="add-to-cart-btn-div">
                   
                    <button className="add-to-cart-btn" onClick={props.decreaseQuantity}>
                        <img src="src/assets/images/icon-decrement-quantity.svg"/>
                    </button>
                    <span>{props.productQuantity}</span>
                    <button className="add-to-cart-btn" onClick={props.increaseQuantity}>
                        <img src="src/assets/images/icon-increment-quantity.svg"/>
                    </button>
                    {/*
                    <img src="src/assets/images/icon-add-to-cart.svg" alt="add to cart button" className="cart-icon"/>
                    Add to Cart 
                    */}
                </div>
            </div>

            <div className="product-info-div">
                <p className="product-category">{props.category}</p>
                <p className="product-name">{props.name}</p>
                <p className="product-price">{props.price}</p>
            </div>
       </div>
   
    ) 
   }


export default function Product(props) {

    
    return(
       <div className="product-div">
            <div className="product-img-div">
                <img src={props.image} alt={props.name} className="product-img"/>
                <div className={props.productQuantity === 0 ? "inactive-cart-btn-div" : "active-cart-btn-div"} id="add-to-cart-btn-div"  >
                    {props.addToCartBtn}
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
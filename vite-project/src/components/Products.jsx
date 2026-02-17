export default function Product(props) {

console.log(props.image)

    return(
       <div className="product-div">
            <div className="product-img-div">
                <img src={props.image} alt={props.name} className="product-img"/>
                <div className="increment-btn-div">
                    <button className="add-to-cart-btn">
                        <img src="src/assets/images/icon-decrement-quantity.svg"/>
                    </button>
                    <span>1</span>
                    <button className="add-to-cart-btn">
                        <img src="src/assets/images/icon-increment-quantity.svg"/>
                    </button>
                </div>
            </div>

            <div className="product-info-div">
                <p className="product-category">{props.category}</p>
                <p className="product-name">{props.name}</p>
                <p className="product-price">${props.price}</p>
            </div>
       </div>
    ) 
   }
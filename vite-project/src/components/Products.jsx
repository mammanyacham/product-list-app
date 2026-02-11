export default function Product(props) {

console.log(props.image)

    return(
       <div className="product">
            <div className="img-div">
                <img src={props.image} alt={props.name}/>
                <div className="increament-btn-div">
                    <button></button>
                    <button></button>
                </div>
            </div>

            <div className="product-info-div">
                <p>{props.category}</p>
                <p>{props.name}</p>
                <p>${props.price}</p>
            </div>
       </div>
    ) 
   }
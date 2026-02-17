import Product from "./Products"
import data from "../data.json"


console.log(data)


export default function App() {

    const productInfo = data.map(dat => (
        <Product
            image={dat.image.mobile}
            name={dat.name}
            category={dat.category}
            price={dat.price}
            key={dat.name}
        />
))


    return (
        <div className="container">
            <section className="products-section">
                 {productInfo}
            </section>
        </div>
        
    )
}
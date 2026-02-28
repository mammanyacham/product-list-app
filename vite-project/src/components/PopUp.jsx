


export default function Modal(props) {
    return (
       <div className="modal-container">
            <div className="modal">
                <img src="/images/icon-order-confirmed.svg" />
                <p className="order-confirmed">Order Confirmed</p>
                <p className="order-note">We hope you enjoy your food!</p>
                <div className="modal-confirm-cart">
                    {props.cart}
                    {props.orderTotal}
                </div>
                <div>
                    <button className="modal-button" onClick={props.hidePopUp}>Start new Order</button>
                </div>
            </div>
       </div>
    )
}
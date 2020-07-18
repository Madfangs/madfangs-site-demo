function MainBlock(props) {
    function handleSetMoney(event) {
        let amount = parseFloat(event.currentTarget.value);
        props.setMoney(amount);
    }

    const element = <React.Fragment>
        <div className="relative">
            <div className="centered">
                <div className="display-5 text-center p-3">Your Wallet</div>
                <div className="lead text-center text-muted p-2">Account Balance : {props.accountBalance} {props.accountCurrency}</div>
                <div className="w-100 d-block">
                    <form action={props.domain + "wallet/prepare-payment"} method="POST">
                        <input type="number" name="amount" value={props.money} onChange={handleSetMoney} className="form-control bg-dark d-block w-100 mb-2 mt-4 border border-dark text-light" placeholder="Enter Amount"/>
                        <button class="btn btn-success btn-block mt-2" type="submit" onClick={props.handleAddMoney}>Add money</button>
                    </form>
                </div>
            </div>
        </div>
    </React.Fragment>;

    return element;
}
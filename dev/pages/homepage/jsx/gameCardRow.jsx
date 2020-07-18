function Card(props) {
    let element = <div className="card col-4 col-md-3 col-lg-2 game-card px-0 bg-dark mr-3">
        <img src={'img/jpg/' + props.id + '-card.jpg'} alt={props.name + ' Card'} className="card-img-top" />
    </div>;
    return element;
}

ReactDOM.render(<React.Fragment>
    {games.map(game => {
        return (<Card
            key={game.id}
            id={game.id}
            name={game.name}
        />);
    })}
</React.Fragment>, document.getElementById('game-card-row'));
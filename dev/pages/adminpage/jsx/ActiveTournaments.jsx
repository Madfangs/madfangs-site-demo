function ActiveTournaments (props) {
    let activeTournaments = props.activeTournaments || [];
    
    const element = <React.Fragment>
        <div className="container py-5">
            <h2 className="d-block w-100 py-3 text-center text-light">Active Tournaments</h2>

            {activeTournaments.map(activeTourney=>{
                let elem = <div className="p-3 mb-2 w-100 border border-dark text-light">
                    <p className="d-block w-100 lead mb-1 text-center text-light">{activeTourney.tournamentName}</p>
                    <p className="d-block w-100 text-muted text-center">Game : {activeTourney.game}<br />Slots : {activeTourney.slots} / {activeTourney.slotsMax}<br />Game Type : {activeTourney.gameType}<br />Link : <a href={props.domain + "tournament/tid/" + activeTourney.tid}>Click Here</a></p>
                </div>;

                return elem;
            })}
            {activeTournaments.length === 0 ? <div className="d-block w-100 p-2 my-5 text-muted text-center">No Active Tournaments</div> : <span className="d-none"></span>}
        </div>
    </React.Fragment>;

    return element;
}
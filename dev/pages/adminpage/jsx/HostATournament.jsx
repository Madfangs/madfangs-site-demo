function HostATournament (props) {
    const element = <React.Fragment>
        <section className="container py-5">
            <h2 className="d-block w-100 py-3 text-center text-light">Host a Tournament</h2>
            <div className="p-3 text-light text-center">
                <select name="game" value={props.game} onChange={(event)=>{props.setData("game", event.currentTarget.value)}} className="d-block w-100 m-2 bg-dark text-light p-2 form-control" style={{border: "none"}}>
                    <option value="">Choose game</option>
                    {props.games.map(game=>{
                        return <option value={game.id}>{game.name}</option>
                    })}
                </select>
                <input type="text" name="tournament-name" value={props.tournamentName} onChange={(event)=>{props.setData("tournamentName", event.currentTarget.value)}} placeholder="Tournament Name" className="d-block w-100 m-2 bg-dark text-light p-2 form-control" style={{border: "none"}}/>
                <input type="number" name="max-players" value={props.maxPlayers} onChange={event=>{props.setData("maxPlayers", event.currentTarget.value)}} placeholder="Max Players" className="d-block w-100 m-2 bg-dark text-light p-2 form-control" style={{border: "none"}}/>
                <input type="date" value={props.date} onChange={event=>{props.setData("date", event.currentTarget.value)}} name="date" className="d-block w-100 m-2 bg-dark text-light p-2 form-control" style={{border: "none"}}/>
                <input type="time" value={props.time} onChange={event=>{props.setData("time", event.currentTarget.value)}} name="time" className="d-block w-100 m-2 bg-dark text-light p-2 form-control" style={{border: "none"}} />
                <select name="game-mode" value={props.gameMode} onChange={event=>{props.setData("gameMode", event.currentTarget.value)}} className="d-block w-100 m-2 bg-dark text-light p-2 form-control" style={{border: "none"}}>
                    <option value="tpp">TPP</option>
                    <option value="fpp">FPP</option>
                </select>
                <select name="game-type" value={props.gameType} onChange={event=>{props.setData("gameType", event.currentTarget.value)}} className="d-block w-100 m-2 bg-dark text-light p-2 form-control" style={{border: "none"}}>
                    <option value="solo">solo</option>
                    <option value="duo">duo</option>
                    <option value="trio">trio</option>
                    <option value="squad">squad</option>
                </select>
                <input type="text" name="mapName" value={props.mapName} onChange={event=>{props.setData("mapName", event.currentTarget.value)}} placeholder="map name" className="d-block w-100 m-2 bg-dark text-light p-2 form-control" style={{border: "none"}} />
                <input type="number" value={props.entryFees} onChange={event=>{props.setData("entryFees", event.currentTarget.value)}} name="entry-fees" placeholder="Entry Fees in INR" className="d-block w-100 m-2 bg-dark text-light p-2 form-control" style={{border: "none"}} />
                <p className="d-block w-100 p-2 lead text-light text-center">Rewards</p>
                <table className="table table-dark my-3">
                    <thead>
                        <tr>
                            <th scope="col">Position</th>
                            <th scope="col">Reward (&#8377;)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.rewards.map(reward=>{
                            let elem = <tr>
                                <td><div className="d-block w-100 p-2 text-light text-center">{reward.position}</div></td>
                                <td><div className="d-block w-100 p-2 text-light text-center">{reward.reward}</div></td>
                            </tr>;
                            return elem;
                        })}
                        <tr>
                            <td><input type="number" value={props.position} onChange={event=>{props.setPosition(parseInt(event.currentTarget.value))}} placeholder="Position" name="position" onKeyDown={props.handleRewards} className="d-block w-100 p-2 bg-dark text-light form-control" style={{border: "none"}} /></td>
                            <td><input type="number" value={props.reward} onChange={event=>{props.setReward(parseInt(event.currentTarget.value))}} placeholder="Reward (INR)" name="reward" onKeyDown={props.handleRewards} className="d-block w-100 p-2 bg-dark text-light form-control" style={{border: "none"}} /></td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn btn-primary btn-block" onClick={props.sendTournamentData}>Host Tournament</button>
            </div>
        </section>
    </React.Fragment>;

    return element;
}
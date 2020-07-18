function MainBlock (props) {
    let activeTournaments = props.activeTournaments || [], badgeValue = "";
    if(activeTournaments.length > 0)
        badgeValue = activeTournaments.length;
    
    const element = <React.Fragment>
        <div className="container">
            <div className="d-flex justify-content-left align-items-center w-100 p-2 mt-2">
                {props.tourneyTab === "host"
                    ? <div className="p-2 text-light text-center tournament-tab tournament-tab-active mx-3" onClick={()=>props.setTourneyTab("host")}>Host</div>
                    : <div className="p-2 text-light text-center tournament-tab mx-3" onClick={()=>{props.setTourneyTab("host")}}>Host</div>}
                {props.tourneyTab === "active"
                    ? <div className="p-2 text-light text-center tournament-tab tournament-tab-active mx-3" onClick={()=>{props.setTourneyTab("active"); props.fetchActiveTournaments();}}>Active <span className="ml-1 badge badge-danger">{badgeValue}</span></div>
                    : <div className="p-2 text-light text-center tournament-tab mx-3" onClick={()=>{props.setTourneyTab("active"); props.fetchActiveTournaments();}}>Active <span className="ml-1 badge badge-danger">{badgeValue}</span></div>}
            </div>
        </div>
        {props.tourneyTab === "host" ? <HostATournament
            domain={props.domainName}
            games={props.games}
            game={props.game}
            tournamentName={props.tournamentName}
            maxPlayers={props.maxPlayers}
            date={props.date}
            time={props.time}
            gameMode={props.gameMode}
            gameType={props.gameType}
            mapName={props.mapName}
            entryFees={props.entryFees}
            rewards={props.rewards}
            position={props.position}
            reward={props.reward}
            loading={props.loading}
            setData={props.setData}
            setPosition={props.setPosition}
            setReward={props.setReward}
            handleRewards={props.handleRewards}
            sendTournamentData={props.sendTournamentData}
        /> : <span className="d-none"></span>}

        {props.tourneyTab === "active" ? <ActiveTournaments
            domain={props.domain}
            activeTournaments={props.activeTournaments}
        /> : <span className="d-none"></span>}
        
    </React.Fragment>;

    return element;
}
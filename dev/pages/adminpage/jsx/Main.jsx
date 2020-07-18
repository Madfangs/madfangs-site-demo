function Main() {
    const [game, setGame] = React.useState("");
    const [tournamentName, setTournamentName] = React.useState("");
    const [maxPlayers, setMaxPlayers] = React.useState("");
    const [date, setDate] = React.useState("");
    const [time, setTime] = React.useState("");
    const [gameMode, setGameMode] = React.useState("TPP");
    const [gameType, setGameType] = React.useState("solo");
    const [mapName, setMapName] = React.useState("");
    const [entryFees, setEntryFees] = React.useState("");
    const [rewards, setRewards] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [tourneyTab, setTourneyTab] = React.useState("host");
    const [activeTournaments, setActiveTournaments] = React.useState([]);

    const [position, setPosition] = React.useState(1);
    const [reward, setReward] = React.useState("");

    const [numOfNotifications, setNumOfNotifications] = React.useState(0);

    function resetData () {
        setGame("");
        setTournamentName("");
        setMaxPlayers("");
        setDate("");
        setTime("");
        setGameMode("TPP");
        setGameType("solo");
        setMapName("");
        setEntryFees("");
        setRewards([]);
        setPosition(1);
        setReward("");
    }

    function setData (param, info) { 
        if (param === "game")
            setGame(info);
        else if (param === "tournamentName")
            setTournamentName(info);
        else if (param === "maxPlayers")
            setMaxPlayers(parseInt(info));
        else if (param === "date")
            setDate(info);
        else if (param === "time")
            setTime(info);
        else if (param === "gameMode")
            setGameMode(info);
        else if (param === "gameType")
            setGameType(info);
        else if (param === "mapName")
            setMapName(info);
        else if (param === "entryFees")
            setEntryFees(parseInt(info));
        else if (param === "rewards")
            setRewards(info);
    }

    function handleRewards (event) {
        let key = event.which || event.keyCode;
        if (key === 13) {
            let rewardsList = rewards;

            // check if position already exists -> update it
            let positionExists = false;
            for(let i = 0; i < rewardsList.length; i++) {
                if(rewardsList[i].position === position) {
                    positionExists = true;
                    rewardsList[i] = {
                        position : position,
                        reward : reward
                    }
                }
            }

            // add new element to array
            if (!positionExists) {
                rewardsList.push({
                    position : position,
                    reward : reward
                });
            }

            // arrange the array in ascending order of position
            for(let i = rewardsList.length - 1; i >= 0 ; i--) {
                for (let j = 0; j < i; j++) {
                    if(rewardsList[j].position > rewardsList[j+1].position) {
                        // exchange
                        let temp = rewardsList[j];
                        rewardsList[j] = rewardsList[j+1];
                        rewardsList[j+1] = temp;
                    }
                }
            }
            

            // update the state
            setRewards(rewardsList);
            setPosition(position + 1);
            setReward("");
        }
    }

    function sendTournamentData () {
        let infoToSend = {
            game : game,
            tournamentName : tournamentName,
            maxPlayers : maxPlayers,
            date : date,
            time : time,
            gameMode : gameMode,
            gameType : gameType,
            mapName : mapName,
            entryFees : entryFees,
            rewards : rewards
        }

        setLoading(true); // show the loading screen

        let url = data.domainName + 'admin/new-tournament';
        fetch(url, {
            method: "POST",
            body: JSON.stringify(infoToSend),
            headers: {
                "Content-Type": "application/json; charset=UTF-8" 
            }
        })
        .then(file=>file.json())
        .then(file=>{
            setLoading(false); // hide the loading screen
            if (file) {
                if(file.msg) {
                    if(file.err)
                        alert("An error has occured! " + file.msg);
                    else
                        alert(file.msg);
                } else if (file.done) {
                    alert("The tournament has been successfully hosted! Tournament link is " + data.domainName + "tournament/tid/" + file.tid);
                    resetData();
                    fetchActiveTournaments();
                }
            }
        })
        .catch(err=>{if(err) {
            console.log(err);
        } });
    }

    function fetchActiveTournaments () {
        let url = data.domainName + 'admin/active-tournaments';
        fetch(url)
            .then(file=>file.json())
            .then(file=>{
                if(file.msg) {
                    if (file.err) {
                        alert("An error has occured! Msg : " + file.msg);
                    } else {
                        alert(file.msg);
                    }
                } else {
                    setActiveTournaments(file);
                }
            })
            .catch(err=>{
                if (err) {
                    console.log(err);
                }
            })
    }

    React.useEffect(()=>{
        fetchActiveTournaments();
    }, [])

    const element = <React.Fragment>
        <Header navigationFull={data.navigationFull} activeNav={data.activeNav} domain={data.domainName} numOfNotifications={numOfNotifications} />
        <div className="container">
            <div className="row">
                <div className="col-3 col-lg-2 d-none d-md-block">
                    <SideNavigation active={data.activeNav} navs={data.navigationFull} domain={data.domainName} />  
                </div>
                <div className="col-12 col-md-9 col-lg-10">
                    <div className="row text-light">
                        <MainBlock
                            domain={data.domainName}
                            games={data.games}
                            game={game}
                            tournamentName={tournamentName}
                            maxPlayers={maxPlayers}
                            date={date}
                            time={time}
                            gameMode={gameMode}
                            gameType={gameType}
                            mapName={mapName}
                            entryFees={entryFees}
                            rewards={rewards}
                            position={position}
                            reward={reward}
                            loading={loading}
                            tourneyTab={tourneyTab}
                            activeTournaments={activeTournaments}
                            setData={setData}
                            setPosition={setPosition}
                            setReward={setReward}
                            handleRewards={handleRewards}
                            sendTournamentData={sendTournamentData}
                            setTourneyTab={setTourneyTab}
                            fetchActiveTournaments={fetchActiveTournaments}
                        />
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>;
    return element;
}

ReactDOM.render(
    <React.Fragment>
        <Main />
    </React.Fragment>,
    document.getElementById('root')
);
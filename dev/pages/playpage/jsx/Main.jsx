function Main() {
    const [numOfNotifications, setNumOfNotifications] = React.useState(0);


    function fetchNumOfNotifications() {

        let url = data.domainName + 'notifications/numofnotifications';
        fetch(url, {
            method: "POST",
            body: JSON.stringify({async: true}),
            headers: {
                "Content-Type": "application/json; charset=UTF-8" 
            }
        })
            .then(file=>file.json())
            .then(file=>{
                if(file.msg) {
                    if(file.err)
                        alert("An Error has occured. Msg : " + file.msg);
                    else
                        alert(file.msg);
                }
                else
                    setNumOfNotifications(file.numOfNotifications);
            })
            .catch(err=>{if(err) {
                console.log(err);
            } });
    }

    React.useEffect(() => {
        fetchNumOfNotifications();
        setInterval(fetchNumOfNotifications, 10000);
    }, []);

    const element = <React.Fragment>
        <div id="header">
            <Header
                navigationFull={data.navigationFull}
                activeNav={data.activeNav}
                domain={data.domainName}
                numOfNotifications={numOfNotifications}
            />
        </div>
        <div className="container">
            <div className="row">
                <div className="col-3 col-lg-2 d-none d-md-block">
                    <SideNavigation active={data.activeNav} navs={data.navigationFull} domain={data.domainName} />
                </div>
                <div className="col-12 col-md-9 col-lg-10">
                    <div className="row text-light">
                        <MainBlock
                            domain={data.domainName}
                            gameCategories={data.gameCategories}
                            slides={data.slides}
                            showingGame={data.showingForGame}
                            scrimsList={data.scrimsList}
                            topPlayers={data.topPlayers}
                            tournamentsList={data.tournamentsList}
                        />
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>;

    return element;
}

ReactDOM.render(<Main />,document.getElementById('root'));
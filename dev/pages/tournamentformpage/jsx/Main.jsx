function Main() {
    const [tourneyDetails, setTourneyDetails] = React.useState({});
    const [teamName, setTeamName] = React.useState("");
    const [contactInfo, setContactInfo] = React.useState("");
    const [emailID, setEmailID] = React.useState("");
    const [playerCount, setPlayerCount] = React.useState(0);
    const [t, setT] = React.useState("");

    const [firstParticipantName, setFirstParticipantName] = React.useState("");
    const [firstParticipantIgn, setFirstParticipantIgn] = React.useState("");
    const [secondParticipantName, setSecondParticipantName] = React.useState("");
    const [secondParticipantIgn, setSecondParticipantIgn] = React.useState("");
    const [thirdParticipantName, setThirdParticipantName] = React.useState("");
    const [thirdParticipantIgn, setThirdParticipantIgn] = React.useState("");
    const [fourthParticipantName, setFourthParticipantName] = React.useState("");
    const [fourthParticipantIgn, setFourthParticipantIgn] = React.useState("");

    const [numOfNotifications, setNumOfNotifications] = React.useState(0);

    const registerForm = React.useRef();


    React.useEffect(()=>{

        function getDetails () {
            let url = data.domainName + "tournament/tid/" + data.tid + "/details";

            fetch(url)
            .then(file=>file.json())
            .then(file=>{
                if (file.msg) {
                    if (file.err)
                        alert("An error has occured! msg : " +  file.msg);
                    else
                        alert(file.msg);
                } else {
                    setTourneyDetails(file);
                    
                    if (file.gameType === "solo") {
                        setPlayerCount(1);
                    }
                    else if (file.gameType === "duo") {
                        setPlayerCount(2);
                    }
                    else if (file.gameType === "trio") {
                        setPlayerCount(3);
                    }
                    else if (file.gameType === "squad") {
                        setPlayerCount(4);
                    }
                    
                    
                }
            })
            .catch(err=>{
                console.log(err);
            });
        }


        initializeT();
        setTimeout(getDetails, 500);
        
    },[]);


    function handleRegister (event) {
        let url = data.domainName + "tournament/tid/" + data.tid + "/register",
            dataToBeSent = {};

        // check information
        if (playerCount != 1 && teamName === "" || contactInfo === "" || emailID === "") {
            event.preventDefault();
            alert("Please fill up all the fields!");
            return;
        }
        if (playerCount === 1) {
            if (firstParticipantIgn === "") {
                event.preventDefault();
                alert("Please fill up all the fields!");
                return;
            }
        }
        if (playerCount === 2) {
            if (firstParticipantIgn === "" || secondParticipantIgn === "") {
                event.preventDefault();
                alert("Please fill up all the fields!");
                return;
            }
        }
        if (playerCount === 3) {
            if (firstParticipantIgn === "" || secondParticipantIgn === "" || thirdParticipantIgn === "") {
                event.preventDefault();
                alert("Please fill up all the fields!");
                return;
            }
        }
        if (playerCount === 4) {
            if (firstParticipantIgn === "" || secondParticipantIgn === "" || thirdParticipantIgn === "" || fourthParticipantIgn === "") {
                event.preventDefault();
                alert("Please fill up all the fields!");
                return;
            }
        }
    }


    function initializeT () {
        if (data.t && data.t !== "") {
            setT(data.t);
        }
    }
    
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
                            tid={data.tid}
                            playerCount={playerCount}
                            tourneyDetails={tourneyDetails}
                            teamName={teamName}
                            emailID={emailID}
                            contactInfo={contactInfo}
                            setTeamName={setTeamName}
                            setContactInfo={setContactInfo}
                            setEmailID={setEmailID}
                            firstParticipantName={firstParticipantName}
                            secondParticipantName={secondParticipantName}
                            thirdParticipantName={thirdParticipantName}
                            fourthParticipantName={fourthParticipantName}
                            firstParticipantIgn={firstParticipantIgn}
                            secondParticipantIgn={secondParticipantIgn}
                            thirdParticipantIgn={thirdParticipantIgn}
                            fourthParticipantIgn={fourthParticipantIgn}
                            t={t}
                            setFirstParticipantIgn={setFirstParticipantIgn}
                            setSecondParticipantIgn={setSecondParticipantIgn}
                            setThirdParticipantIgn={setThirdParticipantIgn}
                            setFourthParticipantIgn={setFourthParticipantIgn}
                            setFirstParticipantName={setFirstParticipantName}
                            setSecondParticipantName={setSecondParticipantName}
                            setThirdParticipantName={setThirdParticipantName}
                            setFourthParticipantName={setFourthParticipantName}
                            handleRegister={handleRegister}
                            registerForm={registerForm}
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
function Main() {
    const [firstName, setFirstName] = React.useState(data.firstName);
    const [lastName, setLastName] = React.useState(data.lastName);
    const [searchData, setSearchData] = React.useState([]);
    const [numOfNotifications, setNumOfNotifications] = React.useState(0);
    const [available, setAvailable] = React.useState(data.available);

    const searchInputRef = React.useRef();

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

    function fetchSearchData(domain, username) {
        let url = domain + 'dashboard/' + username + '/searchuser';

        let searchQuery = searchInputRef.current.value;

        let data = {
            searchQuery: searchQuery
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8" 
            }
        })
            .then(data=>data.json())
            .then(data=>{
                if(data.msg) {
                    if(data.err === true)
                        alert(`An error has occured. Msg : ${data.msg}`);
                    else
                        alert(data.msg);
                } else {
                    setSearchData(data);
                }
            })
            .catch(err=>{console.log(err); alert("Something is wrong! Error -> " + err)});
    }

    function addFriend(username, domain) {
        let url = domain + 'dashboard/' + username + '/add-friend';

        fetch(url)
            .then(data=>data.json())
            .then(data=>{
                if(data.msg) {
                    if(data.err === true)
                        alert(`An error has occured. Msg : ${data.msg}`);
                    else
                        alert(data.msg);
                } else {
                    if(data.done) {
                        let newArray = [];
                        searchData.map(card=>{
                            if(card.username !== username)
                                newArray.push(card);
                            else {
                                let newObj = {...card, available : false};
                                newArray.push(newObj);
                            }
                        })
                        setSearchData(newArray);
                    }
                }
            })
            .catch(err=>{console.log(err); alert("Something is wrong! Error -> " + err)});
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
                            editable={data.editable}
                            numOfFriends={data.numOfFriends}
                            fetchSearchData={fetchSearchData}
                            searchData={searchData}
                            exp={data.exp}
                            firstName={firstName}
                            lastName={lastName}
                            searchInputRef={searchInputRef}
                            username={data.username}
                            email={data.email}
                            profileImg={data.profileImg}
                            games={data.games}
                            available={available}
                            addFriend={addFriend}
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
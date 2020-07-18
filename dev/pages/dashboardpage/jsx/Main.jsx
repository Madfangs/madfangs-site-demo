function Main() {
    const [profileNavTab, setProfileNavTab] = React.useState('details');
    const [friendsList, setFriendsList] = React.useState([]);
    const [firstName, setFirstName] = React.useState(data.firstName);
    const [lastName, setLastName] = React.useState(data.lastName);
    const [firstNameForEdit, setFirstNameForEdit] = React.useState(data.firstName);
    const [lastNameForEdit, setLastNameForEdit] = React.useState(data.lastName);
    const [ignEntryNumber, setIgnEntryNumber] = React.useState(1);
    const [ignList, setIgnList] = React.useState(data.ignList);
    const [searchData, setSearchData] = React.useState([]);
    const [numOfNotifications, setNumOfNotifications] = React.useState(0);

    const firstNameRef = React.useRef();
    const lastNameRef = React.useRef();
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

    function setProfileNavTabDetails() {
        setProfileNavTab('details');
    }


    function setProfileNavTabPeople() {
        setProfileNavTab('people');
    }


    function setProfileNavTabSettings() {
        setProfileNavTab('settings');
    }


    function setProfileNavTabSearch() {
        setProfileNavTab('search');
    }


    function handleFriendsList(data) {
        if(setFriendsList(data)) {
            return true;
        }
        return false;
    }


    function handleFirstNameForEdit(event) {
        setFirstNameForEdit(event.currentTarget.value);
    }


    function handleLastNameForEdit(event) {
        setLastNameForEdit(event.currentTarget.value);
    }


    function handleIgnEntryNumber() {
        setIgnEntryNumber(ignEntryNumber + 1);
    }


    function handleIgnList(data, domain, username) {
        if(data.ign.length < 3) {
            alert("IGN too small.");
            return;
        }
        if(data.ign.length > 255) {
            alert("IGN cannot be longer than 255 characters");
            return;
        }

        let ignData = [ ...ignList , data];

        let url = domain + 'dashboard/' + username + '/ign-update';

        fetch(url, {
            method: "POST",
            body: JSON.stringify(ignData),
            headers: {
                "Content-type": "application/json; charset=UTF-8" 
            }
        })
        .then(data=>data.json())
        .then(data=>{
            if(data.err && data.msg) {
                if (data.err === true)
                    alert(`An error has occured. Msg : ${data.msg}`);
                else
                    alert("Oops! Something is wrong");
            } else {
                setIgnList(data);
            }
        })
        .catch(err=>{console.log(err); alert("Something is wrong! Error -> " + err)});
    }


    function handleProfileEditForm(domain, username) {        
        let url = domain + 'dashboard/' + username + '/updateprofile';

        let firstName = firstNameRef.current.value;
        let lastName = lastNameRef.current.value;

        if(firstName.length < 1) {
            alert("Firstname is too short.");
            return;
        }
        if(firstName.length > 255) {
            alert("Firstname cannot be longer than 255 characters.");
            return;
        }
        if(lastName.length < 1) {
            alert("Lastname is too short.");
            return;
        }
        if(lastName.length > 255) {
            alert("Lastname cannot be longer than 255 characters.");
            return;
        }

        let data = {
            firstName: firstName,
            lastName: lastName,
            async: true
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
                    if (data.err === true)
                        alert(`An error has occured. Msg : ${data.msg}`);
                    else
                        alert("Oops! Something is wrong");
                } else {
                    setFirstName(data.firstName);
                    setFirstNameForEdit(data.firstName);
                    setLastName(data.lastName);
                    setLastNameForEdit(data.lastName);
                }
            })
            .catch(err=>{console.log(err); alert("Something is wrong! Error -> " + err)});
    }

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
                            profileNavTab={profileNavTab}
                            friendsList={friendsList}
                            setProfileNavTabDetails={setProfileNavTabDetails}
                            setProfileNavTabPeople={setProfileNavTabPeople}
                            setProfileNavTabSettings={setProfileNavTabSettings}
                            setProfileNavTabSearch={setProfileNavTabSearch}
                            handleFriendsList={handleFriendsList}
                            handleFirstNameForEdit={handleFirstNameForEdit}
                            handleLastNameForEdit={handleLastNameForEdit}
                            handleProfileEditForm={handleProfileEditForm}
                            fetchSearchData={fetchSearchData}
                            searchData={searchData}
                            exp={data.exp}
                            firstName={firstName}
                            lastName={lastName}
                            firstNameForEdit={firstNameForEdit}
                            lastNameForEdit={lastNameForEdit}
                            firstNameRef={firstNameRef}
                            lastNameRef={lastNameRef}
                            searchInputRef={searchInputRef}
                            username={data.username}
                            email={data.email}
                            profileImg={data.profileImg}
                            accountBalance={data.accountBalance}
                            accountCurrency={data.accountCurrency}
                            games={data.games}
                            ignEntryNumber={ignEntryNumber}
                            handleIgnEntryNumber={handleIgnEntryNumber}
                            ignList={ignList}
                            handleIgnList={handleIgnList}
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
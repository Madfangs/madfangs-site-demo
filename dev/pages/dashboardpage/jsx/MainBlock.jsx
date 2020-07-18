//// FUNCTION ////

function calcLevel(exp) {
    let expForLevel = 1000;
    let levelCount = 0;
    let leftOverExp = exp;
    while(true) {
        let carry = leftOverExp - expForLevel;
        if(carry >= 0) {
            leftOverExp = carry;
            expForLevel += 500;
            levelCount++;
        } else {
            break;
        }
    }

    return {
        currentLevel: levelCount,
        leftOverExp: leftOverExp,
        expForLevel: expForLevel - 500,
    };
}

/////////////////

function Loading() {
    const element = <div className="text-muted text-center d-block my-5">
            <p>Loading...</p>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>;
    return element;
}

function FriendsList(props) {
    const element = <React.Fragment>
        <h3 className="lead text-center my-3 d-block w-100">Your friends list</h3>
        {props.data.map(person=>{
            return (<a href={props.domain + "dashboard/" + person.username} className="d-block col-12 friend-card border border-dark p-3">
                <div className="row d-flex flex-wrap align-items-center">
                    <div className="friend-card-img ml-1"><img src={person.imageLink} alt={person.username + " image"} className="friend-card-img-file"/></div>
                    <div className="col">
                        <p className="lead text-light m-0">{person.firstName} {person.lastName}<br /><span className="text-muted small">@{person.username}</span></p>
                    </div>
                </div>
            </a>);
        })}
    </React.Fragment>;

    return element;
}

function IgnItem(props) {
    let element = <span className="d-none"></span>;
    if(props.item.ign) { // SAFE GUARD //
        element = <React.Fragment>
            <tr>
                <th scope='row'>{props.rowCount}</th>
                <td>{props.item.ign}</td>
                <td>{props.item.game.name}</td>
            </tr>
        </React.Fragment>;
    }

    return element;
}

function Search(props) {
    const element = <div className="d-block d-lg-none">
        <SocialBlock domain={props.domain} addFriend={props.addFriend} searchData={props.searchData} fetchSearchData={props.fetchSearchData} searchInputRef={props.searchInputRef} username={props.username} />
    </div>;

    return element;
}

function Settings(props) {
    const ignRef = React.useRef();
    const gameRef = React.useRef();

    /// function ///

    function intermediateAddIgnData(event) {
        let keyValue = event.which || event.keyCode;
        if(keyValue === 13) {
            addIgnData();
        }
    }

    function addIgnData() {
        let newIgn = ignRef.current.value;
        ignRef.current.value = '';
        let forGameId = gameRef.current.value;
        let gameName;

        props.games.map(game=>{
            if(game.id === forGameId) {
                gameName = game.name;
            }
        });
        
        let ignData = {
            ign: newIgn,
            game: {
                name: gameName,
                id: forGameId
            }
        }
        props.handleIgnList(ignData, props.domain, props.username);
    }


    function handleClickOnInput(event) {
        let keyValue = event.which || event.keyCode;

        if(keyValue === 13)
            props.handleProfileEditForm(props.domain, props.username);

        return;
    }
    //////////////////


    let rowCount = 0;

    const element = <div className="container-fluid">
        <div className="w-100">
            <a href={props.domain + "logout"} className="d-block w-100" style={{textDecoration : 'none'}}><button className="btn btn-danger btn-settings">Logout</button></a>
        </div>
        <h3 className="lead text-light text-center my-3">Update Profile</h3>
        <div>
            <div className="d-flex flex-wrap my-2">
                <label for="first-name" className="col-12 col-lg-6 text-muted">First Name</label>
                <input type="text" className="col-12 col-lg-6 form-control bg-dark text-light border-dark" id="first-name" name="firstName" ref={props.firstNameRef} value={props.firstNameForEdit} onKeyDown={handleClickOnInput} onChange={props.handleFirstNameForEdit} placeholder="First Name" required />
            </div>
            <div className="d-flex flex-wrap my-2">
                <label for="last-name" className="col-12 col-lg-6 text-muted">Last Name</label>
                <input type="text" className="col-12 col-lg-6 form-control bg-dark text-light border-dark" id="last-name" name="lastName" ref={props.lastNameRef} value={props.lastNameForEdit} onKeyDown={handleClickOnInput} onChange={props.handleLastNameForEdit} placeholder="Last Name" required />
            </div>
            <div className="d-flex flex-wrap my-2">
                <label for="username" className="col-12 col-lg-6 text-muted">Username</label>
                <input type="text" className="col-12 col-lg-6 form-control bg-dark text-light border-dark" id="username" placeholder={props.username} readOnly />
            </div>
            <div className="d-flex flex-wrap my-2">
                <label for="email" className="col-12 col-lg-6 text-muted">Email</label>
                <input type="email" className="col-12 col-lg-6 form-control bg-dark text-light border-dark" id="email" placeholder={props.email} readOnly />
            </div>
            <button className="btn btn-primary btn-settings" type="button" onClick={()=>{props.handleProfileEditForm(props.domain, props.username);}}>Update</button>
        </div>
        <h3 className="lead text-center my-3 text-light">In Game Name (IGN)</h3>
        <p className="text-muted text-center">You need to add your In Game Name (IGN) before you start playing with us.</p>
        <table className="table table-dark">
            <thead>
                <tr>
                    <th scope="col">SN</th>
                    <th scope="col">IGN</th>
                    <th scope="col">Game</th>
                </tr>
            </thead>
            <tbody>
                {props.ignList.map(item=>{
                    rowCount++;
                    return (<IgnItem key={item.game.id} item={item} rowCount={rowCount} />);
                })}

                <tr>
                    <th scope='row'>{(function() { rowCount++; return rowCount; }())}</th>
                    <td><input className="form-control border-0 text-light bg-dark" placeholder="IGN" ref={ignRef} onKeyDown={intermediateAddIgnData} /></td>
                    <td>
                        <select className="form-control border-0 text-light bg-dark" ref={gameRef}>
                            {props.games.map((game, index) => {
                                if(index === 0) return (<option key={game.name} value={game.id} selected>{game.name}</option>);
                                return (<option key={game.name} value={game.id}>{game.name}</option>);
                            })}
                        </select>
                    </td>
                </tr>


            </tbody>
        </table>
        <button className="btn btn-primary btn-settings" type="button" onClick={addIgnData}  >Add IGN</button>

    </div>;

    return element;
}

function People(props) {
    let element;

    if(props.numOfFriends && props.numOfFriends > 0) {
        // MAKE AJAX CALL //
        let x = new XMLHttpRequest();
        x.onreadystatechange = ()=>{
            if(x.readyState == 4 && x.status == 200 ) {
                let data = x.response;
                props.handleFriendsList(data);
            }
        }
        x.open('get', props.domain + 'dashboard/'+ props.username +'/friends', true);
        x.send();

        // DISPLAY ELEMENT //
        element = <div className="d-flex flex-wrap justify-content-around align-items-center w-100">
            {props.friendsList.length === 0 ? <Loading /> : <FriendsList data={JSON.parse(props.friendsList)} domain={props.domain} />}
        </div>;
    } else {
        element = <div className="text-muted text-center d-block my-5 py-5">You have no friends</div>;
    }

    return element;
}

function LevelBar(props) {
    let percentage = (props.value / props.max) * 100;

    const element = <div className='level-progress-bar d-block w-100'>
        <div className="level-progress-bar-juice d-block" style={{width: percentage + '%'}}></div>
    </div>;

    return element;
}

function ExperienceCard(props) {
    let levelData = calcLevel(props.exp);

    const element = <div className="col-12 col-md-6 p-3 profile-card">
        <h3 className="lead text-center">Experience points</h3>
        <p className="lead text-muted text-center">Current level : {levelData.currentLevel}</p>
        <LevelBar value={levelData.leftOverExp} max={levelData.expForLevel} />
        <p className="text-muted text-center">{levelData.leftOverExp} / {levelData.expForLevel}</p>
        <p className="text-muted">You gain experience points by playing scrims</p>
    </div>;

    return element;
}

function ProfileNav(props) {
    const element = <div className="d-flex w-100 justify-content-around align-items-center mb-3">
        <div className="col text-center profile-nav" onClick={props.setProfileNavTabDetails}>
            {props.profileNavTab === 'details' ? <img src={props.domain + "img/svg/details.svg"} alt="details" className="profile-nav-icon profile-nav-icon-active"/> : <img src={props.domain + "img/svg/details.svg"} alt="details" className="profile-nav-icon"/>}
        </div>

        <div className="col text-center profile-nav" onClick={props.setProfileNavTabPeople}>
            {props.profileNavTab === 'people' ? <img src={props.domain + "img/svg/people.svg"} alt="people" className="profile-nav-icon profile-nav-icon-active"/> : <img src={props.domain + "img/svg/people.svg"} alt="people" className="profile-nav-icon"/>}
        </div>

        <div className="col text-center profile-nav" onClick={props.setProfileNavTabSettings}>
            {props.profileNavTab === 'settings' ? <img src={props.domain + "img/svg/settings.svg"} alt="settings" className="profile-nav-icon profile-nav-icon-active" id="cog-rotate" /> : <img src={props.domain + "img/svg/settings.svg"} alt="settings" className="profile-nav-icon"/>}
        </div>

        <div className="col text-center profile-nav d-block d-lg-none" onClick={props.setProfileNavTabSearch} >
            {props.profileNavTab === 'search' ? <img src={props.domain + "img/svg/search.svg"} alt="search" className="profile-nav-icon profile-nav-icon-active"/> : <img src={props.domain + "img/svg/search.svg"} alt="search" className="profile-nav-icon"/>}
        </div>
    </div>;

    return element;
}

function Details(props) {
    const element = <div className="d-flex flex-wrap justify-content-around py-4">                    
        <ExperienceCard exp={props.exp} />

        <div className="col-12 col-md-6 p-3 profile-card">
            <h3 className="lead text-center">Achievements</h3>
            <p className="text-muted text-center py-5">You have made no achievements yet.</p>
        </div>
    </div>;

    return element;
}

function FriendsInfoCard(props) {
    const element = <div className="col-12 py-4 px-2 mt-3 mb-1 profile-info-card">
        <div className="d-flex justify-content-between align-tems-center flex-wrap">
            <div className="d-flex align-items-center para-sm-custom">
                <img src={props.domain + "img/svg/people.svg"} alt="people" className="inline-icon" />
                <span>You are friends with {props.numOfFriends} people. </span>
            </div>
            <button className="btn btn-primary btn-sm-custom" onClick={props.setProfileNavTabPeople}>Check List</button>
        </div>
    </div>;
    return element;
}

function WalletInfoCard(props) {
    function walletRedirect () {
        window.location.href = props.domain + "wallet";
    }

    const element = <div className="col-12 py-4 px-2 mt-3 mb-1 profile-info-card">
        <div className="d-flex justify-content-between align-tems-center flex-wrap">
            <div className="d-flex align-items-center para-sm-custom">
                <img src={props.domain + "img/svg/wallet.svg"} alt="wallet" className="inline-icon" />
                <span>Account balance : {props.balance} {props.currency}</span>
            </div>
            <button className="btn btn-success btn-sm-custom" onClick={walletRedirect}>Add Money</button>
        </div>
    </div>;
    return element;
}

function MainBlock(props) {
    const element = <React.Fragment>
        <div className="col-12 col-lg-9">
            <div className="container-fluid">
                <div className="d-flex flex-wrap justify-content-around py-5 mb-5 align-items-center profile-main-card" >

                    <div className="col-6 col-sm-4 p-0 profile-img-container">
                        <img src={props.profileImg} alt="profile picture" className='w-100' />
                    </div>
                    
                    <div className="col-12 col-sm-8 p-2 mb-3">
                        <p className="display-5 d-block text-center">{props.firstName} {props.lastName}</p>
                        <p className="text-center text-muted">Username : {props.username}</p>
                        <p className="text-center text-muted">Account level : {(function(){
                            let levelData = calcLevel(props.exp);
                            return levelData.currentLevel;
                        }())}</p>
                        {props.editable ? <span className="d-none"></span> : <button className="btn btn-primary d-block mx-auto">Add Friend</button> }
                    </div>
                        
                    {props.editable ? <React.Fragment><WalletInfoCard domain={props.domain} balance={props.accountBalance} currency={props.accountCurrency} /><FriendsInfoCard domain={props.domain} numOfFriends={props.numOfFriends} setProfileNavTabPeople={props.setProfileNavTabPeople} /></React.Fragment> : <span className="d-none"></span> }                   

                </div>

                {props.editable ? <ProfileNav domain={props.domain} profileNavTab={props.profileNavTab} setProfileNavTabDetails={props.setProfileNavTabDetails} setProfileNavTabPeople={props.setProfileNavTabPeople} setProfileNavTabSettings={props.setProfileNavTabSettings} setProfileNavTabSearch={props.setProfileNavTabSearch} /> : <span className="d-none"></span> }


                {(function () {
                    if(props.profileNavTab === 'details') {
                        return <Details exp={props.exp} />;
                    } else if (props.profileNavTab === 'people') {
                        return <People numOfFriends={props.numOfFriends} domain={props.domain} friendsList={props.friendsList} handleFriendsList={props.handleFriendsList} username={props.username} />;
                    } else if (props.profileNavTab === 'settings') {
                        return <Settings
                            domain={props.domain}
                            firstName={props.firstName}
                            lastName={props.lastName}
                            username={props.username}
                            email={props.email}
                            handleFirstName={props.handleFirstName}
                            handleLastName={props.handleLastName}
                            games={props.games}
                            ignEntryNumber={props.ignEntryNumber}
                            handleIgnEntryNumber={props.handleIgnEntryNumber}
                            ignList={props.ignList}
                            handleIgnList={props.handleIgnList}
                            firstNameRef={props.firstNameRef}
                            lastNameRef={props.lastNameRef}
                            handleFirstNameForEdit={props.handleFirstNameForEdit}
                            handleLastNameForEdit={props.handleLastNameForEdit}
                            firstNameForEdit={props.firstNameForEdit}
                            lastNameForEdit={props.lastNameForEdit}
                            handleProfileEditForm={props.handleProfileEditForm}
                        />;
                    } else if (props.profileNavTab === 'search') {
                        return <Search domain={props.domain} addFriend={props.addFriend} searchData={props.searchData} fetchSearchData={props.fetchSearchData} searchInputRef={props.searchInputRef} username={props.username} />;
                    }
                }())}

            </div>

        </div>

        <div className="col-3 d-none d-lg-block">
            <SocialBlock domain={props.domain} addFriend={props.addFriend} searchData={props.searchData} fetchSearchData={props.fetchSearchData} searchInputRef={props.searchInputRef} username={props.username} />
        </div>
    </React.Fragment>;

    return element;
}
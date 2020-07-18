function Main() {
    const [notifications, setNotifications] = React.useState(data.notifications);
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

    function handleNotificationRemove(nid, domain) {
        let newNotifications = [];
        let url = domain + 'notifications/remove/' + nid
        notifications.map(notif=>{
            if (notif.nid !== nid) {
                newNotifications.push(notif);
            }
        })
        fetch(url)
            .then(data=>data.json())
            .then(data=>{
                if(data.msg) {
                    if(data.err === true)
                        alert(`An error has occured. Msg : ${data.msg}`);
                    else
                        alert(data.msg);
                } else {
                    if (data.removed)
                        setNotifications(newNotifications);
                    else
                        alert("Failed to remove notification! Please try again later.");
                }
            })
            .catch(err=>{console.log(err); alert("Something is wrong! Error -> " + err)});
    }

    function handleFriendRequestResponse(response, username, domain, nid) {
        let url = domain + 'notifications/friendrequest/' + username + '/' + response + '?nid=' + nid;
        fetch(url)
            .then(data=>data.json())
            .then(data=>{
                if(data.msg) {
                    if(data.err === true)
                        alert(`An error has occured. Msg : ${data.msg}`);
                    else
                        alert(data.msg);
                } else {
                    if (data.done) {
                        let newNotifications = [];
                        notifications.map(notif=>{
                            if(notif.nid !== nid)
                                newNotifications.push(notif);
                            else {
                                let newObj = {...notif, request : data.request};
                                newNotifications.push(newObj);
                            }
                        })
                        setNotifications(newNotifications);
                    }
                    else
                        alert(`Failed to ${response} friend request. Please try again later.`);
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
                            notifications={notifications}
                            handleNotificationRemove={handleNotificationRemove}
                            handleFriendRequestResponse={handleFriendRequestResponse}
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
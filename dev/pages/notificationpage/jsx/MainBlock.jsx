//// FUNCTION ////

/////////////////

function Loading() {
    const element = <div className="text-muted text-center d-block my-5">
            <p>Loading...</p>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>;
    return element;
}

function FR2accepted(props) {
    let notifTime = new Date(props.notification.time);

    const element = <div className="d-block w-100 border border-dark my-2">
        <div className="row p-3">
            <div className="col-12 d-flex align-items-center">
                <div className="text-light py-3"><a href={props.domain + 'dashboard/' + props.notification.requestFrom}>@{props.notification.requestFrom}</a> has accepted your friend request.</div>
            </div>
        </div>
        <div className="w-100 d-flex justify-content-between align-items-center border-top border-dark p-3">
            <div className="text-muted small">{notifTime.toDateString()}, {notifTime.toLocaleTimeString()}</div>
            <div className="d-block" onClick={()=>{props.handleNotificationRemove(props.notification.nid, props.domain);}}><img className="close-notification" src={props.domain + 'img/svg/close.svg'} alt="close" title="remove" /></div>
        </div>
    </div> ;
    return element;
}

function FR1pending(props) {
    let notifTime = new Date(props.notification.time);

    const element = <div className="d-block w-100 border border-dark my-2">
        <div className="row p-3">
            <div className="col-12 col-md-8 d-flex align-items-center">
                <div className="text-light py-3">You have a friend request from <a href={props.domain + 'dashboard/' + props.notification.requestFrom}>@{props.notification.requestFrom}</a> </div>
            </div>
            <div className="col-12 col-md-4 d-flex align-items-center">
                <div className="w-100">
                    <button className="btn btn-primary btn-block" onClick={()=>{props.handleFriendRequestResponse('accept', props.notification.requestFrom, props.domain, props.notification.nid)}}>Accept</button>
                    <button className="btn btn-danger btn-block" onClick={()=>{props.handleFriendRequestResponse('reject', props.notification.requestFrom, props.domain, props.notification.nid)}}>Reject</button>
                </div>
            </div>
        </div>
        <div className="w-100 d-flex justify-content-between align-items-center border-top border-dark p-3">
            <div className="text-muted small">{notifTime.toDateString()}, {notifTime.toLocaleTimeString()}</div>
            <div className="d-block" onClick={()=>{props.handleNotificationRemove(props.notification.nid, props.domain);}}><img className="close-notification" src={props.domain + 'img/svg/close.svg'} alt="close" title="remove" /></div>
        </div>
    </div> ;
    return element;
}

function FR1accepted(props) {
    let notifTime = new Date(props.notification.time);

    const element = <div className="d-block w-100 border border-dark my-2">
        <div className="row p-3">
            <div className="col-12 d-flex align-items-center">
                <div className="text-light py-3">You are now friends with <a href={props.domain + 'dashboard/' + props.notification.requestFrom}>@{props.notification.requestFrom}</a> </div>
            </div>
        </div>
        <div className="w-100 d-flex justify-content-between align-items-center border-top border-dark p-3">
            <div className="text-muted small">{notifTime.toDateString()}, {notifTime.toLocaleTimeString()}</div>
            <div className="d-block" onClick={()=>{props.handleNotificationRemove(props.notification.nid, props.domain);}}><img className="close-notification" src={props.domain + 'img/svg/close.svg'} alt="close" title="remove" /></div>
        </div>
    </div> ;
    return element;
}

function FR1rejected(props) {
    let notifTime = new Date(props.notification.time);
    
    const element = <div className="d-block w-100 border border-dark my-2">
        <div className="row p-3">
            <div className="col-12 d-flex align-items-center">
                <div className="text-light py-3">Friend request from <a href={props.domain + 'dashboard/' + props.notification.requestFrom}>@{props.notification.requestFrom}</a> has been rejected.</div>
            </div>
        </div>
        <div className="w-100 d-flex justify-content-between align-items-center border-top border-dark p-3">
            <div className="text-muted small">{notifTime.toDateString()}, {notifTime.toLocaleTimeString()}</div>
            <div className="d-block" onClick={()=>{props.handleNotificationRemove(props.notification.nid, props.domain);}}><img className="close-notification" src={props.domain + 'img/svg/close.svg'} alt="close" title="remove" /></div>
        </div>
    </div> ;
    return element;
}

function Notification(props) {
    let element = <span className="d-none"></span>;

    if(props.notification.type === 'fr1') {
        if(props.notification.request === 'pending')
            element = <FR1pending
                domain={props.domain}
                notification={props.notification}
                handleNotificationRemove={props.handleNotificationRemove}
                handleFriendRequestResponse={props.handleFriendRequestResponse}
            />;
        else if(props.notification.request === 'accepted')
            element = <FR1accepted
                domain={props.domain}
                notification={props.notification}
                handleNotificationRemove={props.handleNotificationRemove}
            />;
        else if(props.notification.request === 'rejected') 
            element = <FR1rejected
                domain={props.domain}
                notification={props.notification}
                handleNotificationRemove={props.handleNotificationRemove}
            />;
    } else if(props.notification.type === "fr2") {
        if(props.notification.request === "accepted")
            element = <FR2accepted
                domain={props.domain}
                notification={props.notification}
                handleNotificationRemove={props.handleNotificationRemove}
            />;
    }

    return element;
}

function MainBlock(props) {
    const element = <React.Fragment>
        <h2 className="display-5 my-3">Notifications</h2>
        {(function(){
            let elementsArray = [];
            if(props.notifications.length > 0) {
                props.notifications.map(notification=>{
                    elementsArray.push(<Notification
                        key={notification.nid}
                        domain={props.domain}
                        notification={notification}
                        handleNotificationRemove={props.handleNotificationRemove}
                        handleFriendRequestResponse={props.handleFriendRequestResponse}
                    />);
                })
                return elementsArray;
            } else {
                return <div className="text-muted w-100 text-center">No notifications</div>;
            }
        }())}
    </React.Fragment>;

    return element;
}
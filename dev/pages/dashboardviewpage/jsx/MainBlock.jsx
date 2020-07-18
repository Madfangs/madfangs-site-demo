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
                        {/* {props.editable ? <span className="d-none"></span> : props.available ? <button className="btn btn-primary d-block mx-auto">Add Friend</button> : <span className="d-none"></span> } */}
                    </div>
                </div>

                <Details exp={props.exp} />

            </div>

        </div>

        <div className="col-3 d-none d-lg-block">
            <SocialBlock domain={props.domain} searchData={props.searchData} addFriend={props.addFriend} available={props.available} fetchSearchData={props.fetchSearchData} searchInputRef={props.searchInputRef} username={props.username} />
        </div>
    </React.Fragment>;

    return element;
}
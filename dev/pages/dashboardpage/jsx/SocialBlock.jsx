function SearchResults(props) {
    const element = <React.Fragment>
        {props.data.map(person=>{
            return (<div className="d-block col-12 friend-card border border-dark p-3 mb-3">
                <div className="row d-flex flex-wrap align-items-center text-center">
                    <div className="friend-card-img mx-auto"><img src={person.imageLink} alt={person.username + " image"} className="friend-card-img-file"/></div>
                    <div className="col">
                        <p className="lead text-light m-0">{person.firstName} {person.lastName}<br /><a href={props.domain + "dashboard/" + person.username} className="text-muted small">@{person.username}</a></p>
                    </div>
                    {person.available ? <div className="w-100 d-block mt-3" ><button className="btn btn-primary btn-block" onClick={()=>{props.addFriend(person.username, props.domain)}}>Add Friend</button></div> : <span className="d-none"></span>}
                </div>
            </div>);
        })}
    </React.Fragment>;

    return element;
}


function SocialBlock(props) {
    function handleKeyDown(event) {
        let keyValue = event.which || event.keyCode;
        if(keyValue === 13)
            props.fetchSearchData(props.domain, props.username);
        return;
    }

    const element = <React.Fragment>
        <div className="container-fluid">
            <h2 className="lead">Search users</h2>
            <div class="input-group w-100 mb-4 bg-dark search-bar">
                <input type="text" class="col bg-dark border-0 search-input text-light" ref={props.searchInputRef} placeholder="username" onKeyDown={handleKeyDown} />
                <div className="search" onClick={()=>{props.fetchSearchData(props.domain, props.username)}}>
                    <div class="input-group-text bg-dark border-0"><img className='search-btn' src={props.domain + 'img/svg/search.svg'} alt='Search' /></div>
                </div>
            </div>
            <SearchResults data={props.searchData} domain={props.domain} addFriend={props.addFriend} />
        </div>
    </React.Fragment>;
    return element;
}
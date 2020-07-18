let stop = 0;
let scrollValue = 0;
function stopScroll() {
    return;
    window.scrollTo(0, stop);
}
function preventScrollY(event) {
    return;
    stop = window.scrollY;
    window.addEventListener('scroll', stopScroll);
}
function resumeScrollY() {
    return;
    window.removeEventListener('scroll', stopScroll);
}
function scrollNow(event) {
    let val = event.currentTarget.scrollLeft;
    event.currentTarget.scrollTo(val + event.deltaY, 0);
}

function TournamentCard(props) {
    const element = <div className="px-1 col-12 col-md-6 card tournament-card my-3">
        <div className="card col-12 px-0 tournament-card border border-dark">
            <div className="card-body py-5" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(28, 28, 28, 0.4), rgba(28, 28, 28, 0.8)), url(img/jpg/fortnite-tournamentimg-' + props.background + '.jpg)', backgroundSize: 'cover' }}>
                <div className="card-title lead text-center">{props.name}</div>
                <div className="card-text">{props.subheading}</div>
            </div>
            <div className="card-footer border-top border-dark text-center">
                <div className="card-text text-muted my-1"><i class="im im-clock-o" /> {props.dateandtime}</div>
                <div className="card-text text-muted my-1"><i class="im im-award" /> {props.prizepool}</div>
                <div className="card-text text-muted my-1"><i class="im im-users" /> {props.type}</div>
                <div className="card-text text-muted my-1"><i class="im im-server" /> {props.server} Server</div>
            </div>
            <div className="card-footer border-top border-dark text-center">
                <a href={props.domain + 'play/tournament/' + props.game + '/' + props.id}><button className="btn btn-primary">Check it out</button></a>
            </div>
        </div>
    </div >;
    return element;
}

function ScrimCard(props) {
    const element = <div className="col-12 col-xl-6 my-2 scrim-card">
        <div className="row align-items-center">
            <img src={'img/png/' + props.game + '-icon.png'} className="game-icon" />
            <div className="col">
                <div className="lead">{props.title}</div>
                <div className="small text-muted pb-1">Code: {props.code}</div>
                <p className="text-muted">
                    <div className="row">
                        <div className="col-6"><i class="im im-users" /><div className="small pl-1 d-inline">{props.participants} / {props.participantsLimit}</div></div>
                        <div className="col-6"><i class="im im-trophy" /><div className="small pl-1 d-inline">{props.expReward} exp </div></div>
                    </div>
                </p>
            </div>
        </div>
    </div>;

    return element;
}

function HandleScrimCards(props) {
    let element;
    let gameExistsInList = false;
    props.scrimsList.map(scrims=>{
        if(scrims.game === props.game)
            gameExistsInList = true;
    })

    element = <React.Fragment>
        {props.scrimsList.map(scrims => {
            if (scrims.game === props.game) {
                return <React.Fragment>
                    {scrims.scrims.map(scrim => {
                        if (props.type === scrim.type) {
                            return <ScrimCard key={scrims.code} game={props.game} title={scrim.title} code={scrim.code} participants={scrim.participants} participantsLimit={scrim.participantsLimit} expReward={scrim.expReward} />
                        }
                    })}
                </React.Fragment>;
            }
        })}
    </React.Fragment>;

    if (gameExistsInList)
        return element;
    else
        return <div className="text-center my-4 text-muted">No Scrims are hosted for this game</div>;
}

function Slide(props) {
    const element = <div className={props.id === 1 ? 'carousel-item active' : 'carousel-item'}>
        <img src={props.domain + 'img/jpg/playpage-carousel-' + props.id + '.jpg'} className="w-100" />
        <div className="carousel-caption d-none d-md-block">
            <h5>{props.heading}</h5>
            <p className='lead'>{props.body}</p>
        </div>
    </div>;
    return element;
}

function Carousel(props) {
    const element = <div className="w-100 mb-5">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                {props.slides.map(slide => {
                    return (<Slide key={slide.id} id={slide.id} heading={slide.heading} body={slide.body} domain={props.domain} />);
                })}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    </div>;
    return element;
}

function GameCategory(props) {
    const element = <div className="card col-4 col-md-3 col-lg-2 game-card px-0 bg-dark mr-3" onClick={props.handleClick} data-key={props.game.id}>
        <img src={props.domain + 'img/jpg/' + props.game.id + '-card.jpg'} alt={props.game.name + ' Card'} className="card-img-top" />
    </div>;
    return element;
}

function MainBlock(props) {
    const [showingGame, setShowingGame] = React.useState(props.showingGame);
    const [gameType, setGameType] = React.useState('solo');

    function handleCategoryChange(event) {
        // change the game for which the scrims and tournaments are displayed
        setShowingGame(event.currentTarget.getAttribute('data-key'));
    }

    function handleTypeChange(event) {
        // Change the type of game displayed in scrims (solo, duo or squad)
        setGameType(event.currentTarget.value);
    }

    const element = <React.Fragment>
        <div className="col-12 col-lg-9">
            <Carousel domain={props.domain} slides={props.slides} />

            <div className="lead mb-3">Check out all our games</div>

            <div className="container-fluid game-card-- mb-5" onMouseEnter={preventScrollY} onMouseLeave={resumeScrollY} onWheel={scrollNow} id="hori-scroll-this">
                <div className="row flex-nowrap">
                    {props.gameCategories.map(game => {
                        return <GameCategory key={game.id} game={game} domain={props.domain} handleClick={handleCategoryChange} />
                    })}
                </div>
            </div>

            <div className="row my-3">
                {props.gameCategories.map(game=>{
                    if(game.id === showingGame)
                        return <div className="lead mx-1">Tournaments for {game.name}:</div>;
                })}
            </div>
            <div className="d-flex justify-content-around flex-wrap mt-4 mb-5">
                {props.tournamentsList.map(list => {
                    if (list.game === showingGame) {
                        if (list.tournaments.length < 1) {
                            return <div className="text-center my-4 text-muted">No Tournaments are hosted for this game</div>;
                        }
                        return (list.tournaments.map(tournament => {
                            return <TournamentCard key={tournament.id} id={tournament.id} domain={props.domain} game={showingGame} name={tournament.name} subheading={tournament.subheading} dateandtime={tournament.dateandtime} prizepool={tournament.prizepool} type={tournament.type} server={tournament.server} background={tournament.background} />;
                        }));
                    }
                })}

                {(function(){
                    let gameExistsInList = false;
                    props.tournamentsList.map(list=>{
                        if(list.game === showingGame)
                            gameExistsInList = true;
                    })
                    if(!gameExistsInList)
                        return <div className="text-center my-4 text-muted">No Tournaments are hosted for this game</div>;
                }())}
            </div>

            <div className="lead">
                <div className="row">
                    {props.gameCategories.map(game=>{
                        if(game.id === showingGame)
                            return <p className="pl-1">Showing scrims for {game.name} : </p>;
                    })}
                    <select className="custom-select col-10 col-lg-4 mx-auto bg-dark text-light game-type" onChange={handleTypeChange}>
                        <option value="solo" selected>solo</option>
                        <option value="duo">duo</option>
                        <option value="squad">squad</option>
                    </select>
                </div>
            </div>

            <div className="container-fluid d-flex justify-content-around flex-wrap my-4">
                <HandleScrimCards scrimsList={props.scrimsList} game={showingGame} type={gameType} />
            </div>
        </div>


        <div className="col-3 d-none d-lg-block">
            <Stats rankStatsGraphData={data.rankStatsGraphData} gameCategories={props.gameCategories} game={showingGame} topPlayers={data.topPlayers} />
        </div>

    </React.Fragment>;
    return element;
}
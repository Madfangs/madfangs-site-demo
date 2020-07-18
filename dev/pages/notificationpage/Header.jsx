function NavbarLinks(props) {
    const element = <li className={"nav-item pl-4 " + props.active}>
        <a href={props.domain + props.nav.link} className="nav-link">{props.nav.name.charAt(0).toUpperCase() + props.nav.name.slice(1)}</a>
    </li>;
    return element;
}

function DropdownNavbarLinks(props) {
    const element = <a class="text-muted text-nowrap py-2 nav-link" href={props.domain + props.nav.link}>{props.nav.name.charAt(0).toUpperCase() + props.nav.name.slice(1)}</a>;
    return element;
}

function HandleNavbarLinks(props) {
    let brfound = false;
    let brIndex = 0;
    const element = <React.Fragment>
        {props.navigationFull.map((nav, index) => {
            if (!brfound) {
                if (nav.name === 'br') {
                    brfound = true;
                    brIndex = index;
                    return;
                }
                if (nav.link === props.activeNav) {
                    return <NavbarLinks key={nav} nav={nav} active="active" domain={props.domain} />;
                }
                return <NavbarLinks key={nav} nav={nav} active="" domain={props.domain} />;
            }
        })}

        {brfound ? <li class="nav-item dropdown pl-4 d-block d-md-none">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                More
            </a>
            <div class="dropdown-menu header-bg-color" aria-labelledby="navbarDropdown">
                {brIndex === 0 ? <span></span> : props.navigationFull.map((nav, index) => {
                    if (index > brIndex) {
                        return <DropdownNavbarLinks key={nav} nav={nav} domain={props.domain} />;
                    }
                })}
            </div>
        </li> : <span></span>}
    </React.Fragment>;
    return element;
}

function Header(props) {
    const element = <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark header p-2 p-md-4 fixed-top">
            <div className="logo--">
                <a href="#"><img src={props.domain + "img/svg/logo.svg"} alt="logo" className="logo" /></a>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navigation">
                <ul className="navbar-nav">
                    <HandleNavbarLinks navigationFull={props.navigationFull} domain={props.domain} activeNav={props.activeNav} />

                </ul>
            </div>
        </nav>
        <div className="clear-header-lg d-none d-md-block"></div>
        <div className="clear-header-md d-block d-md-none"></div>
    </React.Fragment>;

    return element;
}
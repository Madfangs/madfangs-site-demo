function Link(props) {
    if (props.nav.name === 'br') { // when br is found adds a line break
        return <br />;
    }
    if (props.nav.link === props.active) { // adds the active-sidenav class to the active tab
        return <li className="nav-item sidenav-item active-sidenav p-1">
            <a href={props.domain + props.nav.link} className="text-muted">{props.nav.name.charAt(0).toUpperCase() + props.nav.name.slice(1)}</a>
        </li>;
    }
    return <li className="nav-item sidenav-item p-1">
        <a href={props.domain + props.nav.link} className="text-muted">{props.nav.name.charAt(0).toUpperCase() + props.nav.name.slice(1)}</a>
    </li>;
}

function SideNavigation(props) {
    const element = <React.Fragment>
        <ul className="navbar-nav text-muted">
            {props.navs.map(nav => {
                return <Link key={nav.link + "2"} nav={nav} active={props.active} domain={props.domain} />;
            })}
        </ul>
    </React.Fragment>;
    return element;
}

// ReactDOM.render(<SideNavigation active={data.activeNav} navs={data.navigationFull} domain={data.domainName} />, document.getElementById('side-navigation'));
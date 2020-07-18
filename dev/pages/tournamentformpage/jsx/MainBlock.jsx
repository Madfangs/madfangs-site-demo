function MainBlock (props) {
    let element, i = window.pageYOffset, scrolling = false;
    let formUrl = props.domain + "tournament/tid/" + props.tid + "/register";

    if (props.t !== "") {
        formUrl += "?t=" + props.t;
        console.log("worked");
    }        

    // window.onscroll = ()=>{
    //     if (!scrolling)
    //         i = window.pageYOffset;
    // }

    function scrollToRegisterForm() {
        let rect = props.registerForm.current.getBoundingClientRect();
        let scrollValue = rect.top;
        // animateScrollRegisterForm(scrollValue - 90);
        window.scrollTo(0, scrollValue - 90);
    }

    // function animateScrollRegisterForm (position) {
    //     console.log(i, position, i < position);
    //     if (i < position) {
    //         scrolling = true;
    //         requestAnimationFrame(animateScrollRegisterForm);
    //         window.scrollTo(0, i);
    //         i+=20;
    //     } else {
    //         scrolling = false;
    //         i = window.pageYOffset;
    //         window.scrollTo(0, position);
    //         console.log("stopped");
    //     }
    // }

    if (!props.tourneyDetails.tid) {
        element = <React.Fragment>
        <div className="container p-2">
            <div className="d-block w-100 text-center my-5 text-muted">Loading ...</div>
        </div>
    </React.Fragment>;
    } else {

        let game = props.tourneyDetails.game.toString().trim() || "pubgm";
        let days = ["Sunday", "Monday", "TuesDay", "Wednesday", "Thursday", "Friday", "Saturday"];
        let months= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let tournamentName = props.tourneyDetails.tournamentName.toString().trim() || toUpperCase(game) + " Tournament",
            entryFees = parseInt(props.tourneyDetails.entryFees),
            slots = parseInt(props.tourneyDetails.slots),
            slotsMax = parseInt(props.tourneyDetails.slotsMax),
            tid = parseInt(props.tourneyDetails.tid),
            dateAndTime = new Date(props.tourneyDetails.dateAndTime),
            mapName = props.tourneyDetails.mapName.toString().trim(),
            gameType = props.tourneyDetails.gameType.toString().trim(),
            gameMode = props.tourneyDetails.gameMode.toString().trim(),
            rewards = props.tourneyDetails.rewards,
            state = props.tourneyDetails.state.toString().trim();
        let hour = parseInt(dateAndTime.getHours()), minutes = dateAndTime.getMinutes(), timeSubfix = "AM";

        if (hour > 12) {
            timeSubfix = "PM";
            hour -= 12;
        }

        element = <div className="container p-2">
            <div class="d-block w-100 py-4">
                <h2 className="text-light text-center mb-2">{tournamentName}</h2>
                {(function () {
                    if (entryFees <= 0) {
                        return <div className="text-center text-success py-2">Free Entry</div>;
                    } else {
                        return <div className="text-center text-success py-2">Entry Fees : &#8377;{entryFees}</div>;
                    }
                })()}
                {(function () {
                    if (slots === slotsMax)
                        return <div class="text-success text-center mb-2">Slots Full!</div>;
                    else
                        return <div class="text-light text-center mb-2">Slots : {slots} / {slotsMax}</div>;
                })()}
            </div>

            <div className="d-block w-100 my-2">
                <div className="d-block w-100 p-2 m-auto border border-dark" style={{maxWidth : "550px"}}>
                    <div className="lead text-light text-center mb-3">Tournament Details</div>
                    <p className="text-light">
                        Date : <span className="text-info">{dateAndTime.getDate()} {months[dateAndTime.getMonth()]} , {dateAndTime.getFullYear()}</span> <span className="text-muted"> ({days[dateAndTime.getDay()]})</span><br />
                        Time : <span className="text-info">{hour === 0 ? "00" : hour} : {minutes === 0 ? "00" : minutes} {timeSubfix}</span><br />
                        {mapName === "default" ? <span className="d-none"></span> : <React.Fragment>Map : <span className="text-info">{mapName}</span><br /></React.Fragment>}
                        Game : <span className="text-info">{game}</span><br />
                        Game Mode : <span className="text-info">{gameMode}</span><br />
                        Game Type : <span className="text-info">{gameType}</span><br />
                    </p>
                    {slots == slotsMax || state !== "active" ? 
                        <button className="btn btn-block btn-success" disabled>Register</button>
                        : <button className="btn btn-block btn-success" onClick={scrollToRegisterForm}>Register</button>
                    }
                </div>
            </div>

            <div className="d-block w-100 p-2 my-4">
                <div className="d-block w-100 lead text-light text-center mb-2">Rewards</div>
                <table className="table table-dark text-center">
                    <thead>
                        <tr>
                            <th scope="col">Position</th>
                            <th scope="col">Reward</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rewards.map(reward=>{
                            return <tr>
                                <td>{reward.position.toString().trim()}</td>
                                <td>{reward.reward.toString().trim()}</td>
                            </tr>;
                        })}
                    </tbody>
                </table>
            </div>

            <div className="d-block w-100 p-2 mb-3">
                <div className="d-block w-100 m-auto" style={{maxWidth : "800px"}}>
                    <div className="text-light text-center d-block w-100 lead p-2">Rules</div>
                    <p className="text-light">
                        1. No Emulators are allowed.<br /><br />
                        2. Cheating in any shape or form is a bannable offence. We will take strict actions against players who cheat in the tournaments. Cheating includes but is not limited to, using emulators, using aimbots, using hacks, stream sniping etc.<br/><br />
                        3. The custom room ID and password will be sent to you by personally contacting you using your contact information. If you are playing with a team, share it with your team-mates and no one else.<br /><br />
                        4. The tournament fixtures and the exact date and time for each match will be informed by us using your contact information you provide us with.<br /><br />
                        5. If you win the tournament, we will contact you using your contact information and we will arrange to provide you, your reward. A reward confirmation is always provided by us on our Instagram Account (<a href="https://www.instagram.com/madfangs.sports/">Click here to visit</a>)<br /><br />
                        6. The tournaments will start on time. Please join the room 15 mins prior to the starting time. Any loss due to you not being on time will not be covered by Madfangs.
                    </p>
                </div>
            </div>

            <div className="d-block w-100 p-2 m-auto mb-3 border border-dark" style={{maxWidth : "800px"}} ref={props.registerForm}>
                <h3 className="d-block w-100 text-center text-light pb-3">Register</h3>


                <form action={formUrl} method="post"> 

                {gameType != "solo" ?
                    <div className="d-block w-100 text-light my-2">
                        <div className="form-group">
                            <label for="team-name" className="col-12 col-form-label">Team Name <span className="text-danger">*</span></label>
                            <div className="col-12">
                                <input name="teamName" type="text" className="form-control bg-dark text-light border-0" id="team-name" placeholder="Team Name" value={props.teamName} onChange={event=>{props.setTeamName(event.currentTarget.value); }} />
                            </div>
                        </div>
                    </div>
                    : <span className="d-none"></span>
                }

                <br />

                <Participants
                    setParticipants={props.setParticipants}
                    playerCount={props.playerCount}
                    handleParticipantsInput={props.handleParticipantsInput}
                    firstParticipantName={props.firstParticipantName}
                    secondParticipantName={props.secondParticipantName}
                    thirdParticipantName={props.thirdParticipantName}
                    fourthParticipantName={props.fourthParticipantName}
                    firstParticipantIgn={props.firstParticipantIgn}
                    secondParticipantIgn={props.secondParticipantIgn}
                    thirdParticipantIgn={props.thirdParticipantIgn}
                    fourthParticipantIgn={props.fourthParticipantIgn}
                    setFirstParticipantIgn={props.setFirstParticipantIgn}
                    setSecondParticipantIgn={props.setSecondParticipantIgn}
                    setThirdParticipantIgn={props.setThirdParticipantIgn}
                    setFourthParticipantIgn={props.setFourthParticipantIgn}
                    setFirstParticipantName={props.setFirstParticipantName}
                    setSecondParticipantName={props.setSecondParticipantName}
                    setThirdParticipantName={props.setThirdParticipantName}
                    setFourthParticipantName={props.setFourthParticipantName}
                />

                <br />

                <div className="d-block w-100 text-light my-2">
                    <div className="form-group">
                        <label for="email-id" className="col-12 col-form-label">Email ID <span className="text-danger">*</span></label>
                        <div className="col-12">
                            <input name="emailID" type="email" className="form-control bg-dark text-light border-0" id="email-id" placeholder="Email ID" value={props.emailID} onChange={event=>{props.setEmailID(event.currentTarget.value)}} />
                        </div>
                    </div>
                </div>

                <div className="d-block w-100 text-light my-2">
                    <div className="form-group">
                        <label for="contact-info" className="col-12 col-form-label">Contact Number (WhatsApp preferred) <span className="text-danger">*</span></label>
                        <div className="col-12">
                            <input name="contactInfo" type="number" className="form-control bg-dark text-light border-0" id="contact-info" placeholder="Contact Number" value={props.contactInfo} onChange={event=>{props.setContactInfo(event.currentTarget.value)}} />
                        </div>
                        <small className="d-block w-100 text-muted px-3">*Please enter a valid contact number. We won't be able to send you the Custom Room ID and password if we cannot contact you. (WhatsApp phone number is preferred). In case you face any issues, please contact <span className="text-info">+918399012435</span>.</small>
                    </div>
                </div>

                <input type="hidden" className="d-none" name="tid" value={props.tid} />


                {slots == slotsMax || state !== "active" ?
                    <button className="btn btn-block btn-success mt-5 mb-3" onClick={props.handleRegister} type="submit" disabled>Register</button>
                    : <button className="btn btn-block btn-success mt-5 mb-3" onClick={props.handleRegister} type="submit">Register</button>    
                }
                

                </form>
            </div>

        </div>;
    }
    

    return element;
}
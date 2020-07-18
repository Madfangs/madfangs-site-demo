function Participants (props) {
    let element = <React.Fragment>
                    {props.playerCount >= 1 ?
                    <div className="d-block w-100 p-2 border border-dark my-2">
                        <div className="d-block w-100 text-light my-2">
                            <div className="form-group">
                                <label for={"player-1-name"} className="col-12 col-form-label">Player 1 Name</label>
                                <div className="col-12">
                                    <input name="player1Name" type="text" className="form-control bg-dark text-light border-0" id={"player-1-name"} placeholder={"Player 1 Name"} value={props.firstParticipantName} onChange={event=>{props.setFirstParticipantName(event.currentTarget.value)}} />
                                </div>
                            </div>
                        </div>

                        <div className="d-block w-100 text-light my-2">
                            <div className="form-group">
                                <label for={"player-1-ign"} className="col-12 col-form-label">Player 1 IGN (In Game Name) <span className="text-danger">*</span></label>
                                <div className="col-12">
                                    <input name="player1Ign" type="text" className="form-control bg-dark text-light border-0" id={"player-1-ign"} placeholder={"Player 1 IGN"} value={props.firstParticipantIgn} onChange={event=>{props.setFirstParticipantIgn(event.currentTarget.value)}} />
                                </div>
                            </div>
                        </div>
                    </div>: <span className="d-none"></span>}

                    {props.playerCount >= 2 ?
                    <div className="d-block w-100 p-2 border border-dark my-2">
                        <div className="d-block w-100 text-light my-2">
                            <div className="form-group">
                                <label for={"player-2-name"} className="col-12 col-form-label">Player 2 Name</label>
                                <div className="col-12">
                                    <input name="player2Name" type="text" className="form-control bg-dark text-light border-0" id={"player-2-name"} placeholder={"Player 2 Name"} value={props.secondParticipantName} onChange={event=>{props.setSecondParticipantName(event.currentTarget.value)}} />
                                </div>
                            </div>
                        </div>

                        <div className="d-block w-100 text-light my-2">
                            <div className="form-group">
                                <label for={"player-2-ign"} className="col-12 col-form-label">Player 2 IGN (In Game Name) <span className="text-danger">*</span></label>
                                <div className="col-12">
                                    <input name="player2Ign" type="text" className="form-control bg-dark text-light border-0" id={"player-2-ign"} placeholder={"Player 2 IGN"} value={props.secondParticipantIgn} onChange={event=>{props.setSecondParticipantIgn(event.currentTarget.value)}} />
                                </div>
                            </div>
                        </div>
                    </div>: <span className="d-none"></span>}

                    {props.playerCount >= 3 ?
                    <div className="d-block w-100 p-2 border border-dark my-2">
                        <div className="d-block w-100 text-light my-2">
                            <div className="form-group">
                                <label for={"player-3-name"} className="col-12 col-form-label">Player 3 Name</label>
                                <div className="col-12">
                                    <input name="player3Name" type="text" className="form-control bg-dark text-light border-0" id={"player-3-name"} placeholder={"Player 3 Name"} value={props.thirdParticipantName} onChange={event=>{props.setThirdParticipantName(event.currentTarget.value)}} />
                                </div>
                            </div>
                        </div>

                        <div className="d-block w-100 text-light my-2">
                            <div className="form-group">
                                <label for={"player-3-ign"} className="col-12 col-form-label">Player 3 IGN (In Game Name) <span className="text-danger">*</span></label>
                                <div className="col-12">
                                    <input name="player3Ign" type="text" className="form-control bg-dark text-light border-0" id={"player-3-ign"} placeholder={"Player 3 IGN"} value={props.thirdParticipantIgn} onChange={event=>{props.setThirdParticipantIgn(event.currentTarget.value)}} />
                                </div>
                            </div>
                        </div>
                    </div>: <span className="d-none"></span>}

                    {props.playerCount >= 4 ?
                    <div className="d-block w-100 p-2 border border-dark my-2">
                        <div className="d-block w-100 text-light my-2">
                            <div className="form-group">
                                <label for={"player-4-name"} className="col-12 col-form-label">Player 4 Name</label>
                                <div className="col-12">
                                    <input name="player4Name" type="text" className="form-control bg-dark text-light border-0" id={"player-4-name"} placeholder={"Player 4 Name"} value={props.fourthParticipantName} onChange={event=>{props.setFourthParticipantName(event.currentTarget.value)}} />
                                </div>
                            </div>
                        </div>

                        <div className="d-block w-100 text-light my-2">
                            <div className="form-group">
                                <label for={"player-4-ign"} className="col-12 col-form-label">Player 4 IGN (In Game Name) <span className="text-danger">*</span></label>
                                <div className="col-12">
                                    <input name="player4Ign" type="text" className="form-control bg-dark text-light border-0" id={"player-4-ign"} placeholder={"Player 4 IGN"} value={props.fourthParticipantIgn} onChange={event=>{props.setFourthParticipantIgn(event.currentTarget.value)}} />
                                </div>
                            </div>
                        </div>
                    </div>: <span className="d-none"></span>}
        </React.Fragment>;

    return element;
}
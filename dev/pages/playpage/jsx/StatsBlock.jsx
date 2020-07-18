
function RankStatsGraph(props) {
    let rankStatsGraph = React.createRef();

    React.useEffect(() => {
        const canvas = rankStatsGraph.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetWidth;
        window.onresize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetWidth;
            init();
        };

        const c = canvas.getContext('2d');

        // Data
        let data = props.rankStatsGraphData;
        const maxDataLength = 10;
        function trimData() {
            let i = data.length - maxDataLength;
            if (i > 0) {
                while (i > 0) {
                    data.shift();
                    i--;
                }
            }
        }
        trimData();

        // Variables
        const gap = 20; // the gap between the points and the axes from the borders
        // const baseColor = "#47B2F1";
        const baseColor = "#fff";
        const lineColor = "#555";
        const pointColor = "#D8456E";
        const textColor = "#47B2F1";
        const pointRadius = 7;
        const leastMaxValOfData = 20;
        // const xlabel = 'per game →';
        // const ylabel = 'rank →';
        const xlabel = '';
        const ylabel = '';
        const msg = "No stats";

        // mouse cursor coordinates
        let mouse = {
            x: 0,
            y: 0
        }

        canvas.onmousemove = (event) => {
            var rect = event.currentTarget.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            mouse.x = x;
            mouse.y = y;
        };


        class Page {
            constructor(xlabel, ylabel) {
                this.xlabel = xlabel;
                this.ylabel = ylabel;
            }

            draw() {
                //horizontal line
                c.beginPath();
                c.moveTo(gap, canvas.width - gap);
                c.lineTo(canvas.width, canvas.width - gap);
                c.strokeStyle = textColor;
                c.stroke();
                c.closePath();

                // vertical line
                c.beginPath();
                c.moveTo(gap, canvas.height - gap);
                c.lineTo(gap, 0);
                c.strokeStyle = textColor;
                c.stroke();
                c.closePath();

                // x-axis label
                c.beginPath();
                c.font = "17px Helvetica";
                c.fillStyle = textColor;
                c.textAlign = "center";
                c.fillText(this.xlabel, canvas.width / 2, canvas.height - (gap / 2));
                c.closePath();

                // y-axis label
                c.beginPath();
                c.font = "17px Helvetica";
                c.fillStyle = textColor;
                c.textAlign = "center";
                c.rotate(- Math.PI * 0.5);
                c.fillText(this.ylabel, - canvas.height / 2, (gap + 10) / 2);
                c.rotate(Math.PI * 0.5);
                c.closePath();
            }

            update() {
                this.draw();
            }
        }

        class Point {
            constructor(x, y, radius, yvalue) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color = pointColor;
                this.dradius = 1;
                this.maxradius = 10;
                this.initialradius = radius;
                this.yvalue = yvalue;
                this.drawText = false;
            }

            draw() {
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                c.fillStyle = this.color;
                c.fill();

                if (this.drawText) {
                    c.beginPath();
                    c.font = "15px Helvetica";
                    c.fillStyle = textColor;
                    c.textAlign = "center";
                    if (this.y < this.radius + 50) {
                        c.fillText(this.postfix(), this.x, this.y + (this.maxradius * 2) + 15);
                    } else {
                        c.fillText(this.postfix(), this.x, this.y - this.maxradius - 5);
                    }
                    c.closePath();
                }
            }

            postfix() {
                let add = '';
                if (this.yvalue % 10 === 1) {
                    add = 'st';
                } else if (this.yvalue % 10 === 2) {
                    add = 'nd';
                } else if (this.yvalue % 10 === 3) {
                    add = 'rd';
                } else {
                    add = 'th';
                }

                if (this.yvalue % 100 >= 10 && this.yvalue % 100 < 14) {
                    add = 'th';
                }

                return this.yvalue + add;
            }

            update() {
                if (mouse.x > (this.x - this.radius) && mouse.x < (this.x + this.radius) && mouse.y > (this.y - this.radius) && mouse.y < (this.y + this.radius)) {
                    this.color = baseColor;
                    this.drawText = true;
                    if (this.radius <= this.maxradius) {
                        this.radius += this.dradius;
                    }
                } else {
                    this.color = pointColor;
                    this.drawText = false;
                    if (this.radius >= this.initialradius) {
                        this.radius -= this.dradius;
                    }
                }

                this.draw();
            }
        }

        class Connect {
            constructor(coordinates) {
                this.coordinates = coordinates;
            }

            draw() {
                c.beginPath();
                c.moveTo(this.coordinates[0].x, this.coordinates[0].y);
                this.coordinates.map((co, index) => {
                    if (index != 0) {
                        c.lineTo(co.x, co.y);
                    }
                });
                c.strokeStyle = lineColor;
                c.stroke();
                c.closePath();
            }

            update() {
                this.draw();
            }
        }


        function plot(data) { // returns the coordinates of the data points
            const numOfValues = data.length;
            const maxVal = Math.max(...data) < leastMaxValOfData ? leastMaxValOfData : Math.max(...data);
            const spacingX = ((canvas.width - gap) / numOfValues);
            const spacingY = (canvas.height - 2 * gap) / maxVal;
            let coordinates = [];

            data.map((val, index) => {
                let x = gap + (spacingX * index);
                let y = (val * spacingY) + gap;
                coordinates.push({
                    x: x,
                    y: y,
                    valy: val
                });
            });
            return coordinates;
        }

        class Text {
            constructor(msg, color) {
                this.msg = msg;
                this.color = color;
            }
            draw() {
                c.beginPath();
                c.font = "17px Helvetica";
                c.fillStyle = textColor;
                c.textAlign = "center";
                c.fillText(this.msg, canvas.width / 2, canvas.height / 2);
                c.closePath();
            }
            update() {
                this.draw();
            }
        }

        let points = [];
        let page;
        let connect;
        let coordinates;
        let text;
        function init() {
            // dissasociate all variables for multiple initialization
            points = [];
            page = undefined;
            connect = undefined;
            coordinates = undefined;
            text = undefined;

            if (data.length < 1) {
                /* do something */
                text = new Text(msg, baseColor);
            } else {
                // Initialize page
                page = new Page(xlabel, ylabel);

                // Initialize points
                coordinates = plot(data);
                coordinates.map(co => {
                    points.push(new Point(co.x, co.y, pointRadius, co.valy));
                });

                // Initialize connect
                connect = new Connect(coordinates);
            }

        }

        function animate() {
            requestAnimationFrame(animate);
            c.clearRect(0, 0, canvas.width, canvas.height);

            if (data.length < 1) {
                /* do something */
                text.update();
            } else {
                page.update();
                connect.update();
                points.map(point => { point.update(); });
            }
        }

        init();
        animate();
    });

    const element = <canvas ref={rankStatsGraph} className="w-100 rankStatsGraph" >your browser doesnt support canvas</canvas>;
    return element;
}

function Stats(props) {
    let total = 0;
    props.rankStatsGraphData.map(val => {
        total += val;
    });
    let avgRank = (total / props.rankStatsGraphData.length).toFixed(2);

    const element = <React.Fragment>
        <div className="col">
            <div className="lead pt-2 pb-4">Your rank in the past games</div>
        </div>
        {props.rankStatsGraphData === undefined || props.rankStatsGraphData.length < 1 ? <div className="col"><div className="text-muted small text-center pt-2 pb-4">you have not played any games yet</div></div> : <RankStatsGraph rankStatsGraphData={props.rankStatsGraphData} />}
        <div className="col">
            {props.rankStatsGraphData === undefined || props.rankStatsGraphData.length < 1 ? <span /> : <div className="text-muted">Average Rank: {avgRank}</div>}

            {props.gameCategories.map(game=>{
                if(game.id === props.game)
                    return <h2 className="lead py-4">Top Players <small className="text-muted">({game.name})</small></h2>;
            })}

            <ul className="list-group list-group-flush">
                {props.topPlayers.map((playersList) => {
                    if (playersList.game === props.game) {
                        return playersList.players.map((player, index) => {
                            if (index === 0) {
                                return <li className="list-group-item bg-dark border border-top-0 border-bottom-0 border-warning text-muted">{player}</li>;
                            }
                            return <li className="list-group-item bg-dark text-muted">{player}</li>;
                        });

                    }
                })}
            </ul>
        </div>
    </React.Fragment>;
    return element;
}
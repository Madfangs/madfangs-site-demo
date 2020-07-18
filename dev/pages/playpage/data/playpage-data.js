const domainName = ''; // The domain name of the website
const navigationFull = ['play', 'clan', 'profile', 'notifications', 'br', 'store', 'leaderboards', 'earn rewards']; // The full navigation bar
//const navigationFull = ['play', 'clan', 'profile', 'notifications']; // The full navigation bar
const activeNav = 'play'; // Active tab
const gameCategories = ['fortnite', 'csgo', 'apexlegends', 'pubg', 'lol', 'clashroyale', 'freefire', 'pubgm', 'rainbowsixsiege', '8ballpool'];
const rankStatsGraphData = [10, 5, 20, 1, 15, 11, 13, 17, 13, 14, 4, 1];
const tournamentsList = [
    {
        game: 'fortnite',
        tournaments: [
            {
                id: 123456789,
                name: 'Fortnite Summer Championship',
                subheading: 'The biggest seasonal tournament is here!',
                dateandtime: '25th May 2020, 5:30pm IST',
                prizepool: '50,000 INR',
                type: 'squads',
                server: 'Middle East',
                background: 3
            },
            {
                id: 987654321,
                name: 'Fortnite Creative Agent',
                subheading: 'We bring to you the best of competitive creative wars',
                dateandtime: '10th June 2020, 6:00pm IST',
                prizepool: '30,000 INR',
                type: 'duo',
                server: 'Middle East',
                background: 2
            }
        ]
    },
    {
        game: 'pubgm',
        tournaments: []
    }
]
const topPlayers = [
    {
        game: 'pubgm',
        players: ['wrathL12', 'Jade55', 'Destroyer', 'xcal123', 'noobmaster69']
    },
    {
        game: 'fortnite',
        players: ['noobmaster69', 'Jade55', 'xcal123', 'Destroyer', 'wrathL12']
    },
    {
        game: 'csgo',
        players: ['noobmaster69', 'xcal123', 'Jade55', 'Destroyer', 'wrathL12']
    }
]
const slides = [
    {
        id: 1,
        heading: 'Welcome to madfangs',
        body: 'There are a lot of things you can explore'
    },
    {
        id: 2,
        heading: 'Check out all our games',
        body: 'We have a lot of games for your to play'
    },
    {
        id: 3,
        heading: 'Compete in a tournament',
        body: 'We host a lot of tournaments for all these games.'
    }
];
const scrimsList = [
    {
        game: 'pubgm',
        scrims: [
            {
                title: 'PUBGM Scrim 1',
                code: 123456789,
                type: 'solo',
                participants: 0,
                participantsLimit: 200,
                expReward: '1k'
            },
            {
                title: 'PUBGM Scrim 2',
                code: 789456123,
                type: 'duo',
                participants: 0,
                participantsLimit: 400,
                expReward: '2k'
            },
            {
                title: 'PUBGM Scrim 3',
                code: 987654321,
                type: 'squad',
                participants: 0,
                participantsLimit: 600,
                expReward: '3k'
            },
            {
                title: 'PUBGM Scrim 4',
                code: 7539514862,
                type: 'solo',
                participants: 0,
                participantsLimit: 600,
                expReward: '3k'
            }
        ]
    },
    {
        game: 'fortnite',
        scrims: [
            {
                title: 'fortnite Scrim 1',
                code: 123456789,
                type: 'solo',
                participants: 0,
                participantsLimit: 200,
                expReward: '1k'
            },
            {
                title: 'fortnite Scrim 2',
                code: 789456123,
                type: 'duo',
                participants: 0,
                participantsLimit: 400,
                expReward: '2k'
            },
            {
                title: 'fortnite Scrim 3',
                code: 987654321,
                type: 'squad',
                participants: 0,
                participantsLimit: 600,
                expReward: '3k'
            },
            {
                title: 'fortnite Scrim 4',
                code: 7539514862,
                type: 'solo',
                participants: 0,
                participantsLimit: 600,
                expReward: '3k'
            }
        ]
    }
]
const showingForGame = 'fortnite';
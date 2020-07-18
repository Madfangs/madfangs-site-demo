/*
br -> Battle Royale
tvt -> Team Vs Team
pvp -> Player Vs Player
*/

const games = [
    {
        id: 'fortnite',
        name: 'Fortnite',
        type: ['br']
    },
    {
        id: "pubgm",
        name: "PUBG Mobile",
        type: ['br', 'tvt']
    },
    {
        id: 'csgo',
        name: 'CS-GO',
        type: ['br', 'tvt']
    },
    {
        id: 'lol',
        name: 'League of Legends',
        type: ['tvt']
    },
    {
        id: 'pubg',
        name: 'PUBG',
        type: ['br']
    },
    {
        id: 'apexlegends',
        name: 'Apex Legends',
        type: ['br']
    },
    {
        id: 'rainbowsixsiege',
        name: 'Rainbow Six Siege',
        type: ['tvt']
    },
    {
        id: '8ballpool',
        name: '8-Ball Pool',
        type: ['pvp']
    },
    {
        id: 'clashroyale',
        name: 'Clash Royale',
        type: ['pvp', 'tvt']
    },
    {
        id: 'freefire',
        name: 'Free-Fire',
        type: ['br']
    }
];

module.exports = {
    games: games
}
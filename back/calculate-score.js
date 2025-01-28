function calculateScore(player1, player2, pointList) {
    let player1Points = 0;
    let player2Points = 0;
    let player1GamesWon = 0;
    let player2GamesWon = 0;
    let player1SetWon = 0;
    let player2SetWon = 0;
    let winner = "";
    let sets = [];

    const resetPoints = () => {
        player1Points = 0;
        player2Points = 0;
    };

    const resetGames = () => {
        player1GamesWon = 0;
        player2GamesWon = 0;
    };

    const saveSet = () => {
        sets.push([player1GamesWon, player2GamesWon]);
        resetGames();
        resetPoints();
    };

    for (let i = 0; i < pointList.length; i++) {
        const currentPoint = pointList[i];
        
        if (currentPoint === player1) {
            player1Points++;
        } else {
            player2Points++;
        }

        // Tie-break handling (when score is 6-6 in a set)
        // First to 7 points with 2 points gap wins
        // Points are counted normally (1,2,3,4...) instead of tennis scoring
        if (player1GamesWon === 6 && player2GamesWon === 6) {
            if (player1Points >= 7 && player1Points - player2Points >= 2) {
                player1GamesWon++;
                player1SetWon++;
                saveSet();
            } else if (player2Points >= 7 && player2Points - player1Points >= 2) {
                player2GamesWon++;
                player2SetWon++;
                saveSet();
            }
        } else {
            // Normal game logic : 4 points min with 2 points gap to win a game
            if (player1Points >= 4 && player1Points - player2Points >= 2) {
                player1GamesWon++;
                resetPoints();
            } else if (player2Points >= 4 && player2Points - player1Points >= 2) {
                player2GamesWon++;
                resetPoints();
            }

            // Check for set win : 6 games and 2 games gap to win a set
            if (player1GamesWon >= 6 && player1GamesWon - player2GamesWon >= 2) {
                player1SetWon++;
                saveSet();
            } else if (player2GamesWon >= 6 && player2GamesWon - player1GamesWon >= 2) {
                player2SetWon++;
                saveSet();
            }
        }

        // Check for match winner
        if (player1SetWon === 3) {
            winner = player1;
            break;
        }
        if (player2SetWon === 3) {
            winner = player2;
            break;
        }
    }

    // Add current set and game score if no winner 
    if (!winner) {
        // Add current set score if there are games won
        if (player1GamesWon > 0 || player2GamesWon > 0) {
            sets.push([player1GamesWon, player2GamesWon]);
        }
        
        // Add current game score if there are points
        if (player1Points > 0 || player2Points > 0) {
            // For tie back show points
            if (player1GamesWon === 6 && player2GamesWon === 6) {
                sets.push([player1Points, player2Points]);
            } else {
                //for normal game, show tennis notation
                const currentGameScore = getGameScore(player1Points, player2Points);
                sets.push(currentGameScore);
            }
        }
    }

    return {
        winner,
        sets,
    };
}

function getGameScore(player1Points, player2Points) {
    // Handle advantage situations
    if (player1Points >= 4 && player2Points >= 4) {
        if (player1Points > player2Points) {
            return ['AV', '-'];
        } else if (player2Points > player1Points) {
            return ['-', 'AV'];
        }
    }

    // Normal scoring (including 40-40)
    const scoreNotation = {
        0: '0',
        1: '15',
        2: '30',
        3: '40'
    };

    return [
        player1Points <= 3 ? scoreNotation[player1Points] : '40',
        player2Points <= 3 ? scoreNotation[player2Points] : '40'
    ];
}

export default calculateScore;
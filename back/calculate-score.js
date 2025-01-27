function calculateScore (player1, player2, pointList) {
    
    // Compter les points gagnés par chaque joueur
    const player1Points = pointList.filter(point => point === player1).length;
    const player2Points = pointList.filter(point => point === player2).length;

    //Calculer les jeux : si un joueur a gagné 4 points avec 2 d'écart, il gagne un jeu.
    //Calculer les sets : un joueur gagne un set s’il atteint 6 jeux avec 2 jeux d’écart. Si les deux joueurs sont à 6 jeux partout, un tie-break est joué.


    return{
        player1Points, 
        player2Points,
    };

}

export default calculateScore;
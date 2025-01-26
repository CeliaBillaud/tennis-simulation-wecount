import { useState } from 'react'
import PointList from '../components/PointList'

function Game() {

    const [player1Level, setPlayer1Level] = useState(5);
    const [player2Level, setPlayer2Level] = useState(5);

    const [isPlaying, setIsPlaying] = useState(false);
    const [pointList, setPointList] = useState([]);
    const [isListReady, setIsListReady] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const player1Name = formData.get('player1Name'); 
        const player2Name = formData.get('player2Name'); 

        if (!player1Name || !player2Name) {
            //todo change error message
            alert("Les noms des joueurs ne peuvent pas être vides !");
            return;
        }
        if (player1Level < 1 || player1Level > 10 || player2Level < 1 || player2Level > 10) {
            alert("Les niveaux des joueurs doivent être entre 1 et 10 !");
            return;
        }

        restartGame();

        const randomArray = Array.from({ length: 150 }, () => Math.random());

        generatePointsArray({name: player1Name, level: player1Level}, {name: player2Name, level: player2Level}, randomArray);
        
    };

    const restartGame = () => {
        setIsListReady(false);
        setPointList([]);
    };


    // const gameStart = () => {
    //     setIsPlaying(true);
    // }

    const generatePointsArray = (player1, player2, randomArray, numPoints = 150) => {

        //calculate the chance of winning a point for each player
        const player1Chance = player1.level / (player1.level + player2.level);
        const player2Chance = 1 - player1Chance;

        const pointsArray = [];

        setIsPlaying(true);

        randomArray.forEach( (value, index) => {
            if ( player1Chance === player2Chance){
                value < 0.5 ? pointsArray.push(`Point ${index+1} : remporté par ${player1.name}`) : pointsArray.push(`Point ${index+1} : remporté par ${player2.name}`);
            } else if (value < player1Chance){
                pointsArray.push(`Point ${index+1} : remporté par ${player1.name}`);
            } else {
                pointsArray.push(`Point ${index+1} : remporté par ${player2.name}`);
            }
        });

        setPointList(pointsArray);
        setIsPlaying(false);
        setIsListReady(true);

    }

    return (
    <div className="w-1/2 mx-auto my-20">
        <h1 className="text-4xl font-extrabold text-center">Tennis Simulator</h1>

        <form onSubmit={handleSubmit} className="flex flex-col justify-center content-center mt-8 gap-2 w-1/2 mx-auto">
            <h2 className="text-2xl font-bold text-center">Joueur 1</h2>
            <label className="flex flex-col">
                Nom 
                <input 
                    type="text"     
                    name="player1Name" 
                    className="border"
                    defaultValue=""/>
            </label>
            <label className="flex flex-col">
                Niveau : {player1Level}/10
                <input 
                    type="range" 
                    name="player1Level" 
                    min={1} 
                    max={10} 
                    step={1}
                    value={player1Level}
                    onChange={(e) => setPlayer1Level(e.target.value)}
                    />
            </label>

            <h2 className="text-2xl font-bold text-center">Joueur 2</h2>
            <label className="flex flex-col">
                Nom 
                <input 
                    type="text"     
                    name="player2Name" 
                    className="border"
                    defaultValue=""/>
            </label>
            <label className="flex flex-col">
                Niveau : {player2Level}/10
                <input 
                    type="range" 
                    name="player2Level" 
                    min={1} 
                    max={10} 
                    step={1}
                    value={player2Level}
                    onChange={(e) => setPlayer2Level(e.target.value)}
                    />
            </label>
            <button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={isPlaying}
                 >
                    {isPlaying ? "Match en cours" : "Lancer la partie !"}
                 </button>
        </form>

        {/* add button to show/hide pointlist */}

       {isListReady && PointList({title: "Liste des points", points: pointList})}

       {/*todo display score and winner */}

      

    </div>
    )
}

export default Game

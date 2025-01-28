import React from 'react';

const ScoreDisplay = ({ winner, sets, player1Name, player2Name }) => {
    const lastSetIndex = sets.length - 1;

    // Helper to check if a score is a game score (0, 15, 30, 40, AV)
    const isGameScore = (score) => {
        //check if score is a string, is the case for tennis notation
        return typeof score[0] === 'string' || typeof score[1] === 'string';
    };

    const getColumnTitle = (index) => {
        //if last column and tennis notation
        if (index === lastSetIndex && isGameScore(sets[lastSetIndex])) {
            return "Current Game";
        } else {
            return `Set ${index + 1}`;
        }
    };

    return (
        <div className="">
            <h2 className="p-4 text-xl font-bold text-gray-800 border-b">
                {winner 
                    ? `🎾 Résultat: ${winner}`
                    : "🎾 Résultat : Jeu en cours, pas de vainqueur progress"
                }
            </h2>
            
            <div className="p-4 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border">
                                Player
                            </th>
                            {sets.map((set, index) => (
                                <th key={index} className="px-6 py-3 text-center text-sm font-semibold text-gray-600 border">
                                    {getColumnTitle(index)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr>
                            <td className="px-6 py-4 border font-medium text-gray-800">
                                {player1Name}
                            </td>
                            {sets.map((set, index) => (
                                <td key={index} className="px-6 py-4 text-center border text-gray-800">
                                   {set[0]}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="px-6 py-4 border font-medium text-gray-800">
                                {player2Name}
                            </td>
                            {sets.map((set, index) => (
                                <td key={index} className="px-6 py-4 text-center border text-gray-800">
                                  {set[1]}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScoreDisplay;
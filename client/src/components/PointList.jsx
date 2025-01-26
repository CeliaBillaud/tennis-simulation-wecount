import React from "react";

function PointList({ title, points }) {

    return (
    <div className="mt-8">
        <h2 className="text-2xl font-bold">{title}</h2>
        <ul>
            {points.map((point, index) => (
                <li key={index}>{point}</li>
            ))}
        </ul>
    </div>
    );
}

export default PointList;
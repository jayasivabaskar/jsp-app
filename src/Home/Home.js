import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { DragDropContext } from "react-dnd";
// import HTML5Backend from "react-dnd-html5-backend";
const HostWrapper = React.lazy(() => import("../Framework/HostWrapper"));

const Home = () => {
    return (
        <div className="homePage">
            <React.Suspense fallback={<div />}>
                <HostWrapper />
            </React.Suspense>
        </div>
    );
};

export default Home;
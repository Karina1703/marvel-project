import AppHeader from "../appHeader/AppHeader";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import MainPage from "../pages/MainPage";
import SingleComicPage from "../pages/SingleComicPage";

const ComicsPage = React.lazy(() => import("../pages/ComicsPage"));


const App = () => {

    return (
        <Suspense fallback = {<div>loading</div>}>
            <Router>
                <div className="app">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route path="/"
                                element={
                                    <MainPage></MainPage>
                                } />

                            <Route path="/comics"
                                element={
                                    <ComicsPage></ComicsPage>
                                } />
                            <Route path="/comics/:comicId"
                                element={
                                    <SingleComicPage></SingleComicPage>
                                } />
                            <Route path="*"
                                element={
                                    <>
                                        <div>404 error</div>
                                        <NavLink to="/">
                                            <div>return to main page</div>
                                        </NavLink>
                                    </>
                                } />
                        </Routes>
                    </main>
                </div>
            </Router>
        </Suspense>
    )
}

export default App;
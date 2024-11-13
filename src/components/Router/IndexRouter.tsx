import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "../shared/Layout";
import Home from "../../pages/Home";

const IndexRouter:FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />}/>
                    <Route path="*" element={<Home />}/>
                    {/* <Route path="/employees" element={} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default IndexRouter;
import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "@components/shared/Layout";
import Home from "../pages/Home";
import EmployeeList from "../pages/EmployeeList";

const IndexRouter:FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />}/>
                    <Route path="*" element={<Home />}/>
                    <Route path="/employees" element={<EmployeeList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default IndexRouter;
import React, { Fragment } from "react";
import MainNavigation from "./MainNavigation/MainNavigation";

type LProps = {
    children?: React.ReactNode
}

const Layout: React.FC<LProps> = ({children}) => (
    <Fragment>
        <MainNavigation />
        <main>
            { children }
        </main>
    </Fragment>
)

export default Layout;
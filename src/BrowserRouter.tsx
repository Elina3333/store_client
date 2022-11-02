import React from 'react';
import {Router} from "react-router-dom";
import { createBrowserHistory} from "history";

export const history = createBrowserHistory();

export interface BrowserRouterProps {
    basename?: string;
    children?: React.ReactNode;
    window?: Window;
}

const BrowserRouter = ({basename, children}: BrowserRouterProps) => {

    let [state, setState] = React.useState({
        action: history.action,
        location: history.location,
    });

    React.useLayoutEffect(() => history.listen(setState), [history]);
    return (
        <Router
            basename={basename}
            children={children}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        />
    );
};

export default BrowserRouter;
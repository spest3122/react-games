import Home from "./Home";
import Game1 from "./game1/Game1";

const routes = [
    {
        path: "/",
        component: Home,
        name: "Home"
    },
    {
        path: "/game1",
        component: Game1,
        name: "Game one"
    }
]

export default routes;
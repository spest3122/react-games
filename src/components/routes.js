import Home from "./Home";
import Game1 from "./game1/Game1";
import Game2 from "./game2/Game2";

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
    },
    {
        path: "/game2",
        component: Game2,
        name: "Game two"
    },
]

export default routes;
import Home from "./Home";
import Game1 from "./game1/Game1";
import Game2 from "./game2/Game2";
import Game3 from "./game3/Game3"

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
    {
        path: "/game3",
        component: Game3,
        name: "Game three"
    },
]

export default routes;
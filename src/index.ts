import { App } from "./bootstrap/app";
import ApiRoutes from "./routes/api";


const app =  new App();

app.server.use(ApiRoutes.routes)
app.server.listen(8080)
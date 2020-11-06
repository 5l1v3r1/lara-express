import 'module-alias/register';


import { App } from "./bootstrap/app";
import ApiRoutes from "./routes/api";

const app = new App();

// Route register
app.server.use(ApiRoutes.routes)


// Running server
let port = 8000
app.server.listen(port, () => console.log(`Server running on port ${port}`))
import { UserRouter, BlogRouter } from "../src/routers/index.js";

const useMiddlewares = (app, middlewares) => {
    middlewares.forEach((middleware) => {
        app.use(middleware);
    });
    app.use("/user", UserRouter);
    app.use("/blog", BlogRouter);
};

export { useMiddlewares };

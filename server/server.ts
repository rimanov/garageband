import app from './app';

const server = app.listen(app.get("port"), () => {
    console.log("Server running on port 3001")
    app.get("port"),
    app.get("env")
})

export default app;
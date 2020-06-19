const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

const logMiddleware = (request, response, next) => {
    const { method, url } = request;
    console.log(`[${method.toUpperCase()}] ${url}`);
    return next();
};
app.use(logMiddleware);

app.get("/repositories", (request, response) => {
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const { title, url, techs } = request.body;

    if (!title || !url || !techs)
        response.status(400).json({message: "invalid parameters"});

    const repo = {
        title,
        url,
        techs,
        id: uuid(),
        likes: 0
    };
    repositories.push(repo);
    return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
    const { title, url, techs } = request.body;
    const { id } = request.params;
    
    if (!id || !isUuid(id))
        response.status(400).json({message: "invalid id"});

    const index = repositories.findIndex(o => o.id === id);

    if (index < 0)
        response.status(400).json({message: "id does not exists"});
    
    const originalRepo = repositories[index];
    const updatedRepo = Object.assign({}, originalRepo, { title, url, techs });
    repositories[index] = updatedRepo;
    return response.json(updatedRepo);
});

app.delete("/repositories/:id", (request, response) => {
    const { id } = request.params;

    if (!id || !isUuid(id))
        response.status(400).json({message: "invalid id"});

    const index = repositories.findIndex(o => o.id === id);

    if (index < 0)
        response.status(400).json({message: "id does not exists"});

    repositories.splice(index, 1);
    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;
    
    if (!id || !isUuid(id))
        response.status(400).json({message: "invalid id"});

    const index = repositories.findIndex(o => o.id === id);

    if (index < 0)
        response.status(400).json({message: "id does not exists"});
    
    const repo = repositories[index];
    repo.likes++;
    repositories[index] = repo;
    return response.json(repo);
});

module.exports = app;

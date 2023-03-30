import * as tuitsDao from '../../tuits/tuits-dao.js'

export default (app) => {
    app.get('/api/tuits', findTuits);
    app.post('/api/tuits', createTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
    app.put('/api/tuits/:tid', updateTuit);
}

const findTuits = async(req, res) =>{
    const tuits = await tuitsDao.findTuits();
    res.json(tuits);
}

const createTuit = async(req, res) => {
    const newTuit = req.body;
    newTuit.likes = 0;
    newTuit.liked = false;
    newTuit.dislikes = 0;
    newTuit.disliked = false;
    const insertedTuit = await tuitsDao
                                .createTuit(newTuit);
    res.json(insertedTuit);
}

const deleteTuit = async(req, res) => {
    const tuitdIdToDelete = req.params.tid;
    const status = await tuitsDao
                        .deleteTuit(tuitdIdToDelete);
    res.sendStatus(status);

}

const updateTuit = async(req, res) => {
    const tuitdIdToUpdate = req.params.tid;
    const updates = req.body;
    const status = await tuitsDao
                        .updateTuit(tuitdIdToUpdate, updates);
    res.json(status);
}


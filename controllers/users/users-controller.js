// import the array of users. Include the extension
import people from './users.js';
let users = people;

// request pattern /api/users to call a function
const UserController = (app) => {
    app.get('/api/users', findUsers);
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

// [Query] -- Search by type -- if type parameter in query, respond with users of that type
// otherwise, respond with all users in JSON array format
// http://localhost:4000/api/users?type=FACULTY
const findUsers = (req, res) => {
    const type = req.query.type
    if(type) {
        const usersOfType = users.filter(u => u.type === type)
        res.json(usersOfType)
        return
    }
    res.json(users)
}

// [Param] -- Search by id
// if id parameter in path, respond with user of that id
// http://localhost:4000/api/users/123
const findUserById = (req, res) => {
    const userId = req.params.uid;
    const user = users.find(u => u._id === userId);
    res.json(user);
}

// [Body] -- Create a new user
const createUser = (req, res) => {
    const newUser = req.body;
    newUser._id = (new Date()).getTime() + '';
    users.push(newUser);
    res.json(newUser);
}

// [Param] -- Delete a user
const deleteUser = (req, res) => {
    const userId = req.params['uid'];
    users = users.filter(usr =>
        usr._id !== userId);
    res.sendStatus(200);
}

// [Param] -- Update a user
const updateUser = (req, res) => {
    const userId = req.params['uid'];
    const updates = req.body;
    // find the user by id, and update it with the body of the request
    users = users.map((usr) =>
        usr._id === userId ?
            {...usr, ...updates} :
            usr
    );
    res.sendStatus(200);
}




export default UserController
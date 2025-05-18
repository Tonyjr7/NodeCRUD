import express from 'express';

import {fetchUsers, fetchUser, addUser, updateUser, deleteUser} from '../controllers/users.js';

const router = express.Router();

// routes to handle requests
router.get('/', fetchUsers);

router.get('/:id', fetchUser);

router.post('/', addUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;
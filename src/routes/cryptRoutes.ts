import express from 'express'
import { encrypt , verify } from '../controllers/cryptoController'

const router = express.Router();

router.get('/encrypt',encrypt);

router.post( '/verify', verify);

export default router;
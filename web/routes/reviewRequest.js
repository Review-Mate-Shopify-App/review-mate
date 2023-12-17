import express from 'express';
import model from '../models';

const router = express.Router();

const request = model.review_request;

router.get('/', async (req, res) => {
    const amit = await request.create({
        id: 1,
        storeId: "test",
        name: "amit",
        email: "email",
        productId: "udweuw",
        isReviewed: false
    });

    console.log('true');

    return res.send(amit);
})

export default router;
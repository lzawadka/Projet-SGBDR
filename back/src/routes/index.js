import express from "express"

import Movie from '../models/movie'

const router = express.Router()
const movieModel = new Movie()

router.get('/movies', async (req, res) => {
    const params = {orderByType: req.query.orderByType, orderBy: req.query.orderBy, limit: Math.floor(parseInt(req.query.limit)), page: Math.floor(parseInt(req.query.page))}
    const movies = await movieModel.getMovies(params)

    res.json(movies)
})

export default router
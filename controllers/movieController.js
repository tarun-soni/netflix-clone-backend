import asyncHandler from 'express-async-handler'
import Movie from '../models/movieModel.js'

// @desc    Create a movie
// @route   POST /api/movie
// @access  Private
const createMovie = asyncHandler(async (req, res) => {
  const {
    user,
    movieId,
    title,
    type,
    overview,
    genres,
    poster_path,
    backdrop_path
  } = req.body
  const movie = new Movie({
    user: user._id,
    movieId,
    title,
    type,
    overview,
    genres,
    poster_path,
    backdrop_path
  })

  const createdMovie = await movie.save()
  res.status(201).json(createdMovie)
})

// @desc    get user movies
// @route   GET /api/movie/user/:user_id
// @access  Private
const getUserMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find({
      user: req.params.user_id
    }).populate('user', ['name'])

    if (!movies) {
      return res.status(400).send({ msg: 'NO movies Found' })
    } else {
      res.json(movies)
    }
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).send({ msg: 'Movies Not Found' })
    }
    console.error('error getUserMovies route: >>>>>', err)
    res.status(500).send('Server Error')
  }
})

// @route       DELETE api/movie/:movie_id
// @desc        delete specific movie
// @access      private
const deleteMovie = asyncHandler(async (req, res) => {
  try {
    const movie = await Movie.findOne({ movieId: req.params.movie_id })
    if (movie) {
      await movie.remove()
      res.json({ message: 'movie removed' })
    } else {
      res.status(404).send({ message: 'Movie Not Found' })
    }
  } catch (err) {
    console.error('error in route post delete movie ', err)
  }
})

export { createMovie, getUserMovies, deleteMovie }

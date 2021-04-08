import mongoose from 'mongoose'

// movieId
// title
// type
// overview
// genres
// poster_path
// backdrop_path
const movieSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    movieId: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    overview: {
      type: String
    },
    poster_path: {
      type: String
    },
    backdrop_path: {
      type: String
    },
    genres: [String],
    vote_average: {
      type: Number
    }
  },
  {
    timestamps: true
  }
)

const Movie = mongoose.model('Movie', movieSchema)

export default Movie

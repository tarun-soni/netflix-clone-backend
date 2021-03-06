import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  //do this only when password (and not other) creates/updates
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)

  this.password = await bcrypt.hash(this.password, salt)
})
// userSchema.post()
const User = mongoose.model('User', userSchema)

export default User

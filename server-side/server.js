import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import cors from 'cors'
import { postRouter } from './routes/posts.js'
import { userRouter } from './routes/user.js'
import LocalStrategy from 'passport-local'
import { ExpressError } from "./utilities/expressError.js";
import { User } from './models/user.model.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'


import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.ATLAS_URI
const frontEndLink ='https://setup-spot.netlify.app/'

mongoose.connect(uri)
    .then(() => {
        console.log('mongoo connection is open!!')
    })
    .catch((err) => {
        console.log('there is errooo!!!')
        console.log(err)
    })

const app = express()
const store = MongoStore.create({
    mongoUrl: process.env.ATLAS_URI,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: process.env.SESSION_SECRET
    }
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    store,
    secret: process.env.SESSION_SECRET,
    resave: false, saveUninitialized: false,
}))
app.use(cors({
    origin: frontEndLink,
    credentials: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser(process.env.COOKIE_SECRET))
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    next()
})


app.use('/posts', postRouter)
app.use('/users', userRouter)


app.get('/', (req, res) => {
    res.send('hello there')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('page not found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    console.log(err)
    if(!err.message) err.message = 'oh no, something went wrong11'
    res.status(statusCode).json(err)
}) 

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

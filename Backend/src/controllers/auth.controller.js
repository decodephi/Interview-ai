const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenBlackistModel = require('../models/blacklist.model')


/**
 *  @route POST /api/auth/register
 *  @description Register a new user, expects username, email and password in the request body
 *  @access Public
 * 
 * 
 */


async function registerUserController(req, res) {
      const {username, email, password} = req.body

//  validate the request body, check if the username, email and password are provided
      if (!username || !email || !password) {
        return res.status(400).json({
            message: "Username, email and password are required"
        })
      }

    // check if the user already exists in the database  
      const isUserExist = await userModel.findOne({
        $or:[
            // check if the username or email already exists in the database
            {username}, 
            {email}
        ]
      })

    //   if the user already exists, return a 400 status code with an error message
        if (isUserExist) {
            return res.status(400).json({
                message: "Username or email already exists"
            })
        }

    //   if the user does not exist, create a new user in the database
    //  To create new user, install bcryptjs package to hash the password before saving it to the database
    //  npm install bcryptjs
    // jwt for authentication and authorization
    // npm install jsonwebtoken
    // cookie-parser to parse cookies

    const hash = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
        username,
        email,
        password: hash
    })

    // create a JWT token for the user

    const token = jwt.sign(
        {id: newUser._id, username: newUser.username}, 
        process.env.JWT_SECRET, 
        {expiresIn: '1d'}
    )

    res.cookie('token', token)

    // return the token in the response
    res.status(201).json({
        message: "User registered successfully",
        user:{
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
    })

}

/**
 * 
 * @name loginUserController
 * @description Login a user, expects email and password in the request body
 * @access Public
 */

async function loginUserController(req, res) {


    const {email, password} = req.body
    // validate the request body, check if the email and password are provided

    const user = await userModel.findOne({email})

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        {id: user._id, username: user.username}, 
        process.env.JWT_SECRET, 
        {expiresIn: '1d'}

    ) 
 

    res.cookie('token', token)

    res.status(200).json({
        message: "User logged in successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        },
        token
    })
}

/**
 * 
 * @name logoutUserController
 * @description Logout a user, clears the token cookie
 *  @access Public
 */


async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (token) {
        await tokenBlackistModel.create({
            token
        })
    }
    res.clearCookie('token')

    res.status(200).json({
        message: "User logged out successfully"
    })


}

/**
 * 
 * @name getMeController
 * @description Get the details of the logged in user, expects a valid JWT token in the request header
 * @access Private
 */

async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id)
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    res.status(200).json({
        user
    })
    
}



module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}
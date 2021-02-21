//Это СЕРВЕР!!!!!!!!!!!!!

const {Router} = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const router = Router()
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

// /api/auth/register
router.post('/register',
            [check('email', 'некорректный емаил').isEmail(),
            check('password', 'Минимальная длина 6 символов').isLength({min: 6})],
            async (req, res) => {
                try{
                   
                    const errors = validationResult(req)

                    if(!errors.isEmpty()){
                        return res.status(400).json({
                         errors: errors.array(),
                         message: 'Некорректные даннные при регистрации'
                        })
                    }

                    const {email, password} = req.body

                    const candidate = await User.findOne({email})

                    console.log(candidate)

                    if(candidate){
                        return res.status(400).json({message:'Такой пользлватель уже существует'})
                    }

                    const hashedPassword = await bcrypt.hash(password, 12)
                    const user = new User({email, password: hashedPassword})

                    console.log(user)

                    await user.save()

                    res.status(201).json({message:'Пользователь создан '})

                }catch (e) {
                    res.status(500).json({message: 'Что-то не так'})
                }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email','Введите корректный Email').normalizeEmail().isEmail(),
        check('password','Пороль не менее 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
        try{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                 errors: errors.array(),
                 message: 'Некорректные даннные при авторизации'
                })
            }

        const {email, password} = req.body

        console.log(req.body)

        const user = await User.findOne({email})

        console.log('user', user)

        if (!user){
            return res.status(400).json({message: 'Пользователь не найден'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        console.log('isMatch: ', isMatch)
        if(!isMatch){
            return res.status(400).json({message:"Неверный пароль попробуйте снова"})
        }
        console.log('user.id: ', user.id)

        const token =  jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        console.log('token:', token)

        res.json({ token, userId: user.id })

            

        }catch (e) {
            console.log('нам пизда')
            res.status(500).json({message: 'Что-то не так 1'})
        }    
})

module.exports = router
const express = require('express')
const router = express.Router()
const authController = require('../controller/auth')
const middlewareLogs = require('../middleware/logs')
const UserController = require('../controller/user')
const verifyJwtTokenController = require('../api').verifyJwtToken;
const { check } = require('express-validator');

router.post('/auth/login', authController.login)

router.post('/user/add', [
    verifyJwtTokenController.verifyToken,
    check('nama').trim().isString().notEmpty().withMessage("Mohon isi nama menggunakan huruf saja"),
    check('alamat').trim().isString().notEmpty().withMessage("Mohon isi alamat menggunakan huruf saja"),
    check('gend').trim().isString().notEmpty().withMessage("Mohon isi gend menggunakan huruf saja"),
    check('photo').trim().isString().notEmpty(),
    check('tgl_lahir').trim().isString().notEmpty(),
    check('status').trim().isInt({ min: 0 }).notEmpty().withMessage("Mohon isi status menggunakan angka saja"),
], UserController.add)

router.post('/user/list', [
    verifyJwtTokenController.verifyToken,
    check('keyword').trim().isString().notEmpty(),
    check('start').trim().isInt({ min: 0 }).notEmpty().withMessage("Mohon isi status menggunakan angka saja"),
    check('count').trim().isInt({ min: 0 }).notEmpty().withMessage("Mohon isi status menggunakan angka saja")
], UserController.list)

router.post('/user/update/:nip', [
    verifyJwtTokenController.verifyToken,
    check('nip').trim().isInt({ min: 0 }).notEmpty()
], UserController.update)

router.post('/user/disable/:nip', [
    verifyJwtTokenController.verifyToken,
    check('nip').trim().isInt({ min: 0 }).notEmpty()
], UserController.disable)

router.use(middlewareLogs)

module.exports = router
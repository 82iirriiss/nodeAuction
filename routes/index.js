const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Good, Auction, User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// res객체에 user를 넣어 줌으로써, 모든 view  파일에 user을 암묵적으로 전달 할 수 있다.
// res.render 시, 별도로 user을 전달하지 않아도 된다.
router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get('/', async (req, res, next) => {
    try {
        const goods = await Good.findAll({where: {SoldId: null }});
        res.render('main', {
            title: 'NodeAuction',
            goods
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', {
        title: '회원가입 - NodeAuction',
    });
});

router.get('/good', isLoggedIn, (req, res) => {
    res.render('good', {title: '상품 등록 - NodeAuction'});
});

// 왜 여기서 파일을 읽지????
try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        }
    }),
    limits: {fileSize: 5 * 1024 * 1024}
});

router.post('/good', isLoggedIn, upload.single('img'), async (req, res, next) => {
    try {
        const { name, price } = req.body;
        await Good.create({
            OwnerId: req.user.id,
            name,
            img: req.file.filename,
            price,
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
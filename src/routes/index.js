import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Express', message: 'Welcome to Express' });
});

export default router;

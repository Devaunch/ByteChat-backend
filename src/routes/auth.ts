import { Router } from 'express';
import { Register, Login, Check, oAuth } from '../controllers/auth';
import passport from 'passport';

const authRouter = Router();

authRouter.get('/login/failed', (req, res) => {
   res.status(401).json({ success: false, msg: 'Not authenticated' });
});

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get(
   '/google/callback',
   passport.authenticate('google', {
      successRedirect: 'http://localhost:3000',
      failureRedirect: '/login/failed'
   })
);

authRouter.get('/github', passport.authenticate('github', { scope: ['user:email', 'email'] }));
authRouter.get(
   '/github/callback',
   passport.authenticate('github', {
      successRedirect: 'http://localhost:3000',
      failureRedirect: '/login/failed'
   })
);

authRouter.post('/register', Register);
authRouter.post('/login', Login);
authRouter.post('/oAuth', oAuth)

authRouter.get('/check', Check);
export default authRouter;

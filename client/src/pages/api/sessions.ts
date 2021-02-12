import { SessionOptions, withIronSession } from 'next-iron-session';

export const ironSessionOptions: SessionOptions = {
  cookieName: 'MYSITECOOKIE',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production' ? true : false,
  },
  password: process.env.APPLICATION_SECRET ?? '',
};

const postRequestHandler = async (req: any, res: any) => {
  try {
    const { user: userResponse, token } = req.body;

    if (userResponse && token) {
      req.session.set('user', { ...userResponse, token });
      await req.session.save();

      return res.json({ user: { ...userResponse, token }, isLoggedIn: true });
    }
  } catch (e) {
    console.log('sessions', e);
    return res.status(403).send(e);
  }

};

export default withIronSession(async (req, res) => {
  if (req.method === 'POST') {
    await postRequestHandler(req, res);
  } else {
    const user = req.session.get('user');

    if (user) {
      // in a real world application you might read the user id from the session and then do a database request
      // to get more information on the user if needed
      res.json({
        isLoggedIn: true,
        user,
      });
    } else {
      res.json({
        isLoggedIn: false,
        user: null,
      });
    }
  }
}, ironSessionOptions);

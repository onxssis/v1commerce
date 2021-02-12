import { withIronSession } from 'next-iron-session';
import { ironSessionOptions } from './sessions';

export default withIronSession(async (req, res) => {
  req.session.destroy();
  res.end()

}, ironSessionOptions);

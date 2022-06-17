import { RequestHandler } from 'express';
import { CLIENT_ID } from '@/env';
import { user } from '@/models/user';
import traqGetMe from '@/traQ/traqGetMe';
import postForm from '@/utils/postForm';

type TokenResponse = {
  access_token: 'string';
  token_type: 'string';
  expires_in: 0;
  refresh_token: 'string';
  scope: 'string';
  id_token: 'string';
};

const oauth: RequestHandler = async (req, res) => {
  const { code } = req.query;
  if (typeof code !== 'string') {
    res.sendStatus(400);
    return;
  }
  const { data: tokenData } = await postForm<TokenResponse>(
    'https://q.trap.jp/api/v3/oauth2/token',
    {
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      code,
    }
  );
  const { data: meData } = await traqGetMe(tokenData.access_token);

  // delete old data
  await user.deleteByTrapId(meData.id);

  // create new user
  const newUser = await user.create({
    trapId: meData.id,
    name: meData.name,
    token: tokenData.access_token,
  });

  req.session.user = newUser;
  res.redirect('/?status=oauth');
};

export default oauth;

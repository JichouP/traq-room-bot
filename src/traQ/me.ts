import axios from 'axios';

type MeResponse = {
  id: string;
  bio: string;
  groups: string[];
  tags: [
    {
      tagId: string;
      tag: string;
      isLocked: boolean;
      createdAt: string;
      updatedAt: string;
    }
  ];
  updatedAt: string;
  lastOnline: string;
  twitterId: string;
  name: string;
  displayName: string;
  iconFileId: string;
  bot: boolean;
  state: number;
  permissions: string[];
  homeChannel: string;
};

const traqGetMe = async (token: string) => {
  const data = await axios.get<MeResponse>(
    'https://q.trap.jp/api/v3/users/me',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export default traqGetMe;

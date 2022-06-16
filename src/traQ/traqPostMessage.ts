import axios from 'axios';

const traqPostMessage = async (
  token: string,
  channelId: string,
  message: string
) => {
  return axios.post(
    `https://q.trap.jp/api/v3/channels/${channelId}/messages`,
    { content: message, embed: true },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default traqPostMessage;

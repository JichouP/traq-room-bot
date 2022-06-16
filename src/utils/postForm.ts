import axios from 'axios';

const postForm = async <Response = Record<string, unknown>>(
  url: string,
  form: Record<string, string>
) => {
  const postData = new URLSearchParams(form);
  const res = await axios.post<Response>(url, postData);
  return res;
};

export default postForm;

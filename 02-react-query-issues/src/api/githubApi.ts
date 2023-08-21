import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization: 'Bearer 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'
  }
});
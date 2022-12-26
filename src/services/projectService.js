import http from './httpService';
import config from '../config/default.json';

const apiEndpoint = `${config.apiEndPoint}/projects/`;

export async function getProjects() {
  return await http.get(apiEndpoint);
}
import API from '../api';

const RESOURCE_NAME = "/ideas";

const createIdea = async (
  content: string,
  impact: number,
  ease: number,
  confidence: number
) => {
  return await API.post(`${RESOURCE_NAME}`, {
    content,
    impact,
    ease,
    confidence,
  });
};

const updateIdea = async (
  id: string,
  content: string,
  impact: number,
  ease: number,
  confidence: number
) => {
  return await API.put(`${RESOURCE_NAME}/${id}`, {
    content,
    impact,
    ease,
    confidence,
  });
};

const getIdeas = async (page: number) => {
  return await API.get(`${RESOURCE_NAME}`, { params: { page } });
};

const deleteIdea = async (id: string) => {
  return await API.delete(`${RESOURCE_NAME}/${id}`);
};

export const ideaService = {
  createIdea,
  updateIdea,
  getIdeas,
  deleteIdea,
};

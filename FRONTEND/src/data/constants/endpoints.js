// Auth 
export const REGISTER = '/register';
export const LOGIN = '/login';

// Audio 
export const CREATE_AUDIO = '/create_audio/';
export const LIST_AUDIO = '/list_audio/';
export const GET_AUDIO_BY_USER = '/get_audio_by_user/';
export const DELETE_AUDIO = (audioId) => `/delete_audio/${audioId}/`;

// Transcription
export const CREATE_TRANSCRIPTION = '/create_transcription/';
export const LIST_TRANSCRIPTION = '/list_transcription/';
export const GET_TRANSCRIPTION_BY_ID = (transcriptionId) => `/get_transcription/${transcriptionId}/`;
export const UPDATE_TRANSCRIPTION = (transcriptionId) => `/update_transcription/${transcriptionId}/`;
export const DELETE_TRANSCRIPTION = (transcriptionId) => `/delete_transcription/${transcriptionId}/`;
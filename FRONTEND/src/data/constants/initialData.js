
export const initialUser = {
  "id": 0,
  "user_name": '',
  "user_mail": '',
  "user_password": ''
};


export const initialAudio = {
  "audio_id": 0,
  "file": '',
  "audio_title": '',
  "uploaded_at": '',
  "user": initialUser
};

export const initialTranscription = {
  "transcription_id": 0,
  "text": '',
  "transcription_title": '',
  "audio": initialAudio
};

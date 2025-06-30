import api from "../../data/api/api"
import { CREATE_TRANSCRIPTION, GET_TRANSCRIPTION_BY_ID, LIST_TRANSCRIPTION } from "../../data/constants/endpoints"


//Service pour la transcription 
export const TranscriptionService = {
    createTranscription: async (transcriptionData) => {
        try {
            const response = await api.post(CREATE_TRANSCRIPTION, transcriptionData)
            console.log("Transcription created:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error creating transcription:", error);
            throw error; // Propagate the error to be handled by the caller
        }
    },
    list_Transcription: async () => {
        try {
            const response = await api.get(LIST_TRANSCRIPTION)
            console.log("Transcriptions listed:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error listing transcriptions:", error);
            throw error; // Propagate the error to be handled by the caller
        }
    },
    getTranscriptionById: async (transcriptionId) => {
        try {
            const response = await api.get(GET_TRANSCRIPTION_BY_ID(transcriptionId));
            console.log("Transcription retrieved:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error retrieving transcription:", error);
            throw error; // Propagate the error to be handled by the caller
        }
    },
    updateTranscription: async (transcriptionId, transcriptionData) => {
        try {
            const response = await api.put(GET_TRANSCRIPTION_BY_ID(transcriptionId), transcriptionData);
            console.log("Transcription updated:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating transcription:", error);
            throw error; // Propagate the error to be handled by the caller
        }
    },
    deleteTranscription: async (transcriptionId) => {
        try {
            const response = await api.delete(GET_TRANSCRIPTION_BY_ID(transcriptionId));
            console.log("Transcription deleted:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error deleting transcription:", error);
            throw error; // Propagate the error to be handled by the caller
        }
    }

}
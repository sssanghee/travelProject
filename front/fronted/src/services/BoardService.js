import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/board";

class BoardDataService {
    uploadBoard(data) {
        return axios.post( API_URL + "/uploadBoard" , data, { 
            headers : authHeader(), 
            "Content-type": "application/json",});
    };

    uploadImg(data){
        return axios.post( API_URL + "/uploadImage", data, {
            headers : authHeader(),
            "Content-type" : "multipart/form-data"
        });
    };

    pagination(page){
        return axios.get( API_URL + `/pagination/${page}`, {
            headers : authHeader(),
            "Content-type" : "application/json",
        });
    };

    totalItem(){
        return axios.get( API_URL + "/totalItem" , {
            headers : authHeader(),
            "Content-type" : "application/json",
        });
    };

    searchLikeCount(data){
        return axios.post( API_URL + "/searchLikeCount", data, {
            headers : authHeader(),
            "Content-type" : "application/json",

        })
    }

    clickLike(data){
        return axios.post( API_URL + "/clickLike", data, {
            headers : authHeader(),
            "Content-type" : "application/json",
        });
    }

    findAllComments(data){
        return axios.post( API_URL + "/findAllComments", data, {
            headers : authHeader(),
            "Content-type" : "application/json",
        });
    }

    addComment(data){
        return axios.put( API_URL + "/addComment", data, {
            headers : authHeader(),
            "Content-type" : "application/json",
        });
    }



}

export default new BoardDataService();

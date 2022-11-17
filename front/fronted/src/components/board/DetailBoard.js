import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import BoardDataService from "../../services/BoardService";
import { useEffect } from 'react';

function DetailBoard(props) {
    const location = useLocation();
    const auth = useSelector(state => state.auth);
    console.log(auth);
    const boardInfo = location.state.detailBoard.boardInfo;
    const content = boardInfo.content;
    const [ allComments, setAllComments ] = useState([]);
    const [ comment, setComment ] = useState("");
    const [ like, setLike ] = useState(0);

    const commenData = {
        id: boardInfo.id,
        boardIdx: boardInfo.board_idx,
    };

    useEffect(() => {

        BoardDataService.searchLikeCount(commenData)
        .then((res) => {
            console.log(res);
            setLike(res.data);
        })
        .catch((e) => {
            console.log(e);
        })

        BoardDataService.findAllComments(commenData)
        .then((res) => {
            console.log(res);
            setAllComments(res.data);
        })
        .catch((e) => {
            console.log(e);
        })
    }, []);

    const commentChange = (e) => {
        setComment(e.target.value);
    }

    const onLikeClick = () => {
        const likeData = {
            boardIdx : boardInfo.board_idx,
            id : boardInfo.id,
            reactUser : auth.user.id
        };

        BoardDataService.clickLike(likeData)
        .then((res) => {
            console.log(res);
            setLike(res.data);
        })
        .catch((e) => {
            console.log(e);
        })
    };

    const onComments = () => {
        const commentData = {
            id: boardInfo.id,
            boardIdx: boardInfo.board_idx,
            reactUser: auth.user.id,
            comment: comment,
        };

        BoardDataService.addComment(commentData)
        .then((response) => {
            BoardDataService.findAllComments(commenData)
            .then((res) => {
                console.log(res);
                console.log(allComments);
                setAllComments([ ...allComments, response.data]);
                console.log(allComments);
            })
            .catch((e) => {
                console.log(e);
            })
        })
        .catch((e) => {
            console.log(e);
        })


    };

    return (
        <div>
            게시판 상세페이지
            <div>
                {boardInfo.title}
                {boardInfo.regidate}
            </div>
            <div>
                {boardInfo.id}
            </div>
            <div>
                <Viewer initialValue={content} />
            </div>
            <div>
                좋아요: {like}
                <button onClick={onLikeClick}>좋아요</button>
            </div>
            <div>
                <input placeholder='댓글' value={comment} onChange={commentChange}></input>
                <button onClick={onComments}>작성</button>
                {
                    allComments.map((el, idx) => {
                        return(
                            <div key={el.commentNum}>
                                {el.reactUser}
                                {el.regidate}
                                {el.comment}
                            </div>
                        )
                    })

                }
            </div>
        </div>
    );
}

export default DetailBoard;
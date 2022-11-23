import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import BoardDataService from "../../services/BoardService";
import { useEffect } from 'react';
import KakaoMap from './KakaoMap';
import "../../styles/DetailBoard.css";

function DetailBoard(props) {
    const location = useLocation();
    const auth = useSelector(state => state.auth);
    const boardInfo = location.state.detailBoard.boardInfo;
    const content = boardInfo.content;
    const [ allComments, setAllComments ] = useState([]);
    const [ comment, setComment ] = useState("");
    const [ like, setLike ] = useState(0);
    console.log(boardInfo);
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
        if(comment === ""){
            alert("댓글을 입력하세요");
            return;
        }

        const commentData = {
            id: boardInfo.id,
            boardIdx: boardInfo.board_idx,
            reactUser: auth.user.id,
            comment: comment,
        };
        setComment("");
        BoardDataService.addComment(commentData)
        .then((response) => {
            BoardDataService.findAllComments(commenData)
            .then((res) => {
                setAllComments([ ...allComments, response.data]);
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
            <div className='titleIdAndDate'>
                <div>
                    {boardInfo.title}
                </div>
                <div className='titleId'>
                    {boardInfo.id}
                </div>                
                <div className='titleDate'>
                    {boardInfo.regidate}
                </div>
            </div>
            
            <hr/>
            <div>
                <Viewer initialValue={content} />
            </div>
            <hr />
            <div className='likeAndComment'>
                <div>
                    좋아요: {like}
                    <button onClick={onLikeClick}>좋아요</button>
                </div>
                <div className='comments'>
                    <input placeholder='댓글' value={comment} onChange={commentChange}></input>
                    <button onClick={onComments}>작성</button>
                </div>
            </div>
            <hr />
            {
                    allComments.map((el, idx) => {
                        return(
                            <div key={el.commentNum} className="comment">
                                <div className='commentContent'>
                                    {el.comment}
                                </div>
                                <div className='commentWriter'>
                                    {el.reactUser}
                                </div>
                                <div className='commentDate'>
                                    {el.regidate}
                                </div>
                            </div>
                        )
                    })

                }
            <hr />
            {
                boardInfo.adress === ''
                ? <></>
                : <KakaoMap addOrShow={boardInfo.adress} />
            }
        </div>
    );
}

export default DetailBoard;
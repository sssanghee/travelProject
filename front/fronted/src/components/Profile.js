import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BoardDataService from '../services/BoardService';
import '../styles/Pagination.css';
import Pagination from "react-js-pagination";

const Profile = () => {
    const auth = useSelector(state => state.auth);

    const navigate = useNavigate();
    const [ boardList, setBoardList ] = useState([]);
    const [ commentList, setCommentList ] = useState([]);

    const [ totalBoardCount, setTotalBoardCount ]  = useState(0);
    const [ totalCommentsCount, setTotalCommentsCount ] = useState(0);

    const onePageTotalItem = 10;
    const [ page, setPage ] = useState(1);
    const [ commentPage, setCommentPage ] = useState(1);



    useEffect(() => {
        BoardDataService.myTotalItem(auth.user.id)        //총게시물수를 가져와 페이징위해
        .then((res) => {
            console.log(res);
            setTotalBoardCount(res.data.countBoard);
            setTotalCommentsCount(res.data.commentsCount);
        })
        .catch((e) => {
            console.log(e);
        })

        BoardDataService.myPagination(1, auth.user.id, "board")
        .then((res) => {
            console.log(res.data);
            setBoardList(res.data);
        })
        .catch((e) => {
            console.log(e);
        })

        BoardDataService.myPagination(page, auth.user.id, "comment")
        .then((res) => {
            console.log(res);
            setCommentList(res.data);
        })
        .catch((e) => {
            console.log(e);
        })

    }, []);

    const handlePageChange = (page) => {
        setPage(page);
        BoardDataService.myPagination(page, auth.user.id, "board")
        .then((res) => {
            console.log(res.data);
            setBoardList(res.data);
        })
        .catch((e) => {
            console.log(e);
        })
    };

    const handleCommentPageChange = (page) => {
        setCommentPage(page);
        BoardDataService.myPagination(page, auth.user.id, "comment")
        .then((res) => {
            console.log(res);
            setCommentList(res.data);
        })
        .catch((e) => {
            console.log(e);
        })

    }
    const itemClick = (boardInfo) => {
        navigate("detailBoard", {
            state:{
                detailBoard : {boardInfo}
            }
        });
    };

    return (
        <div>
            <div>
                <h2>내가 쓴 게시글</h2>

                <table>
                <tbody>
                    {
                        boardList.map(element => {
                            return(
                                <tr key={element.bno} 
                                onClick={() => itemClick(element)}
                                >
                                    <td>{element.title}</td>
                                    <td>{element.regidate}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Pagination 
                activePage={page}                       //현재페이지
                itemsCountPerPage={onePageTotalItem}    //한페이지당/ 게시판수
                totalItemsCount={totalBoardCount}             //모든 게시글 수
                pageRangeDisplayed={5}                  //페이지범위 ex) << < 1 ~ 5 > >>
                prevPageText={"‹"}                  
                nextPageText={"›"}  
                onChange={handlePageChange}             //페이지버튼 클릭시, 실행
                />

            </div>
            <div>
                <h2>내가 쓴 댓글</h2>
                <table>
                <tbody>
                    {
                        commentList.map(element => {
                            const key = element.boardIdx + "_" + element.commentNum;
                            return(
                                <tr key={key}>
                                    <td>{element.comment}</td>
                                    <td>{element.regidate}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Pagination 
                activePage={commentPage}                       //현재페이지
                itemsCountPerPage={onePageTotalItem}    //한페이지당/ 게시판수
                totalItemsCount={totalCommentsCount}             //모든 게시글 수
                pageRangeDisplayed={5}                  //페이지범위 ex) << < 1 ~ 5 > >>
                prevPageText={"‹"}                  
                nextPageText={"›"}  
                onChange={handleCommentPageChange}             //페이지버튼 클릭시, 실행
                />

            </div>

        </div>
    );
}

export default Profile;
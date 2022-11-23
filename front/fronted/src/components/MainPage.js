import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../styles/Pagination.css';
import Pagination from "react-js-pagination";
import BoardDataService from '../services/BoardService';
import { useEffect } from 'react';
import DetailBoard from './board/DetailBoard';
import "../styles/MainPage.css";

const MainPage = () => {
    const navigate = useNavigate();
    const [ boardList, setBoardList ] = useState([]);
    const [ totalItem, setTotalItem ]  = useState(0);
    const onePageTotalItem = 10;
    const [ page, setPage ] = useState(1);

    useEffect(() => {
        BoardDataService.totalItem()    //총게시물수를 가져와 페이징위해
        .then((res) => {
            console.log(res);
            setTotalItem(res.data);
        })
        .catch((e) => {
            console.log(e);
        })

    })
    useEffect(() => {
        BoardDataService.pagination(page)
        .then((res) => {
            console.log(res.data);
            setBoardList(res.data);
        })
        .catch((e) => {
            console.log(e);
        })
    }, []);

    const handlePageChange = (page) => {
        setPage(page);
        BoardDataService.pagination(page)
        .then((res) => {
            console.log(res.data);
            setBoardList(res.data);
        })
        .catch((e) => {
            console.log(e);
        })
    };

    const itemClick = (boardInfo) => {
        navigate("detailBoard", {
            state:{
                detailBoard : {boardInfo}
            }
        });
    };

    return (
        <div>

            <table>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성시간</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        boardList.map(element => {
                            return(
                                <tr key={element.bno} 
                                onClick={() => itemClick(element)}
                                >
                                    <td>{element.title}</td>
                                    <td>{element.id}</td>
                                    <td>{element.regidate}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link to="/addBoard"> 
                <button>글쓰기</button>
            </Link>
            <Pagination 
                activePage={page}                       //현재페이지
                itemsCountPerPage={onePageTotalItem}    //한페이지당/ 게시판수
                totalItemsCount={totalItem}             //모든 게시글 수
                pageRangeDisplayed={5}                  //페이지범위 ex) << < 1 ~ 5 > >>
                prevPageText={"‹"}                  
                nextPageText={"›"}  
                onChange={handlePageChange}             //페이지버튼 클릭시, 실행
                />
        </div>
    );
}

export default MainPage;
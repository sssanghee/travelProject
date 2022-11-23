package com.travel.service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travel.mapper.BoardMapper;
import com.travel.model.Board;
import com.travel.model.Comment;
import com.travel.model.Like;
import com.travel.model.forMyAllContents;
import com.travel.model.forMyProfileContent;

@Service
public class BoardService {

	@Autowired
	BoardMapper boardMapper;
	
	public String uploadBoard(Board board) {
		String id = board.getId();
		
		int personnum = boardMapper.getBoardNum(id) + 1;		
		board.setBoard_idx(personnum);
		
		LocalDateTime now = LocalDateTime.now();
		String formatedNow = now.format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss"));
		board.setRegidate(formatedNow);
		
		String result = "fail";
		try {
			boardMapper.insertBoard(board);
			result = "success";
		} catch(Exception e) {
			e.printStackTrace();
		}
		System.out.println(result);
		return result;
	}
	
	public List<Board> pagination(int page) {
		int lowNum = (page -1) * 10;
		List<Board> resultBoard = boardMapper.pageItem(lowNum);
		
		return resultBoard;
	}
	
	public List<?> myBoardPagination(int page, String id, String type){
		int lowNum = (page -1) * 10;
		forMyProfileContent formyprofileContent = new forMyProfileContent();
		formyprofileContent.setId(id);
		formyprofileContent.setPage(lowNum);
		
		if(type.equals("board")) {
			List<Board> resultBoard = boardMapper.myPageItem(formyprofileContent);
			
			return resultBoard;
		} else {
			List<Comment> resultComment = boardMapper.myCommentItem(formyprofileContent);
			
			return resultComment;
		}
	}
	
	public forMyAllContents myProfileTotalCount(String id) {
		forMyAllContents formyallContents = boardMapper.myProfileTotalCounts(id);
		return formyallContents;
	}
	
	public int countTotalBoard() {
		int totalItem = boardMapper.countTotalBoard();
		
		return totalItem;
	}
	
	public int clickLike(Like likeData) {
		int likeInfo = boardMapper.likeInfo(likeData);
		
		if(likeInfo == 1) {
			boardMapper.delLikeInfo(likeData);
		} else {
			boardMapper.insertLikeInfo(likeData);
		}
		int countLike = boardMapper.totalLike(likeData);
		return countLike;
	}
	
	public int searchLikeCount(Like likeData) {
		int countLike = boardMapper.totalLike(likeData);
		return countLike;
	}
	
	public Comment addComment(Comment comment) {
		long commentNum = boardMapper.findCommentNum(comment);
		commentNum ++;
		LocalDateTime now = LocalDateTime.now();
		String formatedNow = now.format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss"));
		comment.setCommentNum(commentNum);
		comment.setRegidate(formatedNow);
		
		boardMapper.addComment(comment);
		return comment;
	}
	
	public List<Comment> findAllComments(Comment comment){
		List<Comment> result = boardMapper.findAllComment(comment);
		return result;
	}
}

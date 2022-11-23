package com.travel.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.commons.io.IOUtils;
import org.apache.commons.io.output.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.travel.model.Board;
import com.travel.model.Comment;
import com.travel.model.Like;
import com.travel.model.forMyAllContents;
import com.travel.service.BoardService;
import com.travel.service.FileService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/board")
public class BoardController {
	
	String UPLOAD_PATH = "C:/studyStored";	
	
	@Autowired
	BoardService boardService;
	
	@Autowired
	FileService fileService;
	
	@PostMapping("/uploadBoard")
	public ResponseEntity<String> uploadBoard(@RequestBody Board board){
		try {
			String result = boardService.uploadBoard(board);
			
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/getImage/{fileId}/{fileType}")
	public ResponseEntity<byte[]> getImageFile(@PathVariable String fileId, @PathVariable String fileType){
		try {
			System.out.println("getImage");
			FileInputStream fis = new FileInputStream(UPLOAD_PATH + "/" + fileId + "." + fileType);

			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			
			byte buffer[] = new byte[1024];

			int length = 0;

			while((length = fis.read(buffer)) != -1) {
				baos.write(buffer, 0, length);
			}

			return new ResponseEntity<byte[]>(baos.toByteArray(), HttpStatus.OK);
			
		} catch(IOException e) {
			e.printStackTrace();
			return new ResponseEntity<byte[]>(new byte[] {}, HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping(value="/uploadImage", produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<?> uploadImage(@ModelAttribute MultipartFile file) {
		try {
			String fileId = (new Date().getTime() + "" + (new Random().ints(1000, 9999).findAny().getAsInt()));
			String originName = file.getOriginalFilename();
			String fileExtension = originName.substring(originName.lastIndexOf(".") + 1);
			originName = originName.substring(0, originName.lastIndexOf("."));
			fileId = fileId + "_" + originName;
			
			long fileSize = file.getSize();
			
			File fileSave = new File(UPLOAD_PATH, fileId + "." + fileExtension);
			
			if(!fileSave.exists()) {
				fileSave.mkdir();
			}
			
			file.transferTo(fileSave);		
			
			System.out.println("fileId= " + fileId);
			System.out.println("originName= " + originName);
			System.out.println("fileExtension= " + fileExtension);
			System.out.println("fileSize= " + fileSize);
			
			return new ResponseEntity<>("http://localhost:8080/api/board/getImage/" + fileId + "/" + fileExtension, HttpStatus.OK);
		} catch(IOException e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.CONFLICT);
		}
	}
	
	
	@GetMapping("/pagination/{page}")
	public ResponseEntity<List<Board>> pagination(@PathVariable("page") int page){
		try {
			List<Board> pageBoard = boardService.pagination(page);
			return new ResponseEntity<>(pageBoard, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/pagination/{page}/{id}/{type}")
	public ResponseEntity<List<?>> myBoardPagination(@PathVariable("page") int page,
		@PathVariable("id") String id, @PathVariable("type") String type){

		try {
			List<?> result = boardService.myBoardPagination(page, id, type);
			return new ResponseEntity<>(result, HttpStatus.OK);
			
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/myTotalItem/{id}")
	public ResponseEntity<forMyAllContents> myProfileTotalCount(@PathVariable("id") String id) {
		try {
			forMyAllContents result = boardService.myProfileTotalCount(id);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/totalItem")
	public ResponseEntity<Integer> countTotalBoard() {
		try {
			int totalItem = boardService.countTotalBoard();
			return new ResponseEntity<>(totalItem, HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/clickLike")
	public ResponseEntity<Integer> clickLike(@RequestBody Like likeData){
		try {
			int result = boardService.clickLike(likeData);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/searchLikeCount")
	public ResponseEntity<Integer> searchLikeCount(@RequestBody Like likeData){
		try {
			int result = boardService.searchLikeCount(likeData);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/addComment")
	public ResponseEntity<Comment> addComment(@RequestBody Comment comment){
		try {
			Comment result = boardService.addComment(comment);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/findAllComments")
	public ResponseEntity<List<Comment>> findAllComments(@RequestBody Comment comment){
		try {
			List<Comment> result = boardService.findAllComments(comment);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

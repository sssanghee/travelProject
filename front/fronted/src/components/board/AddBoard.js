import React, { useState, useEffect, useRef, memo } from 'react';
import ReactQuill from "react-quill";
import { useHistory, useParams } from 'react-router-dom';
import QuillEditor from './QuillEditor';
import ToastEditor from './ToastEditor';



const AddBoard = () => {

    return (
        <div>
            글쓰기게시판
            <div className='text-editor'>
                {/* <QuillEditor/> */}
                <ToastEditor />
            </div>

        </div>
    );
}

export default AddBoard;
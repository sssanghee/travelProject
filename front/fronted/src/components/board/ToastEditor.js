import React, { useState, useRef} from 'react';
import { useSelector, useDispatch } from "react-redux";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import chart from '@toast-ui/editor-plugin-chart';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';
import BoardDataService from '../../services/BoardService';
import axios from 'axios';
import authHeader from '../../services/auth-header';



function ToastEditor(props) {
    const editorRef = useRef();
    const auth = useSelector(state => state.auth);

    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");

    const titleChange = (res) => {
        setTitle(res.target.value);
    }

    const onSave = () => {
        const editorInstance = editorRef.current.getInstance();
        const contents = editorInstance.getHTML();
        console.log(contents);
        console.log(title);
        const data = {
            id: auth.user.id,
            title: title,
            content: contents,
        };
        BoardDataService.uploadBoard(data)
        .then((res) => {
            console.log(res);
        })
        .catch((e) => {
            console.log(e);
        })
        
    }

    return (
        <div>
            <input type="text" value={title} onChange={titleChange} placeholder="제목"></input>
                
            <Editor initialValue='' useageStatistics={false}
            plugins={[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]}
            ref={editorRef}
            // hooks={{         이미지 업로드 구현 중.
            //     addImageBlobHook: async (blob, callback) => {
            //         console.log(blob);
            //         const user = JSON.parse(window.localStorage.getItem('user'));
            //         const img = blob.name;
            //         const formData = new FormData();

            //         formData.append('file', blob);

            //         for(let key of formData.keys()){
            //             console.log(key);
            //         }
            //         for(let value of formData.values()){
            //             console.log(value);
            //         }
            //         BoardDataService.uploadImg(formData)
            //         .then((res) => {
            //             console.log(res);
            //             console.log(res.data);
            //             const imageData = new FormData();
            //             imageData.append('imageFile', res.data);
            //             let imgData = URL.createObjectURL(res.data);

            //             callback(imgData, 'alt text');
            //         })
            //         .catch((e) => {
            //             console.log(e);
            //         })
            //     }
            // }}
            />
            
            <button onClick={onSave}>저장</button>
        </div>
    );
}

export default ToastEditor;
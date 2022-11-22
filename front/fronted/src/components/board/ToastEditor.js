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
import KakaoMap from './KakaoMap';


function ToastEditor(props) {
    const editorRef = useRef();
    const auth = useSelector(state => state.auth);

    const [ title, setTitle ] = useState("");
    const [ place, setPlace ] = useState("");

    const titleChange = (res) => {
        setTitle(res.target.value);
    }

    const takePlace = (e) => {
        setPlace(e);
    }

    const onSave = () => {
        const editorInstance = editorRef.current.getInstance();
        const contents = editorInstance.getHTML();
        const data = {
            id: auth.user.id,
            title: title,
            content: contents,
            adress: place
        };
        BoardDataService.uploadBoard(data)
        .then((res) => {
            window.location.replace("/");
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
            hooks={{         
                addImageBlobHook: async (blob, callback) => {

                    const formData = new FormData();
                    formData.append('file', blob);

                    BoardDataService.uploadImg(formData)
                    .then((res) => {
                        const imageData = new FormData();
                        imageData.append('imageFile', res.data);
                        callback(res.data, 'img');
                    })
                    .catch((e) => {
                        console.log(e);
                    })
                }
            }}
            />
            <KakaoMap addOrShow="add" placeFunc={takePlace}/>
            <button onClick={onSave}>저장</button>
        </div>
    );
}

export default ToastEditor;
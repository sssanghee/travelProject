import React, { useState, useEffect, useRef, memo } from 'react';
import ReactQuill from "react-quill";
import { useHistory, useParams } from 'react-router-dom';
import ToastEditor from './ToastEditor';



const AddBoard = () => {

    return (
        <div>
            <div className='text-editor'>
                <ToastEditor />
            </div>

        </div>
    );
}

export default AddBoard;
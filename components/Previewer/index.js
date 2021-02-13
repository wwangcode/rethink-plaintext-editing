import styled from 'styled-components'
import axios from 'axios'
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import path from 'path';

import css from '../../pages/style.module.css';


function Previewer({ file, editor, togglePreview, preview }) {
    const [value, setValue] = useState('');
    const [ exportMessage, setExportMessage ] = useState('')
  
    useEffect(() => {
      (async () => {
        setValue(await file.text());
      })();
    }, [file]);
  
    const saveFile = async () => {
      const res = await axios.post('api/save-file', {name: file.name, text: value, type: file.type, lastModified: file.lastModified, })
      if (res.status !== 200) {
        setExportMessage('Error exporting file in local storage, please try again')
      }
      console.log(res)
      setExportMessage(`Successfully exported to ${res.data.exportPath}${file.name} `)
    }
  
    return (
      <div className={css.preview}>
        <div className={css.title}>{path.basename(file.name)}
          <ButtonContainer>
            {editor && (<EditButton onClick={togglePreview}>{preview ? 'Edit' : 'Preview'}</EditButton>)}
            <ExportButton onClick={saveFile}>Export</ExportButton>
          </ButtonContainer>
        </div>
        <div className={css.content}>{value}</div>
      </div>
    );
  }
  
  Previewer.propTypes = {
    file: PropTypes.object
  };

  export default Previewer



// STYLED COMPONENTS
const EditButton = styled.div`
display: inline-block;
margin-top: 4px;
margin-right: 1rem;
padding: 0 1rem;
line-height: 30px;
border-radius: 10px;
font-size: 1rem;
background-color: #bb86fc;
color: black;
cursor: pointer;
&:hover {
  background-color: rgba(187, 134, 252, .8);
}
`;


const ExportButton = styled.div`
display: inline-block;
margin-top: 4px;
padding: 0 1rem;
line-height: 30px;
border-radius: 10px;
font-size: 1rem;
background-color: #7FFFD4;
color: black;
cursor: pointer;
&:hover {
  background-color: rgba(127, 255, 212, .8);
}
`;

const ButtonContainer = styled.div`
float: right;
`;
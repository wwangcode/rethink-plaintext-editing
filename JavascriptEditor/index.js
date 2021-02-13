import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import path from 'path'
import axios from 'axios'

import css from './style.css';

function JavascriptEditor({ file, write, togglePreview, preview }) {
  const [ fileText, setFileText ] = useState()
  const [ exportMessage, setExportMessage ] = useState('')

  useEffect(() => {
    (async () => {
      if (file) {
        setFileText(await file.text());
      }
    })()
  }, [file]);

  const handleTextInput = (e) => {
    e.preventDefault()
    write(new File(
      [ e.target.value ],
      file.name,
      {
        type: file.type,
        lastModified: Date.now()
      }
    ))
    setFileText(e.target.value)
  }

  const saveFile = async () => {
    const res = await axios.post('api/save-file', {name: file.name, text: fileText, type: file.type, lastModified: file.lastModified, })
    if (res.status !== 200) {
      setExportMessage('Error exporting file in local storage, please try again')
    }
    console.log(res)
    setExportMessage(`Successfully exported to ${res.data.exportPath}${file.name} `)
  }

  return (
    <div className={css.editor}>
      <div className={css.title}>
          {path.basename(file.name)}
          <ButtonContainer>
            <EditButton onClick={togglePreview}>{preview ? 'Edit' : 'Preview'}</EditButton>
            <ExportButton onClick={saveFile}>Export</ExportButton>
          </ButtonContainer>
      </div>
      <TextInput value={fileText} onChange={handleTextInput}/>
      {exportMessage !== '' && (<ExportMessage>{exportMessage}</ExportMessage>)}
    </div>
  );
}

JavascriptEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default JavascriptEditor;


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
    background-color: rgba(127, 255, 212, .8);
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
    background-color: rgba(187, 134, 252, .8);
  }
`;

const ButtonContainer = styled.div`
  float: right;
`;

const ExportMessage = styled.div`
  margin: 0 auto;
  text-align: center;
  color: #bb86fc;
  font-weight: 500;
`;

const TextInput = styled.textarea`
  width: 640px;
  height: 40rem;
  padding: 2rem;
  font-size: 1.25rem;
  text-align: left;
  margin: 0;
  border: 0;
  font-weight: 300;
  &:focus {
    outline: 0;
  }
`;

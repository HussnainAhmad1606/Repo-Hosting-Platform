import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function App({text}) {
    const handleEditorChange = (content, editor) => {
        console.log(text);
        console.log('Content was updated:', content);
        // You can update the state or perform other actions with the content
      };
  return (
    <Editor
      apiKey='qecngtthmhtbskcydhthx27wme520d9um93gi04azdu5xg18'
      init={{
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }}
      initialValue={text?.document_text}
      onEditorChange={handleEditorChange}
    />
  );
}
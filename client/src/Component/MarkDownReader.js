import React, { useState, useEffect } from 'react';

import Markdown from 'markdown-to-jsx'
import "./markdown.css"

const MarkdownReader = ({ filename }) => {
    console.log(filename);
    const [content, setContent] = useState('');
    useEffect(() => {
        import(`../markdown/${filename}`)
            .then(res => {
                fetch(res.default)
                    .then(res => res.text())
                    .then(res => setContent(res))
            
            }) 
        }
        )
       
    return (
        <div>
            <Markdown >
                {content}
            </Markdown>
        </div>
    );
};

export default MarkdownReader;
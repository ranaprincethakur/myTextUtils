import React,{useState} from 'react'


export default function TextForm(props) {
  const [text, setText] = useState('');
    const handleUpClick =()=>{
        let newText=text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to uppercase","success");
    }

    const handleLoClick =()=>{
      // console.log("lowercase was clicked" + text);
      let newText=text.toLowerCase();
      setText(newText);
      props.showAlert("Converted to lowercase","success");
    }

    const handleCopy=()=>{
      navigator.clipboard.writeText(text);
      props.showAlert("Copied to Clipboard!","success");
    }

  const handleClearClick =()=>{
    // console.log("lowercase was clicked" + text);
    let newText='';
    setText(newText);
    props.showAlert("Text Cleared","danger");
  }
  const handleExtraSpaces= ()=>{
    let newText= text.split(/[ ]+/);
    setText(newText.join(" "));
  }
  const handleNewSentence=()=>{

    let newText = capitalizeSentences(text);
    setText(newText);
    function capitalizeSentences(text) {
      // Use a regular expression to split the string into an array of sentences
      const sentences = text.split(/([.?!])\s+/);
      
      // Iterate over each sentence and capitalize the first character
      const capitalizedSentences = sentences.map(sentence => {
        // Trim any leading whitespace
        sentence = sentence.trim();
        
        // Capitalize the first character
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
        
        return sentence;
      });
      
      // Join the sentences back into a single string
      const result = capitalizedSentences.join(' ');
      
      return result;
    }

  }
  const handleOnChange= (event)=>{
        // console.log("on change");
       setText(event.target.value);
    }
  return (
    <>
    <div className='container'>
        <h1 className={`mb-4 text-${props.mode==='light'?'dark':'white'}`}>{props.heading}</h1>
        <div className="mb-3">
        <textarea className="form-control" 
        value={text} style={{ backgroundColor:props.mode==='dark'?'#b5a6a6':'white',color:props.mode==='dark'?'white':'black'}} onChange={handleOnChange}id="myBox" rows="8"></textarea>
        </div>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleNewSentence}>Remove Extra Spaces</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy to clipboard</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
  </div>
  <div className="container my-3"style={{ color:props.mode==='dark'?'white':'black' }}>
    <h2>Your text summary</h2>
    {/* /\s+/ is a regular expression where s selects spaces and newline and g is global flag */}
    <p>{text.split(/\s+/g).filter((element)=>{return element.length!==0}).length} words, {text.length} characters</p>
    {/* split() splits a string into an array of substrings */}
    <p>{0.008*text.split(" ").filter((element)=>{return element.length!==0}).length} minutes to read</p>
    <h2>Preview</h2>
    <p>{text.length>0?text:"Nothing to preview"}</p>
  </div>
  </>
  )
}

import React from 'react';
import './App.css';

const emailRegExp = /^[a-z0-9\.@]/

const ProgressBar = ({progress})=>{
return <>
<div>Form completion</div>
<div className="progress">
<div className="form-progress-bar" style={{  width:`${progress}%`}} /> 
</div>
</>
}
class App extends React.Component {
    state ={
       documentName:"",
        documentType:"",
        category:"",
        email:"",
    }

hasTwoDots  = str => str.indexOf('..') >-1

validateEmail =(email)=>{
    if(email.toLowerCase() !== email){
        return false
    }
    const emailArray = email.split('@')
    const [username, site] = emailArray
    if(!site || !username|| emailArray.length > 2 || this.hasTwoDots(email)){
        return false
    }
    const siteArray = site.split('.')
    const [domain, ext] = siteArray
    if(!domain || !ext|| siteArray.length > 2){
        return false
    }
return true
}

getProgressByState = (state)=>{
    const {documentName,documentType, category, email } = state;
    const docNameValid = documentName.length >=2 && documentName.length <=32
    const res = !!documentType + !!category + docNameValid + this.validateEmail(email)
    return res 
}

onChange = ({target:{id,value}})=>{
    this.setState((state)=>{
        const newState = {...state,  [id]:value}
        const progress = this.getProgressByState(newState)
        return {...newState, progress: progress / 4 * 100}
    })
}
  render() {
    return ( 
        <>
        <ProgressBar progress={this.state.progress} /> 
        <hr/>
        <label htmlFor='documentName'> document Name</label>
        <input type='input' id="documentName" onChange={this.onChange}/>
         <hr/>
         <label htmlFor="documentType">document Type</label>
         <select id="documentType" value={this.state.documentType} onChange={this.onChange}> 
           <option value="" label="" />
           <option value="Plain" label="Plain" />
           <option value="PDF" label="PDF" />
        </select>
        <hr/>
 
      <label htmlFor="category">category</label>
         <select id="category" value={this.state.category} onChange={this.onChange}> 
           <option value="" label="" />
           <option value="Audit" label="Audit" />
           <option value="Application" label="Application" />
           <option value="Other" label="Other" />.
        </select>
        <hr/>
         <label htmlFor="email">email</label>
        <input type='input' id="email" onChange={this.onChange}/>
        </>
    );
  }
}

export default App;

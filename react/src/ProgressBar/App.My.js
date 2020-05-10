import React from 'react';

class App extends React.Component {

  constructor() {
    super();
    this.state = { progressCSSWidth: '0%' }
    this.handleValidation = this.handleValidation.bind(this);
  }

  /**
   * Change progress state
   * progressNum is a floating point between 0 and 1
   */
  setProgress(progressNum) {
    this.setState({ progressCSSWidth: `${ progressNum * 100 }%` });
  }

  /**
   * Check email is valid
   * Requirements :
   *  Maximum 128 characters
   *  <username>@<domain>
   *  Lowercase latin letters + digits + period
   *  Domain requires one period
   *  Domain and username must not have consecutive periods
   */
  get isEmailValid() {
    const input = document.getElementById('email');
    const emailRegXp = /^[a-z0-9]+([\.]?[a-z0-9]+)*@[a-z0-9]+([\.]?[a-z0-9]+)*(\.[a-z0-9]{2,3})+$/;
    return input.value.length <= 128 && emailRegXp.test(input.value);
  }

  /**
   * Check document type is valid
   * Requirements :
   *  Not empty
   */
  get isDocumentTypeValid() {
    const select = document.getElementById('documentType');
    return select.value !== '';
  }

  /**
   * Check category is valid
   * Requirements :
   *  Not empty
   */
  get isCategoryValid() {
    const select = document.getElementById('category');
    return select.value !== '';
  }

  /**
   * Check category is valid
   * Requirements :
   *  Value is no less than 2 and no more than 32 characters
   */
  get isDocumentNameValid() {
    const input = document.getElementById('documentName');
    return input.value.length >= 2 && input.value.length <= 32;
  }

  /**
   * Handle form validation and progress bar
   **/
  handleValidation() {
    const {
      isDocumentNameValid,
      isDocumentTypeValid,
      isCategoryValid,
      isEmailValid
    } = this;

    // Add validation results here
    const validationList = [
      isDocumentNameValid,
      isDocumentTypeValid,
      isCategoryValid,
      isEmailValid
    ]

    const now = validationList.reduce((aggregator, bool) => aggregator + bool, 0);
    const max = validationList.length;

    this.setProgress(now / max);
  }

  render() {
    const { handleValidation } = this;
    const { progressCSSWidth } = this.state;
    return (
      <div style={{margin: '15px'}}>
        Form completion
        <div className="form-progress-bar-wrapper">
          <div id="progressBar" className="form-progress-bar" style={{width: progressCSSWidth}}></div>
        </div>
        <hr />
        <div className="form-row">
          <div className="form-group col-6">
            <label>Document Type</label>
            <select id="documentType" className="form-control" onChange={handleValidation}>
              <option label=""></option>
              <option value="plain" label="Plain" />
              <option value="pdf" label="PDF" />
            </select>
          </div>
          <div className="form-group col-6">
            <label>Document Name</label>
            <input id="documentName" type="text" className="form-control" onKeyUp={handleValidation} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-6">
            <label>Category</label>
            <select id="category" className="form-control" onChange={handleValidation}>
              <option label=""></option>
              <option value="audit" label="Audit" />
              <option value="application" label="Application" />
              <option value="other" label="Other" />
            </select>
          </div>
          <div className="form-group col-6">
            <label>Email</label>
            <input id="email" type="text" className="form-control" onKeyUp={handleValidation} />
          </div>
        </div>
      </div>
    );
  }

}

export default App;

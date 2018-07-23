import React from 'react';
import './ImageLinkForm.css';

const ImageLinkFrom = ({ onInputChange, onSubmit }) => {
	return (
		<div>
			<p className='f3'>
        {'This Magic Brain will detect faces in your pictures. Give it a try!'}
      </p>
      <div>
        <div className='form w-100 w-90-m w-60-l center pa4 br3 shadow-5'>
          <input type='text' className='w-100 w-70-ns f4 pa2' onChange={onInputChange}/>
          
          <button 
            className='w-40 w-30-ns grow f4 link ph3 pv2 dib white bg-light-purple' 
            onClick={ onSubmit }
          >
            { 'Detect' }
          </button>
        </div>
      </div>
		</div>
	);
}

export default ImageLinkFrom;
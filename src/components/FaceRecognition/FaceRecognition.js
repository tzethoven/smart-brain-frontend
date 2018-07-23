import React from 'react';

const FaceRecognition = ({ imageUrl, faceBoxes }) => {
  const jsxList = faceBoxes.map((box, i) => {
    let { leftCol, topRow, rightCol, bottomRow } = box;
    return (
      <div 
        className='absolute ba bw2 b--blue'
        key={'face-box-' + i}
        style={{
          top: topRow,
          right: rightCol,
          bottom: bottomRow,
          left: leftCol
        }}
      ></div>
    );
  });

  return (
    <div className=''>
      <div className='mv3 mw7 center relative'>
        <img 
          id='input-image' 
          className='w-100'
          src={ imageUrl } 
          alt='' 
        />
        {
          jsxList
        }
      </div>
    </div>
  );
}

export default FaceRecognition;
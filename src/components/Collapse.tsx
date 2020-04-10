import React from 'react';

const showHide = () => {
  console.log('collapsing stuff...');
  let form = document.querySelector('.form');
  //   let form = document.getElementById('form');
  //   let form = document.querySelector<HTMLInputElement>('.form');
  //   console.log(typeof form);
  form.classList.toggle('hide');
  //   form.
};

function Collapse(props: any) {
  return (
    <div className="collapse" onClick={showHide}>
      {props.children}
    </div>
  );
}

export default Collapse;

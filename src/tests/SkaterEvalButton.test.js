import React from 'react';
import ReactDOM from 'react-dom';
import SkaterEvalButton from '../Eval/SkaterEvalButton';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SkaterEvalButton />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

import React from 'react';
import ReactDOM from 'react-dom';
import SkaterEval from '../SkaterEval';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SkaterEval />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

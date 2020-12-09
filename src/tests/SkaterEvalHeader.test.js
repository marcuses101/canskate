import React from 'react';
import ReactDOM from 'react-dom';
import SkaterEvalHeader from '../SkaterEvalHeader';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SkaterEvalHeader />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

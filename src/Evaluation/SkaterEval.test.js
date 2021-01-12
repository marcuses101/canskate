import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import SkaterEval from './SkaterEval';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><SkaterEval /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

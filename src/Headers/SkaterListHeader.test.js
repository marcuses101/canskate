import React from 'react';
import ReactDOM from 'react-dom';
import SkaterListHeader from './SkaterListHeader';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SkaterListHeader />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
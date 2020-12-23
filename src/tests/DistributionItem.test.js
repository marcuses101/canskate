import React from 'react';
import ReactDOM from 'react-dom';
import DistributionItem from './DistributionItem';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DistributionItem />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
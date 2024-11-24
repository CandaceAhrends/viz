import React from 'react';

class Quote extends React.Component {
  render() {
    return (
      <div className="flex text-green">
        <div className="text-xxl font-semibold pl-3.5">406.32</div>
        <div className="flex flex-col pt-[.35rem] pl-3">
          <span className="text-xs font-thin">+2.24</span>
          <span className="text-xs font-thin">+0.26%</span>
        </div>
      </div>
    );
  }
}

export default Quote;

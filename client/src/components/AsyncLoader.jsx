import React from 'react';

class AsyncLoader extends React.Component {
  constructor() {
    super();
    this.result = {};
    this.state = {
      ready: false
    };
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    const data = this.props.data;
    try {
      for (const key in data) {
        this.result[key] = await data[key].func(...data[key].params);
      }
      this.setState({
        ready: true
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (this.state.ready) {
      const C = this.props.c;
      return <C {...this.result} />;
    }
    return "loading....";
  }
}


/**
 * 
 * @param {React.Component} component 
 * @param {{any:{func:function,params: [*]}}} data 
 */
const initializer = (component, data) => {
  return () => <AsyncLoader data={data} c={component} />;
};

export default initializer;
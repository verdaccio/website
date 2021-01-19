const React = require("react");
const ReactDOM = require("react-dom");
const CompLibrary = require("docusaurus/lib/core/CompLibrary.js");
const Container = CompLibrary.Container;

const BannerTitle = (props) => {
  return <h1 className="header_title">{props.title}</h1>;
};

class Team extends React.Component {
  componentDidMount() {
    const obj = ReactDOM.findDOMNode(this);
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
    console.lo
  }

  render() {
    return (
      <div className="mainContainer">
        <iframe
          src="https://verdacciocontributors.gtsb.io/"
          id="iframeC"
          frameborder="0"
          scrolling="yes"          
          width="100%"
          style={{height:'100vh'}}
        />
      </div>
    );
  }
}

module.exports = Team;

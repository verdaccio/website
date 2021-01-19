const React = require('react');
const CompLibrary = require('docusaurus/lib/core/CompLibrary.js');
const Container = CompLibrary.Container;

const BannerTitle = (props) => {
  return (
    <h1 className="header_title">
      {props.title}
    </h1>
  );
};

class Team extends React.Component {
  render() {

    return (
      <div className="mainContainer">
        <Container padding={['bottom']}>
          <BannerTitle title={"Contributors"}/>
          <div class="team_container">
            <iframe src="https://verdacciocontributors.gtsb.io/" 
             frameborder="0" scrolling="no"
            width="100%" height="1500px"/>
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Team;

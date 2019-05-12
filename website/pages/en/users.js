const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const translate = require("../../server/translate.js").translate;

const siteConfig = require(process.cwd() + '/siteConfig.js');

class Users extends React.Component {
  render() {
    const createShowcase = (userList) => {
      return userList.map((user, i) => {
        return (
          <a href={user.infoLink} key={i} target="_blank" rel="noopener">
            <img src={siteConfig.baseUrl + user.image} alt={user.caption} title={user.caption} />
          </a>
        );
      });
    }
    

    return (
      <div className="mainContainer">
        <Container padding={['bottom', 'top']}>
          <div className="showcaseSection">
            <div className="prose">
              <h1>
                <translate>
                  Who's Using This?
                </translate>
              </h1>
              <p>
                <translate>
                  Verdaccio is used by many open source projects...
                </translate>
              </p>
            </div>
            <div className="logos">{createShowcase(siteConfig.openSourceUsers)}</div>
            <div className="prose">
              <p>
                <translate>
                  and companies too!
                </translate>
              </p>
            </div>
            <div className="logos">{createShowcase(siteConfig.companyUsers)}</div>
            <p>
              <translate>
                Are you using this project? Do not be shy and add your company/project logo.
              </translate>
            </p>
            <a
              href="https://github.com/verdaccio/website/edit/master/website/siteConfig.js"
              className="button">
              <translate>
                Add your company
              </translate>
            </a>
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Users;

/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'
import PlaylistFormView from './PlaylistFormView'

const scripts = [
  { loading: fetch("https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=61c84fb60c499caa357c038b").then(body => body.text()), isAsync: false },
  { loading: fetch("js/webflow.js").then(body => body.text()), isAsync: false },
]

let Controller

class IndexView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/IndexController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = IndexView

        return Controller
      }

      throw e
    }
  }

  componentDidMount() {
    const htmlEl = document.querySelector('html')
    htmlEl.dataset['wfPage'] = '61c84fb60c499c87ec7c038c'
    htmlEl.dataset['wfSite'] = '61c84fb60c499caa357c038b'

    scripts.concat(null).reduce((active, next) => Promise.resolve(active).then((active) => {
      const loading = active.loading.then((script) => {
        new Function(`
          with (this) {
            eval(arguments[0])
          }
        `).call(window, script)

        return next
      })

      return active.isAsync ? next : loading
    }))
  }

  render() {
    const proxies = IndexView.Controller !== IndexView ? transformProxies(this.props.children) : {
      'btn-connect': [],
    }

    return (
      <span>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url(/css/normalize.css);
          @import url(/css/webflow.css);
          @import url(/css/playlistme.webflow.css);
        ` }} />
        <span className="af-view">
          <div className="af-class-body">
            <div className="af-class-div-block w-clearfix">
              {map(proxies['btn-connect'], props => <a href="#" {...{...props, className: `af-class-btnwalletconnect w-button ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>Connect my wallet</React.Fragment>}</a>)}
            </div>
            <div className="af-class-headsection af-class-wf-section">
              <h1 className="af-class-headtitle">PlaylistMe 🎧</h1>
              <div className="af-class-headdesc">A simple app to share your playlist to beautiful people around <strong>Web3</strong> ecosystem. No judging, discriminating, whatsoever, we respect every genre. <br /><br />How to start? just connect your <strong>Ethereum</strong> wallet and start sharing!</div>
            </div>
            <PlaylistFormView.Controller />
            {/* [if lte IE 9]><![endif] */}
          </div>
        </span>
      </span>
    )
  }
}

export default IndexView

/* eslint-enable */
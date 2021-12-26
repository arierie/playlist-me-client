/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

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
              <a href="#" className="af-class-btnwalletconnection w-button">Connect my wallet</a>
            </div>
            <div className="af-class-headsection af-class-wf-section">
              <h1 className="af-class-headtitle">PlaylistMe 🎧</h1>
              <div className="af-class-headdesc">A simple app to share your playlist to beautiful people around Web3 ecosystem. No judging, discrimination, whatsoever, we respect every genre. <br /><br />How to start? just connect your Ethereum wallet and start sharing!</div>
            </div>
            <div className="af-class-form-block w-form">
              <form id="wf-form-Playlist" name="wf-form-Playlist" data-name="Playlist" method="get"><label htmlFor="URL" className="af-class-labellink">Link to your awesome playlist</label><label htmlFor="URL-2" className="af-class-labelsubtitlelink">Supported:&nbsp;Audius, Spotify, SoundCloud, Deezer, TIDAL, or Joox</label><input type="text" className="af-class-tflink w-input" maxLength={256} name="URL" data-name="URL" placeholder id="URL" required /><label htmlFor="Description" className="af-class-labeldesc">Tell us about why we should listen to this</label><input type="text" className="af-class-tfdesc w-input" maxLength={256} name="Description" data-name="Description" placeholder id="Description" required /><input type="submit" defaultValue="Send" data-wait="Please wait..." className="af-class-btnsend w-button" /></form>
              <div className="af-class-success-message w-form-done">
                <div>Thank you for sharing your playlist,<br />You're really a champ! 🤟</div>
              </div>
              <div className="w-form-fail">
                <div>Oops! Something went wrong while sending your playlist.</div>
              </div>
            </div>
            {/* [if lte IE 9]><![endif] */}
          </div>
        </span>
      </span>
    )
  }
}

export default IndexView

/* eslint-enable */
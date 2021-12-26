/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

const scripts = [

]

let Controller

class PlaylistFormView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/PlaylistFormController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = PlaylistFormView

        return Controller
      }

      throw e
    }
  }

  componentDidMount() {
    /* View has no WebFlow data attributes */

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
    const proxies = PlaylistFormView.Controller !== PlaylistFormView ? transformProxies(this.props.children) : {

    }

    return (
      <span>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url(/css/normalize.css);
          @import url(/css/webflow.css);
          @import url(/css/playlistme.webflow.css);
        ` }} />
        <span className="af-view">
          <div className="af-class-form-block w-form">
            <form id="wf-form-Playlist" name="wf-form-Playlist" data-name="Playlist" method="get"><label htmlFor="URL" className="af-class-labellink">Link to your awesome playlist</label><label htmlFor="URL" className="af-class-labelsubtitlelink">Supported:&nbsp;Audius, Spotify, SoundCloud, Deezer, TIDAL, or Joox</label><input type="text" className="af-class-tflink w-input" maxLength={256} name="URL" data-name="URL" placeholder id="URL" required /><label htmlFor="Description" className="af-class-labeldesc">Tell us about why we should listen to this</label><input type="text" className="af-class-tfdesc w-input" maxLength={256} name="Description" data-name="Description" placeholder id="Description" required /><input type="submit" defaultValue="Send" data-wait="Please wait..." className="af-class-btnsend w-button" /></form>
            <div className="af-class-success-message w-form-done">
              <div>Thank you for sharing your playlist,<br />You're really a champ! 🤟</div>
            </div>
            <div className="w-form-fail">
              <div>Oops! Something went wrong while sending your playlist.</div>
            </div>
          </div>
        </span>
      </span>
    )
  }
}

export default PlaylistFormView

/* eslint-enable */
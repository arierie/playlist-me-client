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
      'form-input': [],
      'tf-link': [],
      'tf-desc': [],
      'btn-send': [],
      'form-loading': [],
      'form-success': [],
      'btn-hash': [],
      'btn-dismiss': [],
      'form-error': [],
      'text-error': [],
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
            {map(proxies['form-input'], props => <form id="wf-form-Playlist" name="wf-form-Playlist" data-name="Playlist" method="get" {...props}>{createScope(props.children, proxies => <React.Fragment><label htmlFor="URL" className="af-class-labellink">Link to your awesome playlist</label><label htmlFor="URL" className="af-class-labelsubtitlelink">Supported:&nbsp;Audius, Spotify, SoundCloud, Deezer, TIDAL, or Joox</label>{map(proxies['tf-link'], props => <input type="text" maxLength={256} name="URL" data-name="URL" placeholder id="URL" required {...{...props, className: `af-class-tflink w-input ${props.className || ''}`}}>{props.children}</input>)}<label htmlFor="Description" className="af-class-labeldesc">Tell us about why we should listen to this</label>{map(proxies['tf-desc'], props => <input type="text" maxLength={256} name="Description" data-name="Description" placeholder id="Description" required {...{...props, className: `af-class-tfdesc w-input ${props.className || ''}`}}>{props.children}</input>)}
              {map(proxies['btn-send'], props => <a href="#" {...{...props, className: `af-class-btnsendplaylist w-button ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>Share playlist</React.Fragment>}</a>)}
            </React.Fragment>)}</form>)}
            {map(proxies['form-loading'], props => <div {...{...props, className: `af-class-loading ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>
              <div className="af-class-textloadingtitle">Ok, now let's wait a little</div>
              <div className="af-class-textloadingdesc"> Your playlist is currently being mined...</div>
              <div data-w-id="5fbeb774-98fb-b77e-6ed1-dfcfc041d512" data-animation-type="lottie" data-src="documents/loading_animation.json" data-loop={1} data-direction={1} data-autoplay={1} data-is-ix2-target={0} data-renderer="svg" data-default-duration="1.35" data-duration={0} className="af-class-lottie-animation" />
            </React.Fragment>}</div>)}
            {map(proxies['form-success'], props => <div {...{...props, className: `af-class-success-message w-form-done ${props.className || ''}`}}>{createScope(props.children, proxies => <React.Fragment>
              <div className="af-class-labelthankyoutitle">Thank you for sharing your playlist!<br /></div>
              <div className="af-class-labelthankyousubtitle">Here's the transaction Hash:</div>
              {map(proxies['btn-hash'], props => <div {...{...props, className: `af-class-btnhash ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>0xc3e52ab5...</React.Fragment>}</div>)}
              <div className="af-class-labelthankyoucaption">You're really a champ! 🤟<br />Do you want to share more?</div>
              {map(proxies['btn-dismiss'], props => <a href="#" {...{...props, className: `af-class-btndismisssuccess w-button ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>Yeah, sounds good</React.Fragment>}</a>)}
            </React.Fragment>)}</div>)}
            {map(proxies['form-error'], props => <div {...{...props, className: `af-class-error-message w-form-fail ${props.className || ''}`}}>{createScope(props.children, proxies => <React.Fragment>
              {map(proxies['text-error'], props => <div {...{...props, className: `af-class-texterror ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>Oops! Something went wrong while sending your playlist.</React.Fragment>}</div>)}
            </React.Fragment>)}</div>)}
          </div>
        </span>
      </span>
    )
  }
}

export default PlaylistFormView

/* eslint-enable */
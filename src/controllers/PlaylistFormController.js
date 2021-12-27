import React from 'react';
import PlaylistFormView from '../views/PlaylistFormView'

class PlaylistFormController extends React.Component {
    
    render() {
        return (
            <PlaylistFormView>
                <tf-link/>
                <tf-desc />
                <btn-send onClick={null}/>
            </PlaylistFormView>
        )
    };
}

export default PlaylistFormController;

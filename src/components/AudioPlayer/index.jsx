
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AudioActionCreators from '../../actions/audioplayer';

import View from './View';

const mapStateToProps = ({
  audioplayer: {
    name,
    playing,
    items,
    playerType,
    currentIndex,
    currentSongUrl,
    currentSongName
  }
}) => ({
  name,
  playing,
  items,
  playerType,
  currentIndex,
  currentSongUrl,
  currentSongName
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    togglePlaying: AudioActionCreators.togglePlaying,
    setPlaying: AudioActionCreators.setPlaying
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  class extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
        volume: 0.2,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        muted: false,
        seeking: false
      };
    }

    render() {
      return (
        <View
          {...this.state}
          {...this.props}
          format={this.format}
          onProgress={this.onProgress}
          onSeekDown={this.onSeekMouseDown}
          onSeekChange={this.onSeekChange}
          onSeekUp={this.onSeekMouseUp}
          setDuration={this.setDuration}
          setVolume={this.setVolume}
          setPlayerRef={this.setPlayerRef}
        />
      );
    }

    onProgress = state => {
      // We only want to update time slider if we are not currently seeking
      console.log(state);
      if (!this.state.seeking) {
        this.setState(state);
      }
    };

    onSeekMouseDown = () => {
      this.setState({ seeking: true });
    };

    onSeekChange = (value) => {
      this.setState({ played: parseFloat(value) });
    };

    onSeekMouseUp = (value) => {
      this.setState({ seeking: false });
      this.player.seekTo(parseFloat(value));
    };

    setDuration = (duration) => {
      this.setState({ duration });
    };

    setPlayerRef = (el) => this.player = el;

    setVolume = (val) => this.setState({ volume: parseFloat(val) });

    format = (seconds) => {
      const date = new Date(seconds * 1000);
      const hh = date.getUTCHours();
      const mm = date.getUTCMinutes();
      const ss = date.getUTCSeconds();

      return `${
        hh ? 
          hh >= 10 
            ? ('0' + hh).slice(-2) + ':'
            :
            ('0' + hh).slice(-1) + ':'
          :
          ''}${('0' + mm).slice(-2)}:${('0' + ss).slice(-2)
      }`;
    };
  }
);
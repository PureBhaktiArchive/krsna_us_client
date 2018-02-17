
import React from 'react';

import Slider from 'rc-slider';
import classNames from 'classnames';

import { withTheme } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

import VolumeMute from 'material-ui-icons/VolumeMute';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import Pause from 'material-ui-icons/Pause';


const UIControls = ({
  classes, togglePlaying, volume, seconds,
  format, setVolume, onSeekDown, onSeekChange,
  onSeekUp, played, theme, playing,
  playerType
}) => {
  return (
    <div>
      <div className={classNames(classes.buttonControls, {
        [classes.withPlaylist]: playerType === 'playlist',
        [classes.withSong]: playerType !== 'playlist'
      })}>
        {
          playerType === 'playlist' ?
            <IconButton>
              <SkipPreviousIcon/>
            </IconButton>
            :
            null
        }
        <IconButton onClick={togglePlaying}>
          {
            playing ? <Pause />:<PlayArrowIcon />
          }
        </IconButton>
        {
          playerType === 'playlist' ?
            <IconButton>
              <SkipNextIcon/>
            </IconButton>
            :
            null
        }
        <div style={{ display: 'flex', alignSelf: 'center' }}>
          <Icon color='contrast' style={{ alignItems: 'center', height: '24px' }}>
            <VolumeMute />
          </Icon>
          <Slider
            style={{ width: `${playerType === 'playlist' ? '40px':'80px'}`, alignSelf: 'center' }}
            min={0}
            max={1}
            onChange={setVolume}
            value={volume}
            step={0.01}
            trackStyle={{ backgroundColor: theme.palette.secondary.main }}
            handleStyle={{
              backgroundColor: theme.palette.primary.light,
              border: `solid 3px ${theme.palette.secondary.dark}`
            }}
            railStyle={{
              backgroundColor: theme.palette.text.secondary
            }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', padding: '2px', alignItems: 'center' }}>
        <div style={{ width: '30%', paddingLeft: '10px' }}>
          <Typography>
            <time dateTime={`P${Math.round(seconds)}S`}>
              {format(seconds)}
            </time>
          </Typography>
        </div>
        <Slider
          trackStyle={{ backgroundColor: theme.palette.secondary.main }}
          handleStyle={{
            backgroundColor: theme.palette.primary.light,
            border: `solid 3px ${theme.palette.secondary.dark}`
          }}
          railStyle={{
            backgroundColor: theme.palette.text.secondary
          }}
          min={0}
          max={1}
          step={0.001}
          value={played}
          style={{ width: '60%' }}
          onBeforeChange={onSeekDown}
          onChange={onSeekChange}
          onAfterChange={onSeekUp}
        />
      </div>
    </div>
  );
};

export default withTheme()(UIControls);
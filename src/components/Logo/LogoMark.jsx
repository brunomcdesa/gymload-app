import PropTypes from 'prop-types';
import React from 'react';
import Svg, { G, Rect } from 'react-native-svg';

export default function LogoMark({
  width = 120,
  height = 60,
  color = '#FF5E2C',
  bg = '#222',
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 320 160">
      <G transform="translate(32 12)" fill={color}>
        <Rect x={0} y={0} width={56} height={136} rx={14} />
        <Rect x={200} y={0} width={56} height={136} rx={14} />
        <Rect x={64} y={22} width={26} height={92} rx={7} />
        <Rect x={166} y={22} width={26} height={92} rx={7} />
        <Rect x={74} y={60} width={108} height={16} rx={4} />
      </G>
      <Rect x={148} y={76} width={24} height={8} rx={2} fill={bg} />
    </Svg>
  );
}

LogoMark.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  bg: PropTypes.string,
};

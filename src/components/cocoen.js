// @flow
import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import { debounce } from 'lodash';

import type { Node } from 'react';

import beforeUrl from '../../img/office-prophet.png';
import afterUrl from '../../img/office-prophet-night.png';

const Container = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  line-height: 0;
  margin: 0 auto 75px;
  overflow: hidden;
  padding: 0;
  position: relative;
  user-select: none;

  * {
    box-sizing: inherit;

    &:after,
    &:before {
      box-sizing: inherit;
    }
  }
`;

const Before = styled.div`
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 50%;
`;

const BeforeImage = styled.img`
  max-width: none;
`;

const AfterImage = styled.img`
  display: block;
  width: 100%;
  max-width: 100%;
`;

const Drag = styled.span`
  background: #e9e0d2;
  bottom: 0;
  cursor: ew-resize;
  left: 50%;
  margin-left: -1px;
  position: absolute;
  top: 0;
  width: 2px;

  &:before {
    border: 3px solid #e9e0d2;
    content: '';
    height: 30px;
    left: 50%;
    margin-left: -7px;
    margin-top: -18px;
    position: absolute;
    top: 50%;
    width: 14px;
  }
`;

export default function Cocoen(): Node {
  const ref = useRef();
  const dragRef = useRef();

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [elementWidth, setElementWidth] = useState<number>(0);
  const [dragElementWidth, setDragElementWidth] = useState<number>(0);
  const [x, setX] = useState<number>(0);
  const [openRatio, setOpenRatio] = useState<string>('50%');

  const calculateOpenRatio = (value: number): string => {
    let ratio = value + dragElementWidth / 2;
    ratio /= elementWidth;
    return `${ratio * 100}%`;
  };

  const onDragStart = e => {
    e.preventDefault();

    setIsDragging(true);
  };

  const onDrag = e => {
    e.preventDefault();

    if (!isDragging) {
      return;
    }

    const clientX = e.clientX ? e.clientX : e.touches[0].clientX;
    setX(clientX);
  };

  const onDragEnd = e => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onClick = e => {
    e.preventDefault();

    const clientX = e.clientX ? e.clientX : e.touches[0].clientX;
    setX(clientX - e.target.getBoundingClientRect().left);
  };

  const updateDimensions = () => {
    if (ref.current && dragRef.current) {
      setElementWidth(parseInt(window.getComputedStyle(ref.current).width, 10));
      setDragElementWidth(
        parseInt(window.getComputedStyle(dragRef.current).width, 10),
      );
    }
  };

  useEffect(() => {
    if (!x) {
      return;
    }
    window.requestAnimationFrame(() => {
      setOpenRatio(calculateOpenRatio(x));
    });
  }, [x]);

  useEffect(() => {
    const debouncedUpdateDimensions = debounce(updateDimensions, 250);
    window.addEventListener('resize', debouncedUpdateDimensions);
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('touchend', onDragEnd);
    return () => {
      window.removeEventListener('resize', debouncedUpdateDimensions);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('touchend', onDragEnd);
    };
  }, []);

  useEffect(() => {
    updateDimensions();
  }, []);

  return (
    <Container
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
      onMouseMove={onDrag}
      onTouchMove={onDrag}
      onClick={onClick}
      ref={ref}
    >
      <Before style={{ width: openRatio }}>
        <BeforeImage
          src={beforeUrl}
          alt=""
          style={{ width: elementWidth }}
          draggable={false}
        />
      </Before>
      <AfterImage src={afterUrl} alt="" draggable={false} />
      <Drag ref={dragRef} style={{ left: openRatio }} />
    </Container>
  );
}

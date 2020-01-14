// @flow
import styled from '@emotion/styled';
import type { Theme } from 'components/app.js';

type CssProps = $ReadOnly<{|
  alignment: 'left' | 'right',
  theme: Theme,
|}>;

export const Container = styled.div`
  margin-bottom: 25px;

  img {
    max-width: 100%;
  }

  ${({ theme }: CssProps) => theme.media.l`
    margin-bottom: 75px;
  `}
`;

export const Header = styled.div`
  margin-left: 0;

  ${({ theme, alignment }: CssProps) => theme.media.l`
    margin-left: ${alignment === 'right' ? '70%' : 0};
  `}
`;

export const Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  ${({ theme, alignment }: CssProps) => theme.media.l`
    flex-direction: ${alignment === 'right' ? 'row' : 'row-reverse'};
  `}
`;

export const ImageContainer = styled.div`
  width: 100%;
  margin-bottom: 25px;

  img {
    max-width: 100%;
  }

  ${({ theme, alignment }: CssProps) => theme.media.l`
    width: 65%;
    margin-top: -135px;
    margin-right: ${alignment === 'right' ? '5%' : 0};
    margin-left: ${alignment === 'left' ? '5%' : 0};
    margin-bottom: 0;
  `}
`;

export const Text = styled.div`
  width: 100%;

  p {
    margin: 0 0 25px;
  }

  ${({ theme }: CssProps) => theme.media.l`
    width: 30%;
  `}
`;

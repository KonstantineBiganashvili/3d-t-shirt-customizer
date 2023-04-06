import { proxy } from 'valtio';

export interface State {
  intro: boolean;
  color: string;
  isLogoTexture: boolean;
  isFullTexture: boolean;
  logoDecal: string;
  fullDecal: string;
  [key: string]: boolean | string;
}

const state = proxy<State>({
  intro: true,
  color: '#EFBD45',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
});

export default state;

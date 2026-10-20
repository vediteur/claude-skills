import {Composition} from 'remotion';
import {FPS, H, W} from './lib';

// One <Composition> per reel in src/reels/<slug>/, for example:
// import {MyProductReel, REEL_DURATION as MY_PRODUCT_DURATION} from './reels/my-product/Reel';
// <Composition id="MyProductReel" component={MyProductReel} durationInFrames={MY_PRODUCT_DURATION} fps={FPS} width={W} height={H} />
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Placeholder" component={() => null} durationInFrames={1} fps={FPS} width={W} height={H} />
  </>
);

import { AnimationClip } from "three/src/animation/AnimationClip";

export class Phone3DFbx {

    public static getChooseFrameWithTime(time: number, totalFrame: number, chooseFrame: number) {
        return time / totalFrame * chooseFrame;
    }

    public static getChooseFrameWithAnimationClip(animationClip: AnimationClip, totalFrame: number, chooseFrame: number) {
        return animationClip.duration / totalFrame * chooseFrame;
    }
}

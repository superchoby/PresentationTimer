import { INPUT_SCRIPT, INPUT_DIV_HEIGHT } from '../constants/action-types';

export function inputScript(script, minutes) {
    return { type:INPUT_SCRIPT, payload: {script, minutes} };
}

export function inputDivHeight(height) {
    return {type:INPUT_DIV_HEIGHT, payload: height}
}
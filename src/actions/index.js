import { INPUT_SCRIPT } from '../constants/action-types';

export function inputScript(script, minutes) {
    return { type:INPUT_SCRIPT, payload: {script, minutes} };
}
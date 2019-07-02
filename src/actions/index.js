import { INPUT_SCRIPT } from '../constants/action-types';

export function inputScript(payload) {
    return { type:INPUT_SCRIPT, payload };
}
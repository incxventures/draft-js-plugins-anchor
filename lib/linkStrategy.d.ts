import { ContentBlock, ContentState } from 'draft-js';
export declare const matchesEntityType: (type: string) => boolean;
export default function strategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState): void;

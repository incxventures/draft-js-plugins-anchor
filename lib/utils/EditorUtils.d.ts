import { EditorState, EntityInstance } from 'draft-js';
declare const _default: {
    createLinkAtSelection(editorState: EditorState, url: string): EditorState;
    removeLinkAtSelection(editorState: EditorState): EditorState;
    getCurrentEntityKey(editorState: EditorState): string;
    getCurrentEntity(editorState: EditorState): EntityInstance | null;
    hasEntity(editorState: EditorState, entityType: string): boolean;
};
export default _default;

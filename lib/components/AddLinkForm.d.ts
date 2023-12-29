import { ReactElement, ComponentType } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { AnchorPluginTheme } from '../theme';
export interface OverrideContentProps {
    getEditorState: () => EditorState;
    setEditorState: (editorState: EditorState) => void;
    onOverrideContent: (content: ComponentType<unknown> | undefined) => void;
}
interface AddLinkFormParams extends OverrideContentProps {
    validateUrl?(url: string): boolean;
    theme: AnchorPluginTheme;
    placeholder?: string;
}
declare const AddLinkForm: {
    (props: AddLinkFormParams): ReactElement;
    propTypes: {
        getEditorState: PropTypes.Validator<(...args: any[]) => any>;
        setEditorState: PropTypes.Validator<(...args: any[]) => any>;
        onOverrideContent: PropTypes.Validator<(...args: any[]) => any>;
        theme: PropTypes.Validator<object>;
        placeholder: PropTypes.Requireable<string>;
        validateUrl: PropTypes.Requireable<(...args: any[]) => any>;
    };
    defaultProps: {
        placeholder: string;
    };
};
export default AddLinkForm;

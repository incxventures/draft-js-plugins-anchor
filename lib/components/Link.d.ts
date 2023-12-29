import { ReactElement, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
export interface LinkPubProps {
    children: ReactNode;
    entityKey: string;
    getEditorState(): EditorState;
}
interface LinkProps extends LinkPubProps {
    className?: string;
    target?: string;
}
declare const Link: {
    ({ children, className, entityKey, getEditorState, target, }: LinkProps): ReactElement;
    propTypes: {
        className: PropTypes.Requireable<string>;
        children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        entityKey: PropTypes.Requireable<string>;
        getEditorState: PropTypes.Validator<(...args: any[]) => any>;
    };
};
export default Link;

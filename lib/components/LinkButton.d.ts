import { ComponentType, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { OverrideContentProps } from './AddLinkForm';
import { AnchorPluginTheme } from '../theme';
import { AnchorPluginStore } from '..';
import { DefaultLinkButtonProps } from './DefaultLinkButton';
export interface LinkButtonTheme {
    button?: string;
    active?: string;
    buttonWrapper?: string;
}
export interface LinkButtonPubParams {
    theme?: LinkButtonTheme;
    onOverrideContent(component: ComponentType<OverrideContentProps> | undefined): void;
}
interface LinkButtonParams extends LinkButtonPubParams {
    ownTheme: AnchorPluginTheme;
    store: AnchorPluginStore;
    placeholder?: string;
    onRemoveLinkAtSelection(): void;
    validateUrl?(url: string): boolean;
    linkButton: ComponentType<DefaultLinkButtonProps>;
}
declare const LinkButton: {
    ({ ownTheme, placeholder, onOverrideContent, validateUrl, theme, onRemoveLinkAtSelection, store, linkButton: InnerLinkButton, }: LinkButtonParams): ReactElement;
    propTypes: {
        placeholder: PropTypes.Requireable<string>;
        store: PropTypes.Validator<object>;
        ownTheme: PropTypes.Validator<object>;
        onRemoveLinkAtSelection: PropTypes.Validator<(...args: any[]) => any>;
        validateUrl: PropTypes.Requireable<(...args: any[]) => any>;
    };
};
export default LinkButton;

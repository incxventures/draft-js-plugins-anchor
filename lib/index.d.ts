import { AnchorHTMLAttributes, ComponentType } from 'react';
import { EditorPlugin } from '@draft-js-plugins/editor';
import { EditorState } from 'draft-js';
import { LinkButtonPubParams } from './components/LinkButton';
import { defaultTheme } from './theme';
import type { AnchorPluginTheme } from './theme';
import { DefaultLinkButtonProps } from './components/DefaultLinkButton';
export { defaultTheme };
export type { AnchorPluginTheme } from './theme';
export type { DefaultLinkButtonProps } from './components/DefaultLinkButton';
export interface AnchorPluginConfig {
    theme?: AnchorPluginTheme;
    placeholder?: string;
    Link?: ComponentType<AnchorHTMLAttributes<HTMLAnchorElement>>;
    linkTarget?: string;
    validateUrl?: (url: string) => boolean;
    LinkButton?: ComponentType<DefaultLinkButtonProps>;
}
export type AnchorPlugin = EditorPlugin & {
    LinkButton: ComponentType<LinkButtonPubParams>;
};
export interface AnchorPluginStore {
    getEditorState?(): EditorState;
    setEditorState?(state: EditorState): void;
}
declare const _default: (config?: AnchorPluginConfig) => AnchorPlugin;
export default _default;
